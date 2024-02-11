import { Card, Typography } from "@material-tailwind/react";
import useAllTask from "../../../hooks/useAllTask";
import Title from "../../../Components/Title/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import SubTitle from "../../../Components/SubTitle/SubTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Bounce, ToastContainer, toast } from "react-toastify";
import OlynexBtn2 from "../../../Components/OlynexBtn/OlynexBtn2";
import useReviewTask from "../../../hooks/useReviewTask";

const TABLE_HEAD = ["Job Title", "Type", "description", "Assigned On", "Deadline", "Action"];

const EmployeeDashboard = () => {
    const allTaskInfo = useAllTask();
    const [newTask, setNewTask] = useState([])
    const reviewTask = useReviewTask();

    useEffect(() => {
        setNewTask(allTaskInfo)

    }, [allTaskInfo])
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const axiosPublic = useAxiosPublic();

    const singleEmployeeTask = allTaskInfo && allTaskInfo.find(singleTask => singleTask?.assignedEmployeeEmail === userEmail);

    

    // handle review
    const handleReview = (aTask) => {
        const firstElement = Object.keys(aTask)[0]
        aTask['taskId'] = aTask[firstElement];
        delete aTask[firstElement]

        const reviewTask2 = { ...aTask, reviewToBoss: 'reviewToBoss' }



        axiosPublic.post('/review-task', reviewTask2)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Task Successfully Send for Review!!', {
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

        // patch info start
        const reviewToEmployee = 'reviewToEmployeeFromDristributor'
        const newTask = {
            id: aTask.taskId,
            reviewToEmployee: reviewToEmployee
        }
        console.log('new task', newTask);

        axiosPublic.patch(`/review-task-from-distributor/${aTask.taskId}`, newTask)
            .then(res => {
                console.log(res.data);
            })

        // patch info end

    }
    useEffect(() => {
        const some = allTaskInfo && allTaskInfo.filter(singleTask => singleTask?.reviewToEmployee !== 'reviewToEmployeeFromDristributor')
        setNewTask(some)
    }, [allTaskInfo])


    return (
        <div className="w-full overflow-scroll">
            <div>
                <Title heading={`${singleEmployeeTask?.assignedEmployee}'s Task Dashboard`}></Title>
                <SubTitle subHeading={`SI NO: ${singleEmployeeTask?.assignedEmployeeId}`}></SubTitle>
            </div>
            <div>
                {
                    newTask.length === 0 ? <div className="flex justify-center items-center pt-8"><h3 className="text-4xl text-[#00f844] capitalize">Hurray! No task from Distributor</h3></div>
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
                                newTask && newTask.map(aTask => <tr key={aTask?._id} className="even:bg-blue-gray-50/50">
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
                                        <Typography onClick={() => handleReview(aTask)} as="a" variant="small" color="blue-gray" className="font-medium">
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

export default EmployeeDashboard;