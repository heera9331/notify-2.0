import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create();

// Interceptor to add Authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Interceptor to handle responses globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     if (error.response) {
//       console.error(
//         `API Error: ${error.response.status} - ${
//           error.response.data.message || error.message
//         }`
//       );
//     } else {
//       console.error(`Network Error: ${error.message}`);
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance as axios };
