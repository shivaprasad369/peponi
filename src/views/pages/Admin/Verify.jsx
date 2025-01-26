import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import useTokenVerification from '../../../components/Hooks/useTokenVerification';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import { CSpinner } from '@coreui/react';

export default function Verify() {
  const {isVerified,isLoading1,error} = useTokenVerification();
const [loading,setLoading]=useState(true)
  const navigate = useNavigate();
useEffect(()=>{
    if(!isVerified && !isLoading1){
     window.location.replace('/admin');
    }else{
      setLoading(false)

    }
 
},[isVerified,isLoading1])
// console.log(loading)
  if(isLoading1){
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <CSpinner color="primary" variant="grow" />
    </div>
  }
  if(error){
    return <div>Error</div>
  }
return (
<>
{!loading && <div className='d-flex overflow-hidden'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body  flex-grow-1 px-2">
         <Outlet/>
        </div>
        <AppFooter />
      </div>
    </div>}
    </>
    )


}
