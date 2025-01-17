import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import MyEditor from '../../Ui/MyEditor';
import axios from 'axios';
import { use } from 'react';
import { useSelector } from 'react-redux';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPenToSquare } from "react-icons/fa6";
export default function CMs() {
  document.title = 'CMS'
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState(false);
  const [header, setHeader] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
 useEffect(()=>{
  axios.get(`${import.meta.env.VITE_API_URL}/cms`).then((res)=>{
    setTitle(res.data.result);
    
  })
 },[])
 useEffect(()=>{
  if(type){
    axios.get(`${import.meta.env.VITE_API_URL}/cms/${type}`).then((res)=>{
      setValue(res.data.result[0].content);
    }).catch((err)=>{
      alert(err.response.data.message);
    })
  }
 },[type])
  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true);
    console.log(id,type,value);
    axios.put(`${import.meta.env.VITE_API_URL}/cms/${type}`,{header:type,content:value}).then((res)=>{
      setLoading(false);
      setType('');
      setData(true)
    }).catch((err)=>{
      setLoading(false);
      alert(err.response.data.message);
    })
  }
  const handleAddHeader = (e)=>{
    e.preventDefault();
    const confirm=window.confirm('Are you sure you want to add this header?');
    if(!confirm) return;
    console.log(e.target.value);
    axios.post(`${import.meta.env.VITE_API_URL}/cms`,{header:header}).then((res)=>{
      setShow(false);
      setHeader('');
    }).catch((err)=>{
      alert(err.response.message);
    })
  }
  const theme=useSelector((state)=>state.theme)
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setData(false);
    },1000)
    return ()=>clearTimeout(timer);
  },[type])
  return (
    <div className={`w-[100%]  relative  flex flex-col justify-center items-center py-2 gap-2  overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-slate-200 text-gray-800 '}`}>
      <div className='flex gap-2 mt-2 pl-4 items-center justify-start w-[100%]'>
        <FaPenToSquare  className='text-2xl font-bold' />
        <h1 className='text-3xl font-normal'>Manage CMS</h1>
      </div>
      <div className={`w-[100%] h-[100vh] flex justify-center items-center overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-slate-200 text-gray-800 '}`}>
        <div className={`w-[100%] h-[100vh] flex flex-col  p-2 overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-slate-200 text-gray-800 '}`}>
         
           <form onSubmit={handleSubmit} 
          className={`w-[100%] h-fit flex-col  py-[2rem] px-[2rem] flex justify-center
           items-center overflow-hidden ${theme === 'dark' ? 'bg-[#2d3442] text-white' : 'bg-white text-gray-800 '}`}>
            <div className='w-[100%] mb-2 flex items-end justify-end'>
              <div onClick={()=>setShow(true)} className='bg-black text-white px-2 py-1 rounded-md cursor-pointer'><span>Add</span></div>
            </div>
            <div className='w-[100%]  flex-col gap-4 flex justify-start items-start overflow-hidden '>
             <span className='text-md text-green-500 font-semibold'>{data && 'Update Successfully'}</span>
            </div>
            <div className='w-[100%]  flex-col gap-4 flex justify-center items-center overflow-hidden '>
              <select onChange={(e)=>setType(e.target.value)}
               className={`w-[100%] outline-none py-2 px-3 mt-[2rem] border-[1px] ${theme === 'dark' ? 'bg-[#252b36] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}  rounded-md flex justify-center items-center overflow-hidden`}>
                <option value="">Select Type</option>
                { title && title?.map((item)=>(
                  <option key={item.id} value={item.id} className='capitalize'>{item.header}</option>
                ))}
              </select>
              {type && 
              <div className={` w-[100%] mb-[2rem] ${theme === 'dark' ? 'bg-[#252b36] text-white' : 'bg-white text-gray-800'} `}>
              <MyEditor value={value} setValue={setValue} />
              </div>
              }
            </div>
            <div className={`w-[100%] mt-[2rem] border-t-[1px] ${theme === 'dark' ? 'border-gray-300' : 'border-gray-300'} pt-[1rem] flex items-center justify-between`}>
              <button type='reset' onClick={()=>{setValue(''),setType('')}} className={`capitalize font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-[#2d3442] text-white' : 'bg-gray-200 text-black'}`}>clear</button>
              <button className={`bg-blue-500 capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md ${theme === 'dark' ? '  text-white' : 'bg-blue-500 text-white'}`}>Update Content</button>
            </div>
          </form>

        </div>
      </div>
  {show &&    <div className='absolute top-0 transition-all duration-300  text-black left-0 w-[100%] xl:h-[100vh] lg:h-[100vh] md:h-[100vh] h-[100%] bg-[#00000028] backdrop-blur-sm flex items-center justify-center overflow-hidden'>
        <div className='w-[100%] h-[100%]  flex items-center justify-center overflow-hidden'>
          <form onSubmit={handleAddHeader} className='w-[40%] bg-white relative  mt-[-25rem] p-[2rem]  flex flex-col items-center justify-start overflow-hidden'>
            <div className='absolute top-2 right-3'>
              <span onClick={()=>setShow(false)} className='text-2xl font-semibold mb-2 cursor-pointer'><IoCloseSharp /></span>
            </div>
            <h1 className='text-2xl font-semibold mb-2 '>Add New Header</h1>
            <div className='w-[100%] flex flex-col gap-3 items-end justify-end overflow-hidden'>
              <input type="text" value={header} onChange={(e)=>setHeader(e.target.value)} placeholder='Enter Header' className='w-[100%] bg-white outline-none border-[1px] border-gray-300 py-2 px-4 rounded-md' />
              <button type='submit' className='bg-blue-500 w-fit capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md'>Submit</button>
            </div>

            </form>
        </div>
      </div>}

    </div>
  )
}
