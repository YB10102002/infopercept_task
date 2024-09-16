import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
const ViewImage = ({
    imgURL,
    onClose
}) => {
    return (
        <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
                <button
                        className="text-3xl text-gray-600 hover:text-red-600 transition duration-200 ease-in-out ml-auto"
                        onClick={onClose}
                    >
                        <IoIosCloseCircle/>
                    </button>
              
                <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
                    <img src={imgURL} className="w-full h-full" />
                </div>
            </div>
        </div>
    )
}

export default ViewImage;