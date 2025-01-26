import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductTable = ({ data, onDelete, onView, onEdit,isView,setIsView,handleClose,show,loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (field) => {
    const order = sortOrder.field === field && sortOrder.order === "asc" ? "desc" : "asc";
    const sorted = [...sortedData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortOrder({ field, order });
    setSortedData(sorted);
  };

  if(loading){
    return <div className='w-[100%] flex justify-center items-center'>
        <h1 className='text-2xl font-semibold'>Loading...</h1>
    </div>
  }
  const filteredData = sortedData?.filter((item) =>
    item.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  return (
    <div className={`p-4 ${theme === "dark" ? "bg-[#2e3442] text-white" : "bg-white text-gray-800"} w-[100%] border-t-[3px]  border-yellow-300  `}>
        <div className="w-[100%] border-b-[1px] border-gray-300 pb-3 mb-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Product List</h1>
            {!show &&<button onClick={()=>handleClose()} className="bg-black text-white p-2 px-4 rounded-md">Add Product</button>}
        </div>
       
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Product Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 border rounded shadow-sm focus:outline-none ${
            theme === "dark" ? "bg-[#272b38] text-white" : "bg-white text-gray-800"
          }`}
        />
        <select
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="p-2 border rounded shadow-sm focus:outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className={`${theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-100 text-black"}`}>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((row, index) => (
            <tr
              key={index}
              className={`${theme === "dark" ? "bg-[#292f3b] text-white" : "hover:bg-gray-100"}`}
            >
              <td className="p-2 w-[90px] border">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${row.Image}`}
                  alt="product"
                  className="W-[100%] object-cover mx-auto"
                />
              </td>
              <td className="p-2 border">{row.ProductName}</td>
              <td className="p-2 border">
                {row.CategoryName}
              </td>
              <td className="p-2 border  gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="p-1 text-blue-500 hover:text-blue-700"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => onDelete(row.ProductID)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => onView(row)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData?.length)} of{" "}
          {filteredData?.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-200 text-black"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : theme === "dark"
                  ? "bg-[#212631] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-200 text-black"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
