import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts, getCart, saveCart } from '../utils/storage'
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
    setProducts(getProducts())
    setCart(getCart())
  }, [])

  const addToCart = (product) => {
    const newCart = [...cart, { ...product, cartId: Date.now() }]
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (cartId) => {
    const newCart = cart.filter(item => item.cartId !== cartId)
    setCart(newCart)
    saveCart(newCart)
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
            >
              <h2>Popular Products</h2>
              <div className="products-grid">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserStore

