import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getCart, saveOrder, saveCart } from '../utils/storage'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    const cartItems = getCart()
    if (cartItems.length === 0) {
      // Redirect to shop if cart is empty
      navigate('/shop')
      return
    }
    setCart(cartItems)
  }, [navigate])

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleConfirmOrder = () => {
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number!')
      return
    }

    // Save order to localStorage
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image
      })),
      total: total,
      status: 'pending'
    }
    saveOrder(order)

    // Format order details for WhatsApp message
    const orderDate = new Date(order.date).toLocaleString()
    let message = `📦 *NEW ORDER - KEVINA COSMETICS*\n\n`
    message += `*Order ID:* #${order.id}\n`
    message += `*Date:* ${orderDate}\n`
    message += `*Status:* PENDING\n\n`
    message += `👤 *CUSTOMER DETAILS*\n`
    message += `Name: ${formData.name}\n`
    message += `Phone: ${formData.phone}\n`
    message += `Address: ${formData.address || 'N/A'}\n\n`
    message += `🛍️ *ORDER ITEMS*\n`
    
    cart.forEach((item, idx) => {
      const quantity = item.quantity || 1
      const itemTotal = item.price * quantity
      message += `${idx + 1}. ${item.name}\n`
      message += `   Qty: ${quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${itemTotal.toLocaleString()}\n`
    })
    
    message += `\n💰 *TOTAL: Rs. ${total.toLocaleString()}*\n`
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `Thank you for your order! 🙏`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // WhatsApp number (format: country code + number without + or 0)
    const whatsappNumber = '94715143363' // Change this to your WhatsApp number
    
    // Clear cart after order
    saveCart([])
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
    
    // Show success message and redirect
    alert('Order confirmed! Check your WhatsApp for order details.')
    navigate('/shop')
  }

  if (cart.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="checkout-header"
        >
          <h1>Checkout</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="back-to-shop-button"
          >
            ← Back to Shop
          </motion.button>
        </motion.div>

        <div className="checkout-content">
          <div className="checkout-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-summary-section"
            >
              <h2>📋 Your Order</h2>
              <div className="order-items-list">
                {cart.map((item, idx) => {
                  const quantity = item.quantity || 1
                  const itemTotal = item.price * quantity
                  return (
                    <motion.div
                      key={item.cartId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="order-item-card"
                    >
                      <div className="order-item-image">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=Product'
                          }}
                        />
                      </div>
                      <div className="order-item-details">
                        <h4>{item.name}</h4>
                        <div className="order-item-pricing">
                          <span className="order-item-quantity">Quantity: {quantity}</span>
                          <span className="order-item-unit-price">Rs. {item.price.toLocaleString()} each</span>
                        </div>
                        <div className="order-item-subtotal">
                          <span>Subtotal: Rs. {itemTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          <div className="checkout-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-total-section"
            >
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-total">
                <span>Total Amount:</span>
                <span className="total-price">Rs. {total.toLocaleString()}</span>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="customer-form"
            >
              <h3>Your Details</h3>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Delivery Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows="4"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleConfirmOrder}
                className="confirm-order-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5rem' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Confirm Order & Send to WhatsApp
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

