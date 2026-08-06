import axios from 'axios';

// Cross-device network target for Android Emulator / Physical Device
const API_BASE_URL = 'http://10.0.2.2:5000/api';

export const mobileApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
