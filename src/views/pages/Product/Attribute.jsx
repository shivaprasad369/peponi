import React, { useEffect, useState } from 'react'
import { FaSitemap } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md'
import useGetCategory from '../Ui/useGetCategory'
import { IoIosAddCircle } from 'react-icons/io'
import { HiMinusCircle } from 'react-icons/hi'
import AttributeUi from '../Ui/AttributeUi'
export default function Attribute() {
    const {category, loading, error, getCategory} = useGetCategory()
    const {category:subCategory, loading:subCategoryLoading, error:subCategoryError, getCategory:getSubCategory} = useGetCategory()
    const {category:subCategoryLv2, loading:subCategoryLv2Loading, error:subCategoryLv2Error, getCategory:getSubCategoryLv2} = useGetCategory()
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)
    const [subCategoryLv2Id, setSubCategoryLv2Id] = useState(null)
    const [count, setCount] = useState({
        attributeCount: 1,
        attributeValueCount: 1
    })
    const [attributeCount, setAttributeCount] = useState(1)
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
    const handleAddAttribute = (id) => {
     setCount((prev) => ({
        ...prev,
        attributeCount:id,
        attributeValueCount: prev.attributeValueCount + 1
     }))
    }
    const handleRemoveAttribute = (id) => {
        if(count.attributeValueCount > 1){
            setCount((prev) => ({
                ...prev,
                attributeCount:id,
                attributeValueCount: prev.attributeValueCount - 1
            }))
        }
    }
    const handleNewAddAttribute = () => {
        setAttributeCount((prev) => prev + 1)
    }
    const handleNewAddAttributeValue = () => {
        setCount((prev) => ({
            ...prev,
            attributeValueCount: prev.attributeValueCount + 1
        }))
    }
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center bg-slate-200'>
    <div className='w-[100%] p-2 flex flex-col gap-3 h-[100%]'>
        <div className='flex mt-2 justify-start px-4  gap-2 w-[100%] items-center'>
            <FaSitemap className='text-3xl font-semibold' />
            <h1 className='text-4xl font-normal'>  Manage Attributes</h1>
        </div>
        <div className='w-[100%] bg-white p-4 flex flex-col  justify-center items-start'>
            <form className='w-[100%]'>
                <div className="w-[100%] text-[#252525] text-2xl font-semibold  flex gap-1 items-center">
                <MdCategory /> <span>Category</span>
                </div>
                <div className='w-[100%] bg-[#FAEBD7] p-4 mt-2 grid grid-cols-3 gap-x-8 gap-y-4 justify-center items-center'>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                            Category <span className='text-red-500'>*</span>
                        </label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} name='categoryId' className='w-[100%] h-[50px] outline-none  p-2 border-[1px] border-gray-300 rounded-md'
                         required>
                            <option value=''>Select Category</option>
                                    {loading ? <option value=''>Loading...</option> : category?.map((category) => (
                                        <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                                    ))}
                        </select>
                    </div>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>    
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                            SubCategory <span className='text-red-500'>*</span>
                        </label>
                        <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} name='subcategoryId' className='w-[100%] h-[50px] outline-none  p-2 border-[1px] border-gray-300 rounded-md' required>
                            <option value=''>Select SubCategory</option>
                            {subCategoryLoading ? <option value=''>Loading...</option> : subCategory?.map((category) => (
                                <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>    
                        <label htmlFor="attributeName" className='text-xl font-semibold'>
                        SubCategoryLevel2  <span className='text-red-500'>*</span>
                        </label>
                        <select value={subCategoryLv2Id} onChange={(e) => setSubCategoryLv2Id(e.target.value)} name='subcategoryId' className='w-[100%] h-[50px] outline-none  p-2 border-[1px] border-gray-300 rounded-md' required>
                            <option value=''>Select SubCategoryLevel2</option>
                            {subCategoryLv2Loading ? <option value=''>Loading...</option> : subCategoryLv2?.map((category) => (
                                <option key={category.CategoryID} value={Number(category.CategoryID)} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-[100%]  flex justify-start flex-col gap-3 my-3 items-start'>
                <div className="w-[100%] text-[#252525] text-2xl font-semibold  flex gap-1 items-center">
                <IoIosAddCircle /> <span>Attributes</span>
                </div>
                {Array.from({length: attributeCount}).map((_, index) => (
               <AttributeUi key={index} setAttributeCount={setAttributeCount} attributeCount={attributeCount} index={index}/>
                ))}
                <div onClick={handleNewAddAttribute} className='bg-black cursor-pointer text-white  px-3 py-2 text-md font-semibold'>
                    <span>Add Attribute</span>
                </div>
                <div className='w-[100%] mt-4 flex justify-between border-t-[1px] border-gray-300 pt-3 items-center'>
                    <button type='reset' className='w-[100px] px-3 py-1 flex bg-[#fdfdfd] border-[1px] border-gray-300 text-md font-semibold '>
                     ClearForm
                    </button>
                    <button type='submit' className='w-[100px] px-4 py-2 text-white bg-[#000000] text-md '>
                        Add
                    </button>
                </div>
             
                </div>
            </form>
            </div>
    </div>
    </div>
  )
}
