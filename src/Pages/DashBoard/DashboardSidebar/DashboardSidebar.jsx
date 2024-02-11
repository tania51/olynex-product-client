import React, { useContext } from "react";
import {
    Button,
    List,
    ListItem,
    ListItemPrefix,
    Spinner,
} from "@material-tailwind/react";
import { FcParallelTasks } from "react-icons/fc";
import useAllUser from "../../../hooks/useAllUser";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";



const DashboardSidebar = () => {
    const [userInfo, allUserInfo] = useAllUser();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOutHandeler = e => {
        e.preventDefault();
        logOut();
        return navigate(('/login'))
    }

    if (userInfo === undefined) {
        return <>
            <div className="flex w-full h-screen items-center justify-center text-2xl">
                <Spinner className="text-pink-700" color="pink" />
            </div>
        </>
    }
    // else {
    //     if(userInfo.role === 'distributor') {
    //         console.log('distributor');
    //         return setDistributor('distributor')
    //     }
    //     else if(userInfo.role === 'employee') {
    //         return navigate('/dashboard/employee-dashboard', {state: userInfo})
    //     }
    //     else if(userInfo.role === 'boss') {
    //         return navigate('/dashboard/boss-dashboard', {state: userInfo})
    //     }
    // }
    // const [open, setOpen] = React.useState(false);
    // const openDrawer = () => setOpen(true);
    // const closeDrawer = () => setOpen(false);

    return (
        <div className="bg-gray-950 h-screen text-white p-3 text-lg">
            <React.Fragment>
                {/* distributor sidebar */}
                {
                    userInfo.role === 'distributor' && (
                        <List>
                            <ListItem>
                                <ListItemPrefix>
                                    <FcParallelTasks className="text-2xl" />
                                </ListItemPrefix>
                                <a href="/dashboard/distributor-dashboard">All Distributed Task</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="text-[#00f844]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ListItemPrefix>
                                <a href="/dashboard/add-product">Add and Distribute New Task</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                <RiLogoutCircleLine className="text-3xl -mr-4 text-[#0099ff] pt-1" />
                                </ListItemPrefix>
                                {
                                    user ? <>
                                        <Button onClick={logOutHandeler}
                                            variant="text"
                                            size="sm"
                                            className="inline-block text-white"
                                        >
                                            <span>Log Out</span>
                                        </Button>
                                    </>
                                        :
                                        <Button
                                            variant="text"
                                            size="sm"
                                            className="hidden lg:inline-block text-white"
                                        >
                                            <a href="/login"><span>Login</span></a>
                                        </Button>
                                }
                            </ListItem>
                        </List>
                    )
                }

                {/* distributor sidebar */}
                {
                    userInfo.role === 'employee' && (
                        <List>
                            <ListItem>
                                <ListItemPrefix>
                                    <FcParallelTasks className="text-2xl" />
                                </ListItemPrefix>
                                <a href="/dashboard/employee-dashboard">Task From Distributor</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ListItemPrefix>
                                <a href="/dashboard/employee-dashboard-review-from-boss">Task Review From Boss</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                <RiLogoutCircleLine className="text-3xl -mr-4 text-[#0099ff] pt-1" />
                                </ListItemPrefix>
                                {
                                    user ? <>
                                        <Button onClick={logOutHandeler}
                                            variant="text"
                                            size="sm"
                                            className="inline-block text-white"
                                        >
                                            <span>Log Out</span>
                                        </Button>
                                    </>
                                        :
                                        <Button
                                            variant="text"
                                            size="sm"
                                            className="hidden lg:inline-block text-white"
                                        >
                                            <a href="/login"><span>Login</span></a>
                                        </Button>
                                }
                            </ListItem>
                        </List>
                    )
                }

                {/* Boss sidebar */}
                {
                    userInfo.role === 'boss' && (
                        <List>
                            <ListItem>
                                <ListItemPrefix>
                                    <FcParallelTasks className="text-2xl" />
                                </ListItemPrefix>
                                <a href="/dashboard/boss-dashboard">Task For Review</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ListItemPrefix>
                                <a href="/dashboard/review-task">Task For Review</a>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                <RiLogoutCircleLine className="text-3xl -mr-4 text-[#0099ff] pt-1" />
                                </ListItemPrefix>
                                {
                                    user ? <>
                                        <Button onClick={logOutHandeler}
                                            variant="text"
                                            size="sm"
                                            className="inline-block text-white"
                                        >
                                            <span>Log Out</span>
                                        </Button>
                                    </>
                                        :
                                        <Button
                                            variant="text"
                                            size="sm"
                                            className="hidden lg:inline-block text-white"
                                        >
                                            <a href="/login"><span>Login</span></a>
                                        </Button>
                                }
                            </ListItem>
                        </List>
                    )
                }
            </React.Fragment>
        </div>
    );
};

export default DashboardSidebar;