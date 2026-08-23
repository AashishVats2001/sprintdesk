import type { AuthState } from "../types/auth";
import type { User } from "../types/user";
import { create } from "zustand"

interface AuthStore extends AuthState {
    login: (
        user: User,
        accessToken: string,
        refreshToken: string,
    ) => void;

    logout: () => void;

    setAccessToken: (accessToken: string) => void;

    setInitializing: (value: boolean) => void;

    restoreSession: (user: User, accessToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isInitializing: true,

    login: (user, accessToken, refreshToken) => {
        localStorage.setItem(
            "sprintdesk_refresh_token", refreshToken,
        );

        set({
            user,
            accessToken,
            isAuthenticated: true,
            isInitializing: false
        })
    },

    logout: () => {
        localStorage.removeItem(
            "sprintdesk_refresh_token"
        );

        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isInitializing: false
        })
    },

    setAccessToken: (accessToken) => {
        set({
            accessToken,
            isAuthenticated: true,
        })
    },

    setInitializing: (value) => {
        set({
            isInitializing: value,
        })
    },

    restoreSession: (user, accessToken) => {
        set({
            user,
            accessToken,
            isAuthenticated: true,
            isInitializing: false
        })
    }
}))