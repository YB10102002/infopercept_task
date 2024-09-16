import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import ViewCart from "../pages/ViewCart";
import SearchProduct from "../pages/SearchProduct";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path : "product-category",
                element : <CategoryProduct />
            },
            {
                path : "product/:id",
                element : <ProductDetail />
            },
            {
                path : "view-cart",
                element : <ViewCart />
            },
            {
                path : "search",
                element : <SearchProduct />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    } ,
                    {
                        path: "products",
                        element: <AllProducts />
                    }
                ]
            },
        ]
    }
]);
export default router;