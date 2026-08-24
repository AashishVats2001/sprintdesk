import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";


const Dashboard = () => {
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className='flex flex-col gap-4'>
            Dashboard
            <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
        </div>
    )
}

export default Dashboard