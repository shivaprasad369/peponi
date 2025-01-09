import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
export default function Adminlogin() {
  const { register, handleSubmit, reset , formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const token = localStorage.getItem('adminToken');
  const apiUrl=import.meta.env.VITE_API_URL;
   useEffect(()=>{
    if (token) {
     navigate('/admin/account/dashboard');
    }
   },[token])

 
  const onSubmit = async(data) => {
    setIsLoading(true);
    try {
      // console.log(data);
      const response = await axios.post(`${apiUrl}/admin/login`,data)
      alert(response.data.message);
      // console.log(response.data.token);
      localStorage.setItem('adminToken',response.data.token);
      navigate('/admin/account/dashboard');
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
    reset();
  
  }

  return (
    <section className='w-[100%] h-[100vh] flex justify-center items-center overflow-hidden bg-gray-200'>
      <div className='xl:w-[24%] lg:w-[30%] md:w-[40%] w-[90%] h-fit p-[1rem] shadow-lg flex items-center justify-center bg-white rounded-lg'>
        <form  onSubmit={handleSubmit(onSubmit)} className='flex w-[100%] flex-col  justify-center items-center gap-3'>
          <span className='text-md font-semibold'>Sign in to start your session</span>
          {(errors.email || errors.password) && <span className='text-red-500'>Please fill all the fields</span>}
          <div className='w-[100%] relative flex flex-col gap-1'>
          <input type="text" placeholder='username'  {...register("username",{required:true})}
          className='w-[88%] border-[1px] border-gray-300  outline-none px-2 py-1' />
          <div className='absolute border-r-[1px] border-t-[1px] border-b-[1px] border-gray-300  right-0 h-[100%] w-[12%] flex items-center justify-center'>
          <IoMailOutline />
          </div>
          </div>
          <div className='w-[100%] relative flex flex-col gap-1'>

          <input type="password" placeholder='Password'  {...register("password",{required:true})}
         className='w-[88%] border-[1px] border-gray-300  outline-none px-2 py-1'  />
           <div className='absolute border-r-[1px] border-t-[1px] border-b-[1px] border-gray-300  right-0 h-[100%] w-[12%] flex items-center justify-center'>
          <RiLockPasswordFill  />
          </div>
          </div>
          <div className='w-[100%] flex justify-end'>
            <Link to='/admin/forgotpassword'>Forgot Password</Link>
          </div>
          <div className='w-[100%] flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <input type="checkbox" />
              <span>Remember me</span>

            </div>
          <button type="submit" 
          className='w-fit px-4 py-2 bg-blue-500 text-white rounded-lg' disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}
