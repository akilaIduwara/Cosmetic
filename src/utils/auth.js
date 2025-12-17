const ADMIN_KEY = 'kevina_admin'
const SESSION_KEY = 'kevina_admin_session'
const USER_TYPE_KEY = 'kevina_user_type'
const DEFAULT_EMAIL = 'admin@kevina.com'
const DEFAULT_PASSWORD = 'admin123'

// Secondary user credentials (fixed, cannot be changed)
const SECONDARY_EMAIL = 'akilainduwara205@gmail.com'
const SECONDARY_PASSWORD = 'induwara5522'

export const getAdminCredentials = () => {
  const stored = localStorage.getItem(ADMIN_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  // Set default credentials on first use
  const defaultCreds = {
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD
  }
  saveAdminCredentials(defaultCreds)
  return defaultCreds
}

export const saveAdminCredentials = (credentials) => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(credentials))
}

export const verifyAdmin = (email, password) => {
  // Check secondary user first
  if (email === SECONDARY_EMAIL && password === SECONDARY_PASSWORD) {
    return { success: true, userType: 'secondary' }
  }
  
  // Check admin user
  const credentials = getAdminCredentials()
  if (credentials.email === email && credentials.password === password) {
    return { success: true, userType: 'admin' }
  }
  
  return { success: false, userType: null }
}

export const changePassword = (currentPassword, newPassword) => {
  const credentials = getAdminCredentials()
  if (credentials.password !== currentPassword) {
    return { success: false, message: 'Current password is incorrect' }
  }
  credentials.password = newPassword
  saveAdminCredentials(credentials)
  return { success: true, message: 'Password changed successfully' }
}

export const changeEmail = (currentPassword, newEmail) => {
  const credentials = getAdminCredentials()
  if (credentials.password !== currentPassword) {
    return { success: false, message: 'Current password is incorrect' }
  }
  credentials.email = newEmail
  saveAdminCredentials(credentials)
  return { success: true, message: 'Email changed successfully' }
}

export const changeEmailAndPassword = (currentPassword, newEmail, newPassword) => {
  const credentials = getAdminCredentials()
  if (credentials.password !== currentPassword) {
    return { success: false, message: 'Current password is incorrect' }
  }
  credentials.email = newEmail
  credentials.password = newPassword
  saveAdminCredentials(credentials)
  return { success: true, message: 'Email and password changed successfully' }
}

export const isAuthenticated = () => {
  return localStorage.getItem(SESSION_KEY) === 'true'
}

export const getUserType = () => {
  return localStorage.getItem(USER_TYPE_KEY) || null
}

export const setAuthenticated = (value, userType = null) => {
  if (value) {
    localStorage.setItem(SESSION_KEY, 'true')
    if (userType) {
      localStorage.setItem(USER_TYPE_KEY, userType)
    }
  } else {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(USER_TYPE_KEY)
  }
}

export const isAdmin = () => {
  return getUserType() === 'admin'
}

export const isSecondary = () => {
  return getUserType() === 'secondary'
}

