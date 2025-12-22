import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveOrder } from '../utils/storage'

function OrderForm({ cart, onBack, onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number!')
      return
    }

    // Save order to localStorage
    const order = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image
      })),
      total: total,
      status: 'pending'
    }
    saveOrder(order)

    let msg = '📦 *New Order - Kevina Cosmetics* %0A%0A'
    msg += '*Name:* ' + formData.name + '%0A'
    msg += '*Phone:* ' + formData.phone + '%0A'
    msg += '*Address:* ' + formData.address + '%0A%0A'
    msg += '*Order Items:* %0A'

    cart.forEach(item => {
      msg += '- ' + item.name + ' | Rs. ' + item.price + '%0A'
    })

    msg += '%0A*Total:* Rs. ' + total + '%0A'

    // WhatsApp number: +94 71 514 3363
    const whatsappNumber = '94715143363'
    window.open('https://wa.me/' + whatsappNumber + '?text=' + msg, '_blank')
    
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="order-page"
    >
      <div className="order-container">
        <div className="order-header">
          <h2>Order Summary</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="back-button"
          >
            ← Back
          </motion.button>
        </div>

        <div className="order-summary">
          <h3>Items in your order:</h3>
          <div className="order-items">
            {cart.map((item) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="order-item"
              >
                <span>{item.name}</span>
                <span>Rs. {item.price.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total: Rs. {total.toLocaleString()}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
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
            type="submit"
            className="submit-order-button"
          >
            Send Order via WhatsApp
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default OrderForm


