import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import AllApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS , CategoryScale , LinearScale , BarElement , Title , Tooltip , Legend, plugins } from "chart.js";
import Papa from 'papaparse';
import { toast } from "react-toastify";
import ImportProduct from '../components/ImportProduct';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [openImportProduct, setOpenImportProduct] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const [currentPage,setCurrentPage] = useState(1);
    const productPerPage = 5;

    const fetchAllProducts = async () => {
        const res = await fetch(AllApi.allProducts.url);

        const data = await res.json();
        console.log(data);
        setAllProducts(data?.data || []);
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    // const productNames = allProducts.map(product => product.productName);
    // const productPricses = allProducts.map(product => product.sellingPrice);



    const priceRanges = [
        {range:"0-10000",min:0,max:10000},
        {range:"10001-20000",min:10001,max:20000},
        {range:"20001-30000",min:20001,max:30000},
        {range:"30001-40000",min:30001,max:40000},
        {range:"40000+",min:40001,max:Infinity},
    ];

    const countP = (min,max) => {
        return allProducts.filter(product => product.sellingPrice >= min && product.sellingPrice <= max).length;
    };

    const prineRange = priceRanges.map(range => countP(range.min,range.max));
    const priceLabels = priceRanges.map(range => range.range);

    // const chartData = {
    //     labels : productNames,
    //     datasets : [
    //         {
    //             label : 'Product Prices',
    //             data : productPricses,
    //             backgroundColor : 'rgba(75,192,192,0.6)',
    //             borderColor : 'rgba(75,192,192,1)',
    //             borderWidth : 1,
    //         },
    //     ],
    // };

    // const chartOptions = {
    //     responsive : true,
    //     plugins : {
    //         legend : {
    //             position : "top"
    //         },
    //         title : {
    //             display : true,
    //             text : "Product Prices Chart",
    //         },
    //     },
    // };


    const chartData = {
        labels: priceLabels,
        datasets: [
            {
                label: 'Number of Products',
                data: prineRange,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Number of Products in Different Price Ranges",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Products',
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Price Ranges',
                }
            }
        }
    };

    const indexLastProduct = currentPage * productPerPage;
    const indexFirstProduct = indexLastProduct - productPerPage;
    const currentProducts = allProducts.slice(indexFirstProduct,indexLastProduct);

    const totalPages = Math.ceil(allProducts.length / productPerPage);

    // const handleNextPage = () => {
    //     if(currentPage < totalPages){
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    // const handlePreviousPage = () => {
    //     if(currentPage > 1){
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const handleExportProducts = () => {

        const flatProducts = allProducts.map(product => ({
            productName: product.productName,
            brandName: product.brandName,
            productCategory: product.productCategory,
            productImage: product.productImage[0], // Assuming you want the first image
            description: product.description,
            price: product.price,
            sellingPrice: product.sellingPrice
        }));



        const csv = Papa.unparse(flatProducts, {
            header: true
        });
    
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'products.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // const handleImportProducts = async (event) => {
    //     const file = event.target.files[0];
     
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
     
    //         const res = await fetch(AllApi.fileUpload.url,{
    //             method: AllApi.fileUpload.method,
    //             credentials: "include",
    //             body: formData, // No need to set 'content-type'
    //         });
    
    //         const data = await res.json();
    //         if (data.success) {
    //             toast.success(data.message);
    //             fetchAllProducts();
    //         } else {
    //             toast.error(data.message);
    //         }
    //     }
    // };
    

    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Products</h2>
                <div className="flex space-x-2">
                    <button 
                        className="py-1 px-3 text-white rounded-full bg-green-500 hover:bg-green-700 transition-all"
                        onClick={() => setOpenUploadProduct(true)}
                    >
                        Upload Product
                    </button>
                    <button 
                        className="py-1 px-3 text-white rounded-full bg-green-500 hover:bg-green-700 transition-all"
                        onClick={() => setOpenImportProduct(true)}
                    >
                        Import Products
                    </button>
                    <button 
                        className="py-1 px-3 text-white rounded-full bg-green-500 hover:bg-green-700 transition-all"
                        onClick={handleExportProducts}
                    >
                        Exports Products
                    </button>
                </div>
            </div>

            {/**bar chart */}
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-center text-lg font-bold mb-4">Product Prices Bar Chart</h3>
                <Bar data={chartData} options={chartOptions} />
            </div>


            {/**product lists */}
            <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
                {currentProducts.map((product, index) => (
                    <AdminProductCard data={product} key={index} fetchData={fetchAllProducts} />
                ))}
            </div>

            {/**pagination */}
            <div className="flex justify-center gap-3 mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        className={`py-1 px-3 rounded-full ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-black hover:bg-gray-400'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


            {/* <input 
                type="file" 
                id="import-file-input" 
                accept=".csv" 
                className="hidden"
                onChange={handleImportProducts} 
            /> */}

            {openUploadProduct && (
                <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
            )}
             {openImportProduct && (
                <ImportProduct onClose={() => setOpenImportProduct(false)} fetchData={fetchAllProducts} />
            )}
        </div>
    );
};

export default AllProducts;
