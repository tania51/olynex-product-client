import { Button, Card, Input, Popover, PopoverContent, PopoverHandler, Typography } from "@material-tailwind/react";
import useAllTask from "../../../hooks/useAllTask";
import Title from "../../../Components/Title/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import SubTitle from "../../../Components/SubTitle/SubTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Bounce, ToastContainer, toast } from "react-toastify";
import OlynexBtn2 from "../../../Components/OlynexBtn/OlynexBtn2";
import useAllUser from "../../../hooks/useAllUser";
import { Form } from "react-router-dom";

const TABLE_HEAD = ["Job Title", "Type", "description", "Assigned On", "Deadline", "Remaining Days", "Extend Days", "Action"];

const EmployeeDashboard = () => {
    const allTaskInfo = useAllTask();
    const [newTask, setNewTask] = useState([])
    const [, allUserInfo] = useAllUser();
    // console.log('user info', userInfo);
    // console.log('all user info', allUserInfo);

    useEffect(() => {
        setNewTask(allTaskInfo)

    }, [allTaskInfo])
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const axiosPublic = useAxiosPublic();
    console.log('all user info', newTask);

    const singleEmployeeTask = allUserInfo && allUserInfo.find(singleTask => singleTask?.email === userEmail);
    console.log('signle task', singleEmployeeTask);

    

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
        const some = allTaskInfo && allTaskInfo.filter(singleTask => singleTask?.reviewToEmployee !== 'reviewToEmployeeFromDristributor' && singleTask?.assignedEmployeeEmail === userEmail)
        setNewTask(some)
    }, [allTaskInfo, userEmail])


    // handle extend remaining days
    // revision handeler
    const handelerRevison = (e, task) => {
        console.log(allTaskInfo);
        console.log(task);
        e.preventDefault();
        const extendDay = e.target.extendDate.value;
        console.log('extnd day', extendDay);

        const newTask = {
            id: task._id,
            extendDay: extendDay
        }

        axiosPublic.patch(`/extend-day-task/${task._id}`, newTask)
            .then(res => {
                console.log('after change', res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch()
                    toast.success('Successfully Send Request For Extend Days!!', {
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


            e.target.extendDate.value = '';
    }


    return (
        <div className="w-full overflow-scroll">
            <div>
                <Title heading={`${singleEmployeeTask?.name}'s Task Dashboard`}></Title>
                <SubTitle subHeading={`SI NO: ${singleEmployeeTask?.assignedEmployeeId || singleEmployeeTask?.SINO}`}></SubTitle>
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
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {aTask?.remainingDays > 1 ?
                                            `${aTask?.remainingDays} days` : `${aTask?.remainingDays} day`} 
                                        </Typography>
                                    </td>

                                    <td className="p-4">
                                    <Popover placement="left-start">
                                                <PopoverHandler>
                                                    <Button className="bg-red-600  hover:bg-red-700 px-3 py-2 rounded">Extend Days</Button>
                                                </PopoverHandler>
                                                <PopoverContent className="w-96 bg-[#0a1b27] text-white">
                                                    <Typography
                                                        color="blue-gray"
                                                        className="mb-1 font-bold text-2xl text-center"
                                                    >
                                                        Request For Extend Days
                                                    </Typography>
                                                    <div>
                                                        <Form onSubmit={(e) => handelerRevison(e, aTask)}>
                                <Input
                                    name="extendDate"
                                    type="number"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900 mt-3 mb-5"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                                            <div className="flex justify-center">
                                                                <Button type="submit" className="bg-[#0075ee] px-3 py-2 rounded hover:border-b-4 border-[#00f844]">Extend Day Request</Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
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