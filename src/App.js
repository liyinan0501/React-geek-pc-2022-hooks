import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>App Component</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
