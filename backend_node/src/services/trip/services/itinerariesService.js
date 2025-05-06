const { GoogleGenerativeAI } = require("@google/generative-ai");
const { jsonrepair } = require('jsonrepair');
const config = require('../../../config/config');

const genAI = new GoogleGenerativeAI(config.googleApiKey);

// Enhanced validator with day count check
function validateItinerary(itinerary, expectedDays) {
    if (!Array.isArray(itinerary)) {
        console.error('Itinerary is not an array');
        return false;
    }

    if (itinerary.length !== expectedDays) {
        console.error(`Expected ${expectedDays} days but got ${itinerary.length}`);
        return false;
    }

    return itinerary.every((day, index) => {
        if (!day.day || !day.day.includes(`Day ${index + 1}:`)) {
            console.error(`Day ${index + 1} has incorrect labeling: ${day.day}`);
            return false;
        }

        return typeof day.day === 'string' &&
            typeof day.description === 'string' &&
            Array.isArray(day.activities) &&
            day.activities.length > 0 &&
            day.activities.every(activity =>
                typeof activity.name === 'string' &&
                typeof activity.type === 'string' &&
                typeof activity.details === 'string' &&
                typeof activity.time === 'string' &&
                typeof activity.location === 'string' &&
                typeof activity.latitude === 'number' &&
                typeof activity.longitude === 'number'
            );
    });
}

async function generateItinerary(request) {
    const { destination, start_date, end_date, interests, adults, hotel } = request;

    // Calculate number of days
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const requestData = {
        destination,
        start_date,
        end_date,
        trip_duration: tripDuration,
        interests,
        adults,
        hotel
    };

    // Multi-day example schema
    const exampleSchema = [
        {
            day: "Day 1: Monday, June 10, 2024",
            description: "Arrival and initial exploration",
            activities: [
                {
                    name: "Check-in at hotel",
                    type: "Accommodation",
                    details: "Settle into your accommodation and freshen up",
                    time: "2:00 PM",
                    location: "Grand Hotel, Paris",
                    latitude: 48.8666,
                    longitude: 2.3332
                },
                {
                    name: "Explore local neighborhood",
                    type: "Sightseeing",
                    details: "Walk around the nearby area to get oriented",
                    time: "4:00 PM",
                    location: "Le Marais, Paris",
                    latitude: 48.8606,
                    longitude: 2.3600
                },
                {
                    name: "Dinner at local bistro",
                    type: "Dining",
                    details: "Traditional French cuisine at a recommended restaurant",
                    time: "7:30 PM",
                    location: "Bistrot Paul Bert, Paris",
                    latitude: 48.8522,
                    longitude: 2.3825
                }
            ]
        },
        {
            day: "Day 2: Tuesday, June 11, 2024",
            description: "Cultural landmarks and museums",
            activities: [
                {
                    name: "Visit the Louvre Museum",
                    type: "Museum",
                    details: "Explore world-famous art collections",
                    time: "9:30 AM",
                    location: "Louvre Museum, Paris",
                    latitude: 48.8606,
                    longitude: 2.3376
                },
                // More activities...
            ]
        }
    ];

    const prompt = `
You are a professional travel assistant. Generate a detailed ${tripDuration}-day travel itinerary in VALID JSON format only.

## Critical Requirements:
- Create exactly ${tripDuration} days of activities from ${start_date} to ${end_date}
- Label each day as "Day X: [Weekday], [Full Date]" (e.g., "Day 1: Monday, June 10, 2024")
- Include 3-5 activities per day with realistic timing
- Account for travel time between locations
- Include meals, rest periods, and evening activities

## Activity Requirements:
- Name: Specific name of activity/location
- Type: Category (e.g., Museum, Dining, Sightseeing)
- Details: 1-2 sentence description
- Time: Specific time (e.g., "9:00 AM")
- Location: Full address or notable landmark
- Latitude/Longitude: Precise coordinates

## Traveler Preferences:
- Destination: ${destination}
- Dates: ${start_date} to ${end_date}
- Interests: ${interests.join(', ')}
- Adults: ${adults}
- Hotel: ${hotel || 'Not specified'}

## Example Format:
${JSON.stringify(exampleSchema, null, 2)}

IMPORTANT:
- Return ONLY valid JSON matching this exact structure
- Do not include any markdown, explanations, or extra text
- Ensure all dates are sequential and cover the entire trip duration
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        // Clean up response
        text = text.trim()
            .replace(/^```(?:json)?\n?/, '')
            .replace(/```$/, '')
            .replace(/^JSON\s*:\s*/i, '');

        // Extract JSON array
        let itinerary;
        try {
            const jsonMatch = text.match(/\[\s*{[\s\S]*?}\s*\]/);
            if (!jsonMatch) {
                throw new Error('No valid JSON array found in response');
            }

            const repairedJson = jsonrepair(jsonMatch[0]);
            itinerary = JSON.parse(repairedJson);
        } catch (parseError) {
            console.error("JSON parsing failed:", parseError.message);
            console.error("Original text:", text);
            throw new Error('Failed to parse generated itinerary');
        }

        // Enhanced validation
        if (!validateItinerary(itinerary, tripDuration)) {
            console.error("Validation failed for itinerary:", itinerary);
            throw new Error('Generated itinerary failed validation');
        }

        return itinerary;
    } catch (error) {
        console.error('Itinerary generation failed:', error.message);
        throw new Error(`Itinerary generation failed: ${error.message}`);
    }
}

module.exports = {
    generateItinerary,
};