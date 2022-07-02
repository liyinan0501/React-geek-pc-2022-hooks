import { Routes, Route, Navigate } from 'react-router-dom'

// import Login from './pages/Login'
// import Layout from './pages/Layout'
import NotFound from './pages/NotFound'

import AuthRoute from 'components/AuthRoute'

import Home from 'pages/Home'
import Article from 'pages/Article'
import Publish from 'pages/Publish/Publish'

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from 'utils/history'

import React, { Suspense } from 'react'
const Login = React.lazy(() => import('./pages/Login'))
const Layout = React.lazy(() => import('./pages/Layout'))

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />}></Route>
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Layout />
                </AuthRoute>
              }
            >
              <Route exact path="/home" element={<Home />}></Route>
              <Route path="/home/article" element={<Article />}></Route>
              <Route
                key="add"
                path="/home/publish"
                element={<Publish />}
              ></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
