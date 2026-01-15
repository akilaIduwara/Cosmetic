import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getOrders } from '../utils/storage'
import { isAuthenticated, setAuthenticated, isAdmin } from '../utils/auth'
import { 
  getProductsFromFirestore, 
  addProductToFirestore, 
  updateProductInFirestore, 
  deleteProductFromFirestore,
  subscribeToProducts 
} from '../utils/firestore'
import '../utils/migrateProducts' // Auto-migrate default products
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
    // Load orders from localStorage
    setOrders(getOrders())
    
    // Set up real-time Firestore listener for products
    const unsubscribe = subscribeToProducts((firestoreProducts) => {
      console.log('AdminPanel: Firestore products updated, count:', firestoreProducts.length)
      setProducts(firestoreProducts)
    })
    
    // Also listen for custom events (for immediate updates)
    const handleProductsUpdate = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        console.log('AdminPanel: Products updated event, count:', event.detail.length)
        setProducts([...event.detail])
      }
    }
    
    window.addEventListener('productsUpdated', handleProductsUpdate)
    
    // Refresh orders every 5 seconds
    const interval = setInterval(() => {
      setOrders(getOrders())
    }, 5000)
    
    return () => {
      unsubscribe() // Unsubscribe from Firestore listener
      clearInterval(interval)
      window.removeEventListener('productsUpdated', handleProductsUpdate)
    }
  }, [])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product in Firestore
        await updateProductInFirestore(editingProduct.id, productData)
        console.log('AdminPanel: Product updated in Firestore:', editingProduct.id)
      } else {
        // Add new product to Firestore
        const newProductId = await addProductToFirestore(productData)
        console.log('AdminPanel: Product added to Firestore:', newProductId)
      }
      
      // Close form - products will update automatically via Firestore listener
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product. Please try again.')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductFromFirestore(id)
        console.log('AdminPanel: Product deleted from Firestore:', id)
        // Products will update automatically via Firestore listener
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product. Please try again.')
      }
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

  const sendOrderToWhatsApp = (order) => {
    // Format order details for WhatsApp
    const orderDate = new Date(order.date).toLocaleString()
    let message = `📦 *NEW ORDER - KEVINA COSMETICS*\n\n`
    message += `*Order ID:* #${order.id}\n`
    message += `*Date:* ${orderDate}\n`
    message += `*Status:* ${order.status.toUpperCase()}\n\n`
    message += `👤 *CUSTOMER DETAILS*\n`
    message += `Name: ${order.customerName}\n`
    message += `Phone: ${order.phone}\n`
    message += `Address: ${order.address || 'N/A'}\n\n`
    message += `🛍️ *ORDER ITEMS*\n`
    order.items.forEach((item, idx) => {
      const quantity = item.quantity || 1
      const itemTotal = item.price * quantity
      message += `${idx + 1}. ${item.name}\n`
      message += `   Qty: ${quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${itemTotal.toLocaleString()}\n`
    })
    message += `\n📊 *ORDER SUMMARY*\n`
    const subtotal = order.subtotal || order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    const deliveryFee = order.deliveryFee || 0
    message += `Subtotal: Rs. ${subtotal.toLocaleString()}\n`
    if (deliveryFee > 0) {
      message += `Delivery Fee: Rs. ${deliveryFee.toLocaleString()}\n`
    }
    message += `\n💰 *TOTAL: Rs. ${order.total.toLocaleString()}*\n`
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `Thank you for your order! 🙏`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // Replace with your WhatsApp number (format: country code + number without + or 0)
    // Example: 94771234567 for Sri Lanka
    const whatsappNumber = '94702886067' // Change this to your WhatsApp number
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
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
                              <span>{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                              <span>Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">
                            {order.subtotal && (
                              <>
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                  <span>Subtotal: Rs. {order.subtotal.toLocaleString()}</span>
                                </div>
                                {order.deliveryFee > 0 && (
                                  <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    <span>Delivery Fee: Rs. {order.deliveryFee.toLocaleString()}</span>
                                  </div>
                                )}
                              </>
                            )}
                            <strong>Total: Rs. {order.total.toLocaleString()}</strong>
                          </div>
                          <div className="order-actions">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => sendOrderToWhatsApp(order)}
                              className="whatsapp-order-btn"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              Send to WhatsApp
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="complete-order-btn"
                            >
                              Mark as Completed
                            </motion.button>
                          </div>
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
                              <span>{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                              <span>Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-total">
                            {order.subtotal && (
                              <>
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                  <span>Subtotal: Rs. {order.subtotal.toLocaleString()}</span>
                                </div>
                                {order.deliveryFee > 0 && (
                                  <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    <span>Delivery Fee: Rs. {order.deliveryFee.toLocaleString()}</span>
                                  </div>
                                )}
                              </>
                            )}
                            <strong>Total: Rs. {order.total.toLocaleString()}</strong>
                          </div>
                          <div className="order-actions">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => sendOrderToWhatsApp(order)}
                              className="whatsapp-order-btn"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              Send to WhatsApp
                            </motion.button>
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

