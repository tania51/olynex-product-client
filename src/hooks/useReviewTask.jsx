import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useReviewTask = () => {
    const axiosPublic = useAxiosPublic();
    const [reviewTask, setReviewTask] = useState([])

    useEffect( () => {
        axiosPublic('/all-review-task')
        .then(res => {
            setReviewTask(res.data)
        })
    } , [axiosPublic])

    return reviewTask;
};

export default useReviewTask;