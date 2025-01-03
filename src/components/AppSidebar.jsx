import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import logo from './Images/bg.png'
import logo2 from './Images/logo2.png'
// import { logo } from '../assets/images/Screenshort(408).png'
import { sygnet } from '../assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          {/* <CIcon customclassname="sidebar-brand-full" icon={logo} height={32} /> */}
         <div customclassname="sidebar-brand-full"
          className="w-[100%] sidebar-brand-full flex items-center justify-center overflow-hidden gap-1">
            <img src={logo} alt="logo" className="w-[4rem] object-contain" />
            <img src={logo2} alt="logo" className="h-[3rem]  object-contain" />
          </div>
          {/* <CIcon customclassname="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
          <img src={logo} alt="logo" className=" sidebar-brand-narrow object-contain h-[32px]" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
