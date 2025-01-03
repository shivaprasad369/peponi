import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MyEditor from '../Ui/MyEditor'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from '../Ui/Datatable';
import View from '../Ui/View';
import { useSelector } from 'react-redux';
export default function Blogs() {
    const [value, setValues] = useState('');
    const queryClient = useQueryClient()
  const [isEdit,setIsEdit] = useState(false)
  const {register,handleSubmit,formState:{errors},getValues,setValue,reset} = useForm()
  const [image,setImage] = useState('')
  const [blogs,setBlogs] = useState([])
  const [view,setView] = useState(false)
  const [viewData,setViewData] = useState('')
  const theme=useSelector((state)=>state.theme)
  const [deleting,setDeleting]=useState(false)
  const onSubmit = async (data) => {

    const formData = new FormData()
        formData.append('title',data.title)
    formData.append('author',data.author)
    formData.append('shortdesc',data.shortdescription)
    formData.append('description',value)
    if (data.image && data.image[0]) {
        formData.append('Image', data.image[0]);
    } else {
        toast.error('No image selected');
        return;
    }
  
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/blog`,formData,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            
        )
            if(response.status === 200){
                toast.success('Blog added successfully')
                reset()
                setValues('')
                queryClient.invalidateQueries({ queryKey: ['blogs'] })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
  }
  const handleDelete = async (id) => {
    setDeleting(true)
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`)
        if(response.status === 200){
            toast.success('Blog deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            setDeleting(false)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        setDeleting(false)
    }
  }
  const handleEditSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title',data.title)
    formData.append('author',data.author)
    formData.append('shortdesc',data.shortdescription)
    formData.append('description',value)
    if (data.image && data.image[0]) {
        formData.append('Image', data.image[0]);
    } else {
        toast.error('No image selected');
        return;
    }
    console.log(formData.get('Image'))
   try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/blog/${data.id}`,formData,
      {
          headers:{
              'Content-Type':'multipart/form-data'
          }
      }
      )
    if(response.status === 200){
        toast.success('Blog updated successfully')
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
        reset()
        setValues('')
        setIsEdit(false)
    }
   } catch (error) {
    toast.error(error.response.data.message)
   }
  }
  const handleEdit = async (id) => {
 
    setValue("author",id.author)
    setValue("shortdescription",id.shortdesc)
    setValue("title",id.title)
    setValue("image",id.image)
    setValues(id.description)
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValue('id',id.id)
    setIsEdit(true)
   setImage(()=>id.image)

  }
  useEffect(()=>{
    setImage(()=>getValues('image'))
   
  },[getValues])
  const { data: dataBlog, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
        if (response.status === 200) {
          return response.data.result;
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        throw error;
      }
    },
    refetchOnWindowFocus: false, 
    
    retry: 1,
  });
  
    useEffect(() => {
    if (dataBlog?.length > 0) setBlogs(dataBlog);
  }, [dataBlog]);
  const handleView = (id) => {
   setView(true)
   setViewData(id)
  }
  const handleClose = () => {
    setView(false)
    setViewData('')
  }
  if(isLoading){
    return <div className="animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/5 mb-1"></div>
    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/5 mt-3 mb-1"></div>
    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/5 mt-3 mb-1"></div>
    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/5 mt-3 mb-1"></div>
    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/5 mt-3 mb-1"></div>
    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className='flex items-end justify-end w-3/4'>
    <div className="h-10 bg-gray-300 rounded w-1/5 mt-3 mb-1"></div>

    </div>
  </div>
  }
  return (
    <div className={`p-4 w-full h-full flex-col gap-10 ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} flex justify-center items-center`}>
        <ToastContainer/>
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} rounded-md p-4`}>
      <h1 className='text-2xl font-bold'>Manage Blogs</h1>
      <div className='flex justify-center w-[100%] items-center mt-4'>
        <form className='flex w-[100%] flex-col ' onSubmit={handleSubmit(isEdit ? handleEditSubmit : onSubmit)} encType='multipart/form-data'>
            <label htmlFor='title' className='text-lg mt-3 font-semibold'>Blog Title</label>
            <input type="text" placeholder='Title' defaultValue={getValues('title')}
            className={`p-2 border-[1px]  outline-none rounded-sm ${theme === 'dark' ? 'bg-[#212631] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
             {...register('title',{required:true})} />
            {errors.title && <span className='text-red-500'>Title is required</span>}
            <label htmlFor='author' className='text-lg mt-3 font-semibold'>Author</label>
            <input type="text" placeholder='Author' defaultValue={getValues('author')}
            className={`p-2 border-[1px]  outline-none rounded-sm ${theme === 'dark' ? 'bg-[#212631] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
             {...register('author',{required:true})} />
            {errors.author && <span className='text-red-500'>Author is required</span>}
            <label htmlFor='shortdescription' className='text-lg mt-3 font-semibold'>Short Description</label>
            <textarea  placeholder='Short Description' rows={5} defaultValue={getValues('shortdescription')}
             className={`p-2 border-[1px]  outline-none rounded-sm ${theme === 'dark' ? 'bg-[#212631] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`} {...register('shortdescription',{required:true})} />
            {errors.shortdescription && <span className='text-red-500'>Short Description is required</span>}
            <label htmlFor='description' className='text-lg mt-3 -mb-3 font-semibold'>Description</label>
            <div className='w-[100%] mt-3 h-[25rem] pb-[2rem] mb-[2rem] '>
                    <MyEditor value={value} setValue={setValues} />
              </div>
                {isEdit && <div className='flex flex-col gap-2'>
            <label htmlFor='image' className='text-lg mt-3 -mb-3 font-semibold'>Old Image</label>
        
                <div className='flex w-[10rem] h-[10rem] p-1 border-[1px] border-gray-300 justify-center items-center'>
                 <img src={`${import.meta.env.VITE_API_URL}/${image}`} alt='blog' className=' h-[100px] object-cover rounded-md' />
               
                </div>
                </div>
                }
            <label htmlFor='image' className='text-lg mt-3 -mb-3 font-semibold'>Image</label>
            <input type="file" placeholder='Image' accept='image/*' defaultValue={getValues('image')} 
            className={`p-2 mt-3 border-[1px]  outline-none rounded-sm ${theme === 'dark' ? 'bg-[#212631] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`} 
            {...register('image',{required:true})} />
            {errors.image && <span className='text-red-500'>Image is required</span>}
            <div className='flex justify-between pt-1 border-t-[1px] border-gray-300 mt-5 w-full items-center'> 
                <button type='reset' onClick={()=>{reset(),setValues(''),setIsEdit(false),setValue('shortdescription','')}} className={`capitalize font-semibold border-[1px] tracking-wider  py-2 px-4 rounded-md mt-3 ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>clear</button>
            {!isEdit && <button type='submit' className={`bg-black text-white p-2 rounded-md mt-3 ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>Add Blog</button>}
            {isEdit && <button type='submit' className={`bg-black text-white p-2 rounded-md mt-3 ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>Update Blog</button>}
            </div>
        </form>
    
        </div>
        </div>
        {dataBlog ?<DataTable
        data={blogs}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onDelete={handleDelete}
        deleting={deleting}
        expand={false}
        onView={handleView}
        view={true}
        onEdit={handleEdit}
      /> : <div className='w-[100%] h-[100%] flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>No Blogs Found</h1>
      </div>}
  
     {view && <View onClose={handleClose}  >
        <div className='w-[70%] h-[95%] py-[3rem] text-black bg-white p-[2rem] flex flex-col gap-5 items-center justify-center   rounded-md overflow-y-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-2xl font-semibold'>View Blog</h1>
          <div className='w-[100%] h-[100%] flex flex-col gap-5 items-center justify-center'> 
            <div className='w-[100%] h-[100%] flex flex-col gap-2 items-start justify-start'> 
              <div className='flex w-[100%] h-[100%] items-center border-[1px] border-gray-300 rounded-md p-4 justify-center'>
            <img src={`${import.meta.env.VITE_API_URL}/${viewData.image}`} alt='blog' className=' w-[20rem] object-cover rounded-md' />
              </div>
              <h1 className='text-2xl font-semibold'>Title: {viewData.title}</h1>
              <p className='text-lg font-semibold'>Author: {viewData.author}</p>
              <p className='text-lg font-semibold'>Short Description: {viewData.shortdesc}</p>
                  <div className='text-lg font-semibold'>Description:<p dangerouslySetInnerHTML={{ __html:viewData.description}} className='flex tracking-wider flex-col gap-2' /></div>
                
              <div className='w-[100%] h-[100%] flex flex-col gap-2 items-start justify-start'> 
            
             
              </div>
            </div>
          </div>
        </div>
      </View>}
    </div>
  )
}

