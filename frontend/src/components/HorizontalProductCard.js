import React, { useContext, useEffect, useRef, useState } from "react";
import categoryWiseProduct from "../helper/categoryWiseProduct";
import dispalyINR from "../helper/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";

const HorizontalProductCard = ({ category, heading }) => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const scrollElement = useRef();

    const { fetchUserCart } = useContext(Context);

    const handleAddToCart = async(e,id) => {
        await addToCart(e,id);
        fetchUserCart();
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await categoryWiseProduct(category);
            setData(categoryProduct?.data || []); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]); // Set data as an empty array in case of an error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };


    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="relative">
                <div className="flex overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-lg z-10"
                        onClick={scrollLeft}
                    >
                        <FaAngleLeft />
                    </button>
                    <div className="flex space-x-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            data.length > 0 ? (
                                data.map((product, index) => (
                                    <Link
                                        to={"/product/" + product?._id}
                                        className="w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow flex mx-2"
                                        key={index}
                                    >
                                        <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                                            <img
                                                src={product.productImage[0]}
                                                alt={product.productName || "Product"}
                                                className="w-full h-full object-cover hover:scale-125 transition-transform mix-blend-multiply"
                                            />
                                        </div>
                                        <div className="p-4 grid">
                                            <h3 className="text-sm font-bold line-clamp-1">
                                                {product?.productName}
                                            </h3>
                                            <p className="text-xs text-slate-500">{product?.productCategory}</p>
                                            <p className="text-xs">{product?.description}</p>
                                            <div className="flex gap-1">
                                                <p className="text-xs text-green-500 font-medium">{dispalyINR(product?.sellingPrice)}</p>
                                                <p className="text-xs text-slate-500 line-through">{dispalyINR(product?.price)}</p>
                                            </div>
                                            <button className="bg-green-500 hover:bg-green-700 text-white rounded-full px-3 py-1" onClick={(e) =>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No products available.</p>
                            )
                        )}
                    </div>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-lg z-10"
                        onClick={scrollRight}
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HorizontalProductCard;
