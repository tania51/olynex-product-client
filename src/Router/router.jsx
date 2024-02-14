import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashBoard from "../Pages/DashBoard/DashBoard";
import EmployeeDashboard from "../Pages/DashBoard/EmployeeDashboard/EmployeeDashboard";
import DashBoardLayout from "../Pages/DashBoard/DashBoardLayout/DashBoardLayout";
import BossDashboard from "../Pages/DashBoard/BossDashboard/BossDashboard";
import DistributorDashboard from "../Pages/DashBoard/DistributorDashboard/DistributorDashboard";
import AddProduct from "../Pages/DashBoard/DistributorDashboard/AddProduct/AddProduct";
import ReviewTaskFromBoss from "../Pages/DashBoard/EmployeeDashboard/ReviewTaskFromBoss/ReviewTaskFromBoss";
import TaskFromMockup from "../Pages/DashBoard/BossDashboard/TaskFromMockup/TaskFromMockup";
import MockupDashBoard from "../Pages/DashBoard/MockupDashBoard/MockupDashBoard";
import SeoDashboard from "../Pages/DashBoard/SeoDashboard/SeoDashboard";
import TaskFromSeo from "../Pages/DashBoard/BossDashboard/TaskFromSeo/TaskFromSeo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/sign-up",
        element: <SignUp></SignUp>
    },
    {
        path: "/dashboard",
        element: <DashBoardLayout></DashBoardLayout>,
        children: [
            {
                path: "/dashboard",
                element: <DashBoard></DashBoard>
            },
            {
                path: "/dashboard/distributor-dashboard",
                element: <DistributorDashboard></DistributorDashboard>
            },
            {
                path: "/dashboard/add-product",
                element: <AddProduct></AddProduct>
            },
            {
                path: "/dashboard/employee-dashboard",
                element: <EmployeeDashboard></EmployeeDashboard>
            },
            {
                path: "/dashboard/employee-dashboard-review-from-boss",
                element: <ReviewTaskFromBoss></ReviewTaskFromBoss>
            },
            {
                path: "/dashboard/boss-dashboard",
                element: <BossDashboard></BossDashboard>
            },
            {
                path: "/dashboard/boss-dashboard/mockup",
                element: <TaskFromMockup></TaskFromMockup>
            },
            {
                path: "/dashboard/boss-dashboard/seo",
                element: <TaskFromSeo></TaskFromSeo>
            },
            {
                path: "/dashboard/mockup-dashboard",
                element: <MockupDashBoard></MockupDashBoard>
            },
            {
                path: "/dashboard/seo-dashboard",
                element: <SeoDashboard></SeoDashboard>
            }
        ]
    }
]);


export default router;