import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { MdDelete, MdEditNotifications } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { CiEdit } from "react-icons/ci";
export default function Faqs({question,answer,user,id,handleEdit,handleDelete}) {
  const [shows,setShows]=useState(false)
  const theme=useSelector(state=>state.theme)
  return (
    <div className="w-[100%] flex flex-col  gap-2 ">
 <div className={`h-[100%] w-[100%] relative ${theme === 'dark' ? 'bg-[#1F242E]' : 'bg-slate-200'}`}>
      <div className='w-[100%] py-3 p-2 flex justify-center items-center'>
        <div className='w-[10%] flex justify-center items-center'>
        <div onClick={()=>setShows(!shows)} className='w-[1.5rem] h-[1.5rem] flex justify-center items-center leading-lg rounded-full bg-green-500 text-white text-md'>
          {shows ? <FaMinus /> : <FaPlus />}
        </div>
        </div>
        <div className='text-center -mb-5 w-[60%]'>
        
          <p>{question}</p>
        </div>
        <div className='flex gap-2'>
          <div onClick={()=>handleEdit(user)} className='text-blue-500 text-xl'><CiEdit /></div>
          <div onClick={()=>handleDelete(id)} className='text-red-500 text-xl'><MdDelete/></div>
        </div>

      </div>
      <div className={` ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'}  flex flex-col gap-1  mt-2 p-3 bottom-0 left-0 ${shows ? 'block' : 'hidden'}`}>
        <h1 className='text-xl font-bold'>Answer</h1>
        <span className='text-md tracking-wider' >{answer}</span>
      </div>
    </div>

   </div>
  )
}
