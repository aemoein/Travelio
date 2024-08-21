// tokenRefresh.js

const axios = require('axios');
const fs = require('fs');

const config = require('../config/config');

const fetchAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: 'KJcf4aGewF0G3fF32fRIrGNWVVFRL20z',
    client_secret: 'qgXGYxrthINKKz83'
  };

  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      new URLSearchParams(data).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.status === 200 && response.data && response.data.access_token) {
      const accessToken = response.data.access_token;
      config.accessToken = accessToken;
      fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(config, null, 2)};`, 'utf-8');
      console.log('Access token refreshed:', accessToken);
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