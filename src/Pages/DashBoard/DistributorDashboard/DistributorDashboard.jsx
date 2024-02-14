import Title from "../../../Components/Title/Title";
import { Button, Card, Typography } from "@material-tailwind/react";
import useAllTask from "../../../hooks/useAllTask";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Bounce, toast } from "react-toastify";

const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Assigned On", "Deadline", "Extend Days Request", "Action"];


const DistributorDashboard = () => {
    const [allTaskInfo, refetch] = useAllTask();
    const axiosPublic = useAxiosPublic();

    // accept handeler
    const acceptHandeler = (task) => {
        const extendDay = task?.extendDay ? task.extendDay : ''
        const deadline = task?.deadline;

        const deadlineDate = new Date(deadline)
        deadlineDate.setDate(deadlineDate.getDate() + parseInt(extendDay))
        const extededByDistributor = deadlineDate.toISOString().split('T')[0]

        
        // convert date for geting remaining data
        const newAssignOnDate = new Date(extededByDistributor);
        const NewDeadlineDate = new Date(deadline);

        // convert date in miliseconds
        const timeDifference = NewDeadlineDate - newAssignOnDate;

        // convert miliseconds to days
        const newRemainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        
        
        const newTask = {
            id: task._id,
            extendDay: extendDay,
            extededByDistributor: extededByDistributor,
            newRemainingDays: newRemainingDays
        }

        axiosPublic.patch(`/extend-day-task/${task._id}`, newTask)
            .then(res => {
                refetch();
                if (res.data.modifiedCount > 0) {
                    // refetch()
                    toast.success('Days Extended Successfully!!', {
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
                <Title heading="Team Task Sheet"></Title>
            </div>
            <div>
                <Card className="h-full w-full">
                    <table className="w-full min-w-max table-auto text-center">
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
                                allTaskInfo && allTaskInfo.map(aTask => <tr key={aTask?._id} className="even:bg-blue-gray-50/50">
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
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {aTask?.assignOn}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className={`${aTask?.extededByDistributor ? 'text-[#00f844]' : 'font-normal'}`}>
                                            {aTask?.extededByDistributor ? aTask?.extededByDistributor : aTask?.deadline}
                                        </Typography>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Typography variant="small" className={`${aTask?.extededByDistributor ? 'hidden' : 'font-normal text-[#00f844]'}`}>{aTask?.extendDay}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {
                                            aTask?.extededByDistributor ? <Button className="bg-green-700 px-3 py-2 rounded mx-2">{aTask?.extendDay} days Extended</Button>
                                            :
                                            <Button onClick={() => acceptHandeler(aTask)} className={`${aTask.extendDay ? 'bg-amber-500 px-3 py-2 rounded mx-2' : 'hidden'}`}>Accept</Button>
                                        }
                                        
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

export default DistributorDashboard;