import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { FaExpandArrowsAlt, FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const DataTable = ({
  data,
  onDelete,
  onView,
  onEdit,
  onExport,
  setFilterData,
  title,
  expand = false,
  isEdit = false,
  details,
  deleting = false,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: "", order: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (field) => {
    const order =
      sortOrder.field === field && sortOrder.order === "asc" ? "desc" : "asc";
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

  const handleRowSelect = (row) => {
    setSelectedRows((prev) => {
      if (prev.includes(row.id)) {
        return prev.filter((r) => r !== row.id);
      } else {
        return [...prev, row.id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((row) => row.id));
    }
  };

//   const handleDeleteSelected = () => {
//     selectedRows.forEach((rowId) => onDelete(rowId));
//     setSelectedRows([]);
//   };


const handleDeleteSelected = () => {
    const confirm = window.confirm('Are you sure you want to delete');
    if(!confirm) return
  // Filter out the rows that are selected for deletion
  const newData = filteredData.filter((row) => !selectedRows.includes(row.id));

  // Manually set the filtered data to the new filtered data (without the deleted rows)
  setFilterData(newData);

  // Clear the selected rows
  setSelectedRows([]);
};

  const toggleRowExpansion = (row) => {
    setExpandedRows((prev) => {
      if (prev.includes(row.id)) {
        return prev.filter((r) => r !== row.id);
      } else {
        return [...prev, row.id];
      }
    });
  };
  const handleBlock = () => {
    console.log(selectedRows)
    setFilterData((prevData) =>
      prevData.map((row) =>
        selectedRows.includes(row.id) ? { ...row, status: 3 } : row
      )
    );
    setSelectedRows([]);
    console.log(data)
  };
  
  const handleUnBlock = (rowId) => {
    setFilterData((prevData) =>
        prevData.map((row) =>
          selectedRows.includes(row.id) ? { ...row, status: 0 } : row
        )
      );
      console.log(data);
      setSelectedRows([]);
  };

  if (isLoading) {
    return (
      <div className="w-[100%] h-[100%] flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div
      className={`max-xl:p-2 w-[100%] h-[100%] ${
        theme === "dark" ? "bg-[#2e3442] text-white" : "bg-white text-gray-800"
      }`}
    >
      {isEdit && (
        <div
          onClick={() => {
            window.location.reload();
          }}
          className="flex justify-end items-end mb-3"
        >
          <button
            className={`bg-black text-white p-2 rounded-md ${
              theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-200 text-black"
            }`}
          >
            + Add New
          </button>
        </div>
      )}

      <div className="w-[100%] flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-[30%] p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === "dark" ? "bg-[#272b38] text-white" : "bg-white text-gray-800"
          }`}
        />
        <select
          onChange={(e) => setRowsPerPage(e.target.value)}
          className="w-[10%] p-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr
              className={`${
                theme === "dark" ? "bg-[#212631] text-white" : "bg-[#F1F5F9] text-[#252525]"
              }`}
            >
              <th className="p-2 flex items-center justify-center border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedRows.length === currentRows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {Object.keys(data[0] || {})
                .filter((key) => key !== "status" && key !== "id")
                .map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`p-2 border border-gray-200 capitalize cursor-pointer text-center ${
                      theme === "dark"
                        ? "bg-[#212631] text-white hover:bg-gray-700"
                        : "bg-[#F1F5F9] text-[#252525] hover:bg-gray-300"
                    }`}
                  >
                    {key}{" "}
                    {sortOrder?.field === key ? (sortOrder.order === "asc" ? "▲" : "▼") : ""}
                  </th>
                ))}
              <th className="p-2 border border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className={`text-center ${
                    theme === "dark" ? "bg-[#292f3b] text-white hover:bg-gray-700" : "text-black hover:bg-slate-100"
                  }`}
                >
                  <td className="p-2 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                  {Object.entries(row)
                    .filter(([key]) => key !== "id" && key !== "status")
                    .map(([key, value], i) => (
                      <td key={i} className="p-2 border border-gray-200">
                        {key === "Image" || key === "image" ? (
                          <div className="w-[100%] h-[100%] flex items-center justify-center">
                            <div className="w-[5rem] h-[5rem] flex items-center justify-center">
                              <img
                                src={`${import.meta.env.VITE_API_URL}/${value}`}
                                alt="image"
                                className="h-[100%] object-cover"
                              />
                            </div>
                          </div>
                        ) : value?.length > 100 ? (
                          value.substring(0, 100) + "..."
                        ) : key === "created_at" ? (
                          new Date(value).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  <td className="p-2 border">
                    <div className={`items-center justify-center gap-2 ${expand ? "flex" : ""}`}>
                      
                      <button
                        onClick={() => onDelete(row.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                 
                        <button
                          onClick={() => onView(row)}
                          className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                        >
                          <FaEye />
                        </button>
                   
                      <button
                        onClick={() => toggleRowExpansion(row)}
                        className={`ml-2 p-1 text-gray-500 hover:text-gray-700 ${
                          expand ? "block" : "hidden"
                        }`}
                      >
                        {expandedRows.includes(row.id) ? (
                          <BiHide className="text-xl text-gray-500 hover:text-gray-700" />
                        ) : (
                          <FaExpandArrowsAlt className="text-xl text-gray-500 hover:text-gray-700" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.includes(row.id) && (
                  <tr>
                    <td
                      colSpan={Object.keys(data[0]).length + 2}
                      className={`border-none ${
                        theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-200 text-black"
                      }`}
                    >
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
      <div className="flex items-end justify-end gap-2 mt-3">
      {details.block ?
      <button
      onClick={handleUnBlock}
      disabled={selectedRows.length === 0}
      className={`mb-4 px-4 py-2 bg-black text-white rounded shadow hover:bg-black ${
        selectedRows.length === 0 && "opacity-50"
      }`}
    >
      Unblock
    </button>
      :<button
          onClick={handleBlock}
          disabled={selectedRows.length === 0}
          className={`mb-4 px-4 py-2 bg-black text-white rounded shadow hover:bg-black ${
            selectedRows.length === 0 && "opacity-50"
          }`}
        >
          Block
        </button>}
        <button
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
          className={`mb-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 ${
            selectedRows.length === 0 && "opacity-50"
          }`}
        >
          Delete
        </button>
      </div>

      {onExport && (
        <div className="flex justify-end items-center mt-4">
          <button
            className="py-1 border rounded shadow-sm tracking-wider px-4 bg-black text-white hover:bg-gray-200 disabled:opacity-50"
            onClick={() => onExport(data)}
          >
            Export
          </button>
        </div>
      )}

      <div className="w-[100%] border-t-[1px] border-gray-300 mt-5 flex items-end pt-2 justify-between gap-3">
        <div>
          <span className="text-md">
            Showing {indexOfFirstRow + 1} to{" "}
            {Math.min(indexOfFirstRow + rowsPerPage, filteredData?.length)} of{" "}
            {filteredData?.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded shadow-sm ${
              theme === "dark" ? "bg-[#212631] text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-50`}
          >
            Previous
          </button>

          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
              <div
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer hover:bg-black hover:text-white font-bold duration-300 border-[1px] ${
                  currentPage === item ? "bg-black text-white" : "border-gray-300"
                } rounded-md`}
              >
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded shadow-sm ${
              theme === "dark" ? "bg-[#212631] text-white hover:bg-gray-700" : "bg-gray-300 text-black hover:bg-gray-300"
            } disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
