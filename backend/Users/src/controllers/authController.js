const authService = require('../services/authService');
const uploadMiddleware = require('../middleware/uploadMiddleware.js');

async function signup(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    const userInfo = { username, firstName, lastName, email, password };
    const result = await authService.signupUser(userInfo);
  
    if (result.status === 201) {
      req.session.userId = result.userId;
      req.session.username = result.username;
  
      console.log('SessionId: ' + req.sessionID);
      console.log('UserId: ' + req.session.userId);
    }
  
    res.status(result.status).json({ message: result.message });
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
      result = await authService.loginUser(username, password);
  
      if (result.status === 200) {
        req.session.userId = result.userId;
    
        console.log('SessionId: ' + req.sessionID);
        console.log('UserId: ' + req.session.userId);
      }

      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
}

async function userInfoSignUp(req, res) {
    const { location, birthday, bio, nationality, mobileNumber } = req.body;
  
    console.log('SessionId info: ' + req.sessionID);
    console.log('UserId info: ' + req.session.userId);
  
    const userInfo = {
      location,
      birthday,
      bio,
      nationality,
      mobileNumber,
    };
  
    const result = await userService.userInformation(req.session.userId, userInfo, req.file);
  
    res.status(result.status).json({ message: result.message });
}

async function logout(req, res) {
    const result = await logoutService.logout();
    res.status(result.status).json({ message: result.message });
}

module.exports = { signup, login, userInfoSignUp, logout };