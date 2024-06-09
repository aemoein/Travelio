const preferencesServices = require('../services/preferencesService').default;

async function quiz(req, res) {
    const answers = req.body.answers;
    const preferences = preferencesServices.generatePreferences(answers);
  
    res.json({ preferences });
}

async function setUserPreferences(req, res) {
    const { preferences } = req.body;
    const result = await preferencesServices.setUserPreferences(req.session.userId, preferences);
  
    res.status(result.status).json({ message: result.message });
}
  
module.exports = { quiz, setUserPreferences};