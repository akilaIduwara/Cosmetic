import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { changePassword, changeEmail, changeEmailAndPassword, getAdminCredentials } from '../utils/auth'
import './ChangePassword.css'

function ChangePassword({ onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  useEffect(() => {
    const credentials = getAdminCredentials()
    setFormData(prev => ({ ...prev, newEmail: credentials.email }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const credentials = getAdminCredentials()
    const emailChanged = formData.newEmail !== credentials.email
    const passwordChanged = formData.newPassword && formData.newPassword.length > 0

    if (passwordChanged) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match')
        return
      }

      if (formData.newPassword.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
    }

    if (!emailChanged && !passwordChanged) {
      setError('Please change at least email or password')
      return
    }

    let result
    if (emailChanged && passwordChanged) {
      result = changeEmailAndPassword(formData.currentPassword, formData.newEmail, formData.newPassword)
    } else if (emailChanged) {
      result = changeEmail(formData.currentPassword, formData.newEmail)
    } else {
      result = changePassword(formData.currentPassword, formData.newPassword)
    }
    
    if (result.success) {
      setSuccess(result.message)
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1500)
    } else {
      setError(result.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="change-password-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="change-password-container"
      >
        <div className="change-password-header">
          <h2>Change Email & Password</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="close-button"
          >
            ✕
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label>Current Password *</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                className="password-toggle"
              >
                {showPassword.current ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>New Email *</label>
            <input
              type="email"
              value={formData.newEmail}
              onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
              placeholder="Enter new email"
              required
            />
          </div>

          <div className="form-group">
            <label>New Password (optional)</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter new password (min 6 characters, leave empty to keep current)"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                className="password-toggle"
              >
                {showPassword.new ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {formData.newPassword && (
            <div className="form-group">
              <label>Confirm New Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  required={formData.newPassword.length > 0}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  className="password-toggle"
                >
                  {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="success-message"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-actions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="save-button"
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ChangePassword

