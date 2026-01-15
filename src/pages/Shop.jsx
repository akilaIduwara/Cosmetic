import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCart, addToCart, removeFromCart, saveCart, getContent } from '../utils/storage';
import { subscribeToProducts, getProductsFromFirestore } from '../utils/firestore';
import '../utils/migrateProducts'; // Auto-migrate default products
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import './Shop.css';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [content, setContent] = useState(getContent().shop);
    const [showCart, setShowCart] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);

    useEffect(() => {
        // Load cart and content from localStorage
        setCart(getCart());
        setContent(getContent().shop);
        
        // Set up real-time Firestore listener for products
        const unsubscribe = subscribeToProducts((firestoreProducts) => {
            console.log('Shop: Firestore products updated, count:', firestoreProducts.length);
            setProducts(firestoreProducts);
        });
        
        // Also listen for custom events (for immediate updates)
        const handleProductsUpdate = (event) => {
            if (event.detail && Array.isArray(event.detail)) {
                console.log('Shop: Products updated event, count:', event.detail.length);
                setProducts([...event.detail]);
            }
        };
        
        const updateContent = () => {
            setContent(getContent().shop);
        };
        
        const updateCart = () => {
            setCart(getCart());
        };
        
        window.addEventListener('contentUpdated', updateContent);
        window.addEventListener('cartUpdated', updateCart);
        window.addEventListener('productsUpdated', handleProductsUpdate);
        
        return () => {
            unsubscribe(); // Unsubscribe from Firestore listener
            window.removeEventListener('contentUpdated', updateContent);
            window.removeEventListener('cartUpdated', updateCart);
            window.removeEventListener('productsUpdated', handleProductsUpdate);
        };
    }, []);

    // Check URL for cart parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.get('cart') === 'true') {
            setShowCart(true);
        } else {
            setShowCart(false);
        }
    }, [location.search]);

    const handleAddToCart = (product, quantity = 1) => {
        addToCart(product, quantity);
        // Cart will update automatically via event
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${product.name} (${quantity}x) added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    };

    const handleRemoveFromCart = (cartId) => {
        removeFromCart(cartId);
    };

    const handleOrderComplete = () => {
        saveCart([]);
        setShowOrderForm(false);
        setShowCart(false);
        // Show success message
        alert('Order placed successfully! Check your WhatsApp for order confirmation.');
    };

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || 
            (filter === 'skincare' && product.name.toLowerCase().includes('ordinary')) ||
            (filter === 'haircare' && (product.name.toLowerCase().includes('tresemme') || product.name.toLowerCase().includes('ogx')));
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0
            }
        }
    };

    return (
        <div className="shop-page">
            <AnimatePresence mode="wait">
                {showOrderForm ? (
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
                        onBack={() => {
                            setShowCart(false);
                            navigate('/shop');
                        }}
                        onRemove={handleRemoveFromCart}
                        onCheckout={() => {
                            setShowCart(false);
                            setShowOrderForm(true);
                            navigate('/shop');
                        }}
                    />
                ) : (
                    <>
                        <motion.div
                            key="shop"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="shop-hero"
                        >
                            <div className="shop-hero-content">
                                <h1 className="shop-title">{content.heroTitle}</h1>
                                <p className="shop-subtitle">{content.heroSubtitle}</p>
                            </div>
                        </motion.div>

                        <div className="shop-container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="shop-filters"
                >
                    <div className="search-bar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-buttons">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('all')}
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        >
                            All Products
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('skincare')}
                            className={`filter-btn ${filter === 'skincare' ? 'active' : ''}`}
                        >
                            Skincare
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter('haircare')}
                            className={`filter-btn ${filter === 'haircare' ? 'active' : ''}`}
                        >
                            Haircare
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="products-grid"
                    style={{ opacity: 1, visibility: 'visible' }}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ProductCard
                                key={`product-${product.id}-${index}`}
                                product={product}
                                onAddToCart={handleAddToCart}
                                index={index}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="no-products"
                            style={{ gridColumn: '1 / -1' }}
                        >
                            <p>No products found. Try a different search or filter.</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;

