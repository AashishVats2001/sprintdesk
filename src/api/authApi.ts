import type { AuthResponse, LoginCredentials } from "../types/auth";
import axios from "axios";

const AUTH_URL = "https://dummyjson.com/auth";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${AUTH_URL}/login`, {

        ...credentials,
        expiresInMins: 30,

    })

    return response.data;
}


export async function refreshAccessToken(refreshToken: string,): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${AUTH_URL}/refresh`,
        {
            refreshToken,
            expiresInMins: 30,
        }
    )


    return response.data;
}