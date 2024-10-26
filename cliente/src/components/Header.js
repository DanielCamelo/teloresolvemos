import React from 'react'
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice"



const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    


    console.log(user)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })


        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if(data.error){
            toast.error(data.message)
        }

    }


  return (

    
    <header className='h-16 shadow-md bg-green'> 
    
    
    
        <div className='h-full container mx-auto flex items-center px-4 justify-between rounded-full'>
              

            <div className='flex items-center gap-7 ' position="top-right">

                <div>
                    {
                        user?._id ? (
                            <button onClick={handleLogout} className='bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>Cerrar</button>
                        ):
                        (
                            <Link to={"/login"} className='bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>Iniciar sesión</Link>

                        )
                    }
                                    </div>

            </div>
        </div>
    </header>
  )
}

export default Header