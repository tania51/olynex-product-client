import { Card, Typography } from "@material-tailwind/react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import useAllTask from "../../../../hooks/useAllTask";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useReviewTask from "../../../../hooks/useReviewTask";
import Title from "../../../../Components/Title/Title";
import SubTitle from "../../../../Components/SubTitle/SubTitle";
import OlynexBtn2 from "../../../../Components/OlynexBtn/OlynexBtn2";


const TABLE_HEAD = ["Job Title", "Type", "description", "Assigned On", "Deadline", "Action"];


const ReviewTaskFromBoss = () => {
    const allTaskInfo = useAllTask();
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const axiosPublic = useAxiosPublic();
    const reviewTask = useReviewTask();
    const reviewTaskFromBoss = reviewTask && reviewTask.filter(aTask => aTask.reviewToBoss === 'reviewToEmployee')

    const singleEmployeeTask = allTaskInfo && allTaskInfo.find(singleTask => singleTask?.assignedEmployeeEmail === userEmail)


    // handle review
    const handleReview = (task) => {
        console.log(task);
        const reviewToBoss = 'reviewToBoss'
        const newTask = {
            id: task._id,
            reviewToBoss: reviewToBoss
        }

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('Send For Review to Boss Successfully!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            })

    }


    return (
        <div className="w-full overflow-scroll">
            <div>
                <Title heading={`${singleEmployeeTask?.assignedEmployee}'s Task Dashboard`}></Title>
                <SubTitle subHeading={`SI NO: ${singleEmployeeTask?.assignedEmployeeId}`}></SubTitle>
            </div>
            <div>
                {
                    reviewTaskFromBoss.length === 0 ? <div className="flex justify-center items-center pt-8"><h3 className="text-4xl text-[#00f844] capitalize">Hurray! No revision from Boss</h3></div>
                        :
                        <Card className="h-full w-full">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviewTaskFromBoss && reviewTaskFromBoss.map(aTask => <tr key={aTask?._id} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {aTask?.jobTile}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {aTask?.jobType}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {aTask?.description}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {aTask?.assignOn}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {aTask?.deadline}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography onClick={() => handleReview(aTask)} variant="small" color="blue-gray" className="font-medium">
                                                    <OlynexBtn2 btnContent2="Send To Review"></OlynexBtn2>
                                                    <ToastContainer />
                                                </Typography>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </Card>
                }

            </div>
        </div>
    );
};

export default ReviewTaskFromBoss;