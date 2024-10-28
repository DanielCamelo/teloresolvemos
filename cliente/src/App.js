  import React, { useEffect, useState } from 'react';
  import fondoMovil from './assets/fondoMovil.jpg';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Outlet } from 'react-router-dom';
import Context from './context/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice.js';


  function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.user)
  
    const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method: SummaryApi.current_user.method,
        credentials: 'include'
      })
  
      const dataApi = await dataResponse.json()
  
      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  
      console.log(dataResponse)
    }
  
  
  
  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
  
  },[])

    return (
      <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
    }}>
    <ToastContainer className="rounded-full" position="top-right"/>
      
      {/* Fondo para dispositivos móviles md:hidden */}
<div className="bg-cover bg-center min-h-screen " style={{ backgroundImage: `url('${fondoMovil}')` }}>
  <Header />
  <main className="flex flex-col justify-between min-h-full">
    <Outlet />
  </main>
  <Footer />
</div>

</Context.Provider>
      </>
      
    );
  }

  export default App;
