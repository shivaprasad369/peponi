import React from "react"
import { X } from "lucide-react"

function ViewUserDialog({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-2 border w-96 shadow-lg mt-10 rounded-md bg-white">
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">User Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2 text-left">
            <p className="text-sm text-gray-500">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Status:</strong> {user.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUserDialog

