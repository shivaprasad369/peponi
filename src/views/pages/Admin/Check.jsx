import React, { useEffect, useState } from 'react'
import useTokenVerification from '../../../components/Hooks/useTokenVerification';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSpinner } from '@coreui/react';

export default function Check() {
    const {isVerified,isLoading1}=useTokenVerification()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(!isVerified && !isLoading1){
         navigate('/admin');
        }
        else{
          setLoading(false)
          navigate('/admin/account/dashboard')
        }
    },[isVerified,isLoading1])
    if(loading){
        return <div className='w-full h-full flex items-center justify-center'>
            <CSpinner color="primary" variant="grow" />
        </div>
    }
    return <Outlet/>

}
