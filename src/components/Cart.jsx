import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { updateCartItemQuantity, removeFromCart as removeFromCartStorage } from '../utils/storage'

function Cart({ cart, onBack, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  const handleQuantityChange = (cartId, newQuantity) => {
    updateCartItemQuantity(cartId, newQuantity)
  }

  const handleRemove = (cartId) => {
    if (onRemove) {
      onRemove(cartId)
    } else {
      removeFromCartStorage(cartId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="cart-page"
    >
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="back-button"
          >
            ← Back
          </motion.button>
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-cart"
          >
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
          </motion.div>
        ) : (
          <>
            <div className="cart-items">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    layout
                    className="cart-item"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Product'
                      }}
                    />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">Rs. {item.price.toLocaleString()} each</p>
                      <p className="cart-item-subtotal">Subtotal: Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="cart-quantity-control">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.cartId, (item.quantity || 1) - 1)}
                          className="quantity-control-btn"
                        >
                          −
                        </motion.button>
                        <span className="cart-quantity">{item.quantity || 1}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.cartId, (item.quantity || 1) + 1)}
                          className="quantity-control-btn"
                        >
                          +
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item.cartId)}
                        className="remove-button"
                      >
                        ✕
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cart-footer"
            >
              <div className="cart-total">
                <h3>Total: Rs. {total.toLocaleString()}</h3>
              </div>
              <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="checkout-button"
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Cart


