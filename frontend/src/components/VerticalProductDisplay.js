import React from "react";
import dispalyINR from "../helper/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import { useContext } from "react";

const VerticalProductDisplay = ({ products, heading }) => {
    const { fetchUserCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserCart();
    };

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <Link
                            to={"/product/" + product?._id}
                            className="bg-white rounded-sm shadow p-4"
                            key={index}
                        >
                            <div className="bg-slate-200 h-48 mb-4">
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName || "Product"}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform mix-blend-multiply object-scale-down"
                                />
                            </div>
                            <h3 className="text-sm font-bold line-clamp-1">
                                {product?.productName}
                            </h3>
                            <p className="text-xs text-slate-500">{product?.productCategory}</p>
                            <p className="text-xs">{product?.description}</p>
                            <div className="flex gap-1 mt-2">
                                <p className="text-sm text-green-500 font-medium">{dispalyINR(product?.sellingPrice)}</p>
                                <p className="text-xs text-slate-500 line-through">{dispalyINR(product?.price)}</p>
                            </div>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white rounded-full px-3 py-1 mt-4"
                                onClick={(e) => handleAddToCart(e, product?._id)}
                            >
                                Add to Cart
                            </button>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default VerticalProductDisplay;
