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
  cilCalculator,
  cilExternalLink
} from '@coreui/icons'
import {CNavGroup, CNavItem} from '@coreui/react'
import { BsFillQuestionOctagonFill } from 'react-icons/bs'
import { RiLockPasswordFill, RiLogoutBoxFill, RiLogoutBoxRFill, RiNewspaperFill, RiUserFill, RiUserFollowFill } from 'react-icons/ri'
import { AiFillDashboard } from "react-icons/ai";
import { MdDashboardCustomize, MdOutlineDashboardCustomize } from 'react-icons/md'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/account/dashboard',
      icon: <AiFillDashboard className='nav-icon'/>,
      badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: "Manage Blogs",
    to: '/admin/account/blogs',
    // icon: <CIcon icon={cilNewspaper } customclassname="nav-icon" />
    icon:<RiNewspaperFill className='nav-icon'/>
  },
  {
    component: CNavItem,
    name: "Newsletter Subscribers",
    to: '/admin/account/newsletter',
    // icon: <CIcon icon={cilUserFollow} customclassname="nav-icon" />,
    icon:<RiUserFollowFill className='nav-icon'/>
  },
  {
    component: CNavItem,
    name: "Manage FAQ's",
    to: '/admin/account/faq',
    icon:<BsFillQuestionOctagonFill  className='nav-icon'/>
    // icon: <CIcon icon={cilSpeech } customclassname="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "CMS",
    to: '/admin/account/cms',
    icon: <MdDashboardCustomize className='nav-icon'/>,
  },
  {
    component: CNavItem,
    name: "Admin Profile",
    to: '/admin/account/profile',
    // icon: <CIcon icon={cilUser} customclassname="nav-icon" />,
    icon:<RiUserFill className='nav-icon'/>
  },
  {
    component: CNavItem,
    name: "Change Password",
    to: '/admin/account/change-password',
    // icon: <CIcon icon={cilLockLocked} customclassname="nav-icon" />,
    icon:<RiLockPasswordFill className='nav-icon'/>
  },
  {
    component: CNavGroup,
    name: "Manage Products",
    icon:<MdOutlineDashboardCustomize className='nav-icon'/>,
    items: [
      {
        component: CNavItem,
        name: 'Manage Category',
        to: '/admin/account/manage-category',
      },
      {
        component: CNavItem,
        name: 'Manage Subcategory',
        to: '/admin/account/subcategory',
      },
      // {
      //   component: CNavItem,
      //   name: 'Manage Subcategory Two',
      //   to: '/admin/account/subcategory-two',
      // },
      {
        component: CNavItem,
        name: 'Manage Attribute',
        to: '/admin/account/attribute',
      },
      {
        component: CNavItem,
        name: 'Manage Products',
        to: '/admin/account/add-product',
      },
      {
        component: CNavItem,
        name: 'Manage Feature Product',
        to: '/admin/account/feature-product',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Add Product'}
          </React.Fragment>
        ),
        to: '/admin/account/add-products',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
  }]
  }


]

export default _nav
