import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const Attributetabel = ({ data, onDelete, onEdit, edit = true, isEdit = false, isLoading = false }) => {
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

  const filteredData = sortedData?.filter((item) => {
    const matchesBasicFields = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const matchesAttributes = item.attributes?.some((attribute) => {
      const attributeNameMatches = attribute.attributeName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const attributeValuesMatch = attribute.values?.value?.some((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return attributeNameMatches || attributeValuesMatch;
    });
  
    return matchesBasicFields || matchesAttributes;
  });
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div
      className={`  w-full h-fit ${
        theme === "dark" ? "bg-[#2e3442] text-white" : "bg-white text-gray-800"
      }`}
    >
      {isEdit && (
        <div className="flex justify-end items-end mb-3">
          <button
            className={`bg-black text-white p-2 rounded-md ${
              theme === "dark" ? "bg-[#212631] text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => window.location.reload()}
          >
            + Add New
          </button>
        </div>
      )}
      <div className=" pb-2  w-[100%] text-2xl tracking-wider font-semibold  mb-2 p-3  border-b-[1px] border-gray-300">
      List of category
      </div>
      {/* Search and Filter */}
      <div className="w-full flex p-3 flex-wrap gap-4 items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-[30%] p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === "dark" ? "bg-[#272b38] text-white" : "bg-white text-gray-800"
          }`}
        />
        <select
          onChange={(e) => setRowsPerPage(e.target.value)}
          className="w-[10%] p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-3">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr
              className={`${
                theme === "dark" ? "bg-[#212631] text-white" : "bg-[#F1F5F9] text-[#252525]"
              } text-md`}
            >
              <th className="p-2 border w-[150px]">Category Name</th>
              <th className="p-2 border w-[150px]">SubCategory 1</th>
              <th className="p-2 border w-[150px]">SubCategory 2</th>
              <th className="p-2 border ">Attributes</th>
              <th className="p-2 border w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((item, index) => (
              <tr key={index} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <td className="p-2 border">{item.CategoryName}</td>
                <td className="p-2 border">{item.subcategoryName}</td>
                <td className="p-2 border">{item.subcategorytwoName}</td>
                <td className="p-2 border">
                  {item?.attributes.map((attribute, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap gap-4 py-1 border-b last:border-0"
                    >
                      <span className="font-medium text-sm">{attribute.attributeName}:</span>
                      <div className="flex flex-wrap gap-2">
                        {attribute?.values?.map((value, vIdx) => (
                          <span
                            key={vIdx}
                            className="px-2 py-1 text-xs bg-gray-200 text-black rounded dark:bg-gray-600"
                          >
                            {value.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit Item"
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center px-3 justify-between mt-4 gap-2  pt-2 border-t-[1px] border-gray-300">
        <div className="flex items-center  gap-2">
          <span className="text-sm">Showing {indexOfFirstRow + 1} to {Math.min(indexOfFirstRow + rowsPerPage, filteredData?.length)} of {filteredData?.length} entries</span>
        </div>
        <div className="flex items-center  gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-300"
        >
          Previous
        </button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-300"
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

export default Attributetabel;
