import Title from "../../../Components/Title/Title";
import { Card, Typography } from "@material-tailwind/react";
import useAllTask from "../../../hooks/useAllTask";

const TABLE_HEAD = ["SI NO", "Assigned To", "Job Title", "Type", "description", "Assigned On", "Deadline"];


const DistributorDashboard = () => {
    const allTaskInfo = useAllTask();
    // console.log(allTaskInfo);

    return (
        <div className="w-full overflow-scroll">
            <div>
                <Title heading="Team Task Sheet"></Title>
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
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {aTask?.deadline}
                                    </Typography>
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