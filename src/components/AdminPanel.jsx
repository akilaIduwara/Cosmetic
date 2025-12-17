import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts, saveProducts } from '../utils/storage'
import { isAuthenticated, setAuthenticated, isAdmin } from '../utils/auth'
import AdminProductCard from './AdminProductCard'
import ProductForm from './ProductForm'
import ChangePassword from './ChangePassword'
import './AdminPanel.css'

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSaveProduct = (productData) => {
    let updatedProducts
    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      )
    } else {
      updatedProducts = [...products, { ...productData, id: Date.now() }]
    }
    setProducts(updatedProducts)
    saveProducts(updatedProducts)
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id)
      setProducts(updatedProducts)
      saveProducts(updatedProducts)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="admin-panel">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="admin-header"
      >
        <div className="admin-header-content">
          <h1>Admin Panel</h1>
          <div className="header-actions">
            {isAdmin() && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChangePassword(true)}
                className="change-password-header-button"
              >
                🔒 Change Email/Password
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setAuthenticated(false)
                window.location.reload()
              }}
              className="logout-button"
            >
              🚪 Logout
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProduct}
              className="add-product-button"
            >
              + Add New Product
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancel}
          />
        )}
        {showChangePassword && (
          <ChangePassword
            onClose={() => setShowChangePassword(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-content"
      >
        <div className="admin-stats">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="stat-card"
          >
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </motion.div>
        </div>

        <h2 className="products-title">Products</h2>
        <div className="admin-products-grid">
          <AnimatePresence>
            {products.map((product, index) => (
              <AdminProductCard
                key={product.id}
                product={product}
                index={index}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </AnimatePresence>
        </div>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state"
          >
            <p>No products yet. Add your first product!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminPanel

