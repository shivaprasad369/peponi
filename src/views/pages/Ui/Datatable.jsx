import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { FaExpandArrowsAlt, FaEye, FaRegEdit, FaSpinner, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const DataTable = ({ data, onDelete, onView,view, onEdit,expand=false,edit=true,onExport,isEdit=false,setIsEdit,deleting=false,isLoading=false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage,setRowsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const theme=useSelector((state)=>state.theme)
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

  // Handle search
  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle row selection
  const handleRowSelect = (row) => {
    setSelectedRows((prev) => {
      if (prev.includes(row)) {
        return prev.filter((r) => r !== row);
      } else {
        return [...prev, row];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows);
    }
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((row) => onDelete(row.CategoryID ? row : row.id));
    setSelectedRows([]);
  };

  const toggleRowExpansion = (row) => {
    setExpandedRows((prev) => {
      if (prev.includes(row)) {
        return prev.filter((r) => r !== row);
      } else {
        return [...prev, row];
      }
    });
  };

if(isLoading){
  return <div className="w-[100%] h-[100%] flex items-center justify-center">
    <h1 className="text-2xl font-bold">Loading...</h1>
  </div>
}
  return (
    <div className={`xl:p-4 max-xl:p-2   w-[100%] h-[100%] ${theme === 'dark' ? 'bg-[#2e3442] text-white' : 'bg-white text-gray-800 '} `}>

      {isEdit && <div onClick={()=>{window.location.reload()}} className="flex justify-end items-end mb-3">
        <button className={`bg-black text-white p-2 rounded-md ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>+ Add New</button>
      </div>}
      {/* Search Bar */}
      <div className="w-[100%] flex items-center justify-between">

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-[30%] p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-[#272b38] text-white' : 'bg-white text-gray-800'}`}
      />
      <select onChange={(e)=>setRowsPerPage(e.target.value)} className="w-[10%] p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      </div>

     
      {selectedRows.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Delete Selected
        </button>
      )}

      <div className="overflow-x-auto ">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>
              <th className="p-2 flex items-center justify-center  border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedRows.length === currentRows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {Object.keys(data[0] || {})?.filter(key => key !== "answer" && key !== 'ParentCategoryID' && key !=='CategoryID' && key !=='SubCategoryID' &&  key !=='SubCategoryLv2ID')?.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`p-2 border border-gray-200 capitalize cursor-pointer   text-center ${theme === 'dark' ? 'bg-[#212631] text-white hover:bg-gray-700 ' : 'bg-gray-200 text-black hover:bg-gray-300 '}`}
                >
                  {key} {sortOrder?.field === key ? (sortOrder.order === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="p-2 border border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <React.Fragment key={index}>
                <tr className={`text-center  ${theme === 'dark' ? 'bg-[#292f3b] text-white hover:bg-gray-700 ' : 'bg-gray-100 text-black hover:bg-gray-200 '}`}>
                  <td className="p-2 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                  {Object.entries(row)?.filter(([key]) => key !== "answer" && key !== 'ParentCategoryID' && key !=='CategoryID' && key !=='SubCategoryID' &&  key !=='SubCategoryLv2ID')?.map(([key, value], i) => (
                    <td key={i} className="p-2 border border-gray-200 items-center justify-center">
                      {key==="Image" || key==="image" ? 
                      <div className="w-[100%] h-[100%] flex items-center justify-center"> 
                      <img src={import.meta.env.VITE_API_URL+"/"+value} alt="image" className=" h-[100px] object-cover"/>
                      </div>
                       : value?.length>100? value.substring(0, 100) + '...' : value}
                   
                    </td>
                  ))}
                  <td className="p-2 border h-[100%] flex justify-center items-center ">
                   {edit && <button
                      onClick={() => onEdit(row)}
                      className="mr-2 p-1 text-blue-500 hover:text-blue-700"
                    >
                      <FaRegEdit />
                    </button>}
                    <button
                      onClick={() => onDelete(row.CategoryID ? row : row.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                     <FaTrash />
                    </button>
                    {view && <button
                      onClick={() => onView(row)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                    >
                      <FaEye />
                    </button>}
                    <button
                      onClick={() => toggleRowExpansion(row)}
                      className={`ml-2 p-1 text-gray-500 hover:text-gray-700 ${expand ? 'block' : 'hidden'}`}
                    >
                      {expandedRows.includes(row) ? <BiHide  className="text-xl text-gray-500 hover:text-gray-700"/> : <FaExpandArrowsAlt  className="text-xl text-gray-500 hover:text-gray-700"/>}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(row) && (
                  <tr>
                    <td colSpan={Object.keys(data[0]).length + 2} className={`" border-none ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'} `}>
               
                      <textarea
                        className="w-full p-2 border-none outline-none"
                        placeholder="Add or edit the answer here..."
                        defaultValue={row.answer || ""}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {onExport && 
      <div className="flex justify-end items-center mt-4">
      <button className=" py-1 border rounded shadow-sm tracking-wider px-4 bg-black text-white  hover:bg-gray-200 disabled:opacity-50" 
      onClick={()=>onExport(data)}>Export</button>
      </div>
      }
      <div className="w-[100%] flex items-end justify-end gap-3">

      <div className="flex  items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded shadow-sm ${theme === 'dark' ? 'bg-[#212631] text-white hover:bg-gray-700 ' : 'bg-gray-200 text-black hover:bg-gray-300 '} disabled:opacity-50`}
        >
          Previous
        </button>
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        <div className="flex items-center justify-center gap-1">
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((item)=>(
          <div key={item} onClick={()=>setCurrentPage(item)} className={`w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer hover:bg-black
           hover:text-white font-bold duration-300 border-[1px] ${currentPage === item ? 'bg-black text-white' : 'border-gray-300'} rounded-md`}>
            {item}
          </div>
         ))}
        </div>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded shadow-sm ${theme === 'dark' ? 'bg-[#212631] text-white hover:bg-gray-700 ' : 'bg-gray-300 text-black hover:bg-gray-300 '} disabled:opacity-50`}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default DataTable;
