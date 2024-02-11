import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div className="h-screen bg-gray-950 text-white">
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;