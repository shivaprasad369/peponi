import React from 'react'
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaLock } from 'react-icons/fa';

export default function ChangePassword() {
    document.title = 'Change Password'
    const { register, handleSubmit,reset, watch,formState: { errors } } = useForm();
    const theme=useSelector((state)=>state.theme)
    const newPassword = watch('newPassword', ''); 
    const id = Cookies.get('Aid');
    const onSubmit = async (data) => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/change-password/${id}`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            id: id
        });
        console.log(response);
        toast.success('Password changed successfully');
        reset()
      } catch (error) {
        console.log(error);
        toast.error('Password change failed');
      }
    };
  
  return (
    <div className={`w-full h-full flex gap-3 flex-col  ${theme === 'dark' ? 'bg-[#20252e] text-white' : 'bg-slate-200 px-2  justify-start'}`}>
        <ToastContainer autoClose={1000} />
        <div className="flex items-center gap-2 justify-start w-[100%]">
            <FaLock className='text-2xl font-semibold' />
            <h1 className='text-3xl font-normal'>Change Password</h1>
        </div>
        <div className={`w-[100%] lg:w-[45%] h-fit ${theme === 'dark' ? 'bg-[#2a2f3a] text-white' : 'bg-white'} flex flex-col gap-4  py-[2rem] px-[1rem]  items-start justify-center`}>
            <form className='flex w-[100%] flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      
      {/* Old Password Field */}
      <div className='flex flex-col w-[100%] gap-1'>
        <label htmlFor="old-password" className='font-bold'>Old Password</label>
        <input
          type="password"
          id="old-password"
          {...register('oldPassword', { required: 'Old password is required' })}
          className={`w-[100%] h-[2.3rem] rounded-md border-[1px] outline-none ${theme === 'dark' ? 'border-gray-500 bg-[#20252e] text-white' : 'border-gray-300 bg-white text-gray-800'} p-2`}
        />
        {errors.oldPassword && <span className='text-red-500'>{errors.oldPassword.message}</span>}
      </div>

      {/* New Password Field */}
      <div className='flex flex-col w-[100%] gap-1'>
        <label htmlFor="new-password" className='font-bold'>New Password</label>
        <input
          type="password"
          id="new-password"
          {...register('newPassword', { 
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            }
          })}
          className={`w-[100%] h-[2.3rem] rounded-md border-[1px] outline-none ${theme === 'dark' ? 'border-gray-500 bg-[#20252e] text-white' : 'border-gray-300 bg-white text-gray-800'} p-2`}
        />
        {errors.newPassword && <span className='text-red-500'>{errors.newPassword.message}</span>}
      </div>

      {/* Confirm Password Field */}
      <div className='flex flex-col w-[100%] gap-1'>
        <label htmlFor="confirm-password" className='font-bold'>Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value =>
              value === newPassword || 'Passwords do not match'
          })}
          className={`w-[100%] h-[2.3rem] rounded-md border-[1px] outline-none ${theme === 'dark' ? 'border-gray-500 bg-[#20252e] text-white' : 'border-gray-300 bg-white text-gray-800'} p-2`}
        />
        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
      </div>
      <div className="flex items-center justify-end">
      <button type="submit" className='bg-black px-4  text-white p-1 rounded-sm'>
        Submit
      </button>

      </div>
    </form>

        </div>
      
    </div>
  )
}
