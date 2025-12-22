import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../utils/storage';
import './About.css';

const About = () => {
    const [content, setContent] = useState(getContent().about);

    useEffect(() => {
        const updateContent = () => {
            setContent(getContent().about);
        };
        updateContent();
        window.addEventListener('contentUpdated', updateContent);
        return () => window.removeEventListener('contentUpdated', updateContent);
    }, []);

    return (
        <div className="about-page">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="about-hero"
            >
                <div className="about-hero-content">
                    <h1 className="about-title">{content.heroTitle}</h1>
                    <p className="about-subtitle">{content.heroSubtitle}</p>
                </div>
            </motion.div>

            <section className="about-section">
                <div className="about-container">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="about-content"
                    >
                        <h2 className="section-heading">{content.welcomeTitle}</h2>
                        <p className="about-text">
                            {content.welcomeText1}
                        </p>
                        <p className="about-text">
                            {content.welcomeText2}
                        </p>
                        <p className="about-text">
                            {content.welcomeText3}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="about-image"
                    >
                        <div className="image-placeholder">
                            <img 
                                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80" 
                                alt="Cosmetic products"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="features-section">
                <div className="features-container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-heading center"
                    >
                        {content.whyChooseTitle}
                    </motion.h2>
                    <div className="features-grid">
                        {content.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
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
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-container">
                    {content.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                            whileHover={{ scale: 1.1 }}
                            className="stat-card"
                        >
                            <h3 className="stat-number">{stat.number}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mission-section">
                <div className="mission-container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mission-content"
                    >
                        <h2 className="section-heading">{content.missionTitle}</h2>
                        <p className="mission-text">
                            {content.missionText}
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;

