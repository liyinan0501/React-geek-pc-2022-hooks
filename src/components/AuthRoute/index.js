import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from 'utils/token'
import React from 'react'

const AuthRoute = ({ children }) => {
  const location = useLocation()
  console.log(location.pathname)
  return hasToken() ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}` }}
    />
  )
}

export default AuthRoute
