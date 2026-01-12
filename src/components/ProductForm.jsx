import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.image
      })
    }
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill in all fields!')
      return
    }
    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form-overlay"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="form-container"
      >
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name *</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (Rs.) *</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Enter image URL"
              required
            />
            {formData.image && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={formData.image}
                alt="Preview"
                className="image-preview"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}
          </div>

          <div className="form-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="save-button"
            >
              {product ? 'Update Product' : 'Add Product'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ProductForm


