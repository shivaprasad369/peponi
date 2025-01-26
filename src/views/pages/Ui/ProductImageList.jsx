import axios from 'axios'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
export default function ProductImageList({ProductImages,isEdit}) {
    const queryClient = useQueryClient()
    const removeImage = async(id,ProductImage) => {
     
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/productimage/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ ProductImage })   
            })
            if(response.status === 200){
                toast.success('Image deleted successfully')
                queryClient.invalidateQueries(['product'])
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
  return (
    <>
    {isEdit && ProductImages.length>0 && <div className="border-[1px] border-gray-300 w-[100%] h-[100%] grid grid-cols-6 gap-x-5 gap-y-4 justify-center items-center rounded-md p-2">
        {ProductImages && ProductImages.length>0 &&  ProductImages?.map((img,index)=>
        <div key={img.ProductImagesID} className="relative p-2 flex items-center border-[1px] border-gray-300 justify-center h-[10rem] w-[10rem]">
        <img key={img.ProductImagesID} src={`${import.meta.env.VITE_API_URL}/${img.ProductImages}`} alt="productImage" className='h-[100%]   object-cover rounded-md' />
        <div 
                        onClick={() => removeImage(img.ProductImagesID,img.ProductImages)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 text-sm"
                    >
                        ✕
                    </div>           
                    </div>
        
    )}
    </div>
}
</>
  )
}
