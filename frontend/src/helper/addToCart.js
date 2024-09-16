import AllApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e,id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const res = await fetch(AllApi.addToCart.url,{
        method : AllApi.addToCart.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(
            { pid : id }
        )
    });

    const data = await res.json();

    console.log(data);

    if(data.success){
        toast.success(data.message);
    }
    if(data.error){
        toast.error(data.message);
    }
}

export default addToCart;