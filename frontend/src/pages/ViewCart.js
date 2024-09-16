import React, { useContext, useEffect, useState } from "react";
import AllApi from "../common";
import { MdDelete } from "react-icons/md";
import Context from "../context";
import dispalyINR from "../helper/displayCurrency";

const ViewCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const context = useContext(Context);

    const fetchUserCartItems = async () => {
        setLoading(true);
        const res = await fetch(AllApi.viewCartItems.url, {
            method: AllApi.viewCartItems.method,
            credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
            setData(data.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUserCartItems();
    }, []);

    const updateUserCartQtyPlus = async (id, qty) => {
        setLoading(true);
        const res = await fetch(AllApi.updateCart.url, {
            method: AllApi.updateCart.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                productQty: qty + 1
            })
        });

        const data = await res.json();

        if (data.success) {
            fetchUserCartItems();
        }
        setLoading(false);
    }

    const updateUserCartQtyMinus = async (id, qty) => {
        if (qty >= 2) {
            setLoading(true);
            const res = await fetch(AllApi.updateCart.url, {
                method: AllApi.updateCart.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    productQty: qty - 1
                })
            });

            const data = await res.json();

            if (data.success) {
                fetchUserCartItems();
            }
            setLoading(false);
        }
    }

    const deleteCartProduct = async (id) => {
        setLoading(true);
        const res = await fetch(AllApi.deleteCart.url, {
            method: AllApi.deleteCart.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        });

        const data = await res.json();

        if (data.success) {
            fetchUserCartItems();
            context.fetchUserCart();
        }
        setLoading(false);
    }

    const totalqty = data.reduce((prev, curr) => prev + curr.productQty, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.productQty * curr.productId.sellingPrice), 0)

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center my-5">Your Cart</h2>

            {loading && (
                <p className="text-center">Loading...</p>
            )}

            <div className="text-center text-lg my-3">
                {data.length === 0 && !loading && (
                    <p className="bg-white py-5">No Products in Cart!!!</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item._id} className="border rounded-lg shadow-lg p-4 bg-white">
                        {item.productId.productImage && item.productId.productImage.length > 0 && (
                            <img
                                src={item.productId.productImage[0]}
                                alt={item.productId.productName}
                                className="w-fit h-48 object-cover rounded-t-lg"
                            />
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.productId.productName}</h3>
                            <p className="text-sm text-gray-500">{item.productId.brandName}</p>
                            <p className="text-sm text-gray-500">{item.productId.productCategory}</p>

                            {/* Quantity control section */}
                            <div className="flex items-center justify-center space-x-2 my-3">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded-full focus:outline-none hover:bg-red-600"
                                    onClick={() => updateUserCartQtyMinus(item._id, item.productQty)}
                                >
                                    -
                                </button>
                                <p className="text-lg font-bold">{item.productQty}</p>
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded-full focus:outline-none hover:bg-green-600"
                                    onClick={() => updateUserCartQtyPlus(item._id, item.productQty)}
                                >
                                    +
                                </button>
                            </div>

                            <p className="my-2">{item.productId.description}</p>
                            <p className="text-red-500 text-lg font-bold">₹{item.productId.sellingPrice}</p>
                            <p className="text-gray-500 line-through">₹{item.productId.price}</p>
                            <p className="text-lg font-bold mt-4">Total: ₹{item.productId.sellingPrice * item.productQty}</p>

                            {/* Delete icon */}
                            <button
                                className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full mt-4 hover:bg-red-600 focus:outline-none mx-auto"
                                onClick={() => deleteCartProduct(item._id)}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* All Cart Total Section */}
            <div className="bg-green-500 text-white text-xl font-bold p-2 py-4 mt-6 rounded-lg">
                <h2>Your Cart Summary</h2>
                <div className="flex justify-between mt-2">
                    <p>Quantity: {totalqty}</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Total Price: {dispalyINR(totalPrice)}</p>
                </div>
                <button
                    className="p-4 bg-blue-500 text-white text-lg font-semibold py-2 mt-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    Checkout
                </button>
            </div>

        </div>
    )
}

export default ViewCart;
