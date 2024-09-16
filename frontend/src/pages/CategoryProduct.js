import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helper/productCategory";
import VerticalProductDisplay from "../components/VerticalProductDisplay";
import AllApi from "../common";


const CategoryProduct = () => {
    // {params.categoryName}
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState([]);
    const navigate = useNavigate();

    //console.log("filter category",filterCategory)

    const location = useLocation();

    const URLCategory = new URLSearchParams(location.search);
    const urlCategoryList = URLCategory.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryList.forEach(e1 => {
        urlCategoryListObject[e1] = true
    })

    //console.log(urlCategoryList);

    //console.log(urlCategoryListObject);
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(AllApi.filterProduct.url, {
            method: AllApi.filterProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategory
            })
        });

        const data = await res.json();
        setData(data.data || []);
        setLoading(false);
        console.log(data);
    }


    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target
        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
        //console.log("selected category",name,value,checked);
        // console.log("selected category list = ",selectCategory)
    }

    useEffect(() => {
        fetchData();
    }, [filterCategory])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(cat => {
            //console.log(cat);   
            if (selectCategory[cat]) {
                return cat;
            }
            return null;
        }).filter(e1 => e1);

        setFilterCategory(arrayOfCategory);

        //url changes format when chnage of checkbox
        const urlFormat = arrayOfCategory.map((e1, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${e1}`
            }

            return `category=${e1}&&`
        });
        //console.log(urlFormat.join(""));
        navigate("/product-category?" + urlFormat.join(""));

        //console.log("selected",arrayOfCategory);
    }, [selectCategory]);

    const [sort, setSort] = useState("");

    const handleRadioButtons = (e) => {
        const { value } = e.target

        setSort(value);

        if(value === "asc"){
            setData(prev => prev.sort((a,b) => a.sellingPrice - b.sellingPrice))
        }

        if(value === "desc"){
            setData(prev => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(() => {

    },[sort])
    

    //console.log("radio buttons",sort);

    return (
        <div className="container mx-auto p-4 ">
            {/**desktop version */}
            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                {/**left side */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
                    {/**sort by */}
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1  border-slate-300">Sort by</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sort" checked={sort === 'asc'} value={"asc"}  onChange={handleRadioButtons} />
                                <label>Price - Low To High</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sort" checked={sort === 'desc'} value={"desc"} onChange={handleRadioButtons} />
                                <label>Price - High To Low</label>
                            </div>
                        </form>
                    </div>


                    {/**sort by category */}
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1  border-slate-300">Category</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            {
                                productCategory.map((cat, index) => {
                                    return (
                                        <div className="flex items-center gap-3" key={index}>
                                            <input type="checkbox" checked={selectCategory[cat.value]} value={cat.value} name="category" id={cat.value} onChange={handleSelectCategory} />
                                            <label htmlFor={cat.value}>{cat.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>


                {/**right side */}
                <div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold my-3 font-medium">Filter Results: {data.length}</h2>
                    </div>
                    {/* {
                        params.categoryName && (
                            <VerticalProductDisplay category={params.categoryName} heading="You also like this" />
                        )
                    } */}
                    <div>
                        {
                            data.length !== 0 && !loading && (
                                // <VerticalProductDisplay category="Airpods" heading="You also like this" />
                                <VerticalProductDisplay products={data} heading="You also like this" />
                            )
                        }
                    </div>


                    {/* <HorizontalProductCard category={params.productCategory} heading="You also like this" /> */}
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct;