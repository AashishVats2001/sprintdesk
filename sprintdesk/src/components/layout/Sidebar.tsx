import { NavLink } from "react-router-dom";

const links = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Board",
        path: "/board",
    },
    {
        label: "Analytics",
        path: "/analytics",
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">
                    SprintDesk
                </h1>
            </div>

            <nav className="space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm ${isActive
                                ? "bg-slate-100 font-medium"
                                : "text-slate-600"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}