import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts, saveProducts, getOrders } from '../utils/storage'
import { isAuthenticated, setAuthenticated, isAdmin } from '../utils/auth'
import AdminProductCard from './AdminProductCard'
import ProductForm from './ProductForm'
import ChangePassword from './ChangePassword'
import ContentEditor from './ContentEditor'
import './AdminPanel.css'

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('products')
  const [showForm, setShowForm] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showContentEditor, setShowContentEditor] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderFilter, setOrderFilter] = useState('all') // all, pending, completed
  const [productFilter, setProductFilter] = useState('all') // all, skincare, haircare

  useEffect(() => {
    setProducts(getProducts())
    setOrders(getOrders())
    
    // Refresh orders every 5 seconds
    const interval = setInterval(() => {
      setOrders(getOrders())
    }, 5000)
    
    return () => clearInterval(interval)
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

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    localStorage.setItem('kevina_orders', JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const completedOrders = orders.filter(o => o.status === 'completed')
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = productFilter === 'all' || 
      (productFilter === 'skincare' && product.name.toLowerCase().includes('ordinary')) ||
      (productFilter === 'haircare' && (product.name.toLowerCase().includes('tresemme') || product.name.toLowerCase().includes('ogx')))
    return matchesSearch && matchesFilter
  })
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true
    if (orderFilter === 'pending') return order.status === 'pending'
    if (orderFilter === 'completed') return order.status === 'completed'
    return true
  })
  
  const filteredPendingOrders = filteredOrders.filter(o => o.status === 'pending')
  const filteredCompletedOrders = filteredOrders.filter(o => o.status === 'completed')

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
            {activeTab === 'products' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddProduct}
                className="add-product-button"
              >
                + Add New Product
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      <div className="admin-tabs">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('products')}
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
        >
          Products
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('orders')}
          className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
        >
          Orders {pendingOrders.length > 0 && <span className="badge">{pendingOrders.length}</span>}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContentEditor(true)}
          className="admin-tab content-tab"
        >
          ✏️ Edit Site Content
        </motion.button>
      </div>

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
        {showContentEditor && (
          <ContentEditor
            onClose={() => setShowContentEditor(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-content"
      >
        {activeTab === 'products' ? (
          <>
            <div className="admin-stats">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>{filteredProducts.length}</h3>
                <p>Filtered Results</p>
              </motion.div>
            </div>

            <div className="admin-filters-section">
              <div className="admin-search-bar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="admin-filter-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProductFilter('all')}
                  className={`admin-filter-btn ${productFilter === 'all' ? 'active' : ''}`}
                >
                  All Products
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProductFilter('skincare')}
                  className={`admin-filter-btn ${productFilter === 'skincare' ? 'active' : ''}`}
                >
                  Skincare
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProductFilter('haircare')}
                  className={`admin-filter-btn ${productFilter === 'haircare' ? 'active' : ''}`}
                >
                  Haircare
                </motion.button>
              </div>
            </div>

            <h2 className="products-title">Products</h2>
            <div className="admin-products-grid">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
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

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <p>{searchTerm || productFilter !== 'all' ? 'No products match your filters.' : 'No products yet. Add your first product!'}</p>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <div className="admin-stats">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>{pendingOrders.length}</h3>
                <p>Pending Orders</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>{completedOrders.length}</h3>
                <p>Completed Orders</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat-card"
              >
                <h3>Rs. {totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </motion.div>
            </div>

            <div className="admin-filters-section">
              <div className="admin-filter-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderFilter('all')}
                  className={`admin-filter-btn ${orderFilter === 'all' ? 'active' : ''}`}
                >
                  All Orders
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderFilter('pending')}
                  className={`admin-filter-btn ${orderFilter === 'pending' ? 'active' : ''}`}
                >
                  Pending ({pendingOrders.length})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderFilter('completed')}
                  className={`admin-filter-btn ${orderFilter === 'completed' ? 'active' : ''}`}
                >
                  Completed ({completedOrders.length})
                </motion.button>
              </div>
            </div>

            <div className="orders-section">
              <h2 className="products-title">Order History</h2>
              
              {filteredPendingOrders.length > 0 && (
                <div className="orders-group">
                  <h3 className="orders-group-title">Pending Orders</h3>
                  <div className="orders-list">
                    {filteredPendingOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="order-card pending"
                      >
                        <div className="order-header">
                          <div>
                            <h4>Order #{order.id}</h4>
                            <p className="order-date">{new Date(order.date).toLocaleString()}</p>
                          </div>
                          <span className="order-status pending">Pending</span>
                        </div>
                        <div className="order-customer">
                          <p><strong>Customer:</strong> {order.customerName}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Address:</strong> {order.address || 'N/A'}</p>
                        </div>
                        <div className="order-items">
                          <strong>Items:</strong>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <span>{item.name}</span>
                              <span>Rs. {item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">
                            <strong>Total: Rs. {order.total.toLocaleString()}</strong>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="complete-order-btn"
                          >
                            Mark as Completed
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {filteredCompletedOrders.length > 0 && (
                <div className="orders-group">
                  <h3 className="orders-group-title">Completed Orders</h3>
                  <div className="orders-list">
                    {filteredCompletedOrders.slice().reverse().map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="order-card completed"
                      >
                        <div className="order-header">
                          <div>
                            <h4>Order #{order.id}</h4>
                            <p className="order-date">{new Date(order.date).toLocaleString()}</p>
                          </div>
                          <span className="order-status completed">Completed</span>
                        </div>
                        <div className="order-customer">
                          <p><strong>Customer:</strong> {order.customerName}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Address:</strong> {order.address || 'N/A'}</p>
                        </div>
                        <div className="order-items">
                          <strong>Items:</strong>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <span>{item.name}</span>
                              <span>Rs. {item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">
                            <strong>Total: Rs. {order.total.toLocaleString()}</strong>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {filteredOrders.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-state"
                >
                  <p>{orderFilter !== 'all' ? `No ${orderFilter} orders found.` : 'No orders yet.'}</p>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default AdminPanel

