import React, { useState } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import SaleByCategory from '../pages/Ui/Sale'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import avatar1 from '../../assets/images/avatars/OIP (2).jpg'
import avatar2 from '../../assets/images/avatars/OIP (2).jpg'
import avatar3 from '../../assets/images/avatars/OIP (2).jpg'
import avatar4 from '../../assets/images/avatars/OIP (2).jpg'
import avatar5 from '../../assets/images/avatars/OIP (2).jpg'
import avatar6 from '../../assets/images/avatars/OIP (2).jpg'
import WidgetsBrand from '../widgets/WidgetsBrand'

const Dashboard = () => {
  document.title = 'Dashboard'
  const tableExample = [
    { avatar: { src: avatar1, status: 'success' }, user: { name: 'Product1' }, usage: { value: 50 } },
    { avatar: { src: avatar2, status: 'danger' }, user: { name: 'Product2' }, usage: { value: 22 } },
    { avatar: { src: avatar3, status: 'warning' }, user: { name: 'Product3' }, usage: { value: 74 } },
    { avatar: { src: avatar4, status: 'secondary' }, user: { name: 'Product4' }, usage: { value: 98 } },
    { avatar: { src: avatar5, status: 'success' }, user: { name: 'Product5' }, usage: { value: 22 } },
    { avatar: { src: avatar6, status: 'danger' }, user: { name: 'Product6' }, usage: { value: 43 } },
    { avatar: { src: avatar1, status: 'success' }, user: { name: 'Product7' }, usage: { value: 50 } },
    { avatar: { src: avatar2, status: 'danger' }, user: { name: 'Product8' }, usage: { value: 22 } },
    { avatar: { src: avatar3, status: 'warning' }, user: { name: 'Product9' }, usage: { value: 74 } },
    { avatar: { src: avatar4, status: 'secondary' }, user: { name: 'Product10' }, usage: { value: 98 } },
  ]

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate indices for slicing the array
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = tableExample.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const totalPages = Math.ceil(tableExample.length / itemsPerPage)

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <div className='md:flex max-md:flex-col w-[100%] gap-4 '>
 <div className='md:w-[25%] flex flex-col gap-4'>
 <WidgetsBrand className="mb-4" withCharts /> 

 </div> 
<div className='md:w-[70%] max-md:w-[100%]  mb-4 md:flex max-md:flex-col gap-4'>
  <SaleByCategory/>
  <div className='md:w-[60%]'>
  <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className='text-start font-bold text-xl' >Top Products</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                
                <CTableBody>
                  {tableExample.slice(0, 7).map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      
                      <CTableDataCell className="text-center w-[60px] ">
                      <div className='w-[100px] max-xl:w-[50px] flex items-center justify-center'>

                        <img className=" h-[50px] max-xl:w-[50px] object-cover rounded" src={item.avatar.src} status={item.avatar.status} />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>$20</span>
                         
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">${item.usage.value}</div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      </div>
        </div>
        </div>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="text-start font-bold text-xl">Recent Orders</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary font-bold cursor-pointer text-center">ProductID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Image</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Product Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Order Id</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Price</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Quantity</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Sale</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center cursor-pointer font-semibold">
                        #PRO{index + 1}
                      </CTableDataCell>
                      <CTableHeaderCell className="text-center">
                        <div className="w-[100px] max-xl:w-[50px] flex items-center justify-center">
                          <img className="h-[70px] max-xl:w-[50px] object-cover rounded" src={item.avatar.src} status={item.avatar.status} />
                        </div>
                      </CTableHeaderCell>
                      <CTableDataCell>{item.user.name}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="border-start border-[1px] border-gray-300 w-fit rounded-full text-black bg-[#fdd701af] py-1 px-3">
                            <div className="text-sm font-semibold cursor-pointer">#ORD{index + 100}</div>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">${item.usage.value}</div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="text-sm font-semibold">10</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="text-sm font-semibold">$28,672.36</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <CButton
          className="me-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FaArrowLeft />
        </CButton>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <CButton
            key={pageIndex}
            className={`mx-1 ${currentPage === pageIndex + 1 ? 'bg-primary text-white' : ''}`}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </CButton>
        ))}
        <CButton
          className="ms-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaArrowRight />
        </CButton>
      </div>
    </>
  )
}

export default Dashboard
