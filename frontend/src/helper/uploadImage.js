// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
// const url = `CLOUDINARY_URL=cloudinary://662373518394312:FL5LD3FTBlwAiy-7xvTeumhBpfY@dm1p85m1d/image/upload`
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage = async(image) => {
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","mern_product");  
    const res = await fetch(url,{
        method : "post",
        body : data,
    });

    return res.json();
}

export default uploadImage;