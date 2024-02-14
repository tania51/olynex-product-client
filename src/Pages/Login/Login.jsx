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
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext)
    const notify = () => toast("Wow so easy !");
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(res => {
                if (res.user) {
                    toast.success('Login Successfully!!', {
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
                navigate('/dashboard')
            })
            .catch(error => {
                if(error.message) {
                    toast.error('Oops...Email or Password not Matched.', {
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

        form.email.value = '';
        form.password.value = '';
    }

    return (
        <div className="h-screen bg-gray-950 text-white lg:flex lg:gap-10 items-center justify-center">
            <div>
                <img src={loginImg} alt="Sign Up Image" />
            </div>
            <div>
                <Card color="transparent" shadow={false}>
                    <Typography className="lg:text-5xl text-center font-semibold" color="blue-gray">
                        Login
                    </Typography>
                    <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
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
                            Login
                        </Button>
                        <Typography color="white" className="mt-4 text-center font-normal">
                            Do not have an account?{" "}
                            <a href="/sign-up" onClick={notify} className="font-medium text-blue-600">
                                Sign Up
                                <ToastContainer />
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;