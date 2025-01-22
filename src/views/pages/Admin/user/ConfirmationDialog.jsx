import React from "react"
import { X } from "lucide-react"

function ConfirmationDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="confirmation-modal">
      <div className="relative top-20 mx-auto p-2 border w-96 shadow-lg rounded-md  mt-20 bg-white">
        <div className="mt-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog

