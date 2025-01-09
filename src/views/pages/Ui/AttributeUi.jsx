import React, { useState } from 'react'
import { HiMinusCircle } from 'react-icons/hi'
import { IoIosAddCircle } from 'react-icons/io'

export default function AttributeUi({setAttributeCount,attributeCount,index}) {
  const [count, setCount] = useState(1)
 
 
  const handleAddAttributeValue = () => {
    setCount((prev) => prev + 1)
  }
  const handleRemoveAttributeValue = () => {
    setCount((prev) => prev - 1)
  }
  const handleRemoveAttribute = () => {
    if(attributeCount > 1){
    setAttributeCount((prev) => prev - 1)
  }
  }
  return (
    <div className='w-[100%] bg-[#FAEBD7] p-4 mt-2 flex gap-x-8 gap-y-4 justify-start items-start'>   
                    <div className='w-[50%] flex flex-col  gap-2 justify-start items-start'>
                        <label htmlFor="attributeName" className='text-lg font-semibold'>
                            Attribute <span className='text-red-500'>*</span>
                        </label>
                        <input type="text" name='attributeName' className='w-[100%] h-[60px] outline-none  p-2 border-[1px] border-gray-300 rounded-md' required />
                    </div>
                    <div className='w-[40%] flex   gap-2 justify-start items-start'>
                        <div className='w-[100%] flex flex-col  gap-2 justify-start items-start'>   
                        <label htmlFor="attributeName" className='text-lg font-semibold'>
                           Value <span className='text-red-500'>*</span>
                        </label>
                        { Array.from({length: count}).map((_, index) => (
                            <input key={index} type="text" name={`attributeValue-${index}`} className='w-[100%] h-[60px] outline-none  
                        p-2 border-[1px] border-gray-300 rounded-md' required />
                        ))}
                        </div>
                        </div>
                        <div className='w-[3%] mt-[2.5rem] flex flex-col  gap-2 justify-start items-start'>   
                            <span onClick={() => handleAddAttributeValue()} className='text-xl font-semibold cursor-pointer'>
                                <IoIosAddCircle />
                            </span>
                           { count > 1 && <span onClick={() => handleRemoveAttributeValue()} className='text-xl font-semibold cursor-pointer'>
                            <HiMinusCircle />
                            </span>}
                        </div>
                        <div onClick={() => handleRemoveAttribute()} className='w-[20%] mt-[2.5rem] flex flex-col  gap-2 justify-start items-start'>
                       <button className={`${index === 0 ? 'hidden' : 'bg-red-500'} text-white  px-3 py-2 text-md font-semibold`}>
                    <span>Remove Attribute</span>
                </button>
                        </div>
                </div>
  )
}
