import React, { useEffect, useRef, useState } from 'react'
import { FaCubes } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify'
import MyEditor from '../Ui/MyEditor'
import { useDropzone } from "react-dropzone";
import useGetCategory from '../Ui/useGetCategory'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ProductTable from '../Ui/ProductTabel'
import View from '../Ui/View'
import ProductImageList from '../Ui/ProductImageList'
import { useSelector } from 'react-redux'
export default function AddProduct() {
    document.title = 'Add Product'
    const {theme} = useSelector((state)=>state.theme);
    const [value, setValues] = useState('');
    const [images, setImages] = useState([]);
    const { category, loading, error, getCategory } = useGetCategory()
    const { category: subCategory, loading: subCategoryLoading, getCategory: getSubCategory } = useGetCategory()
    const { category: subCategoryLv2, loading: subCategoryLv2Loading, getCategory: getSubCategoryLv2 } = useGetCategory()
    const [oldCategoryId, setOldCategoryId] = useState(null)
    const [oldSubCategoryId, setOldSubCategoryId] = useState(null)
    const [oldSubCategoryLv2Id, setOldSubCategoryLv2Id] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)
    const [subCategoryLv2Id, setSubCategoryLv2Id] = useState(null)
    const [productName, setProductName] = useState('')
    const [metaTitle, setMetaTitle] = useState('')
    const [metaDescription, setMetaDescription] = useState('')
    const [metaKeyword, setMetaKeyword] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState('')
    const [discountPrice, setDiscountPrice] = useState('')
    const [sellingPrice, setSellingPrice] = useState('')
    const [cashPrice, setCashPrice] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [productImage, setProductImage] = useState('')
    const formRef = useRef(null)
    const [newImage, setNewImage] = useState('')
    const [productId, setProductId] = useState(0)
    const [view, setView] = useState(false)
    const [viewData, setViewData] = useState('')
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [attributeValues, setAttributeValues] = useState({})
    const [oldAttributeValues, setOldAttributeValues] = useState({})
    const [attribute, setAttribute] = useState([])
    const [attributeValue, setAttributeValue] = useState([])
    const [ProductImages, setProductImages] = useState([])

useEffect(()=>{
    if(!loading){
        const categoryData = category.find(item=>item.CategoryID===oldCategoryId)
        if(!categoryData){
            setAttributeValues({})
        }
    }
},[category,loading])
useEffect(()=>{
    if(!subCategoryLoading){
        const categoryData = subCategory.find(item=>item.CategoryID===oldSubCategoryId)
        if(!categoryData){
            setAttributeValues({})
        }
    }
},[subCategory,subCategoryLoading])
useEffect(()=>{
    if(!subCategoryLv2Loading){
        const categoryData = subCategoryLv2.find(item=>item.CategoryID===oldSubCategoryLv2Id)
        if(!categoryData){
            setAttributeValues({})
        }
    }
},[subCategoryLv2,subCategoryLv2Loading])

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/product`)
                if (response.status === 200) {
                    return response.data
                }
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('metaTitle', metaTitle)
        formData.append('metaDescription', metaDescription)
        formData.append('metaKeyword', metaKeyword)
        formData.append('productPrice', productPrice)
        formData.append('discountPercentage', discountPercentage)
        formData.append('discountPrice', discountPrice)
        formData.append('sellingPrice', sellingPrice)
        formData.append('cashPrice', cashPrice)
        formData.append('categoryId', categoryId)
        formData.append('subCategoryId', subCategoryId)
        formData.append('subCategoryLv2Id', subCategoryLv2Id)
        formData.append('productDescription', value)
        formData.append('attributeValue', JSON.stringify(attributeValue));

        if (productImage) {
            formData.append('productImage', productImage);
        }
        if (images.length > 0) {
            images.forEach((file) => {
                formData.append('ProductImages', file);
            });
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 200) {
                toast.success('Product added successfully')
                queryClient.invalidateQueries({ queryKey: ['product'] })
                setValues('')
                setProductName('')
                setMetaTitle('')
                setMetaDescription('')
                setMetaKeyword('')
                setProductPrice('')
                setDiscountPercentage('')
                setDiscountPrice('')
                setSellingPrice('')
                setCashPrice('')
                setCategoryId(null)
                setSubCategoryId(null)
                setSubCategoryLv2Id(null)
                setImages([])
                setProductImage(null)
                setShow(false)
                formRef.current.reset()
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setImages((prev) => [...prev, ...newImages]);
    };
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });
    useEffect(() => {
        getCategory()
      
    }, [categoryId])
    useEffect(() => {
        if (categoryId) {
            getSubCategory(categoryId)

        }
      
    }, [categoryId])
    useEffect(() => {
        if (subCategoryId) {
            getSubCategoryLv2(subCategoryId)

        }
        

    }, [subCategoryId])
    useEffect(() => {
        if (discountPercentage && productPrice) {
            setDiscountPrice(productPrice * discountPercentage / 100)
            setSellingPrice(productPrice - discountPrice)
        }
    }, [discountPercentage, productPrice])

    const handleAttribute = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/attributes?id=${subCategoryLv2Id}`)
            if (response.status === 200) {
                setAttribute(response.data)
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    useEffect(() => {
        if (subCategoryLv2Id) {
            handleAttribute()

        }
    }, [subCategoryLv2Id])
    const handleChange = (attributeName, value) => {
        setAttributeValue((prevState) => ({
            ...prevState,
            [attributeName]: value,
        }));
        setAttributeValues((prevState) => ({
            ...prevState,
            [attributeName]: value,
        }));
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
            if (response.status === 200) {
                toast.success('Product deleted successfully')
                queryClient.invalidateQueries({ queryKey: ['product'] })
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const handleEdit = async (id) => {
        setIsEdit(true)
        setShow(true)
        window.scrollTo(0, 0)
        setProductName(id.ProductName)
        setMetaTitle(id.MetaTitle)
        setMetaDescription(id.metaDescription)
        setMetaKeyword(id.MetaKeyWords)
        setProductPrice(id.ProductPrice)
        setDiscountPercentage(id.DiscountPercentage)
        setDiscountPrice(id.DiscountPrice)
        setSellingPrice(id.SellingPrice)
        setCashPrice(id.CashPrice)
        setCategoryId(id.CategoryID)
        setSubCategoryId(id.SubCategoryIDone)
        setOldCategoryId(id.CategoryID)
        setOldSubCategoryId(id.SubCategoryIDone)
        setOldSubCategoryLv2Id(id.SubCategoryIDtwo)
        setProductImage(id.Image)
        setSubCategoryLv2Id(id.SubCategoryIDtwo)
        setProductId(id.ProductID)
        setAttributeValue({})
        setProductImages([])
        const uniqueImages = id.ProductImages.reduce((acc, image) => {
            const exists = acc.find((img) => img.ProductImagesID === image.ProductImagesID);
            if (!exists) {
                acc.push(image);
            }
            return acc;
        }, []);
        setProductImages(uniqueImages)
        id.values?.forEach((item) => {
            setAttributeValue((prevState) => ({
                ...prevState,
                [item.attribute_name]: item.AttributeValueID,
            }));
            setAttributeValues((prevState) => ({
                ...prevState,
                [item.attribute_name]: item.AttributeValueID,
            }))
            setOldAttributeValues((prevState) => ({
                ...prevState,
                [item.attribute_name]: item.AttributeValueID,
            }));
        })

        setValues(id.Description)

    }
    const handleEditSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('metaTitle', metaTitle)
        formData.append('metaDescription', metaDescription)
        formData.append('metaKeyword', metaKeyword)
        formData.append('productPrice', productPrice)
        formData.append('discountPercentage', discountPercentage)
        formData.append('discountPrice', discountPrice)
        formData.append('sellingPrice', sellingPrice)
        formData.append('cashPrice', cashPrice)
        formData.append('categoryId', categoryId)
        formData.append('subCategoryId', subCategoryId)
        formData.append('subCategoryLv2Id', subCategoryLv2Id)
        formData.append('productDescription', value)
        formData.append('attributeValue', JSON.stringify(attributeValues));
        formData.append('oldAttributeValues', JSON.stringify(oldAttributeValues));
        formData.append('productImage', productImage)
        if (images.length > 0) {
            images.forEach((file) => {
                formData.append('ProductImages', file);
            });
        }
        if (newImage) {
            formData.append('newImage', newImage)
        }

        const response = await axios.put(`${import.meta.env.VITE_API_URL}/product/${Number(productId)}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if (response.status === 200) {
            toast.success('Product updated successfully')
            queryClient.invalidateQueries({ queryKey: ['product'] })
            setIsEdit(false)
            setProductName('')
            setMetaTitle('')
            setMetaDescription('')
            setMetaKeyword('')
            setProductPrice('')
            setDiscountPercentage('')
            setDiscountPrice('')
            setNewImage('')
            setSellingPrice('')
            setCategoryId('')
            setSubCategoryId('')
            setSubCategoryLv2Id('')
            setAttributeValue('')
            setValues('')
            setProductImage('')
            setCashPrice('')
            setImages([])
        }
    }
    const handleCloses = () => {
        setShow(true)
        setIsEdit(false)
        setView(false)
        formRef.current.reset()
    }
    const handleView = (id) => {
        setView(true)
        setViewData(id)
    }
    const handleClose = () => {
        setView(false)
        setViewData('')
    }
   console.log(attributeValues)
    return (
        <div className={`w-[100%] h-[100%] flex px-3 justify-center items-center ${theme === 'dark' ? 'bg-slate-200' : 'bg-gray-800'}`}>
            <ToastContainer />
            <div className='w-[100%] flex flex-col gap-3 h-[100%]'>
                <div className='flex pt-2  justify-start px-4  gap-2 w-[100%] items-center'>
                    <IoMdCart className='text-4xl font-semibold' />
                    <h1 className='text-3xl font-normal'> Add Product</h1>
                </div>
                {show && <div className={`w-[100%] ${theme === 'dark' ? 'bg-white' : 'bg-[#212631]'} p-4 flex flex-col  justify-center items-start`}>
                    <form ref={formRef} onSubmit={isEdit ? handleEditSubmit : handleSubmit} className='w-[100%]' encType='multipart/form-data'>
                        <div className='w-[100%] mb-3 text-[#252525] text-2xl font-semibold  flex gap-1 items-center'>
                            <FaCubes />  <span>Product Details</span>
                        </div>
                        <div className='w-[100%] grid grid-cols-3 gap-x-5 gap-y-4 justify-center items-center'>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Product Name <span className='text-red-500'>*</span>
                                </label>
                                <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} name='productName' id='productName' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Meta Title
                                </label>
                                <input type='text' value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} name='metaTitle' id='metaTitle' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Meta Description
                                </label>
                                <input type='text' value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} name='metaDescription' id='metaDescription' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Meta Keyword
                                </label>
                                <input type='text' value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)} name='metaKeyword' id='metaKeyword' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} />
                            </div>
                        </div>
                        <div className='w-[100%] mb-3 mt-3 text-[#252525] text-2xl font-semibold  flex gap-1 items-center'>
                            <FaCubes />  <span>Product Price</span>
                        </div>
                        <div className='w-[100%] grid grid-cols-4 gap-x-5 gap-y-4 justify-center items-center'>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Product Price  <span className='text-red-500'>*</span>
                                </label>
                                <input type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} name='productPrice' id='productPrice' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Discount Percentage  <span className='text-red-500'>*</span>
                                </label>
                                <input type='number' value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} name='discountPercentage' id='discountPercentage' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Discount Price  <span className='text-red-500'>*</span>
                                </label>
                                <input type='number' value={productPrice * discountPercentage / 100} readOnly
                                    name='discountPrice' id='discountPrice' className='w-[100%] h-[55px]
                                   outline-none  p-2 border-[1px] border-gray-300 bg-gray-200 rounded-md' required />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Selling Price   <span className='text-red-500'>*</span>
                                </label>
                                <input type='number' value={productPrice - discountPrice} readOnly
                                    name='sellingPrice' id='sellingPrice' className='w-[100%] h-[55px] outline-none 
                                 p-2 border-[1px] border-gray-300 bg-gray-200 rounded-md' required />
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Product CashPrice  <span className='text-red-500'>*</span>
                                </label>
                                <input type='number' value={cashPrice} onChange={(e) => setCashPrice(e.target.value)} name='cashPrice' id='cashPrice'className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required />
                            </div>

                        </div>
                        <div className='w-[100%] mb-3 mt-3 text-[#252525] text-2xl font-semibold  flex gap-1 items-center'>
                            <FaCubes />  <span>Product Categories</span>
                        </div>
                        <div className='w-[100%] grid grid-cols-3 gap-x-5 gap-y-4 justify-center items-center'>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Product Category  <span className='text-red-500'>*</span>
                                </label>
                                <select type='text' value={categoryId} onChange={(e) => setCategoryId(e.target.value)} name='productCategory' id='productCategory' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required>
                                    <option value=''>Select Category</option>
                                    {!loading && category?.map((item) => (
                                        <option key={item.CategoryID} value={item.CategoryID}>{item.CategoryName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Product Sub Category  <span className='text-red-500'>*</span>
                                </label>
                                <select type='text' value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} name='productSubCategory' id='productSubCategory' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required>
                                    <option value=''>Select Sub Category</option>
                                    {!subCategoryLoading && subCategory?.map((item) => (
                                        <option value={item.CategoryID}>{item.CategoryName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                <label htmlFor="productName" className='text-lg font-semibold'>
                                    Subcategory lv2 <span className='text-red-500'>*</span>
                                </label>
                                <select type='text' value={subCategoryLv2Id} onChange={(e) => setSubCategoryLv2Id(e.target.value)} name='subcategoryLv2' id='subcategoryLv2' className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required>
                                    <option value=''>Select Subcategory lv2</option>
                                    {!subCategoryLv2Loading && subCategoryLv2?.map((item) => (
                                        <option value={item.CategoryID}>{item.CategoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {subCategoryLv2Id && <div className='w-[100%] flex flex-col gap-x-5 gap-y-4 '>
                            <div className='w-[100%] mb-3 mt-3 text-[#252525] text-2xl font-semibold  flex gap-1 items-center'>
                                <FaCubes />  <span>Product Attributes</span>
                            </div>
                            <div className='w-[100%] grid grid-cols-3 gap-x-5 gap-y-4 justify-center items-center'>
                                {attribute?.map((item) => (
                                    <div key={item.id} className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                                        <label htmlFor="productName" className='text-lg capitalize font-semibold'>
                                            {item.attribute_name}  <span className='text-red-500'>*</span>
                                        </label>
                                        <select type='text'
                                            onChange={(e) => handleChange(item.attribute_name, e.target.value)}
                                            defaultValue={attributeValue[item.attribute_name] || ''}
                                            name={item.attribute_name} id={item.attribute_name} className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required >
                                            <option value=''>Select Attribute</option>
                                            {item?.value?.map((item) => (
                                                <option key={item.valueId} value={item.valueId}>{item.value}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        <div className='w-[100%] mb-3 mt-3 text-[#252525] text-2xl font-semibold  flex gap-1 items-center'>
                            <FaCubes />  <span>Product Description</span>
                        </div>
                        <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>
                            <label htmlFor='description' className='text-lg mt-3 -mb-3 font-semibold'>Description <span className='text-red-500'>*</span></label>
                            <div className='w-[100%] mt-3 h-[25rem] pb-[2rem] mb-[2rem] '>
                                <MyEditor value={value} setValue={setValues} />
                            </div>
                        </div>
                        {!isEdit && <div className='w-[30%] flex flex-col gap-4 justify-start items-start'>
                            <label htmlFor='image' name='productImage' id='productImage' className='text-lg mt-3 -mb-3 font-semibold'>Image <span className='text-red-500'>*</span></label>
                            <input type="file" onChange={(e) => setProductImage(e.target.files[0])} accept='image/*' name="image" id="image" className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} required />
                        </div>}
                        {isEdit && <div className='w-[30%] flex flex-col gap-4 justify-start items-start'>
                            <label htmlFor='image' name='productImage' id='productImage' className='text-lg mt-3 -mb-3 font-semibold'>New Image <span className='text-red-500'>*</span></label>
                            <input type="file" onChange={(e) => setNewImage(e.target.files[0])} accept='image/*' name="image" id="image" className={`w-[100%] h-[55px] outline-none  p-2 border-[1px] ${theme !== 'dark' ? 'border-gray-600 bg-gray-600' : 'border-white'} rounded-md`} />
                        </div>}
                        {isEdit && <div className='w-[100%] flex mt-3 flex-col gap-3 justify-start items-start '>
                            <label htmlFor="productImage" className='text-lg mt-3 -mb-3 font-semibold'>Product Image</label>
                            <div className="w-[15rem] h-[17rem] border-[1px] overflow-hidden flex justify-center items-center border-gray-300 rounded-md p-2">
                                <img src={`${import.meta.env.VITE_API_URL}/${productImage}`} alt="productImage" className='h-[100%]  object-cover rounded-md' />
                            </div>
                        </div>}
                        <div className='w-[100%] flex mt-3 flex-col gap-2 justify-center items-center'>
                            <div className='w-[100%] flex flex-col gap-2 justify-start items-start'>

                                <label htmlFor='image' className='text-lg mt-3  font-semibold '>Product Images</label>
                            </div>
                            <div
                                {...getRootProps()}
                                className={`border-3 border-dashed border-blue-500 w-[100%] p-8 rounded-md text-center ${isDragActive ? "bg-gray-200" : "bg-white"
                                    }`}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop the images here...</p>
                                ) : (
                                    <p>Drag & drop images here, or click to select files</p>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative p-2 flex items-center justify-center h-[10rem] w-[10rem]">
                                        <img
                                            src={image.preview}
                                            alt="Preview"
                                            className="h-[100%] object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <ProductImageList ProductImages={ProductImages} isEdit={isEdit} />
                        </div>
                        <div className='w-[100%] flex justify-between items-center border-t-[1px] border-gray-300 pt-3 mt-3'>
                            <button type='button' className='bg-white border-[1px] border-gray-300 text-black p-2 px-4 '>CLear form</button>
                            <button type='submit' className='bg-black text-white p-2 px-4 '>{isEdit ? 'Update Product' : 'Add Product'}</button>
                        </div>
                    </form>
                </div>}
                {!isLoading && !isError && <div className='w-[100%] flex justify-center items-center'>
                    <ProductTable data={product} show={show} handleClose={handleCloses} onView={handleView} setView={setView} onDelete={handleDelete} onEdit={handleEdit} />
                </div>}
                {view && <View onClose={handleClose}>
                    <div className="xl:w-[70%] lg:w-[90%] w-[95%] h-[95%] py-[3rem] text-[#252525] bg-white p-[2rem] flex flex-col gap-5 items-center justify-center rounded-md overflow-y-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-2xl font-semibold">View Blog</h1>
                        <div className="w-[100%] relative h-[100%] flex flex-col gap-5 items-center justify-center">
                            <div className="w-[100%] h-[100%] flex justify-between gap-5">
                                {/* Left Section */}
                                <div className="w-[100%] flex flex-col gap-4 items-start justify-start">
                                    <p className="text-md font-semibold flex items-center gap-3">
                                        <span className="font-bold">Product Name:</span> {viewData?.ProductName || "N/A"}
                                    </p>

                                    <div className="w-[100%] flex flex-col gap-4">
                                        <span className="text-lg font-semibold">Buy Section:</span>
                                        <div className="w-[100%] flex flex-col gap-2">
                                            <div className="text-md font-normal flex items-center gap-3">
                                                <span className="tracking-wide">Product Price:</span> {viewData?.ProductPrice || "N/A"}
                                            </div>
                                            <div className="text-md font-normal flex items-center gap-3">
                                                <span className="tracking-wide">Discount Percentage:</span> {viewData?.DiscountPercentage || "N/A"}
                                            </div>
                                            <div className="text-md font-normal flex items-center gap-3">
                                                <span className="tracking-wide">Discount Price:</span> {viewData?.DiscountPrice || "N/A"}
                                            </div>
                                            <div className="text-md font-normal flex items-center gap-3">
                                                <span className="tracking-wide">Selling Price:</span> {viewData?.SellingPrice || "N/A"}
                                            </div>
                                            <div className="text-md font-normal flex items-center gap-3">
                                                <span className="tracking-wide">Cash Price:</span> {viewData?.CashPrice || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[100%] flex flex-col gap-2">
                                        <span className='text-lg font-semibold'>Product Attributes</span>
                                        {viewData?.values
                                            ?.filter((value, index, self) =>
                                                index === self.findIndex((t) => (
                                                    t.attribute_name === value.attribute_name && t.value === value.value
                                                ))
                                            )
                                            .map((item) => (
                                                <div key={item.attribute_name} className="text-md font-normal flex items-center gap-3">
                                                    <span className="tracking-wide">{item.attribute_name}:</span> {item.value}
                                                </div>
                                            ))
                                        }


                                    </div>
                                    <div className='w-[100%] h-[100%] flex flex-col gap-0 items-start justify-start'>
                                        <span className='text-lg font-semibold'>Product Description</span>
                                        <div className='text-md font-normal flex gap-3 flex-col items-start justify-start'>

                                            <p dangerouslySetInnerHTML={{ __html: viewData?.Description }} className='flex tracking-wider flex-col gap-2' />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-fit h-fit items-center border-[1px] border-gray-300 rounded-md p-4 justify-center">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${viewData?.Image}`}
                                        alt="Product"
                                        className="w-[20rem] object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.png";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </View>
                }
            </div>


        </div>
    )
}
