import React, { useEffect, useState } from 'react'
import DataTable from '../Ui/Datatable'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import * as XLSX from "xlsx";
import { CSpinner } from '@coreui/react';
export default function Newletter() {
        const [users,setUsers]=useState([])
    const apiUrl=import.meta.env.VITE_API_URL;
    const token=localStorage.getItem('adminToken')
    const queryClient=useQueryClient()
    const headers= {
        'Authorization': `Bearer ${token}`
    }
    const {data,isLoading,error}=useQuery({
        queryKey:['newsletter'],
        queryFn:async()=>{
            const res=await axios.get(`${apiUrl}/newsletter`)
         if(res.status===200){
            return res.data.result
         }
        }
    })
    useEffect(()=>{
      if(data){
        setUsers(data)
      }
    },[data])
    const handleDelete=(id)=>{
        try{
            if(id){
                axios.delete(`${apiUrl}/newsletter/${id}`,{headers})
                .then((res)=>{
                    toast.success('Newsletter deleted successfully')
                    setUsers(users.filter((user)=>user.id!==id))
                    queryClient.invalidateQueries({queryKey:['newsletter']})
                })

            }
        }catch(err){
            toast.error('Error deleting newsletter')
        }
    }
    const handleExport = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      if(isLoading){
        return <div class="animate-pulse">
       <div class="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
    <div class="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div class="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div class="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
   

  </div>
      }
  return (
    <div className='w-full h-full flex bg-slate-200 px-2  justify-start'>
        <ToastContainer autoClose={1000}/>
      <div className='w-[100%] h-fit bg-white flex flex-col gap-4 mt-[3rem] py-[2rem] px-[1rem]  items-start justify-center'>
        <h1 className='text-2xl font-bold'>Newsletter Subscribers</h1>
        <DataTable
        data={users}
        onDelete={handleDelete}
        onExport={handleExport}
        expand={false}
        edit={false}
        />
      </div>
    </div>
  )
}
