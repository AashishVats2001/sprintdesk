import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/authStore";
import { refreshAccessToken } from "./authApi";


interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const apiClient = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
})


apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

apiClient.interceptors.response.use((response) => response,
    async (error: AxiosError) => {
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as RetryableRequestConfig;

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("sprintdesk_refresh_token")

        if (!refreshToken) {
            useAuthStore.getState().logout();

            return Promise.reject(error)

        }

        try {
            const response = await refreshAccessToken(refreshToken);

            const newAccessToken = response.accessToken;

            const user = {
                id: response.id,
                name: `${response.firstName} ${response.lastName}`,
                email: response.email,
                avatar: response.image
            }

            useAuthStore.getState().restoreSession(user, newAccessToken)

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);

        } catch (refreshError) {
            useAuthStore.getState().logout();

            return Promise.reject(refreshError);
        }
    })
