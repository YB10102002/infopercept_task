import AllApi from "../common";

const categoryWiseProduct = async (category) => {
    try {
        const res = await fetch(AllApi.categoryWiseProduct.url, {
            method: AllApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category }) // Send the category as a string
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching category-wise products:", err);
        return { error: true, success: false, data: [] };
    }
}

export default categoryWiseProduct;
