import { motion } from 'framer-motion'

function AdminProductCard({ product, index, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="admin-product-card"
    >
      <div className="admin-product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="admin-product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image'
          }}
        />
      </div>
      
      <div className="admin-product-info">
        <h3 className="admin-product-name">{product.name}</h3>
        <p className="admin-product-price">Rs. {product.price.toLocaleString()}</p>
        
        <div className="admin-product-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(product)}
            className="edit-button"
          >
            ✏️ Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(product.id)}
            className="delete-button"
          >
            🗑️ Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminProductCard


