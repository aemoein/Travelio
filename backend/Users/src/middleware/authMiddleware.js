const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (userId, preferences, secretKey) => {
  try {
    return jwt.sign({ userId,  preferences}, secretKey, { expiresIn: '1h' });
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

function verifyToken(req, res, next) {
  const token = req.token;

  if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { userId, preferences } = decoded;
      
      console.log('Token:', token);
      console.log('User ID:', userId);
      console.log('Preferences:', preferences);

      req.userId = userId;
      req.preferences = preferences;
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = { generateToken, verifyToken };