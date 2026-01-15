import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCart, addToCart as addToCartStorage, removeFromCart as removeFromCartStorage, saveCart } from '../utils/storage'
import { subscribeToProducts, getProductsFromFirestore } from '../utils/firestore'
import '../utils/migrateProducts' // Auto-migrate default products
import Header from './Header'
import ProductCard from './ProductCard'
import Cart from './Cart'
import OrderForm from './OrderForm'
import SuccessPage from './SuccessPage'
import AnimatedBackground from './AnimatedBackground'
import './UserStore.css'

function UserStore() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    setCart(getCart())
    
    // Set up real-time Firestore listener for products
    const unsubscribe = subscribeToProducts((firestoreProducts) => {
      console.log('UserStore: Firestore products updated, count:', firestoreProducts.length)
      setProducts(firestoreProducts)
    })
    
    // Also listen for custom events (for immediate updates)
    const handleProductsUpdate = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        console.log('UserStore: Products updated event, count:', event.detail.length)
        setProducts([...event.detail])
      }
    }
    
    // Listen for cart updates
    const handleCartUpdate = (event) => {
      if (event.detail) {
        setCart(event.detail)
      } else {
        setCart(getCart())
      }
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('productsUpdated', handleProductsUpdate)
    
    return () => {
      unsubscribe() // Unsubscribe from Firestore listener
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('productsUpdated', handleProductsUpdate)
    }
  }, [])

  const addToCart = (product, quantity = 1) => {
    addToCartStorage(product, quantity)
    // Cart will update automatically via event
  }

  const removeFromCart = (cartId) => {
    removeFromCartStorage(cartId)
    // Cart will update automatically via event
  }

  const clearCart = () => {
    setCart([])
    saveCart([])
  }

  const handleOrderComplete = () => {
    clearCart()
    setShowOrderForm(false)
    setShowSuccess(true)
  }

  return (
    <div className="user-store">
      <AnimatedBackground />
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setShowCart(true)} 
      />
      
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <SuccessPage 
            key="success"
            onReturn={() => {
              setShowSuccess(false)
              setShowCart(false)
            }}
          />
        ) : showOrderForm ? (
          <OrderForm
            key="order"
            cart={cart}
            onBack={() => setShowOrderForm(false)}
            onComplete={handleOrderComplete}
          />
        ) : showCart ? (
          <Cart
            key="cart"
            cart={cart}
            onBack={() => setShowCart(false)}
            onRemove={removeFromCart}
            onCheckout={() => {
              setShowCart(false)
              setShowOrderForm(true)
            }}
          />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-page"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="hero-section"
            >
              <h1 className="hero-title">Kevina Cosmetics</h1>
              <p className="hero-subtitle">Boralesgamuwa | Quality Products | Islandwide Delivery</p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about-section"
            >
              <h2>About Us</h2>
              <p>
                Welcome to <strong>Kevina Cosmetics</strong> — where beauty meets confidence. 
                We offer high-quality, cruelty-free cosmetics and skincare to help you express your unique style.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="products-section"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              <h2>Popular Products</h2>
              <div className="products-grid" style={{ opacity: 1, visibility: 'visible', display: 'grid' }}>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductCard
                      key={`product-${product.id}-${index}`}
                      product={product}
                      onAddToCart={addToCart}
                      index={index}
                    />
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                    <p>No products available.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserStore

