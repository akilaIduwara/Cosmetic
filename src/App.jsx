import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import { isAuthenticated } from './utils/auth'

// Initialize theme on app load
if (typeof document !== 'undefined') {
  const savedTheme = localStorage.getItem('kevina_theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
}

function AdminRoute() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize theme if not set (fallback for admin route outside ThemeProvider)
    if (typeof document !== 'undefined') {
      if (!document.documentElement.getAttribute('data-theme')) {
        const savedTheme = localStorage.getItem('kevina_theme') || 'light'
        document.documentElement.setAttribute('data-theme', savedTheme)
      }
    }

    const checkAuth = () => {
      try {
        const authStatus = isAuthenticated()
        setAuthenticated(authStatus)
        setLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        setLoading(false)
      }
    }
    
    // Initial check
    checkAuth()
  }, [])

  const handleLogin = () => {
    setAuthenticated(true)
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)',
        color: '#1a1a1a',
        fontSize: '1.5rem',
        fontFamily: 'Inter, sans-serif',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(212, 175, 55, 0.2)',
          borderTop: '4px solid #d4af37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        Loading...
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminPanel />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/shop" element={<Layout><Shop /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
  )
}

export default App


