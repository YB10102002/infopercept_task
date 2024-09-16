const express = require("express");
const authToken = require("../middleware/authToken");
const userResgisterController = require("../controller/user/userRegister");
const userLoginController = require("../controller/user/userLogin");
const userProfileController = require("../controller/user/userProfile");
const userLogoutController = require("../controller/user/userLogout");
const allUsersController = require("../controller/user/allUsers");
const updateUserController = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductsController = require("../controller/product/getProducts");
const updateProductController = require("../controller/product/updateProduct");
const getCatogoryProduct = require("../controller/product/getCatogoryProduct");
const getCategoryWiseProductController = require("../controller/product/getCategoryWiseProduct");
const getProductDetailsController = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/cartUser");
const countCartItemsController = require("../controller/user/countCartItems");
const viewCartProductController = require("../controller/user/viewCartProduct");
const updateCartContorller = require("../controller/user/updateCart");
const deleteCartController = require("../controller/user/deleteCart");
const searchProductController = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const UploadProductsFromFileController = require("../controller/product/fileUploadController");
const upload = require("../middleware/multer");
const router = express.Router();


router.post("/register",userResgisterController);
router.post("/login",userLoginController);
router.get("/user-profile",authToken,userProfileController); 
router.get("/logout",userLogoutController);


//admin panel apis
router.get("/all-users",authToken,allUsersController);
router.post("/update-user",authToken,updateUserController);
router.post("/upload-product",authToken,UploadProductController);
router.get("/all-products",getProductsController);
router.post("/update-product",authToken,updateProductController);
router.post("/file-uploads",authToken,upload.single('file'),UploadProductsFromFileController);


//home page apis
router.get("/category-product",getCatogoryProduct);
router.post("/categoryProduct",getCategoryWiseProductController);
router.post("/product-details",getProductDetailsController);
router.get("/search",searchProductController);
router.post("/filter-product",filterProductController);


//cart apis
router.post("/add-cart",authToken,addToCartController);
router.get("/count-cart",authToken,countCartItemsController);
router.get("/cart-items",authToken,viewCartProductController);
router.post("/update-cart",authToken,updateCartContorller);
router.post("/delete-cart",authToken,deleteCartController);

module.exports = router;