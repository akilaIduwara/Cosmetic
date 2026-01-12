import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const products = [
    { id: 1, name: 'Luxury Lipstick', price: 'Rs. 2,500', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
    { id: 2, name: 'Silk Foundation', price: 'Rs. 3,200', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop' },
    { id: 3, name: 'Glow Serum', price: 'Rs. 4,500', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id: 4, name: 'Mascara Pro', price: 'Rs. 1,800', image: 'https://images.unsplash.com/photo-1631214524020-7d5b5c5b5b5b?w=400&h=400&fit=crop' },
    { id: 5, name: 'Blush Palette', price: 'Rs. 3,500', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
    { id: 6, name: 'Eye Shadow Set', price: 'Rs. 2,900', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' }
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Kevina Cosmetics</div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <h1 className="hero-title">Discover Your True Beauty</h1>
          <p className="hero-subtitle">Premium cosmetics crafted with care for the modern you</p>
          <a href="#products" className="cta-button">Shop Now</a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Our Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="about-content">
            <p>
              Kevina Cosmetics was born from a passion for beauty and a commitment to quality. 
              We believe that everyone deserves to feel confident and beautiful in their own skin.
            </p>
            <p>
              Our products are carefully curated and tested to ensure they meet the highest standards. 
              We use only the finest ingredients to create cosmetics that enhance your natural beauty 
              while caring for your skin.
            </p>
            <p>
              Based in Boralesgamuwa, we serve customers across Sri Lanka with premium beauty products 
              that celebrate individuality and self-expression.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Kevina Cosmetics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
