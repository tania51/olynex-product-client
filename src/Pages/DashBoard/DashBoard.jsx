
import { useNavigate } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";
import { Spinner } from "@material-tailwind/react";


const DashBoard = () => {
    const [userInfo, allUserInfo] = useAllUser();
    console.log(userInfo);
    
    const navigate = useNavigate();
    if(userInfo === undefined) {
        return <>
            <div className="flex w-full h-screen items-center justify-center text-2xl">
            <Spinner className="text-pink-700" color="pink" />
            </div>
        </>
    }
    else {
        if(userInfo.role === 'distributor') {
            console.log('distributor');
            return navigate('/dashboard/distributor-dashboard', {state: userInfo})
        }
        else if(userInfo.role === 'employee') {
            return navigate('/dashboard/employee-dashboard', {state: userInfo})
        }
        else if(userInfo.role === 'boss') {
            return navigate('/dashboard/boss-dashboard', {state: userInfo})
        }
        else if(userInfo.role === 'mockup') {
            return navigate('/dashboard/mockup-dashboard', {state: userInfo})
        }
        else if(userInfo.role === 'seo') {
            return navigate('/dashboard/seo-dashboard', {state: userInfo})
        }
    }
};

export default DashBoard;