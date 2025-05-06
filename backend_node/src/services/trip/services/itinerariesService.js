const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../../../config/config');

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

    // Define proper JSON schema
    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "definitions": {
            "activity": {
                "type": "object",
                "properties": {
                    "name": { "type": "string" },
                    "type": { "type": "string" },
                    "details": { "type": "string" },
                    "time": { "type": "string" },
                    "location": { "type": "string" },
                    "latitude": { "type": "number" },
                    "longitude": { "type": "number" }
                },
                "required": ["name", "type", "details", "time", "location", "latitude", "longitude"]
            }
        },
        "itinerary": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "day": { "type": "string" },
                    "description": { "type": "string" },
                    "activities": {
                        "type": "array",
                        "items": { "$ref": "#/definitions/activity" }
                    }
                },
                "required": ["day", "description", "activities"]
            }
        }
    };

    const prompt = `Generate a detailed travel itinerary in valid JSON format strictly following this schema:
${JSON.stringify(schema, null, 2)}

Travel Request Details:
${JSON.stringify(requestData, null, 2)}

Important Instructions:
- Use real-world restaurants and suggest specific menu items
- Include exact timings for each activity
- Provide precise geo-coordinates (latitude/longitude) for each location
- Return ONLY the JSON output with no additional text or markdown formatting
- Ensure the JSON is syntactically perfect and parseable`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        // Clean the response text
        text = cleanJsonResponse(text);

        // Parse and validate the JSON
        const itinerary = parseAndValidateItinerary(text, schema);
        return itinerary;
    } catch (error) {
        console.error('Error generating itinerary:', error);
        throw new Error(`Failed to generate itinerary: ${error.message}`);
    }
}

function cleanJsonResponse(text) {
    // Remove markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch) {
        text = jsonMatch[1];
    }

    // Remove common problematic characters
    text = text.replace(/[*#`"']/g, '').trim();

    // Handle cases where response might be double-encoded
    if (text.startsWith('"') && text.endsWith('"')) {
        text = text.slice(1, -1).replace(/\\"/g, '"');
    }

    // Remove any trailing commas that might break JSON parsing
    text = text.replace(/,\s*([}\]])/g, '$1');

    return text;
}

function parseAndValidateItinerary(jsonString, schema) {
    try {
        const parsed = JSON.parse(jsonString);

        // Basic validation against schema structure
        if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
            throw new Error("Invalid itinerary structure - missing required fields");
        }

        // Additional validation can be added here
        // Consider using a proper JSON schema validator library for production

        return parsed;
    } catch (parseError) {
        console.error('Failed to parse itinerary JSON:', parseError);
        console.error('Original text:', jsonString);
        throw new Error(`Invalid JSON response from AI: ${parseError.message}`);
    }
}

module.exports = {
    generateItinerary,
};