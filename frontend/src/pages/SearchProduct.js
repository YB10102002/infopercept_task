import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AllApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import dispalyINR from "../helper/displayCurrency";
import Context from "../context";
import addToCart from "../helper/addToCart";

const SearchProduct = () => {
    const qry = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(AllApi.searchProduct.url + qry.search, {
            method: AllApi.searchProduct.method,
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            setData(data.data);
        }
        setLoading(false);

        //console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, [qry]);

    const { fetchUserCart } = useContext(Context);

    const handleAddToCart = async(e,id) => {
        await addToCart(e,id);
        fetchUserCart();
    }

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-lg text-center">Loading...</p>}

            <p className="text-lg font-semibold my-3 ">Search Results: {data.length}</p>

            {data.length === 0 && !loading && (
                <p className="text-lg text-center bg-white p-4">No data available...</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {data.length !== 0 &&
                    !loading &&
                    data.map((product) => (
                        <Link  to={"/product/" + product?._id} key={product._id} className="border rounded-lg shadow-lg p-4 bg-white">
                            {product.productImage && product.productImage.length > 0 && (
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName}
                                    className="w-full h-48 object-scale-down rounded"
                                />
                            )}
                            <div className="p-4">
                            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{product?.brandName}</p>
                                <h2 className='text-2xl lg:text-4xl font-medium line-clamp-1'>{product?.productName}</h2>
                                <p className='capitalize text-slate-400'>{product?.category}</p>

                                <div className='text-red-600 flex items-center gap-1'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalf />
                                </div>

                                <div className='flex items-center gap-2 text-2xl lg:text-2xl font-medium my-1'>
                                    <p className='text-red-600'>{dispalyINR(product.sellingPrice)}</p>
                                    <p className='text-slate-400 line-through'>{dispalyINR(product.price)}</p>
                                </div>

                                <div className='flex items-center gap-3 my-2'>
                                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) =>handleAddToCart(e,product?._id)}>Add To Cart</button>
                                </div>

                                <div>
                                    <p className='text-slate-600 font-medium my-1'>Description : </p>
                                    <p>{product?.description}</p>
                                </div>
                                {/* Add more details as needed */}
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default SearchProduct;
