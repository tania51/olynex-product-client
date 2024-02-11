import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";


const DashBoardLayout = () => {
    return (
        <div className="flex gap-6 bg-[#0d2434] text-white">
            <DashboardSidebar></DashboardSidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoardLayout;