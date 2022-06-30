import { Navigate } from 'react-router-dom'
import { hasToken } from 'utils/token'
import React from 'react'

const AuthRoute = ({ children }) => {
  return hasToken() ? (
    <>{children}</>
  ) : (
    <Navigate
      replace
      // to="/login"
      // state={{ from: `${location.pathname}${location.search}` }}
      to="/login"
    />
  )
}

export default AuthRoute
