import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../stores/authStore";

export default function Header() {
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div>
                <h2 className="text-lg font-semibold">
                    SprintDesk
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-medium">
                    AS
                </div>

                <button
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}