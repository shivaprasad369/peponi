import React from 'react'
import CIcon from '@coreui/icons-react'
import {
 
  cilLockLocked,
  cilNewspaper,
  cilSpeedometer,
  cilUserFollow,
  cilLibraryAdd,
  cilUser,
  cilSpeech, 
  cilCalculator
} from '@coreui/icons'
import {CNavItem} from '@coreui/react'
import { BsFillQuestionOctagonFill } from 'react-icons/bs'
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/account/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: "Manage Blogs",
    to: '/admin/account/blogs',
    icon: <CIcon icon={cilNewspaper } customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: "Newsletter Subscribers",
    to: '/admin/account/newsletter',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Manage FAQ's",
    to: '/admin/account/faq',
    icon:<BsFillQuestionOctagonFill  className='nav-icon'/>
    // icon: <CIcon icon={cilSpeech } customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "CMS",
    to: '/admin/account/cms',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Admin Profile",
    to: '/admin/account/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Change Password",
    to: '/admin/account/change-password',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  
 
]

export default _nav
