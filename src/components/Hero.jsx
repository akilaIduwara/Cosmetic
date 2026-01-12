import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getContent } from '../utils/storage';
import './Hero.css';

const Hero = () => {
    const [content, setContent] = useState(getContent().hero);

    useEffect(() => {
        const updateContent = () => {
            setContent(getContent().hero);
        };
        updateContent();
        window.addEventListener('contentUpdated', updateContent);
        return () => window.removeEventListener('contentUpdated', updateContent);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-background">
                <div className="hero-overlay"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="container hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-title"
                >
                    {content.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-subtitle"
                >
                    {content.subtitle}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-buttons"
                >
                    <Link to="/shop" className="btn btn-primary hero-btn">
                        {content.button1}
                    </Link>
                    <Link to="/about" className="btn btn-outline hero-btn-outline">
                        {content.button2}
                    </Link>
                </motion.div>
            </div>

            <div className="hero-scroll-indicator">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="scroll-arrow"
                >
                    ↓
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
