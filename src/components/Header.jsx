import { motion } from 'framer-motion'

function Header({ cartCount, onCartClick }) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="header"
    >
      <div className="header-content">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="header-title"
        >
          Kevina Cosmetics
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
          className="cart-button"
        >
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="cart-badge"
            >
              {cartCount}
            </motion.span>
          )}
          <span>View Cart</span>
        </motion.button>
      </div>
    </motion.header>
  )
}

export default Header


