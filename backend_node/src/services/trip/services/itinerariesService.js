const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../config/config');

const genAI = new GoogleGenerativeAI(config.googleApiKey);

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

    const activity = {
        name: { type: String, required: true },
        type: { type: String, required: true },
        details: { type: String, required: true },
        time: { type: String, required: true },
        location: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    };

    const itinerary = {
        day: { type: String, required: true },
        description: { type: String, required: true },
        activities: [activity] 
    };

    const schema = JSON.stringify({
        activity,
        itinerary
    });

    const prompt = JSON.stringify({
        request: "Please generate a trip itinerary for the following data:",
        restaurants: "use real world restaurants to the best of your abilities and suggest foods",
        constraints: "return the itinerary as JSON and follow the schema provided",
        schema,
        requestData
    });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        // Remove the first 7 characters and the last 3 characters
        text = text.substring(7, text.length - 3);

        // Replace specific characters or patterns as needed
        text = text.replace(/[*#]/g, '');
        text = text.replace(/##?\s*/g, '');

        //console.log(text);

        const itinerary = JSON.parse(text);

        return itinerary;
    } catch (error) {
        console.error('Error generating itinerary:', error);
        throw new Error('Failed to generate itinerary');
    }
}

module.exports = {
    generateItinerary,
};