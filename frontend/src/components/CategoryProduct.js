import React, { useContext, useEffect, useState } from "react";
import AllApi from "../common";
import { Link } from "react-router-dom";
import Context from "../context";

const CategoryProduct = () => {
    const [categoryProduct, setCategoryProduct] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);
    //const [productCategory,setProductCategory] = useState("");

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const res = await fetch(AllApi.categoryProduct.url);
            const data = await res.json();
            setCategoryProduct(Array.isArray(data.data) ? data.data : []); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching category products:", error);
            setCategoryProduct([]); // Set to empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // const handleCategory = (category) => {
    //     setProductCategory(category);
    // };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {
                    loading ? (
                        categoryLoading.map((_, index) => (
                            <div
                                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                                key={index}
                            />
                        ))
                    ) : (
                        categoryProduct.length > 0 ? (
                            categoryProduct.map((product, index) => (
                                <Link
                                    to={"/product-category?category=" + product.productCategory}
                                    className="cursor-pointer"
                                    key={index}
                                    //onClick={() => handleCategory(product.productCategory)}
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 flex rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                        <img
                                            src={product?.productImage[0]}
                                            height={120} width={120}
                                            alt="product image"
                                            className="h-full object-scale-down mix-blend-multiply hover:scale-125 transitition-all"
                                        />
                                    </div>
                                    <p className="text-center text-sm md:text-base">{product.productCategory}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default CategoryProduct;
