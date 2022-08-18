import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
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
