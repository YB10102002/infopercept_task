const backendDomain = "http://localhost:5000";

const AllApi = {
    register : {
        url : `${backendDomain}/api/register`,
        method : "post"
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : "post"
    },
    currentUser : {
        url : `${backendDomain}/api/user-profile`,
        method : "get"
    },
    logout : {
        url : `${backendDomain}/api/logout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProducts : {
        url : `${backendDomain}/api/all-products`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/api/category-product`,
        method : "get"
    },
    categoryWiseProduct : {
        url :` ${backendDomain}/api/categoryProduct`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    addToCart : {
        url : `${backendDomain}/api/add-cart`,
        method : "post"
    },
    countCartItems : {
        url : `${backendDomain}/api/count-cart`,
        method : "get"
    },
    viewCartItems : {
        url : `${backendDomain}/api/cart-items`,
        method : "get"
    },
    updateCart : {
        url : `${backendDomain}/api/update-cart`,
        method : "post"
    },
    deleteCart : {
        url : `${backendDomain}/api/delete-cart`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : "post"
    },
    importProduct : {
        url : `${backendDomain}/api/file-uploads`,
        method : "post"
    }
}

export default AllApi;