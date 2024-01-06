// api.js

import axios from 'axios';

const baseURL = 'http://localhost/api'; // URL base API Anda

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // timeout jika diperlukan
  headers: {
    'Content-Type': 'application/json',
    // Anda dapat menambahkan header lain jika diperlukan
  },
});

export default instance;
