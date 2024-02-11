import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";


const useAllUser = () => {
    const axiosPublic = useAxiosPublic();
    const [allUserInfo, setAllUserInfo] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const {user} = useContext(AuthContext)
    const userEmail = user?.email;

    useEffect( () => {
        axiosPublic('/all-user')
        .then(res => {
            const allUser = res.data;
            setAllUserInfo(allUser)
            const finalUserInfo = allUser && allUser.find(singleUser => singleUser.email === userEmail)
            setUserInfo(finalUserInfo)
        })
        .catch(err => {
            console.log(err.message);
        })
    } , [axiosPublic, userEmail])

    return [userInfo, allUserInfo];
};

export default useAllUser;