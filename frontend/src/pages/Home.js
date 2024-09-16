import React from "react";
import CategoryProduct from "../components/CategoryProduct";
import SlidingProductPanel from "../components/SlidingProductPanel";
import HorizontalProductCard from "../components/HorizontalProductCard";
import VerticalProductCard from "../components/VerticalProductCard";

const Home = () => {
    return (
        <div>
            <CategoryProduct />
            <SlidingProductPanel />
            <HorizontalProductCard category="Airpods" heading="Top Airpod's" />
            <HorizontalProductCard category="Camera" heading="Photographic Camera's" />
            <VerticalProductCard category="Mobiles" heading="Top Selling Mobile's"/>
            <VerticalProductCard category="Mouse" heading="Most Useable Mouse's"/>
            <VerticalProductCard category="TV" heading="Top Television's"/>
            <VerticalProductCard category="Earpods" heading="Top Earpods's"/>
            <VerticalProductCard category="Refrigerator" heading="Top Refrigerator's"/>
            <VerticalProductCard category="Processor" heading="Top Processor's"/>
            <VerticalProductCard category="Printers" heading="Top Printers's"/>
            <VerticalProductCard category="Spekears" heading="Top Spekears's"/>
            <VerticalProductCard category="Trimmers" heading="Top Trimmers's"/>
            <VerticalProductCard category="Watch" heading="Top Watch's"/>
        </div>
    );
};

export default Home;
