import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProducts, getCart, addToCart, getContent } from '../utils/storage';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [content, setContent] = useState(getContent().home);

    useEffect(() => {
        const loadData = () => {
            const allProducts = getProducts();
            setProducts(allProducts.slice(0, 6)); // Show first 6 products
            setCart(getCart());
            setContent(getContent().home);
        };
        
        // Initial load
        loadData();
        
        const updateContent = () => {
            setContent(getContent().home);
        };
        
        const updateCart = () => {
            setCart(getCart());
        };
        
        const updateProducts = () => {
            const allProducts = getProducts();
            setProducts(allProducts.slice(0, 6)); // Show first 6 products
        };
        
        // Listen for storage events (cross-tab synchronization)
        const handleStorageChange = (e) => {
            if (e.key === 'kevina_products' || !e.key) {
                const allProducts = getProducts();
                setProducts(allProducts.slice(0, 6));
            }
        };
        
        window.addEventListener('contentUpdated', updateContent);
        window.addEventListener('cartUpdated', updateCart);
        window.addEventListener('productsUpdated', updateProducts);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('contentUpdated', updateContent);
            window.removeEventListener('cartUpdated', updateCart);
            window.removeEventListener('productsUpdated', updateProducts);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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


    return (
        <div className="home-page">
            <Hero />

            <section className="features-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="features-grid"
                    >
                        {content.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="feature-card"
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="products-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title">{content.featuredTitle}</h2>
                        <p className="section-subtitle">{content.featuredSubtitle}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                        className="products-grid"
                    >
                        {products.map((product, index) => (
                            <ProductCard
                                key={`product-${product.id}-${index}`}
                                product={product}
                                onAddToCart={handleAddToCart}
                                index={index}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="section-footer"
                    >
                        <Link to="/shop" className="btn btn-primary">
                            {content.viewAllButton}
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="about-preview-section">
                <div className="container">
                    <div className="about-preview-content">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-preview-text"
                        >
                            <h2 className="section-title">{content.whyChooseTitle}</h2>
                            <p className="about-text">
                                {content.whyChooseText1}
                            </p>
                            <p className="about-text">
                                {content.whyChooseText2}
                            </p>
                            <Link to="/about" className="btn btn-outline">
                                {content.learnMoreButton}
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-preview-image"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80" 
                                alt="Cosmetic products"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
