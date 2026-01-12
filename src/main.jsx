import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import './index.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          background: 'linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)',
          color: '#1a1a1a'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#d4af37' }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          {this.state.errorInfo && (
            <details style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '600px' }}>
              <summary style={{ cursor: 'pointer', color: '#d4af37', marginBottom: '0.5rem' }}>
                Error Details
              </summary>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '1rem', 
                borderRadius: '4px', 
                overflow: 'auto',
                fontSize: '0.875rem'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#d4af37',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error, event.filename, event.lineno)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

// Initialize app
console.log('Initializing React app...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: Inter, sans-serif;"><h1>Error: Root element not found</h1><p>Please check your HTML structure.</p></div>'
} else {
  try {
    console.log('Creating React root...')
    const root = ReactDOM.createRoot(rootElement)
    
    console.log('Rendering app...')
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    )
    console.log('App rendered successfully!')
  } catch (error) {
    console.error('Failed to render app:', error)
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: Inter, sans-serif;">
          <h1 style="color: #d4af37;">Failed to Load Application</h1>
          <p style="color: #666; margin-bottom: 1rem;">${error.message}</p>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; text-align: left; max-width: 600px; margin: 0 auto 1rem; overflow: auto;">
            ${error.stack || 'No stack trace available'}
          </pre>
          <button onclick="window.location.reload()" style="padding: 0.75rem 2rem; background: #d4af37; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            Reload Page
          </button>
        </div>
      `
    }
  }
}


