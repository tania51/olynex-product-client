import { Button, Card, Typography } from "@material-tailwind/react";
import Title from "../../../Components/Title/Title";
import useReviewTask from "../../../hooks/useReviewTask";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";



const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Action"];



const MockupDashBoard = () => {

    const [reviewTask, refetch] = useReviewTask();
    const axiosPublic = useAxiosPublic();
    const finalReviewTask = reviewTask && reviewTask.filter(signleTask => signleTask.reviewToBoss === 'reviewToBoss' || signleTask.sendToMockupFromBoss === 'send-to-mockup-from-boss')
    console.log(finalReviewTask);


    // mockup handeler
    const mockUpHandeler = (task) => {
        console.log(task);
        console.log('mockup handeler');

        const newTask = {
            id: task._id,
            sendToMockupFromBoss: 'send-to-boss-from-mockup'
        }
        console.log('new task', newTask);

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                console.log('res.data', res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Send to Mockup Successfully!!', {
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
                <Title heading='MockUp Dashboard'></Title>
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
                                            {/* send to boss */}
                                        <Button onClick={() => mockUpHandeler(aTask)} id="tab-accept" className="bg-blue-600 px-3 py-2 rounded">Send to Boss</Button>
                                            
                                        </div>
                                        <ToastContainer />
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

export default MockupDashBoard;