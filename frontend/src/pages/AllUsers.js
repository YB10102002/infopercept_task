import React, { useEffect, useState } from "react";
import AllApi from "../common";
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import ChangeUser from "../components/ChangeUser";

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUser, setUpdateUser] = useState({
        email: "",
        name: "",
        role: "",
        _id:""
    });

    const fetchAllUser = async () => {
        const res = await fetch(AllApi.allUser.url, {
            method: AllApi.allUser.method,
            credentials: 'include'
        });

        const data = await res.json();
        //console.log(data);
        if (data.success) {
            setAllUsers(data.data); // Access the 'data' array from the response
        } else {
            toast.error(data.message);
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    return (
        <div className="pb-4 bg-white">
            <table className="w-full userTable">
                <thead>
                    <tr className="bg-black text-white">
                        <th>Sr.No</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Role</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="bg-green-100 hover:bg-green-500 hover:text-white p-2 rounded-full cursor-pointer"
                                    onClick={() => { 
                                            setUpdateUser(user)
                                            setOpenUpdateRole(true) 
                                        }
                                    }>
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUser
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUser.name}
                        email={updateUser.email}
                        role={updateUser.role}
                        id={updateUser._id}
                        callFunc = {fetchAllUser}
                    />
                )
            }
        </div>
    )
}

export default AllUsers;
