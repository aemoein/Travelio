const authService = require('../services/authService');

async function signup(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    const userInfo = { username, firstName, lastName, email, password };
    const result = await authService.registerUser(userInfo);
  
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
      const result = await authService.loginUser(username, password);

      if (result.status === 200) {
          req.session.userId = result.userId;
      
          console.log('SessionId: ' + req.sessionID);
          console.log('UserId: ' + req.session.userId);
          return res.status(200).json({ token: result.token });
      }

      return res.status(result.status).json({ message: result.message });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
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
  
    const result = await authService.userInformation(req.session.userId, userInfo, req.file);
  
    res.status(result.status).json({ message: result.message });
}

async function logout(req, res) {
    const result = await authService.logout(req);
    res.status(result.status).json({ message: result.message });
}

module.exports = { signup, login, userInfoSignUp, logout };