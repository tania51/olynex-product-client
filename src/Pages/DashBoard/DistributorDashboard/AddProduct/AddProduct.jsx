import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAllUser from "../../../../hooks/useAllUser";


const AddProduct = () => {
    // const notify = () => toast("Wow so easy !");
    const axiosPublic = useAxiosPublic();
    const [, allUserInfo] = useAllUser();
    const employeeUserInfo = allUserInfo && allUserInfo.filter(singleEmployee => singleEmployee.role === 'employee')

    const hadleAddTask = e => {
        e.preventDefault();
        const form = e.target;
        const jobTile = form.jobTile.value;
        const jobType = form.jobType.value;
        const assignedEmployee = form.assignedEmployee.value;
        const assignOn = form.assignOn.value;
        const deadline = form.deadline.value;
        const description = form.description.value;

        const filteredAssignedEmployeeId = allUserInfo && allUserInfo.find(aUser => aUser.name === assignedEmployee);
        const assignedEmployeeId = filteredAssignedEmployeeId.SINO;


        const filteredAssignedEmployeeEmail = allUserInfo && allUserInfo.find(aUser => aUser.name === assignedEmployee);
        const assignedEmployeeEmail = filteredAssignedEmployeeEmail.email;

        const productInfo = {
            jobTile: jobTile,
            jobType: jobType,
            assignedEmployeeId: assignedEmployeeId,
            assignedEmployee: assignedEmployee,
            assignedEmployeeEmail: assignedEmployeeEmail,
            assignOn: assignOn,
            deadline: deadline,
            description: description
        }

        axiosPublic.post('/add-product', productInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Task Distributed Successfully!!', {
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

        form.jobTile.value = '',
            form.jobType.value = '',
            form.assignedEmployee.value = '',
            form.assignOn.value = '',
            form.deadline.value = '',
            form.description.value = ''

    }


    return (
        <div className="w-full lg:px-20">
            <Card color="transparent" shadow={false} className="w-full flex items-center justify-center h-screen">
                <div className="w-full">
                    <Typography className="lg:text-5xl text-center font-semibold" color="blue-gray">
                        Add and Distribute Task
                    </Typography>
                    <form onSubmit={hadleAddTask} className="mt-8 mb-2 w-full items-center justify-center max-w-screen-lg">
                        <div className="mb-1 grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* job title */}
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Job Title
                                </Typography>
                                <Input
                                    name="jobTile"
                                    size="lg"
                                    placeholder="Job Title"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>

                            {/* job type */}
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Job Type
                                </Typography>
                                <select
                                    name="jobType"
                                    label="Select Version" className="w-full py-2 px-2 border border-blue-gray-200 rounded-lg text-gray-950"
                                >
                                    <option className="text-gray-950">Select One</option>
                                    <option className="text-gray-950" value="social-media">SOCIAL MEDIA</option>
                                    <option className="text-gray-950" value="indd">INDD</option>
                                    <option className="text-gray-950" value="ai">AI</option>
                                </select>
                            </div>

                            {/* Assigned to(Employee) */}
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Assigned to
                                </Typography>
                                <select
                                    name="assignedEmployee"
                                    label="Select Version" className="w-full py-2 px-2 border border-blue-gray-200 rounded-lg text-gray-950"
                                >
                                    <option className="text-gray-950">Select One</option>
                                    {
                                        employeeUserInfo && employeeUserInfo.map(singleUser => <option key={singleUser?._id} className="text-gray-950" value={singleUser?.name}>{singleUser?.name}</option>)
                                    }
                                </select>
                            </div>

                            {/* Assigned On */}
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Assigned On
                                </Typography>
                                <Input
                                    name="assignOn"
                                    type="date"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>

                            {/* Deadline On */}
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Deadline
                                </Typography>
                                <Input
                                    name="deadline"
                                    type="date"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>

                            {/* description */}
                            <div className="grid-rows-1">
                                <Typography variant="h6" color="blue-gray" className="mb-3 text-xl">
                                    Description
                                </Typography>
                                <Textarea
                                    name="description"
                                    size="lg"
                                    placeholder="Description"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-950"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}></Textarea>

                            </div>
                        </div>
                        <Button type="submit" className="mt-6 text-white bg-[#0099ff] p-2 rounded hover:border-b-4 border-[#99ff00]" fullWidth>
                            Add Product
                        </Button>
                        <ToastContainer />
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AddProduct;