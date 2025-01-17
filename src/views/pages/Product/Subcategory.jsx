import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaSitemap } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';                
import DataTable from '../Ui/Datatable';
import { useSelector } from 'react-redux';
export default function Subcategory() {
    document.title = 'Subcategory'
    const formref = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategoryImage, setSubcategoryImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [subId, setSubId] = useState('');
    const [newImage, setNewImage] = useState('');
    const [catLoading, setCatLoading] = useState(false);
    const queryClient = useQueryClient();
    const theme=useSelector((state)=>state.theme)
    const handleGetCategories = async () => {
        setCatLoading(true);
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'/category');
            if(res.status === 200){
                setCategories(res.data.result || []);
                setCatLoading(false);
            }
        } catch (error) {
            // toast.error(error.response.data.message);
        }
        setCatLoading(false);
    }
    const handleGetSubCategories = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'/category/update/2');
            if(res.status === 200){
                    return res.data.result || [];
            }
        } catch (error) {
            // toast.error(error.response.data.message);
            return [];
        }
    }
    const {isLoading, isError, data=[], error} = useQuery({
        queryKey: ['subcategories'],
        queryFn: handleGetSubCategories, 
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ParentCategoryID', categoryId);
        formData.append('CategoryName', subcategoryName);
        formData.append('Image', subcategoryImage);
        formData.append('SubCategoryLevel', 2);
       
        console.log(categoryId);
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL+'/category', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res.status === 200){
                toast.success(res.data.message);
                queryClient.invalidateQueries({ queryKey: ['subcategories'] });
                formref.current.reset();
                setCategoryId('');
                setSubcategoryName('');
                setSubcategoryImage('');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
     

    }
    useEffect(() => {
        handleGetCategories();
    }, [])
    
    const handleEdit=async(id)=>{
        console.log(id);
        setIsEdit(true);
        setCategoryId(id.ParentCategoryID);
        setSubcategoryName(id.CategoryName);
        setSubcategoryImage(id.Image);
        setSubId(id.CategoryID);
        console.log(categoryId);
        window.scrollTo(0, 0);
 
    }
    const handleDelete=async(id)=>{
        try {
            const res = await axios.delete(import.meta.env.VITE_API_URL+'/category/'+id.CategoryID);
            if(res.status === 200){
                toast.success(res.data.message);
                    queryClient.setQueryData(["subcategories"], (oldData) => {
                        return oldData?.filter((subcategory) => subcategory.CategoryID !== id.CategoryID) || [];
                    }); 
                    queryClient.invalidateQueries({ queryKey: ['subcategorytwos']  });
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log(categoryId);
        const formData = new FormData();
        formData.append('ParentCategoryID', categoryId);
        formData.append('CategoryName', subcategoryName);
        formData.append('Image', subcategoryImage);
        formData.append('SubCategoryLevel', 2);
        if (newImage) {
            formData.append("NewImage", newImage);
        }
        try {
            const res = await axios.put(import.meta.env.VITE_API_URL+'/category/update/'+subId, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res.status === 200){
                toast.success(res.data.message);
                queryClient.invalidateQueries({ queryKey: ['subcategories'] });
                formref.current.reset();
                setIsEdit(false);
                setCategoryId('');
                setSubcategoryName('');
                setSubcategoryImage('');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
  return (
    <div className={`w-[100%] h-[100%] flex justify-center items-center ${theme === 'dark' ? 'bg-[#1D222B] text-white' : 'bg-slate-200 text-black'}`}>
        <ToastContainer autoClose={1000}/>
    <div className='w-[100%] flex flex-col gap-3 h-[100%]'>
        <div className='flex mt-2 justify-start px-4  gap-2 w-[100%] items-center'>
            <FaSitemap className='text-3xl font-semibold' />
            <h1 className='text-4xl font-normal'> Manage Subcategory</h1>
        </div>
        <div className={`w-[80%] ${theme === 'dark' ? 'bg-[#2E3442]' : 'bg-white'} mb-5 p-4 flex flex-col  justify-center items-start`}>
            <form onSubmit={isEdit ? handleUpdate : handleSubmit} ref={formref}  className='w-[100%]' encType='multipart/form-data'>
                <div className='w-[100%] grid grid-cols-2 gap-x-10 gap-y-4 justify-center items-center'>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="subcategoryName" className='text-xl font-semibold'>
                            Category Name <span className='text-red-500'>*</span>
                        </label>
                        <select name='categoryId' disabled={isEdit}  onChange={(e) => setCategoryId(e.target.value)} 
                            value={categoryId} 
                        className={`w-[100%] h-[50px] outline-none  p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md ${isEdit ? 'bg-gray-200' : ''}`} required>
                            <option value=''>Select Category</option>
                            {catLoading ? <option value=''>Loading...</option> : categories?.map((category) => (
                                <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="subcategoryDescription" className='text-xl font-semibold'>
                            Subcategory Name <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' value={subcategoryName}
                         name='subcategoryName' onChange={(e) => setSubcategoryName(e.target.value)} className={`w-[100%] h-[50px] outline-none p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`} required/>
                    </div>
                    {!isEdit ? <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="subcategoryImage" className='text-xl font-semibold'>
                            Subcategory Image <span className='text-red-500'>*</span>
                        </label>
                        <input type='file' name='subcategoryImage' 
                        onChange={(e) => setSubcategoryImage(e.target.files[0])} accept='image/*' className={`w-[100%] h-[50px] outline-none p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`} required/>
                    </div> : <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="subcategoryImage" className='text-xl font-semibold'>
                           Uploaded New Subcategory Image
                        </label>
                        <input type='file' name='subcategoryImage' onChange={(e) => setNewImage(e.target.files[0])} accept='image/*' 
                        className={`w-[100%] h-[50px] outline-none p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`}/>
                    </div>}
                </div>
                    {isEdit && <div className='w-[100%] mt-3 flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="subcategoryImage" className='text-xl font-semibold'>
                           Subcategory Old Image
                        </label>
                        <div className='w-[10rem] h-[10rem] p-3 rounded-md border-[1px] border-gray-300 flex justify-center items-center'>
                            <img src={import.meta.env.VITE_API_URL+"/"+subcategoryImage} alt="image" className=" h-[100px] object-cover"/>
                        </div>
                    </div>}
                <div className='w-[100%] flex border-t-[1px] border-gray-300 mt-4 pt-3 justify-between items-center'>
                    <button type='button' onClick={() =>{ setIsEdit(false), formref.current.reset(), setCategoryId(''), setSubcategoryName(''), setSubcategoryImage('')}} className='bg-white border-[1px] border-gray-300  px-4 text-black p-2 rounded-md'>Cancel</button>
                   {isEdit ? <button type='submit' className='bg-black px-4 text-white p-2 rounded-md'>Update</button> : <button type='submit' className='bg-black px-4 text-white p-2 rounded-md'>Submit</button>}
                </div>
            </form>
        </div>
            {!isLoading ? <DataTable data={data}
            onEdit={handleEdit}
            title="List Of Subcategory"
            onDelete={handleDelete}
            /> : <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <h1 className='text-2xl font-semibold'>Loading...</h1>
            </div>}
    </div>
    </div>
  )
}