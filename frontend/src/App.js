import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import AllApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './store/userSlice';

function App() {

  const dispatch = useDispatch();
  const [cartProduct,setCartProduct] = useState(0);
  const [cartItems,setCartItems] = useState(0);

  const fetchUserDetails = async () => {
    const data = await fetch(AllApi.currentUser.url, {
      method: AllApi.currentUser.method,
      credentials: 'include',
      mode : 'cors'
    })
    const res = await data.json();
    if (res.success) {
      dispatch(setUserDetail(res.data))
    }
    //console.log(res);
  }

  const fetchUserCart = async() => {
      const res = await fetch(AllApi.countCartItems.url,{
        method : AllApi.countCartItems.method,
        credentials : 'include',
      });

      const data = await res.json();
      // if (data.success) {
      //   dispatch(setUserDetail(data.data))
      // }
    //console.log(data);  
    
    setCartProduct(data.data.total);
  }

  // const fetchUserCartItems = async () => {
  //   const res = await fetch(AllApi.viewCartItems.url,{
  //     method : AllApi.viewCartItems.method,
  //     credentials : 'include'
  //   });

  //   const data = await res.json();

  //   console.log("cart items",data);
  //   setCartItems(data.data);
  // }

  useEffect(() => {
    /**user profile */
    fetchUserDetails();
    fetchUserCart();
  });
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails ,//user detail fetch
        cartProduct, //user cart detail fetch
        fetchUserCart
      }}>
        <ToastContainer 
          position='top-center'
        />

        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
