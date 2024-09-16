import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllApi from "../common";
import { toast } from "react-toastify";
import { setUserDetail } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

    const context = useContext(Context);
    const cartContext = useContext(Context);
    const navigate = useNavigate();

    const searchInput = useLocation();
    const searchText = new URLSearchParams(searchInput?.search)
    // console.log("serrchinput",searchInput?.search.split("=")[1]);
    const searchQuery = searchText.getAll("q")

    const [search,setSearch] = useState(searchQuery);

    const handleLogout = async () => {
        const fetchData = await fetch(AllApi.logout.url, {
            method: AllApi.logout.method,
            credentials: 'include'
        });

        const res = await fetchData.json();
        if (res.success) {
            toast.success(res.message);
            dispatch(setUserDetail(null));
        } else if (res.error) {
            toast.error(res.message);
        }
        navigate("/");
    }

    const handleSearch = (e) => {

        const { value } = e.target
        setSearch(value);
        if(value){
            navigate(`/search?q=${value}`)
        }
    }

    // console.log("context", context);
    // console.log("cart",cartContext);

    return (
        <header className="h-16 shadow-md bg-white">
            <div className="container mx-auto flex items-center justify-between px-4 h-full">
                <Link to={"/"}>
                    <Logo w={90} h={50} />
                </Link>

                <div className="flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input
                        type="text"
                        placeholder="Search products here..."
                        className="w-full outline-none px-2"
                        onChange={handleSearch}
                        value={search}
                    />
                    <button className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white hover:bg-red-700">
                        <GrSearch />
                    </button>
                </div>

                <div className="flex items-center gap-7">
                    <div className="flex justify-center">
                        {
                            user?._id && (
                                <div className="relative text-3xl cursor-pointer" onClick={() => setMenu(prev => !prev)}>
                                    {user?.profileimage ? (
                                        <img
                                            src={user?.profileimage}
                                            className="w-10 h-10 rounded-full"
                                            alt={user?.name}
                                        />
                                    ) : (
                                        <FaUserCircle />
                                    )}
                                </div>
                            )
                        }
                        {
                            menu && (
                                <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded">
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"admin-panel"} className="hover:bg-slate-200 p-2" onClick={() => setMenu(prev => !prev)}>Admin Panel</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>
                    {
                        user?._id && (
                            <Link  to={"/view-cart"}className="relative text-3xl cursor-pointer">
                                <PiShoppingCartSimpleFill />
                                <div className="bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 right-1.5 text-xs">
                                    <p>{context.cartProduct}</p>
                                </div>
                            </Link>
                        )
                    }

                    <div>
                        {user?._id ? (
                            <button
                                className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700"
                                onClick={handleLogout}
                            //to={"/login"}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to={"/login"}
                                className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
