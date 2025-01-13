import React, { useRef, useState } from 'react';
import { FaSitemap } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import DataTable from '../Ui/Datatable';

export default function Category() {
    const [categoryName, setCategoryName] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const formref=useRef()
    const [isEdit,setIsEdit]=useState(false)
    const [id,setId]=useState(null)
    const queryClient=useQueryClient()
    const {isLoading,isError,isSuccess,error,data=[]}=useQuery({
        queryKey:['category'],
        queryFn:async()=>{
            try{
                const response=await axios.get(`${import.meta.env.VITE_API_URL}/category`)
                if(response.status===200){
                    return response.data.result || []
                }
                else{
                    toast.error(response.data.message)
                }
            }catch(error){
                toast.error(error.response.data.message)
            }
        },
        refetchOnWindowFocus:false
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('CategoryName', categoryName);
        formData.append('Title', metaTitle);
        formData.append('KeyWord', metaKeywords);
        formData.append('Description', metaDescription);
        formData.append('Image', image);
        if(newImage){
            formData.append('NewImage', newImage);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/category`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Category added successfully');
                // Reset form fields
                setCategoryName('');
                setMetaTitle('');
                setMetaKeywords('');
                setMetaDescription('');
                setImage(null);
                queryClient.invalidateQueries({queryKey:['category']})
                formref.current.reset()
            } else {
                // toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };
    const handleDelete=async(id)=>{
        try{
            const response=await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id.CategoryID}`)
            if(response.status===200){
                toast.success('Category deleted successfully');
                queryClient.setQueryData(["category"], (oldData) => {
                    return oldData?.filter((category) => category.CategoryID !== id.CategoryID) || [];
                  });
                 
                  queryClient.invalidateQueries({ queryKey: ['subcategories',id.CategoryID]  });
                  queryClient.invalidateQueries({ queryKey: ['subcategorytwos',id.CategoryID]  });
            }
        }catch(error){
            // toast.error(error.response.data.message);
        }
    }
    const handleEdit=async(id)=>{
        try{
            setIsEdit(true)
            const response=await axios.get(`${import.meta.env.VITE_API_URL}/category/${id.CategoryID}`)
            if(response.status===200){
                setCategoryName(response.data.result[0].CategoryName)
                setMetaTitle(response.data.result[0].Title)
                setMetaKeywords(response.data.result[0].KeyWord)
                setMetaDescription(response.data.result[0].Description)
                setImage(response.data.result[0].Image)
                setId(response.data.result[0].CategoryID)
                window.scrollTo(0, 0);
              
            }
            else{
                toast.error(response.data.message);
            }
        }catch(error){
            // toast.error(error.response.data.message);
        }
    }
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("CategoryName", categoryName);
        formData.append("Title", metaTitle);
        formData.append("KeyWord", metaKeywords);
        formData.append("Description", metaDescription);
        formData.append('Image',image)
        if (newImage) {
            formData.append("NewImage", newImage);
        }
    
       
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/category/update/${id}`, {
                    method: 'PUT',
                    body: formData
                }
            );
    
            if (response.status === 200) {
                toast.success("Category updated successfully");
                queryClient.invalidateQueries({ queryKey: ["category"] }); // Refresh categories
                formref.current.reset();
                setNewImage(null)
                setImage(null)
                setCategoryName('')
                setMetaTitle('')
                setMetaKeywords('')
                setMetaDescription('')
                setIsEdit(false);
            } else {
                toast.error(response.data.message || "Failed to update category");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            // toast.error(errorMessage);
        }
    };
    

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center bg-slate-200'>
            <div className='w-[100%] flex flex-col gap-3 h-[100%]'>
                <ToastContainer autoClose={1000} />
                <div className='flex justify-start px-4  gap-2 w-[100%] items-center'>
                    <FaSitemap className='text-3xl font-semibold' />
                    <h1 className='text-4xl font-normal'> Manage Category</h1>
                </div>
                <div className='w-[80%] bg-white p-4 mb-5 flex flex-col  justify-center items-start'>
                    <form ref={formref} onSubmit={isEdit ? handleEditSubmit : handleSubmit} className='w-[100%]' encType='multipart/form-data'>
                        <div className='w-[100%] grid grid-cols-2 gap-x-10 gap-y-4 justify-center items-center'>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="categoryName" className='text-xl font-semibold'>
                                    Category Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    type="text"
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                                    required
                                />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="MetaTitle" className='text-xl font-semibold'>Meta Title</label>
                                <input
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    type="text"
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="MetaKeywords" className='text-xl font-semibold'>Meta Keywords</label>
                                <input
                                    value={metaKeywords}
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                    type="text"
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                                />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="MetaDescription" className='text-xl font-semibold'>Meta Description</label>
                                <input
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    type="text"
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                                />
                            </div>
                            {!isEdit ? <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="UploadImage" className='text-xl font-semibold'>
                                    Upload Category Image <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    onChange={(e) => setImage(e.target.files[0])}
                                    type="file"
                                  
                                    accept='image/*'
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                                    required
                                />
                            </div>
                            :
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="UploadImage" className='text-xl font-semibold'>
                                    Upload Updated Category Image <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    onChange={(e) => setNewImage(e.target.files[0])}
                                    type="file"
                                  
                                    accept='image/*'
                                    className='w-[100%] h-[50px] outline-none border-2 border-gray-300 rounded-md p-2'
                               
                                />
                            </div>
                            }
                        </div>
                        {isEdit && 
                        <>
                        <h1 className='text-xl mt-3 font-semibold'>Current Image</h1>
                        <div className='w-[13rem] h-[15rem] border-[1px] border-gray-300 rounded-md flex justify-center items-center p-2'>
                            <img src={import.meta.env.VITE_API_URL+"/"+image} alt="image" className='w-[100%]  object-cover'/>
                        </div>
                        </>
                        }
                        <div className='w-[100%] mt-5 border-t-[1px] border-gray-300 py-2 flex justify-between items-center'>
                            <button type='reset' className='bg-white text-black border-2 border-gray-300 px-4 py-2 rounded-md'>
                                Cancel
                            </button>
                           { !isEdit ? <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                                Submit
                            </button> : <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md' >
                                Update
                            </button>}
                        </div>
                    </form>
                </div>
                    {(!isLoading && data.length>0) ? <DataTable data={data}
                    onDelete={handleDelete}
                    title="List Of Category"
                    onEdit={handleEdit}
                     /> : <div className="w-[100%] h-[100%] flex items-center justify-center">
                        <h1 className="text-2xl font-bold">No Data Found</h1>
                    </div>}
            </div>
        </div>
    );
}
