
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7041', // Replace with your backend URL
    withCredentials: true, // Enables cookie-based authentication
});

export default axiosInstance;
