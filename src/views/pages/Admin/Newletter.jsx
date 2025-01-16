import React, { useEffect, useState } from 'react'
import DataTable from '../Ui/Datatable'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import ExcelJS from 'exceljs';
import { useSelector } from 'react-redux';
export default function Newletter() {
        const [users,setUsers]=useState([])
    const apiUrl=import.meta.env.VITE_API_URL;
    const token=localStorage.getItem('adminToken')
    const queryClient=useQueryClient()
    const theme=useSelector((state)=>state.theme)
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
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');
      worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
          { header: 'Name', key: 'name', width: 30 },
          { header: 'Email', key: 'email', width: 30 }
      ];
  
      data.forEach(item => {
          worksheet.addRow(item);
      });
  
      workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'data.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
  };
      if(isLoading){
        return <div className="animate-pulse">
       <div className="h-10 bg-gray-300 rounded w-1/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-4/4 mb-2"></div>
   

  </div>
      }
  return (
    <div className={`w-full h-full flex ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} px-2  justify-start`}>
        <ToastContainer autoClose={1000}/>
      <div className={`w-[100%] h-fit ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} flex flex-col gap-4 mt-[3rem] py-[2rem] px-[1rem]  items-start justify-center`}>
        <h1 className='text-2xl font-bold'>Newsletter Subscribers</h1>
       {users.length>0 ? <DataTable
        data={users}
        title="List Of Newsletter Subscribers"
        onDelete={handleDelete}
        onExport={handleExport}
        expand={false}
        edit={false}
        /> : <div className="w-[100%] h-[100%] flex items-center justify-center">
        <h1 className="text-2xl font-bold">No Data Found</h1>
    </div>}
      </div>
    </div>
  )
}
