import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserStore from './components/UserStore'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import { isAuthenticated } from './utils/auth'

function AdminRoute() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setLoading(false)
  }, [])

  if (loading) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>Loading...</div>
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  return <AdminPanel />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserStore />} />
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
  )
}

export default App


