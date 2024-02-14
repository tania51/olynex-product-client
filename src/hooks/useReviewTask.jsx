
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useReviewTask = () => {
    const axiosPublic = useAxiosPublic();

    // using tanstack query
    const {refetch, data: reviewTask=[]} = useQuery({
        queryKey: ['all-pet'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-review-task')
            return res.data
        }
    })

    return [reviewTask, refetch]
};

export default useReviewTask;