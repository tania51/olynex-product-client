import { Button, Card, Typography } from "@material-tailwind/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useReviewTask from "../../../../hooks/useReviewTask";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Title from "../../../../Components/Title/Title";
import SubTitle from "../../../../Components/SubTitle/SubTitle";

const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Action"];



const TaskFromMockup = () => {
    const [reviewTask, refetch] = useReviewTask();
    const axiosPublic = useAxiosPublic();
    const finalReviewTask = reviewTask && reviewTask.filter(signleTask =>signleTask.sendToMockupFromBoss === 'send-to-boss-from-mockup' || signleTask.acceptByBossMockUpTask === 'accept-mockup-task')


    // accept handeler
    const acceptHandeler = (task) => {
        const newTask = {
            id: task._id,
            acceptByBossMockUpTask: 'accept-mockup-task'
        }

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Accepted Task Successfully!!', {
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

    // mockup handeler
    const mockUpHandeler = (task) => {

        const newTask = {
            id: task._id,
            sendToSEOFromBoss: 'send-to-seo-from-boss'
        }

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Send to SEO Successfully!!', {
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
                <SubTitle subHeading="Task From MockUp"></SubTitle>
            </div>
            <div>
                {finalReviewTask && finalReviewTask.length === 0 ? <div className="flex justify-center items-center pt-8"><h3 className="text-4xl text-[#00f844] capitalize">Hurray! No task from Distributor</h3></div>
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

                                            {/* revision handle end */}
                                            {
                                                aTask?.acceptByBossMockUpTask === 'accept-mockup-task' ? <Button className="bg-green-700 px-3 py-2 rounded mx-2">Accepted</Button>
                                                :
                                                <Button onClick={() => acceptHandeler(aTask)} className="bg-amber-500 px-3 py-2 rounded mx-2">Accept</Button>
                                            }
                                            {
                                                aTask?.acceptByBossMockUpTask === 'accept-mockup-task' ? <Button onClick={() => mockUpHandeler(aTask)} id="tab-accept" className="bg-blue-600 px-3 py-2 rounded">Send to SEO</Button>
                                                :
                                                <Button id="tab-accept" className="bg-gray-600 px-3 py-2 rounded" disabled>Send to SEO</Button>
                                            }
                                            
                                        </div>
                                        <ToastContainer />
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

export default TaskFromMockup;