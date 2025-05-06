const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const configPath = path.resolve(__dirname, '../config/config.js');

console.log('Middleware started'); // Log when middleware is initialized
console.log('Config path:', configPath); // Log the config file path

// Read the existing config file
let configContent = '';
try {
  configContent = fs.readFileSync(configPath, 'utf-8');
  console.log('Successfully read config file'); // Log successful file read
} catch (err) {
  console.error('Error reading config file:', err.message); // Log file read error
}

// Extract the config object
let config;
try {
  config = require(configPath);
  console.log('Successfully required config file'); // Log successful require
} catch (err) {
  console.error('Error requiring config file:', err.message); // Log require error
}

const fetchAccessToken = async () => {
  console.log('fetchAccessToken function called'); // Log when function is called
  
  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID, // Fetch from .env
    client_secret: process.env.CLIENT_SECRET // Fetch from .env
  };

  console.log('Using client_id:', process.env.CLIENT_ID ? 'exists' : 'missing'); // Log if client_id exists
  console.log('Using client_secret:', process.env.CLIENT_SECRET ? 'exists' : 'missing'); // Log if client_secret exists

  try {
    console.log('Attempting to fetch access token from Amadeus API...'); // Log before API call
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('API response status:', response.status); // Log response status
    console.log('API response received:', response.data ? 'with data' : 'empty'); // Log if response has data

    if (response.status === 200 && response.data && response.data.access_token) {
      const accessToken = response.data.access_token;

      console.log("New access token received:", accessToken); // Log the new token

      // Replace the existing accessToken value in the file
      const updatedConfigContent = configContent.replace(
        /accessToken:\s*'.*'/,
        `accessToken: '${accessToken}'`
      );

      console.log('Config content updated with new token'); // Log before file write

      // Write the updated content back to the config file
      try {
        fs.writeFileSync(configPath, updatedConfigContent, 'utf-8');
        console.log('Successfully updated config file with new token'); // Log successful file write
      } catch (err) {
        console.error('Error writing to config file:', err.message); // Log file write error
      }
    } else {
      console.error('Failed to fetch access token - invalid response:', {
        status: response.status,
        data: response.data
      });
    }
  } catch (error) {
    console.error('Error in fetchAccessToken:', error.message);
    if (error.response) {
      console.error('Error response details:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
  }
};

console.log('Middleware setup complete'); // Log when middleware setup is done

module.exports = { fetchAccessToken };