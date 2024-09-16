import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1_mobile.jpg";
import image2 from "../assest/banner/img1.webp";
import image3 from "../assest/banner/img2_mobile.webp";
import image4 from "../assest/banner/img2.webp";
import image5 from "../assest/banner/img3_mobile.jpg";
import image6 from "../assest/banner/img3.jpg";
import image7 from "../assest/banner/img4_mobile.jpg";
import image8 from "../assest/banner/img4.jpg";
import image9 from "../assest/banner/img5_mobile.png";
import image10 from "../assest/banner/img5.webp";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const SlidingProductPanel = () => {

    const [currentImage, setCurrentImage] = useState(0);

    const images_desktop = [
        image2,
        image4,
        image6,
        image8,
        image10
    ];

    const images_mobile = [
        image1,
        image3,
        image5,
        image7,
        image9
    ]

    const nextImage = () => {
        if (images_desktop.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        }

    }

    const prevImage = () => {
        if (currentImage != 0) {
            setCurrentImage(prev => prev - 1)
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (images_desktop.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=>clearInterval(interval)
    },[currentImage])

    return (
        <div className="container mx-auto px-8 rounded">
            <div className="h-56 md:h-72 w-full bg-slate-200 relative">
                <div className="absolute z-10 w-full h-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-3xl">
                        <button className="bg-white shadow-md rounded-full p-1" onClick={prevImage}>
                            <FaAngleLeft />
                        </button>
                        <button className="bg-white shadow-md rounded-full p-1" onClick={nextImage}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                {/** desktop and table version    */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {
                        images_desktop.map((imageURL, index) => {
                            return (
                                <div
                                    className="w-full h-full min-w-full min-h-full tranisition-all"
                                    key={imageURL}
                                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                                >

                                    <img
                                        src={imageURL}
                                        className="w-full h-full" />
                                </div>
                            )
                        })
                    }
                </div>

                {/** mobile version    */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {
                        images_mobile.map((imageURL, index) => {
                            return (
                                <div
                                    className="w-full h-full min-w-full min-h-full tranisition-all"
                                    key={imageURL}
                                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                                >

                                    <img
                                        src={imageURL}
                                        className="w-full h-full object-cover" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SlidingProductPanel;