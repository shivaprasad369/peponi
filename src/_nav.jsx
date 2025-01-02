import React from 'react'
import CIcon from '@coreui/icons-react'
import {
 
  cilLockLocked,
  cilNewspaper,
  cilSpeedometer
} from '@coreui/icons'
import {CNavItem} from '@coreui/react'
import { BsQuestionOctagonFill } from 'react-icons/bs'
import { RiAdminFill } from 'react-icons/ri'
import { MdOutlineSpeakerNotes } from 'react-icons/md'

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
    icon: <MdOutlineSpeakerNotes className='mr-4' customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Newsletter Subscribers",
    to: '/admin/account/newsletter',
    icon: <RiAdminFill className='mr-4' customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Manage FAQ's",
    to: '/admin/account/faq',
    icon: <BsQuestionOctagonFill className='mr-4' customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "CMS",
    to: '/admin/account/cms',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Admin Profile",
    to: '/admin/account/profile',
    icon: <RiAdminFill  customClassName="nav-icon"  className=' mr-4' />,
  },
  {
    component: CNavItem,
    name: "Change Password",
    to: '/admin/account/change-password',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
 
 
]

export default _nav
