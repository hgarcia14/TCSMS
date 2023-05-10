const axios = require('axios');
require('dotenv').config({ path: '.env' });

const request = axios.create({
  baseURL: process.env.SMS_SERVICE_URL,
});

request.defaults.headers.common['Authorization'] = `Klaviyo-API-Key ${process.env.API_KEY}`;
request.defaults.headers.common['revision'] = '2023-02-22';

module.exports = request;