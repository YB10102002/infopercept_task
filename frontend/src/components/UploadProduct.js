import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import uploadImage from "../helper/uploadImage";
import ViewImage from "./ViewImage";
import AllApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose , fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        productCategory: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [fullImage, setFullImage] = useState("");
    const [openImage, setOpenImage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(data);  
        const res = await fetch(AllApi.uploadProduct.url,{
            method : AllApi.uploadProduct.method,
            credentials : 'include',
            headers : {
                'content-type':'application/json',
            },
            body : JSON.stringify(data),
        });

        const dataRes = await res.json();

        console.log(dataRes);

        if(dataRes.success){
            toast.success(dataRes?.message);
            onClose();
            fetchData();
        }
        if(dataRes.error){
            toast.error(dataRes?.message);
        }

    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageC = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageC.url],
        }));
    };

    const handleDeleteImage = (index) => {
        const newProductImages = [...data.productImage];
        newProductImages.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: newProductImages,
        }));
    };

    return (
        <div className="fixed inset-0 bg-slate-200 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[80%] shadow-lg overflow-y-auto relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl">Upload Product</h2>
                    <button
                        className="text-3xl text-gray-600 hover:text-red-600 transition duration-200 ease-in-out"
                        onClick={onClose}
                    >
                        <IoIosCloseCircle />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            value={data.productName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
                        <input
                            type="text"
                            name="brandName"
                            id="brandName"
                            value={data.brandName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter brand name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
                        <input
                            type="text"
                            name="productCategory"
                            id="productCategory"
                            value={data.productCategory}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter product category"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            name="productImage"
                            id="productImage"
                            onChange={handleUploadProduct}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.productImage.length > 0 ? (
                            data.productImage.map((image, index) => (
                                <div key={index} className="relative group cursor-pointer">
                                    <img
                                        src={image}
                                        width={80}
                                        height={80}
                                        alt="Product"
                                        className="border rounded"
                                        onClick={() => {
                                            setOpenImage(true);
                                            setFullImage(image);
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block"
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        <MdDeleteForever />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No image uploaded yet.</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter product description"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={data.price}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            id="sellingPrice"
                            value={data.sellingPrice}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter selling price"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition duration-200"
                        >
                            Upload Product
                        </button>
                    </div>
                </form>
            </div>
            {openImage && (
                <ViewImage onClose={() => setOpenImage(false)} imgURL={fullImage} />
            )}
        </div>
    );
};

export default UploadProduct;
