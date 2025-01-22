import React, { useEffect, useState } from 'react'
import { FaSitemap } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md'
import useGetCategory from '../Ui/useGetCategory'
import { IoIosAddCircle } from 'react-icons/io'
import { HiMinusCircle } from 'react-icons/hi'
import AttributeUi from '../Ui/AttributeUi'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Attributetabel from '../Ui/Attributetabel'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NewAttributes from '../Ui/NewAttributes'
import { useSelector } from 'react-redux'
export default function Attribute() {
    document.title = 'Attribute'
    const {category, loading, error, getCategory} = useGetCategory()
    const {category:subCategory, loading:subCategoryLoading, error:subCategoryError, getCategory:getSubCategory} = useGetCategory()
    const {category:subCategoryLv2, loading:subCategoryLv2Loading, error:subCategoryLv2Error, getCategory:getSubCategoryLv2} = useGetCategory()
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)
    const [subCategoryLv2Id, setSubCategoryLv2Id] = useState(null)
    const [attributeData, setAttributeData] = useState([])
    const [attributeCount, setAttributeCount] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const theme=useSelector((state)=>state.theme)
    const queryClient = useQueryClient()    
    const [isCancel, setIsCancel] = useState(false)
    const [number, setNumber] = useState([1])
    const {data:attributeD, isLoading:attributeLoading, isError:attributeError, refetch:attributeRefetch} = useQuery({
        queryKey:['attribute'],
        queryFn:async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/attribute`)
                if(response.status === 200){
                    return response.data
                }
            } catch (error) {
                toast.error(error.response.data.message || 'Something went wrong!')
            }
        }
    })
console.log(attributeD)
    useEffect(() => {
        getCategory()
    }, [])
    useEffect(() => {
        if(categoryId){
            getSubCategory(categoryId)
        }
    }, [categoryId])
    useEffect(() => {
        if(subCategoryId){
            getSubCategoryLv2(subCategoryId)
        }
    }, [subCategoryId])
    const handleNewAddAttribute = () => {
        setAttributeCount((prev) => prev + 1)
        setNumber((prev) => [...prev, Number(attributeCount) + 1])

    }
    console.log(number)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const Attributes = Object.values(attributeData).map((item) => ({
          attributeName: item.attributeName,
          values: item.value,
        }));
        try {
          if (categoryId && subCategoryId ) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/attribute`,
                {   Attributes ,
                categoryId,
                subCategoryId
            });
            if (response.status === 200) {
              toast.success(response.data.message);
              queryClient.invalidateQueries({queryKey:['attribute']})
              setAttributeData([])
              setAttributeCount(1) 
              setCategoryId('')
              setIsCancel(false)
              setSubCategoryId('')
              setSubCategoryLv2Id('')
           setNumber([0])
            }
          } else {
            toast.error('Please select all the fields'); 
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || 'Something went wrong!');
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
        }
      };
    const handleReset = () => {
        setAttributeData([])
        setAttributeCount(1) 
        setCategoryId('')
        setSubCategoryId('')
        setSubCategoryLv2Id('')
        setNumber([0])
    }
    const handleEdit=(value)=>{
       
        setIsCancel(true)
        window.scrollTo(0, 0);
        setCategoryId(value.CategoryID)
        setSubCategoryId(value.subcategory)
        // setSubCategoryLv2Id(value.subcategorytwo)
        setAttributeData(value.attributes)
        setAttributeCount(value.attributes.length)
        setNumber(value.attributes.map((item) => item.attribute_id))
        setIsEdit(true)
      }
      const handleEditSubmit = async (e) => {
        e.preventDefault();
        const Attributes = Object.values(attributeData).map((item) => ({
            attributeName: item.attributeName,
            attributeId: item.attribute_id,
            values: item.values
          }));
          console.log(Attributes)
          try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/attribute`,{
                Attributes,
                categoryId,
                subCategoryId
                // subCategoryLv2Id
            })
            if(response.status === 200){
                toast.success(response.data.message)
                queryClient.invalidateQueries({queryKey:['attribute']})
                setAttributeData([])
                setAttributeCount(1) 
                setCategoryId('')
                setIsCancel(false)
                setSubCategoryId('')
                // setSubCategoryLv2Id('')
                setIsEdit(false)
                setNumber([0])
            }
          } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong!')
          }
      }
  return (
    <div className={`w-[100%] h-[100%] flex justify-center items-center ${theme === 'dark' ? 'bg-[#1D222B] text-white' : 'bg-slate-200 text-black'}`}>
        <ToastContainer/>
    <div className='w-[100%] p-2 flex flex-col gap-3 h-[100%]'>
        <div className='flex mt-2 justify-start px-4  gap-2 w-[100%] items-center'>
            <FaSitemap className='text-3xl font-semibold' />
            <h1 className='text-4xl font-normal'>  Manage Attributes</h1>
        </div>
       {isCancel && <div className={`w-[100%] ${theme === 'dark' ? 'bg-[#2E3442]' : 'bg-white text-[#252525]'} p-4 flex flex-col  justify-center items-start`}>
            <form onSubmit={isEdit ? handleEditSubmit : handleSubmit}  className='w-[100%]'>
                <div className="w-[100%]  text-2xl font-semibold  flex gap-1 items-center">
                <MdCategory /> <span>Category</span>
                </div>
                <div className={`'w-[100%] ${theme === 'dark' ? 'bg-[#1D222B]' : 'bg-slate-200'} p-4 mt-2 grid grid-cols-2 gap-x-8 gap-y-4 justify-center items-center`}>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                            Category <span className='text-red-500'>*</span>
                        </label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} 
                        name='categoryId' className={`w-[100%] h-[50px] outline-none  p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`}
                         required>
                            <option value=''>Select Category</option>
                                    {loading ? <option value=''>Loading...</option> : category?.map((category) => (
                                        <option key={category.CategoryID} value={Number(category.CategoryID)} >
                                            {category.CategoryName}</option>
                                    ))}
                        </select>
                    </div>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>    
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                            SubCategory <span className='text-red-500'>*</span>
                        </label>
                        <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} name='subcategoryId' 
                        className={`w-[100%] h-[50px] outline-none  p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`} required>
                            <option value=''>Select SubCategory</option>

                            {subCategoryLoading ? <option value=''>Loading...</option> : subCategory?.map((category) => (
                                <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>    
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                        SubCategoryLevel2  <span className='text-red-500'>*</span>
                        </label>
                        <select value={subCategoryLv2Id} onChange={(e) => setSubCategoryLv2Id(e.target.value)}
                         name='subcategoryId' className={`w-[100%] h-[50px] outline-none  p-2 border-[1px] ${theme === 'dark' ? 'border-gray-600 bg-[#1D222B]' : 'border-gray-400'} rounded-md`} required>
                            <option value=''>Select SubCategoryLevel2</option>
                            {subCategoryLv2Loading ? <option value=''>Loading...</option> : subCategoryLv2?.map((category) => (
                                <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </div> */}
                </div>
                <div className='w-[100%]  flex justify-start flex-col gap-3 my-3 items-start'>
                <div className="w-[100%]  text-2xl font-semibold  flex gap-1 items-center">
                <IoIosAddCircle /> <span>Attributes</span>
                </div>
                {number.map((number, index) => (
                    <>          
             {isEdit ?  <AttributeUi  key={number} isEdit={isEdit} number={number} attributeData={attributeData} setNumber={setNumber} setAttributeData={setAttributeData} setAttributeCount={setAttributeCount} attributeCount={attributeCount} index={index}/> 
             : <NewAttributes key={index} isEdit={isEdit} number={number} attributeData={attributeData} setNumber={setNumber} setAttributeData={setAttributeData} setAttributeCount={setAttributeCount} attributeCount={attributeCount} index={index}/>}
            </>
            ))}
                <div onClick={handleNewAddAttribute} className={`${theme === 'dark' ? 'bg-[#1D222B]' : 'bg-black'} cursor-pointer text-white  px-3 py-2 text-md font-semibold`}>
                    <span>Add Attribute</span>
                </div>
                <div className='w-[100%] mt-4 flex justify-between border-t-[1px] border-gray-300 pt-3 items-center'>
                    <button type='reset' onClick={handleReset} className='w-[100px] px-3 py-1 flex bg-[#fdfdfd] text-black border-[1px] border-gray-300 text-md font-semibold '>
                     ClearForm
                    </button>
                    <div className='flex gap-2'>
                    <button type='button' onClick={()=>setIsCancel(false)} className='w-[100px] px-4 py-2 text-white bg-[#000000] text-md '>
                      Cancel
                    </button>
                    <button type='submit' className='w-[100px] px-4 py-2 text-white bg-[#000000] text-md '>
                        {isEdit ? "Update" : "Add"}
                    </button>
                    </div>
                </div>
             
                </div>
            </form>
            </div>}
            {!attributeLoading && !isCancel &&
             <Attributetabel 
             setIsCancel={setIsCancel}
             data={attributeD} 
             isLoading={attributeLoading} 
             isError={attributeError}
             onEdit={handleEdit}
             />  }    
    </div>
    </div>
  )
}
