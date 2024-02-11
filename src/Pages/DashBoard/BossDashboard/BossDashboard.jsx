import { Button, Card, Typography } from "@material-tailwind/react";
import Title from "../../../Components/Title/Title";
import useReviewTask from "../../../hooks/useReviewTask";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Action"];

const BossDashboard = () => {
    const reviewTask = useReviewTask();
    const finalReviewTask = reviewTask && reviewTask.filter(signleTask => signleTask.reviewToBoss === 'reviewToBoss')
    const axiosPublic = useAxiosPublic();

    // handle revision
    const handleRevision = task => {
        console.log('revison clicked');
        console.log(task);
        const reviewToEmployee = 'reviewToEmployee'
        const newTask = {
            id: task._id,
            reviewToBoss: reviewToEmployee
        }
        console.log('new task', newTask);

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('Send For Revision to Employee Successfully!!', {
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
                <Title heading='Boss Dashboard'></Title>
            </div>
            <div>
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
                                finalReviewTask && finalReviewTask.map(aTask => <tr key={aTask?._id} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {aTask?.assignedEmployeeId}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {aTask?.assignedEmployee}
                                        </Typography>
                                    </td>
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
                                        <div>
                                            <Button onClick={() => handleRevision(aTask)} className="bg-red-600 px-2 py-1">Revision</Button>
                                            <Button className="bg-amber-500 px-2 py-1 mx-2">Accept</Button>
                                            <Button className="bg-blue-600 px-2 py-1" disabled>Send to Mockup</Button>
                                        </div>
                                        <ToastContainer />
                                        {/* <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                        Revision
                                    </Typography> */}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default BossDashboard;