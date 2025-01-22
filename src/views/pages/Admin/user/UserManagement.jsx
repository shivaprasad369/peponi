import React, { useState } from "react"
import UserTable from "./UserTable"
import ViewUserDialog from "./ViewUserDialog"

const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "blocked" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 5, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 6, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 7, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 8, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 9, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 10, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 11, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 12, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 13, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 14, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 15, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 16, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 17, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 18, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 19, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },
    { id: 20, name: "Alice Brown", email: "alice@example.com", status: "incomplete" },

]
function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState("active")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const handleView = (user) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }
  const handleBlock = (userId) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "blocked" } : user)))
  }
  const handleUnblock = (userId) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "active" } : user)))
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("active")}
        >
          Active Users
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === "blocked" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("blocked")}
        >
          Blocked Users
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("incomplete")}
        >
          Incomplete Users
        </button>
      </div>
      <UserTable
        users={users.filter((user) => user.status === activeTab)}
        onView={handleView}
        onDelete={handleDelete}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        activeTab={activeTab}
      />
      <ViewUserDialog isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} user={selectedUser} />
    </div>
  )
}
export default UserManagement

