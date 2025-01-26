import { noConflict } from 'lodash'
import React, { useEffect, useState } from 'react'
import DataTable from './userTabel'
import View from '../../Ui/View'

export default function UserManagement() {
    const [show,setShow]=useState({
        incomplete:true,
        active:false,
        block:false
    })
    const [view,setView]=useState(false)
    const [datas,setDatas]=useState([])
    const data=[
        {
        id:1,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status: 1
       },
       {
        id:2,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status: 1
       },
       {
        id:3,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status:1
       },
       {
        id:4,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status:3
       },
       {
        id:5,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status:3
       },
       {
        id:6,
        Name: 'John',
        Email:'John@example.com',
        Phone: 9380309188,
        date: '22/01/2025',
        status:0
       },


        ]
        const [filterData, setFilterData] = useState([]);
        const handleFilter = (id) => {
            // Filter data based on status
            const filtered = data.filter((user) => user.status === id);
            setFilterData(filtered);  // Update state with filtered data
        }
        useEffect(() =>{
            handleFilter(0)
        },[])
        const handleDelete=(id)=>{
            // Delete user with given id
            const confirm=window.confirm('Are you sure, you want to delete');
            if(!confirm) return
            const updatedData = filterData.filter((user) => user.id!== id);
            setFilterData(updatedData);  // Update state with updated data
        //   console.log(id)
        }
    const handleView =(id)=>{
        console.log(id)
        setDatas(id)
        setView(true)
    }
    const handleClose=()=>{
        setView(false)
    }
  return (
    <div className='flex  flex-col gap-5 bg-slate-200 h-[100%] min-w-[600px] overflow-x-scroll'>
        <div className='w-[100%] flex flex-col gap-4 p-3 '>
            <div className='w-[100%] flex items-center justify-between '>
                <div className="w-fit flex items-end gap-2">
                    {show.incomplete && <>
                        <span className='text-3xl font-semibold text-[#252525] '>
                    Incomplete Registration Users List 
                    </span>
                    <div style={{color:'red'}} className='text-sm font-semibold text-[#f80909] tracking-wide'>(Email Verification Pending)</div>
                </>
                }
                   {show.active && <>
                        <span className='text-3xl font-semibold text-[#252525] '>
             Active Registration
                    </span>
                  
                </>
                }
                  {show.block && <>
                        <span className='text-3xl font-semibold text-[#252525] '>
                        Blocked Users List
                    </span>
                  
                </>
                }
                </div>
                <div className="flex items-center gap-1">
                    <a href="/admin/account/dashboard" className='text-blue-600 no-underline  tracking-wide'>Home</a>
                    <span>/</span>
                    <span className='text-[#252525] '>
                   {show.incomplete?`Incomplete Registration`: show.active?'Active Registration':'Blocked Users'}</span>
                </div>

            </div>
            <div className="flex max-w-[100%] bg-white  flex-col rounded-md border-t-[3px]  border-yellow-300 min-w-[600px]">
            <div className='flex  items-center   w-[100%]  '>
                <div onClick={()=>(handleFilter(0), setShow((pre)=>({active:false,incomplete:true,block:false})))} className={`flex w-fit px-3 items-center ${!show.incomplete && 'border-b-[1px] border-gray-300'} tracking-wide  py-2  justify-center-2`}>
                    <div className='flex items-center gap-[0.1em]'>Incomplete<span/>Registration<span/>(0)</div>

                </div>
                <div className={`flex w-[100%] ${show.incomplete && 'border-b-[1px] border-l-[1px] border-r-[1px] border-gray-300'}`}>

                <div 
                onClick={()=>{handleFilter(1),setShow((pre)=>({active:true,incomplete:false,block:false}))}} 
                className={`flex  items-center  text-blue-500 tracking-wide
                 px-3 py-2 ${(show.active) ? 'border-b-[1px] border-r-[1px] border-l-[1px] border-gray-300  border-b-white': show.block && 'border-b-[1px] border-gray-300'} border-r-[1px] 
                  hover:border-r-gray-300 hover:border-l-gray-300 border-l-[1px] justify-center-2`}>
                    <span>Active(0)</span>
                </div>
                <div className={`${show.active && 'border-b-[1px] w-[100%] border-gray-300'}`} >

                <div onClick={()=>{handleFilter(3),setShow((pre)=>({active:false,incomplete:false,block:true}))}}
                 className={`flex items-center  text-blue-500 tracking-wide px-3 py-2
                   border-b-[1px] border-[1px] border-transparent 
                  transition-all duration-300 hover:border-l-gray-300 hover:border-r-gray-300 
                  justify-center-2`}>
                    <span>Blocked(0)</span>
                </div>
                </div>
                <div className={`${show.block? 'border-b-[1px] border-l-[1px]  w-[100%] border-gray-300':'border-gray-500'}`}>

                </div>
                </div>
                

            </div>
            <div className="flex w-[100%] p-4">
             {filterData.length>0 ?  <DataTable data={filterData} details={show} onView={handleView} onDelete={handleDelete} setFilterData={setFilterData}/> :
             <span className='text-red-500 font-semibold '>No Record Found</span>
             }
            </div>

            </div>
            </div>
            {view && <View onClose={handleClose}>
                <div className="xl:w-[40%] md:w-[50%] w-[90%] h-fit bg-white p-4 rounded-md">
                <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">{datas.Name}</h2>
        <p className="text-sm text-gray-600">Email: {datas.Email} </p>
        <p className="text-sm text-gray-600">Phone: {datas.Phone} </p>
        <p className="text-sm text-gray-600">Date: {datas.date}</p>
      </div>
                </div>
                </View>
                }
      
    </div>
  )
}
