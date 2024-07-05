const preferencesService = require('../services/preferencesService');

async function quiz(req, res) {
    const answers = req.body.answers;
    const preferences = preferencesService.generatePreferences(answers);
  
    res.json({ preferences });
}

async function setUserPreferences(req, res) {
    const { preferences } = req.body;
    const result = await preferencesService.setUserPreferences(req.session.userId, preferences);
  
    res.status(result.status).json({ message: result.message });
}


  
module.exports = { quiz, setUserPreferences};