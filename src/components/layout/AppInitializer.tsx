import type { ReactNode } from "react";
import { useEffect } from "react";

import { refreshAccessToken } from "../../api/authApi";
import { useAuthStore } from "../../stores/authStore";

interface AppInitializerProps {
    children: ReactNode;
}

export default function AppInitializer({
    children,
}: AppInitializerProps) {
    const isInitializing = useAuthStore(
        (state) => state.isInitializing,
    );

    const restoreSession = useAuthStore(
        (state) => state.restoreSession,
    );

    const logout = useAuthStore(
        (state) => state.logout,
    );

    useEffect(() => {
        async function initializeSession() {
            const refreshToken = localStorage.getItem(
                "sprintdesk_refresh_token",
            );

            if (!refreshToken) {
                useAuthStore
                    .getState()
                    .setInitializing(false);

                return;
            }

            try {
                const response =
                    await refreshAccessToken(refreshToken);

                const user = {
                    id: response.id,
                    name: `${response.firstName} ${response.lastName}`,
                    email: response.email,
                    avatar: response.image,
                };

                restoreSession(
                    user,
                    response.accessToken,
                );
            } catch {
                logout();
            }
        }

        initializeSession();
    }, [restoreSession, logout]);

    if (isInitializing) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

                    <p className="text-sm text-slate-500">
                        Checking your session...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}