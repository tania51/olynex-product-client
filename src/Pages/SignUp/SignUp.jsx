import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import loginImg from "../../assets/login.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";





const SignUp = () => {
    const { signUp } = useContext(AuthContext)
    const notify = () => toast("Wow so easy !");
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        const assignedEmployeeId = form.assignedEmployeeId.value;

        const userInfo = {
            name: name,
            email: email,
            password: password,
            role: role,
            assignedEmployeeId: assignedEmployeeId
        }

        signUp(email, password)
            .then(res => {
                if (res.user) {
                    axiosPublic.post('/user', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                toast.success('User Created Successfully!!', {
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
                        .catch(err => {
                            if (err.message) {
                                toast.error(`${err.message}`, {
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
                        navigate('/dashboard')
                }
            })
            .catch(error => {
                if (error.message) {
                    toast.error(`${error.message}`, {
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

        form.name.value = '';
        form.email.value = '';
        form.password.value = '';
        form.role.value = 'Select One';
        form.assignedEmployeeId.value = '';
    }

    return (
        <div className="h-screen bg-gray-950 text-white lg:flex lg:gap-10 items-center justify-center">
            <div>
                <img src={loginImg} alt="Sign Up Image" />
            </div>
            <div>
                <Card color="transparent" shadow={false}>
                    <Typography className="lg:text-5xl text-center font-semibold" color="blue-gray">
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSignUp} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3 text-xl">
                                Your Name
                            </Typography>
                            <Input
                                name="name"
                                size="lg"
                                placeholder="Your Name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3 text-xl">
                                Your SI NO
                            </Typography>
                            <Input
                                name="assignedEmployeeId"
                                size="lg"
                                placeholder="Your Name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3 text-xl">
                                Your Role
                            </Typography>
                            <select
                                name="role"
                                label="Select Version" className="w-full py-2 px-2 border border-blue-gray-200 rounded-lg text-gray-950"
                            >
                                <option className="text-gray-950">Select One</option>
                                <option className="text-gray-950" value="distributor">Distributor</option>
                                <option className="text-gray-950" value="employee">Employee</option>
                                <option className="text-gray-950" value="boss">Boss</option>
                                <option className="text-gray-950" value="mockup">Mockup</option>
                                <option className="text-gray-950" value="seo">SEO</option>
                            </select>
                            <Typography variant="h6" color="blue-gray" className="-mb-3 text-xl">
                                Your Email
                            </Typography>
                            <Input
                                name="email"
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-950"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3 text-xl">
                                Password
                            </Typography>
                            <Input
                                name="password"
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-2 rounded text-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Button type="submit" className="mt-6 bg-[#261872] px-2 py-2 rounded hover:border-b-4 border-[#ffc300]" fullWidth>
                            Sign Up
                        </Button>
                        <Typography color="white" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <a href="/login" onClick={notify} className="font-medium text-blue-600">
                                Login
                                <ToastContainer />
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default SignUp;