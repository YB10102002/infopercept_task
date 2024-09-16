import React, { useContext, useEffect, useRef, useState } from "react";
import categoryWiseProduct from "../helper/categoryWiseProduct";
import dispalyINR from "../helper/displayCurrency";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

const VerticalProductCard = ({ category, heading }) => {
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
            setData(Array.isArray(categoryProduct.data) ? categoryProduct.data : []); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching category products:", error);
            setData([]); // Set to empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="relative">
                <div className="flex overflow-x-scroll scrollbar-none transition-all space-x-4 p-2" ref={scrollElement}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data.length > 0 ? (
                            data.map((product, index) => (
                                <Link
                                    to={"/product/" + product?._id}
                                    className="flex-none w-[280px] md:w-[320px] bg-white rounded-sm shadow"
                                    key={index}
                                >
                                    <div className="bg-slate-200 p-2 h-[280px] md:h-[320px] flex justify-center items-center">
                                        <img
                                            src={product.productImage[0]}
                                            alt={product.productName || "Product"}
                                            className="max-w-full max-h-full object-contain hover:scale-125 transition-transform mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold line-clamp-2">
                                                {product?.productName}
                                            </h3>
                                            <p className="text-xs text-slate-500">{product?.productCategory}</p>
                                            <p className="text-xs">{product?.description}</p>
                                        </div>
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
            </div>
        </div>
    );
};

export default VerticalProductCard;
