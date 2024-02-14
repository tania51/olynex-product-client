import { Button, Card, Popover, PopoverContent, PopoverHandler, Textarea, Typography } from "@material-tailwind/react";
import Title from "../../../Components/Title/Title";
import useReviewTask from "../../../hooks/useReviewTask";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


import { Form } from "react-router-dom";

const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Action"];

const BossDashboard = () => {
    const [reviewTask, refetch] = useReviewTask();
    const axiosPublic = useAxiosPublic();
    const finalReviewTask = reviewTask && reviewTask.filter(signleTask => signleTask.reviewToBoss === 'reviewToBoss' || signleTask.acceptByBoss === 'accept-employee-task')

    // revision handeler
    const handelerRevison = (e, task) => {
        e.preventDefault();
        const revisionReasonValue = e.target.revisionReason.value;
        console.log('revisionReasonValue', revisionReasonValue);


        const reviewToEmployee = 'reviewToEmployee'

        const newTask = {
            id: task._id,
            reviewToBoss: reviewToEmployee,
            revisionNoteFromBoss: revisionReasonValue
        }

        axiosPublic.patch(`/review-task/${task._id}`, newTask)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
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


        e.target.revisionReason.value = '';
    }

    // accept handeler
    const acceptHandeler = (task) => {
        const newTask = {
            id: task._id,
            acceptByBoss: 'accept-employee-task'
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
        console.log(task);
        console.log('mockup handeler');

        const newTask = {
            id: task._id,
            sendToMockupFromBoss: 'send-to-mockup-from-boss'
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
                <Title heading='Boss Dashboard'></Title>
            </div>
            <div>
                {
                    finalReviewTask && finalReviewTask.length === 0 ? <div className="flex justify-center items-center pt-8"><h3 className="text-4xl text-[#00f844] capitalize">Hurray! No task from Employee</h3></div>
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
                                                    {/* <Button onClick={() => handleRevision(aTask)} className="bg-red-600 px-2 py-1">Revision</Button> */}
                                                    {/* revision handle start */}

                                                    <Popover placement="left-start">
                                                        <PopoverHandler>
                                                            <Button className="bg-red-600  hover:bg-red-700 px-3 py-2 rounded">Revision</Button>
                                                        </PopoverHandler>
                                                        <PopoverContent className="w-96 bg-[#0a1b27] text-white">
                                                            <Typography
                                                                color="blue-gray"
                                                                className="mb-1 font-bold text-2xl text-center"
                                                            >
                                                                Reason why need revision
                                                            </Typography>
                                                            <div>
                                                                <Form onSubmit={(e) => handelerRevison(e, aTask)}>
                                                                    <Textarea name="revisionReason" size="lg"
                                                                        placeholder="Give a short note about revision"
                                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 my-3 text-gray-950"
                                                                        labelProps={{
                                                                            className: "before:content-none after:content-none",
                                                                        }}></Textarea>
                                                                    <div className="flex justify-center">
                                                                        <Button type="submit" className="bg-[#0075ee] px-3 py-2 rounded hover:border-b-4 border-[#00f844]">Revision</Button>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>

                                                    {/* revision handle end */}
                                                    {
                                                        aTask?.acceptByBoss === 'accept-employee-task' ? <Button className="bg-green-700 px-3 py-2 rounded mx-2">Accepted</Button>
                                                            :
                                                            <Button onClick={() => acceptHandeler(aTask)} className="bg-amber-500 px-3 py-2 rounded mx-2">Accept</Button>
                                                    }
                                                    {
                                                        aTask?.acceptByBoss === 'accept-employee-task' ? <Button onClick={() => mockUpHandeler(aTask)} id="tab-accept" className="bg-blue-600 px-3 py-2 rounded">Send to Mockup</Button>
                                                            :
                                                            <Button id="tab-accept" className="bg-gray-600 px-3 py-2 rounded" disabled>Send to Mockup</Button>
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

export default BossDashboard;