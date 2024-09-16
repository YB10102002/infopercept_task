import React, { useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helper/imageTobase64";
import AllApi from "../common";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileimage: ""
    });

    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            alert('File size exceeds 5 MB');
            return;
        }
        new Compressor(file, {
            quality: 0.3, // Adjust quality to reduce file size
            success(result) {
                imageTobase64(result).then((imagePic) => {
                    setData((prev) => ({
                        ...prev,
                        profileimage: imagePic
                    }));
                });
            },
            error(err) {
                console.log(err.message);
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            const result = await fetch(AllApi.register.url, {
                method: AllApi.register.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const res = await result.json();
            if(res.success){
                toast.success(res.message);
                navigate("/login")
            }
            if(res.error){
            toast.error(res.message)

        }
           // console.log(res);
        }
        else{
            //alert("Password must be same.");
            toast.error("passwords must be same.")
        }
    }

    console.log(data);

    return (
        <section id="register">
            <div className="mx-auto container p-4">
                <div className="bg-white text-black p-6 w-full max-w-md mx-auto rounded-md shadow-lg">
                    <div className="text-center">
                        <img src={data.profileimage || loginicon} alt="register icon" className="rounded-full w-20 h-20 mx-auto" />
                        <label className="block text-sm font-medium text-gray-700 mt-4">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="profileimage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-red   -700
                            hover:file:bg-blue-100 mt-2"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block mb-2 font-medium">Username:</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 font-medium">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2 font-medium">Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                name="password"
                                value={data.password}
                                onChange={handleOnChange}
                                className="w-full p-2 border border-gray-300 rounded pr-10 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <span
                                className="absolute right-3 top-12 transform -translate-y-1 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2 font-medium">Confirm Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                className="w-full p-2 border border-gray-300 rounded pr-10 focus:outline-none focus:border-blue-500"
                                required
                            />
                            <span
                                className="absolute right-3 top-12 transform -translate-y-1 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className="mt-6 w-full bg-red-500 text-white p-2 rounded hover:scale-105 transition-all hover:bg-red-700">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account? <Link to="/login" className="text-red-500 hover:underline">Login Here</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register;
