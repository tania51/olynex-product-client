import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
// import { AuthContext } from "../Provider/AuthProvider";


const useAllTask = () => {
    const axiosPublic = useAxiosPublic();
    const [allTaskInfo, setAllTaskInfo] = useState([])

    useEffect( () => {
        axiosPublic('/all-task')
        .then(res => {
            const allTask = res.data;
            setAllTaskInfo(allTask)
        })
        .catch(err => {
            console.log(err.message);
        })
    } , [axiosPublic])

    return allTaskInfo;
};

export default useAllTask;