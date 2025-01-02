import React from 'react'
import Login from './views/pages/login/Login'
import { element } from 'prop-types'
import Adminlogin from './views/pages/Admin/Adminlogin'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))




const routes = [
  // { path: '/admin/account', name: 'Adminlogin'},
  // { path: '/admin/account/dashboard', name: 'AdminDashboard', element: Dashboard },
  { path: '/login', name: 'Login', element: Login },
]

export default routes
