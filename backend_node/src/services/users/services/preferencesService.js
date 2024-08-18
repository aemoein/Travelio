const Preferences = require('../models/Preferences');
const { User } = require('../utils/userMiddleware');

function generatePreferences(answers) {
    return Preferences.generatePreferences(answers);
}

async function setUserPreferences(userId, preferences) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
    
        user.preferences = preferences;
        await user.save();
    
        return { status: 200, message: 'User preferences updated successfully' };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}
  
module.exports = { generatePreferences, setUserPreferences};