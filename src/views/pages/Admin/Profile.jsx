import React from 'react'
import { FaUserAlt,FaEnvelope,FaPhone } from 'react-icons/fa'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useQuery,useQueryClient } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

const fetchAdminData = async (Aid) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/${Aid}`);
    return response.data.result[0];
}
export default function Profile() {
    document.title = 'Admin Profile'
    const Aid = Cookies.get('Aid')
    const [user,setUser] = useState(null)
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey: ['admin', Aid],
        queryFn: () => fetchAdminData(Aid),
    });
    const theme=useSelector((state)=>state.theme)

    useEffect(() => {
        if (data) {
            setUser(data); // Assuming setUser is your state update function
        }
    }, [data]);

    if (isLoading){
        return <div className="animate-pulse   xl:w-1/2 " >
        <div className="h-10 bg-gray-300 rounded w-2/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="w-[100%] flex items-end justify-end">
    <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
    </div>
  </div>
    }
       
    if (error) return <div>Error: {error.message}</div>;

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/${Aid}`,user)
            console.log(response)
            queryClient.invalidateQueries({queryKey:['admin',Aid]})
            toast.success("Profile Updated Successfully")
        }catch(error){
            toast.error("Profile Update Failed")
        }
        
    }
    
  return (
    <div className={`w-[100%] px-3 h-[100%] ${theme === 'dark' ? 'bg-[#2a2f3a] text-white' : 'bg-slate-200 text-gray-800 '} flex flex-col gap-3 items-start justify-start`}    >
        <ToastContainer autoClose={1000}/>
        <div className="flex items-center gap-2 justify-start w-[100%]">
        <FaUserAlt className='text-2xl font-semibold' />
        <h1 className='text-3xl font-normal'>Admin Profile</h1>
        </div>
      <div className={`lg:w-[55%] border-t-[3px]  border-yellow-300  h-fit p-4 ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} flex flex-col gap-10 items-center justify-center`}>
        <form onSubmit={handleSubmit} className='flex flex-col w-[100%]  gap-3'>
            <div className="flex flex-col gap-1">
            <label htmlFor="name" className='font-bold'>Admin Name</label>
                <div className='w-[100%] h-[2.3rem] relative flex items-end justify-end'>
                <div className={`w-[10%] h-full border-l-[1px] border-t-[1px] border-b-[1px]  flex items-center rounded-l justify-center p-1 ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`}>

                <FaUserAlt />
                </div>
            <input type="text" placeholder='Enter your name' 
            onChange={(e)=>setUser({...user,username:e.target.value})}
             defaultValue={user?.username} 
             className={`w-[90%] p-1 h-[100%] outline-none border
              ${theme === 'dark' ? 'border-gray-500 bg-[#272c36] text-white' : 'border-gray-300 bg-white0 text-gray-800'} `} />
                
                </div>
            </div>
            <div className="flex flex-col gap-1">
            <label htmlFor="email" className='font-bold'>Email ID </label>
                <div className='w-[100%] h-[2.3rem] relative flex items-end justify-end'>
                <div className={`w-[10%] h-full border-l-[1px] border-t-[1px] border-b-[1px]  flex items-center rounded-l justify-center p-1 ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`}>

                <FaEnvelope />
                </div>
            <input type="text" placeholder='Enter your email'
             onChange={(e)=>setUser({...user,email:e.target.value})} defaultValue={user?.email} 
             className={`w-[90%] p-1 h-[100%] outline-none border
              ${theme === 'dark' ? 'border-gray-500 bg-[#272c36] text-white' : 'border-gray-300 bg-white0 text-gray-800'} `} />
                
                </div>
            </div>
            <div className="flex flex-col gap-1">
            <label htmlFor="phone" className='font-bold'>Phone No</label>
                <div className='w-[100%] h-[2.3rem] relative flex items-end justify-end'>
                <div className={`w-[10%] h-full border-l-[1px] border-t-[1px] border-b-[1px]  flex items-center rounded-l justify-center p-1 ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`}>
                <FaPhone />
                </div>
            <input type="text" placeholder='Enter your phone'
             onChange={(e)=>setUser({...user,phone:e.target.value})} defaultValue={user?.phone} 
             className={`w-[90%] p-1 h-[100%] outline-none border
              ${theme === 'dark' ? 'border-gray-500 bg-[#272c36] text-white' : 'border-gray-300 bg-white text-gray-800'} `} />
                
                </div>
            </div>
           <div className='flex flex-col items-end justify-end gap-2'>
           <button className='w-fit p-1  bg-black px-4 text-white '>Update</button>
           </div>
        </form>
      </div>

    </div>
  )
}