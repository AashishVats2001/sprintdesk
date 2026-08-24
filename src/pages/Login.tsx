import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";

export default function Login() {
    const navigate = useNavigate();

    const loginToStore = useAuthStore(
        (state) => state.login,
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const response = await login({
                username,
                password,
            });

            const user = {
                id: response.id,
                name: `${response.firstName} ${response.lastName}`,
                email: response.email,
                avatar: response.image,
            };

            loginToStore(
                user,
                response.accessToken,
                response.refreshToken,
            );

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm"
            >
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">
                        Welcome to SprintDesk
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to continue
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-1 block text-sm font-medium"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </form>
        </div>
    );
}