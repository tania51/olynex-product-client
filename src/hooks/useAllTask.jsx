import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useAllTask = () => {
    const axiosPublic = useAxiosPublic();

    // using tanstack query
    const {refetch, data: allTaskInfo=[]} = useQuery({
        queryKey: ['all-task'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-task')
            return res.data
        }
    })

    return [allTaskInfo, refetch]
};

export default useAllTask;