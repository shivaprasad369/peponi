import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/logo.png'
import img2 from '../../../assets/logo2.png'
import { toast, ToastContainer } from 'react-toastify';
export default function Adminlogin() {
  document.title = 'Admin Login'
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
      const response = await axios.post(`${apiUrl}/admin/login`,data)
      toast.success(response.data.message);
      localStorage.setItem('adminToken',response.data.token);
      if(response.status===200){
        navigate('/admin/account/dashboard');
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
    reset();
  }
  return (
    <section className='w-[100%] h-[100vh] flex-col flex justify-center items-center overflow-hidden bg-gray-100'>
      <ToastContainer autoClose={1000}/>
      <div className='w-[100%] ml-[-1rem] flex justify-center items-center'><img src={img} alt="Peponi" className='h-[5rem]' />
      <img src={img2} alt="Peponi" className='h-[5rem]' />
      </div>
      <div className='xl:w-[24%] lg:w-[30%] md:w-[40%] w-[90%] border-t-[3px]  border-yellow-300  flex-col h-fit p-[1rem] shadow-lg flex items-center justify-center bg-white rounded-lg'>
        <form  onSubmit={handleSubmit(onSubmit)} className='flex w-[100%] flex-col  justify-center items-center gap-3'>
          <span className='text-md font-semibold'>Log in to start your admin session.</span>
          {(errors.email || errors.password) && <span className='text-red-500'>Please fill all the fields</span>}
          <div className='w-[100%] relative flex flex-col gap-1'>
          <input type="text" placeholder='username'  {...register("username",{required:true})}
          className='w-[88%] border-[1px] border-gray-300 bg-white text-black outline-none px-2 py-1' />
          <div className='absolute border-r-[1px] text-black border-t-[1px] border-b-[1px] border-gray-300  right-0 h-[100%] w-[12%] flex items-center justify-center'>
          <IoMailOutline />
          </div>
          </div>
          <div className='w-[100%] relative flex flex-col gap-1'>

          <input type="password" placeholder='Password'  {...register("password",{required:true})}
         className='w-[88%] border-[1px] border-gray-300 bg-white text-black outline-none px-2 py-1'  />
           <div className='absolute border-r-[1px] border-t-[1px] border-b-[1px] border-gray-300 text-black  right-0 h-[100%] w-[12%] flex items-center justify-center'>
          <RiLockPasswordFill  />
          </div>
          </div>
          <div className='w-[100%] flex justify-end'>
            <Link to='/admin/forgotpassword'>Forgot Password</Link>
          </div>
          <div className='w-[100%] flex justify-center items-center'>
           
          <button type="submit" 
          className='w-fit px-4 py-2 bg-blue-500 text-white rounded-lg' disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}
