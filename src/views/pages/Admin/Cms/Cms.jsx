import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import MyEditor from '../../Ui/MyEditor';
import axios from 'axios';
import { use } from 'react';
export default function CMs() {
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

  return (
    <div className='w-[100%] relative  flex justify-center items-center overflow-hidden bg-gray-200'>
      <div className='w-[100%] h-[100vh] flex justify-center items-center overflow-hidden bg-gray-200'>
        <div className='w-[100%] h-[100vh] flex  p-2 overflow-hidden bg-gray-200'>
          <form onSubmit={handleSubmit} className='w-[100%] flex-col h-fit py-[2rem] px-[2rem] flex justify-center items-center overflow-hidden bg-white'>
            <div className='w-[100%] mb-2 flex items-end justify-end'>
              <div onClick={()=>setShow(true)} className='bg-black text-white px-2 py-1 rounded-md cursor-pointer'><span>Add</span></div>
            </div>
            <div className='w-[100%]  flex-col gap-4 flex justify-center items-center overflow-hidden '>
              <select onChange={(e)=>setType(e.target.value)} className='w-[100%] outline-none py-2 px-3 border-[1px] border-gray-300 rounded-md flex justify-center items-center overflow-hidden'>
                <option value="">Select Type</option>
                { title && title?.map((item)=>(
                  <option key={item.id} value={item.id} className='capitalize'>{item.header}</option>
                ))}
              </select>
              {type && 
              <div className='w-[100%] h-[25rem] pb-[2rem] mb-[2rem] '>
              <MyEditor value={value} setValue={setValue} />
              </div>
              }
            </div>
            <div className='w-[100%]  border-t-[1px] border-gray-300 pt-[1rem] flex items-center justify-between'>
              <button type='reset' className='bg-white capitalize font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md'>clear</button>
              <button className='bg-blue-500 capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md'>update</button>
            </div>
          </form>

        </div>
      </div>
  {show &&    <div className='absolute top-0 transition-all duration-300  left-0 w-[100%] xl:h-[100vh] lg:h-[100vh] md:h-[100vh] h-[100%] bg-black/80 flex items-center justify-center overflow-hidden'>
        <div className='w-[100%] h-[100%]  flex items-center justify-center overflow-hidden'>
          <form onSubmit={handleAddHeader} className='w-[40%] bg-white relative  mt-[-25rem] p-[2rem]  flex flex-col items-center justify-start overflow-hidden'>
            <div className='absolute top-0 right-3'>
              <span onClick={()=>setShow(false)} className='text-2xl font-semibold mb-2 cursor-pointer'>X</span>
            </div>
            <h1 className='text-2xl font-semibold mb-2 '>Add New Header</h1>
            <div className='w-[100%] flex flex-col gap-3 items-end justify-end overflow-hidden'>
              <input type="text" value={header} onChange={(e)=>setHeader(e.target.value)} placeholder='Enter Header' className='w-[100%] outline-none border-[1px] border-gray-300 py-2 px-4 rounded-md' />
              <button type='submit' className='bg-blue-500 w-fit capitalize text-white font-semibold border-[1px] tracking-wider border-gray-300 py-2 px-4 rounded-md'>update</button>
            </div>

            </form>
        </div>
      </div>}

    </div>
  )
}
