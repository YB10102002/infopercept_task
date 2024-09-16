import React, { useState } from "react";
import AllApi from "../common";
import { toast } from "react-toastify";
import uploadImage from "../helper/uploadImage";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

const AdminEditProduct = ({ onClose, pdata , fetchData }) => {
    const [data, setData] = useState({
        ...pdata,
        productName: pdata?.productName,
        brandName: pdata?.brandName,
        productCategory: pdata?.productCategory,
        productImage: pdata?.productImage || [],
        description: pdata?.description,
        price: pdata?.price,
        sellingPrice: pdata?.sellingPrice
    });

    const [fullImage, setFullImage] = useState("");
    const [openImage, setOpenImage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the request payload as expected by the backend
        const requestData = {
            _id: data._id, // The ID of the product
            resBody: {
                productName: data.productName,
                brandName: data.brandName,
                productCategory: data.productCategory,
                productImage: data.productImage,
                description: data.description,
                price: data.price,
                sellingPrice: data.sellingPrice
            }
        };

        const res = await fetch(AllApi.updateProduct.url, {
            method: AllApi.updateProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const dataRes = await res.json();

        if (dataRes.success) {
            toast.success(dataRes.message);
            onClose();
            // fetchAllProducts(); // Uncomment if you need to refetch products after update
            fetchData()
        } else if (dataRes.error) {
            toast.error(dataRes.message);
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[80%] shadow-lg overflow-y-auto relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl">Edit Product</h2>
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
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProduct;
