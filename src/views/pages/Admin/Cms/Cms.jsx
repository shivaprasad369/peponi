import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import MyEditor from '../../Ui/MyEditor';
import axios from 'axios';
import { use } from 'react';
import { useSelector } from 'react-redux';
export default function CMs() {
  document.title = 'CMS'
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState([]);
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
      alert(res.data.message);
    }).catch((err)=>{
      setLoading(false);
      alert(err.response.data.message);
    })
  }
  const handleAddHeader = (e)=>{
    e.preventDefault();
    console.log(e.target.value);
    axios.post(`${import.meta.env.VITE_API_URL}/cms`,{header:header}).then((res)=>{
      alert(res.data.message);
    }).catch((err)=>{
      alert(err.response.message);
    })
  }
  const theme=useSelector((state)=>state.theme)
  return (
    <div className={`w-[100%]  relative  flex justify-center items-center overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-slate-100 text-gray-800 '}`}>
      <div className={`w-[100%] h-[100vh] flex justify-center items-center overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '}`}>
        <div className={`w-[100%] h-[100vh] flex  p-2 overflow-hidden ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-gray-800 '}`}>
          <form onSubmit={handleSubmit} 
          className={`w-[100%] h-fit flex-col  py-[2rem] px-[2rem] flex justify-center
           items-center overflow-hidden ${theme === 'dark' ? 'bg-[#2d3442] text-white' : 'bg-white text-gray-800 '}`}>
            <div className='w-[100%] mb-2 flex items-end justify-end'>
              <div onClick={()=>setShow(true)} className='bg-black text-white px-2 py-1 rounded-md cursor-pointer'><span>Add</span></div>
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
              <button className={`bg-blue-500 capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md ${theme === 'dark' ? '  text-white' : 'bg-blue-500 text-white'}`}>update</button>
            </div>
          </form>

        </div>
      </div>
  {show &&    <div className='absolute top-0 transition-all duration-300  text-black left-0 w-[100%] xl:h-[100vh] lg:h-[100vh] md:h-[100vh] h-[100%] bg-black/80 flex items-center justify-center overflow-hidden'>
        <div className='w-[100%] h-[100%]  flex items-center justify-center overflow-hidden'>
          <form onSubmit={handleAddHeader} className='w-[40%] bg-white relative  mt-[-25rem] p-[2rem]  flex flex-col items-center justify-start overflow-hidden'>
            <div className='absolute top-0 right-3'>
              <span onClick={()=>setShow(false)} className='text-2xl font-semibold mb-2 cursor-pointer'>X</span>
            </div>
            <h1 className='text-2xl font-semibold mb-2 '>Add New Header</h1>
            <div className='w-[100%] flex flex-col gap-3 items-end justify-end overflow-hidden'>
              <input type="text" value={header} onChange={(e)=>setHeader(e.target.value)} placeholder='Enter Header' className='w-[100%] bg-white outline-none border-[1px] border-gray-300 py-2 px-4 rounded-md' />
              <button type='submit' className='bg-blue-500 w-fit capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md'>update</button>
            </div>

            </form>
        </div>
      </div>}

    </div>
  )
}
