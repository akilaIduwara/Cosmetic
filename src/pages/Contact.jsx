import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../utils/storage';
import './Contact.css';

const Contact = () => {
    const [content, setContent] = useState(getContent().contact);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        const updateContent = () => {
            setContent(getContent().contact);
        };
        updateContent();
        window.addEventListener('contentUpdated', updateContent);
        return () => window.removeEventListener('contentUpdated', updateContent);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };


    return (
        <div className="contact-page">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="contact-hero"
            >
                <div className="contact-hero-content">
                    <h1 className="contact-title">{content.heroTitle}</h1>
                    <p className="contact-subtitle">{content.heroSubtitle}</p>
                </div>
            </motion.div>

            <div className="contact-container">
                <div className="contact-content">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-info-section"
                    >
                        <h2 className="section-heading">{content.infoTitle}</h2>
                        <p className="contact-description">
                            {content.infoDescription}
                        </p>

                        <div className="contact-info-grid">
                            {content.contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="contact-info-card"
                                >
                                    <div className="contact-icon">{info.icon}</div>
                                    <h3 className="contact-info-title">{info.title}</h3>
                                    <p className="contact-info-details">{info.details}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="map-placeholder">
                            <div className="map-content">
                                <p>📍 Boralesgamuwa, Sri Lanka</p>
                                <p className="map-note">{content.mapNote}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-form-section"
                    >
                        <h2 className="section-heading">{content.formTitle}</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="+94 77 123 4567"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="form-textarea"
                                    placeholder="Your message..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="submit-button"
                            >
                                {content.submitButton}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

