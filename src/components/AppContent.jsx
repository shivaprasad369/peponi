import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import useTokenVerification from './Hooks/useTokenVerification'

const AppContent = () => {
  const {isVerified,user,isLoading1,error,setUser,setIsVerified,setIsLoading} = useTokenVerification();
  const navigate = useNavigate();
  if(isLoading1){
    return <CSpinner color="primary" />
  }
  if(error){
    return <div>Error</div>
  }
  if(!isVerified){
    navigate('/admin');
  }
  return (
    <CContainer className="px-4 relative" replace  lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>

    </CContainer>
  )
}

export default React.memo(AppContent)
