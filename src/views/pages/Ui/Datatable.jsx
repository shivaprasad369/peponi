import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { FaExpandArrowsAlt, FaEye, FaRegEdit, FaTrash } from "react-icons/fa";

const DataTable = ({ data, onDelete, onView,view, onEdit,expand=false,edit=true,onExport,isEdit=false,setIsEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

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
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
    selectedRows.forEach((row) => onDelete(row));
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

  return (
    <div className="xl:p-4 max-xl:p-2   w-[100%] h-[100%] bg-white ">
      {isEdit && <div onClick={()=>{window.location.reload()}} className="flex justify-end items-end mb-3">
        <button className="bg-black text-white p-2 rounded-md">+ Add New</button>
      </div>}
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

     
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
            <tr className="bg-gray-100">
              <th className="p-2 flex items-center justify-center  border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedRows.length === currentRows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {Object.keys(data[0] || {})?.filter(key => key !== "answer")?.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="p-2 border border-gray-200 capitalize cursor-pointer  hover:bg-gray-200 text-center"
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
                <tr className="text-center hover:bg-gray-100">
                  <td className="p-2 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                  {Object.entries(row)?.filter(([key]) => key !== "answer")?.map(([key, value], i) => (
                    <td key={i} className="p-2 border border-gray-200">
                      {value?.length > 100 ? value.substring(0, 100) + '...' : value}
                    </td>
                  ))}
                  <td className="p-2 border flex h-[100%] justify-center items-center border-gray-200">
                   {edit && <button
                      onClick={() => onEdit(row)}
                      className="mr-2 p-1 text-blue-500 hover:text-blue-700"
                    >
                      <FaRegEdit />
                    </button>}
                    <button
                      onClick={() => onDelete(row.id)}
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
                    <td colSpan={Object.keys(data[0]).length + 2} className=" border-none bg-gray-50 ">
               
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded shadow-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded shadow-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
