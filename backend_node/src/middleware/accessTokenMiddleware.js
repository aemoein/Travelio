const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const configPath = path.resolve(__dirname, '../config/config.js');

// Read the existing config file
let configContent = fs.readFileSync(configPath, 'utf-8');

// Extract the config object
const config = require(configPath);

const fetchAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID, // Fetch from .env
    client_secret: process.env.CLIENT_SECRET // Fetch from .env
  };

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.status === 200 && response.data && response.data.access_token) {
      const accessToken = response.data.access_token;

      // Replace the existing accessToken value in the file
      const updatedConfigContent = configContent.replace(
        /accessToken:\s*'.*'/,
        `accessToken: '${accessToken}'`
      );

      // Write the updated content back to the config file
      fs.writeFileSync(configPath, updatedConfigContent, 'utf-8');
    } else {
      console.error('Failed to fetch access token:', response.data);
    }
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
};

module.exports = { fetchAccessToken };