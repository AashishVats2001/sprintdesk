export default function Header() {
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

                <span className="text-sm font-medium">
                    User
                </span>
            </div>
        </header>
    );
}