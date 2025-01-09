import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Category from './views/pages/Product/Category'
import Subcategory from './views/pages/Product/Subcategory'
import SubcategoryTwo from './views/pages/Product/SubcategoryTwo'
import Attribute from './views/pages/Product/Attribute'
const Adminlogin = lazy(() => import('./views/pages/Admin/Adminlogin'));
const Verify = lazy(() => import('./views/pages/Admin/Verify'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));
const CMs = lazy(() => import('./views/pages/Admin/Cms/Cms'));
const Faq = lazy(() => import('./views/pages/Admin/Faq/Faq'));
const Profile = lazy(() => import('./views/pages/Admin/Profile'));
const ChangePassword = lazy(() => import('./views/pages/Admin/ChangePassword'));
const Newletter = lazy(() => import('./views/pages/Admin/Newletter'));
const Blogs = lazy(() => import('./views/pages/Admin/Blogs'));
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) 
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center w-[100vw] h-[100vh] flex items-center justify-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          
          <Route path="/admin" name="admin" element={<Adminlogin />} />
          <Route path="/admin/account" name="admin" element={<Verify />} >
          <Route path="dashboard" name="admin" element={<Dashboard />} />
          <Route path="cms" name="admin" element={<CMs />} />
          <Route path="faq" name="admin" element={<Faq />} />
          <Route path="manage-category" name="admin" element={<Category />} />
          <Route path="profile" name="admin" element={<Profile />} />
          <Route path="change-password" name="admin" element={<ChangePassword />} />
          <Route path="newsletter" name="admin" element={<Newletter />} />
          <Route path="blogs" name="admin" element={<Blogs />} />
          <Route path='subcategory' name="subcategory" element={<Subcategory/>}/>
          <Route path='subcategory-two' name="subcategory-two" element={<SubcategoryTwo/>}/>
          <Route path='attribute' name="attribute" element={<Attribute/>}/>
          </Route>
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
