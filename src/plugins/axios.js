import axios from "axios";

import {API_URL} from '../utils'

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
