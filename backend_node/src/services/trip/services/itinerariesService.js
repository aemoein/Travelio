const { GoogleGenerativeAI } = require("@google/generative-ai");
const { jsonrepair } = require("jsonrepair");
const config = require("../../../config/config");

const genAI = new GoogleGenerativeAI(config.googleApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function formatDate(date) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

function validateDay(day, index) {
    if (!day.day || !day.day.includes(`Day ${index + 1}:`)) {
        console.error(`Day ${index + 1} has incorrect label:`, day.day);
        return false;
    }

    return typeof day.day === "string" &&
        typeof day.description === "string" &&
        Array.isArray(day.activities) &&
        day.activities.length > 0 &&
        day.activities.every(activity =>
            typeof activity.name === "string" &&
            typeof activity.type === "string" &&
            typeof activity.details === "string" &&
            typeof activity.time === "string" &&
            typeof activity.location === "string" &&
            typeof activity.latitude === "number" &&
            typeof activity.longitude === "number"
        );
}

function generateDayPrompt(index, currentDate, requestData) {
    return `
You are a professional travel assistant. Generate JSON for **Day ${index + 1}: ${formatDate(currentDate)}** of a ${requestData.trip_duration}-day trip to ${requestData.destination}.

### Requirements:
- JSON only. No extra text, no markdown, no explanations.
- Format:
{
  "day": "Day ${index + 1}: ${formatDate(currentDate)}",
  "description": "Short description of the day's theme or goal",
  "activities": [
    {
      "name": "Activity name",
      "type": "Type (e.g. Sightseeing, Dining, Museum)",
      "details": "1-2 sentence detail",
      "time": "Specific time like 9:00 AM",
      "location": "Real-world location or address",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    ...
  ]
}
- 3 to 5 activities for this day.
- Include meals, transit time, realistic timing.

### Traveler Info:
- Adults: ${requestData.adults}
- Hotel: ${requestData.hotel || "Not specified"}
- Interests: ${requestData.interests.join(", ")}

ONLY return valid JSON for this day's itinerary.
`;
}

async function generateItinerary(request) {
    const { destination, start_date, end_date, interests, adults, hotel } = request;

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

    const itinerary = [];

    for (let i = 0; i < tripDuration; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const prompt = generateDayPrompt(i, currentDate, requestData);

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = await response.text();

            text = text.trim()
                .replace(/^```(?:json)?\n?/, '')
                .replace(/```$/, '')
                .replace(/^JSON\s*:\s*/i, '');

            const repaired = jsonrepair(text);
            const dayPlan = JSON.parse(repaired);

            if (!validateDay(dayPlan, i)) {
                console.error(`Validation failed for Day ${i + 1}`);
                throw new Error(`Invalid format for Day ${i + 1}`);
            }

            itinerary.push(dayPlan);
        } catch (err) {
            console.error(`Failed to generate Day ${i + 1}:`, err.message);
            throw new Error(`Failed to generate itinerary for Day ${i + 1}`);
        }
    }

    return itinerary;
}

module.exports = {
    generateItinerary
};