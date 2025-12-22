import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCart, updateCartItemQuantity, removeFromCart as removeFromCartStorage } from '../utils/storage';
import Cart from './Cart';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };
    updateCart();
    
    // Listen for cart updates via custom event
    const handleCartUpdate = (event) => {
      if (event.detail) {
        setCart(event.detail);
      } else {
        updateCart();
      }
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Also listen for storage changes (for cross-tab updates)
    const handleStorageChange = () => {
      updateCart();
    };
    window.addEventListener('storage', handleStorageChange);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const removeFromCart = (cartId) => {
    removeFromCartStorage(cartId);
    // Cart will update automatically via event
  };


  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="navbar-logo">
              <span className="logo-text">KEVINA</span>
              <span className="logo-subtitle">Cosmetics</span>
            </Link>
          </motion.div>

          <div className="navbar-links">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="navbar-actions">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCart(true)}
              className="cart-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2L7 6m8-4l-2 4M3 6h18l-2 13H5L3 6z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                className="menu-line"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="menu-line"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                className="menu-line"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="cart-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cart-sidebar-header">
                <h2>Your Cart</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCart(false)}
                  className="close-cart-button"
                >
                  ✕
                </motion.button>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart-message">
                  <p>Your cart is empty</p>
                  <Link to="/shop" onClick={() => setShowCart(false)} className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cart-sidebar-items">
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="cart-sidebar-item"
                      >
                        <img src={item.image || 'https://via.placeholder.com/80x80?text=Product'} alt={item.name} />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>Rs. {item.price.toLocaleString()} each</p>
                          <p className="cart-item-subtotal-sidebar">Qty: {item.quantity || 1} × Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                        </div>
                        <div className="cart-sidebar-controls">
                          <div className="cart-quantity-control-sidebar">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                updateCartItemQuantity(item.cartId, (item.quantity || 1) - 1);
                              }}
                              className="quantity-control-btn-sidebar"
                            >
                              −
                            </motion.button>
                            <span className="cart-quantity-sidebar">{item.quantity || 1}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                updateCartItemQuantity(item.cartId, (item.quantity || 1) + 1);
                              }}
                              className="quantity-control-btn-sidebar"
                            >
                              +
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.cartId)}
                            className="remove-item-button"
                          >
                            ✕
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="cart-sidebar-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="total-amount">Rs. {total.toLocaleString()}</span>
                    </div>
                    <Link to="/shop" onClick={() => setShowCart(false)} className="btn btn-primary btn-block">
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
