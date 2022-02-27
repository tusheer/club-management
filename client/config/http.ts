import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { getToken } from '../src/libs/authClient';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000,
    headers: { Accept: 'application/json' },
});

instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = getToken();
        config.headers = { Authorization: token };
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
