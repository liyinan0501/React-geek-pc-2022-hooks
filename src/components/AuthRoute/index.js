import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from 'utils/token'
import React from 'react'

const AuthRoute = ({ children }) => {
  let location = useLocation()
  return hasToken() ? (
    <>{children}</>
  ) : (
    <Navigate replace to="/login" state={{ from: location }} />
  )
}

export default AuthRoute
