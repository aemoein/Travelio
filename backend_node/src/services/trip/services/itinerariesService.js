const { GoogleGenerativeAI } = require("@google/generative-ai");
const { jsonrepair } = require('jsonrepair');
const config = require('../../../config/config');

const genAI = new GoogleGenerativeAI(config.googleApiKey);

// Basic validator to check if structure roughly matches expected format
function validateItinerary(itinerary) {
    if (!Array.isArray(itinerary)) return false;

    return itinerary.every(day =>
        typeof day.day === 'string' &&
        typeof day.description === 'string' &&
        Array.isArray(day.activities) &&
        day.activities.every(activity =>
            typeof activity.name === 'string' &&
            typeof activity.type === 'string' &&
            typeof activity.details === 'string' &&
            typeof activity.time === 'string' &&
            typeof activity.location === 'string' &&
            typeof activity.latitude === 'number' &&
            typeof activity.longitude === 'number'
        )
    );
}

async function generateItinerary(request) {
    const { destination, start_date, end_date, interests, adults, hotel } = request;

    const requestData = {
        destination,
        start_date,
        end_date,
        interests,
        adults,
        hotel
    };

    // EXAMPLE of the desired response format
    const exampleSchema = [
        {
            day: "Monday",
            description: "Explore historical landmarks in Rome.",
            activities: [
                {
                    name: "Colosseum Tour",
                    type: "Historical",
                    details: "A guided tour of the Colosseum.",
                    time: "10:00 AM",
                    location: "Colosseum, Rome",
                    latitude: 41.8902,
                    longitude: 12.4922
                },
                {
                    name: "Lunch at Roscioli",
                    type: "Restaurant",
                    details: "Try carbonara at this authentic Roman restaurant.",
                    time: "1:00 PM",
                    location: "Via dei Giubbonari 21, Rome",
                    latitude: 41.8947,
                    longitude: 12.4751
                }
            ]
        }
    ];

    const prompt = `
You are a travel assistant. Please generate a multi-day travel itinerary in valid JSON format only.

## Constraints:
- Use real restaurants and suggest foods where possible.
- Ensure each day has a 'day', a 'description', and a list of 'activities'.
- Each activity must include:
  - name (string)
  - type (string)
  - details (string)
  - time (string)
  - location (string)
  - latitude (number)
  - longitude (number)
- Return ONLY JSON, and match this structure:

${JSON.stringify(exampleSchema, null, 2)}

## Input data:
${JSON.stringify(requestData, null, 2)}
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        // Clean up markdown code block if present
        if (text.startsWith("```")) {
            text = text.replace(/```(?:json)?\n?/, '').replace(/```$/, '');
        }

        console.log("Raw Gemini output:", text.slice(0, 500), "...");

        // Try parsing JSON
        let itinerary;
        try {
            // Extract JSON array from Gemini response
            const match = text.match(/\[\s*{[\s\S]*?}\s*\]/);
            if (!match) {
                throw new Error('No valid JSON array found in response.');
            }

            const repairedJson = jsonrepair(match[0]);
            itinerary = JSON.parse(repairedJson);
        } catch (parseError) {
            console.error("Failed to parse JSON:", parseError.message);
            throw new Error('Generated response was not valid JSON.');
        }

        // Validate structure
        if (!validateItinerary(itinerary)) {
            console.error("JSON structure does not match expected format.");
            throw new Error('Generated JSON does not match expected itinerary format.');
        }

        return itinerary;
    } catch (error) {
        console.error('Error generating itinerary:', error.message);
        throw new Error('Failed to generate itinerary');
    }
}

module.exports = {
    generateItinerary,
};
