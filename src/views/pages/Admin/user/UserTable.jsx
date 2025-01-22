import React, { useState, useEffect } from "react"
import { Eye, Trash2, Lock, Unlock } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import ConfirmationDialog from "./ConfirmationDialog"

function UserTable({ users, onView, onDelete, onBlock, onUnblock, activeTab }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [confirmAction, setConfirmAction] = useState(null)
  const usersPerPage = 5

  // Reset to first page when activeTab changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction.action(confirmAction.userId)
      setConfirmAction(null)
    }
  }

  const handleCancel = () => {
    setConfirmAction(null)
  }

  const confirmDelete = (userId) => {
    setConfirmAction({
      action: onDelete,
      userId,
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
    })
  }

  const confirmBlock = (userId) => {
    setConfirmAction({
      action: onBlock,
      userId,
      title: "Confirm Block", 
      message: "Are you sure you want to block this user?",
    })
  }

  const confirmUnblock = (userId) => {
    setConfirmAction({
      action: onUnblock,
      userId,
      title: "Confirm Unblock",
      message: "Are you sure you want to unblock this user?",
    })
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{user.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button
                  className="p-1 mr-2 text-blue-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => onView(user)}
                  aria-label="View user"
                >
                  <Eye size={20} />
                </button>
                <button
                  className="p-1 mr-2 text-red-500 hover:text-red-600 focus:outline-none"
                  onClick={() => confirmDelete(user.id)}
                  aria-label="Delete user"
                >
                  <Trash2 size={20} />
                </button>
                {activeTab !== "blocked" && activeTab !== "incomplete" ? (
                  <button
                    className="p-1 text-yellow-500 hover:text-yellow-600 focus:outline-none"
                    onClick={() => confirmBlock(user.id)}
                    aria-label="Block user"
                  >
                    <Lock size={20} />
                  </button>
                ) : ( activeTab !== "incomplete" &&
                  <button
                    className="p-1 text-green-500 hover:text-green-600 focus:outline-none"
                    onClick={() => confirmUnblock(user.id)}
                    aria-label="Unblock user"
                  >
                    <Unlock size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="flex justify-between items-center mt-4">
            <div>
<p>Showing {currentUsers.length} of {users.length} users</p>
            </div>

      <div className="flex justify-end gap-2 items-center mt-4">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-1">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 ml-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
          </div>

      <ConfirmationDialog
        isOpen={!!confirmAction}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={confirmAction?.title}
        message={confirmAction?.message}
      />
    </div>
  )
}

export default UserTable
