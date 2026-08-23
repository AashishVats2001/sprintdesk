import type { AuthResponse, LoginCredentials } from "../types/auth";

const AUTH_URL = "https://dummyjson.com/auth";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...credentials,
            expiresInMins: 30,
        })
    })

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message ?? "Authentication failed"
        )
    }

    return response.json();
}


export async function refreshAccessToken(refreshToken: string,): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_URL}/refresh`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                refreshToken,
                expiresInMins: 30,
            })
        }
    )

    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message ?? "Session refresh failed"
        )
    }

    return response.json();
}