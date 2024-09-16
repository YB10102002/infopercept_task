import React, { useState } from "react";
import ROLE from "../common/role";
import { IoIosCloseCircle } from "react-icons/io";
import AllApi from "../common";
import { toast } from "react-toastify";

const ChangeUser = ({
    name,
    email,
    Role,
    id,
    onClose,
    callFunc
}) => {

    const [role,setRole] = useState("");

    const handleRoleChange = (e) => {
        setRole(e.target.value);

       // console.log(e.target.value);
    }

    const updateUserRole = async() => {
        const resSent = await fetch(AllApi.updateUser.url,{
            method : AllApi.updateUser.method,
            credentials : 'include',
            headers : {
                'content-type':'application/json'
            },
            body : JSON.stringify({
                id : id,
                role : role
            })
        });

        const resReceived = await resSent.json();
        //console.log(resReceived);
        if(resReceived.success){
            toast.success(resReceived.message)
            onClose()
            callFunc()
        }
    }
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">

            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                <button className="block ml-auto text-lg" onClick={onClose}>
                    <IoIosCloseCircle />
                </button>
                <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <div className="flex items-center justify-between my-4">
                    <p>Role :</p>
                    <select className="border px-4 py-1" value={role} onChange={handleRoleChange}>
                        {
                            //<option value="select role">Select Role</option>
                            Object.values(ROLE).map(role => {
                                return (
                                    <option value={role} key={role}>{role}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="w-fit mx-auto block bg-green-500 py-1 px-3 text-white hover:bg-green-800 rounded-full" onClick={updateUserRole}>Change Role</button>
            </div>

        </div>
    )
}

export default ChangeUser;