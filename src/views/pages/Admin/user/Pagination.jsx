import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 ml-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  )
}

export default Pagination

