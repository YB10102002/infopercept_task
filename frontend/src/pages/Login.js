import React, { useContext, useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AllApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        emaill: "",
        passwordd : ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails , fetchUserCart } = useContext(Context);
    //console.log(generalContext.fetchUserDetails());

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await fetch(AllApi.login.url, {
            method: AllApi.login.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const res = await result.json();
        if (res.success) {
            toast.success(res.message);
            navigate("/home");
            fetchUserDetails();
            fetchUserCart();    
        } else if (res.error) {
            toast.error(res.message);
        }
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white text-black p-2 py-4 w-full max-w-md mx-auto rounded-md">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginicon} alt="login icon" className="rounded-full" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block mb-2">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                name="emaill"
                                value={data.email}
                                onChange={handleOnchange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2">Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                name="passwordd"
                                value={data.password}
                                onChange={handleOnchange}
                                className="w-full p-2 border border-gray-300 rounded pr-10"
                                required
                            />
                            <span
                                className="absolute right-3 top-12 transform -translate-y-1 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            <NavLink to={"/forgot-password"} className="block w-fit pt-1 hover:underline text-red-500">
                                Forgot password ?
                            </NavLink>
                        </div>
                        <button className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:scale-105 transition-all hover:bg-red-700">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account? <Link to="/register" className="text-red-500 hover:underline">Register Here</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
