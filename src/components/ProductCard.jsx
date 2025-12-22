import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, index = 0 }) => {
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuickAdd = () => {
    onAddToCart(product, 1);
  };

  const handleAddWithQuantity = () => {
    onAddToCart(product, quantity);
    setShowQuantityModal(false);
    setQuantity(1);
  };

  return (
    <>
      <motion.div
        className="product-card luxury-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -12 }}
      >
        <div className="product-image-wrapper">
          <motion.img
            src={product.image}
            alt={product.name}
            className="product-image"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="product-overlay">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="quick-add-btn"
            >
              Quick Add
            </motion.button>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-wrapper">
            <span className="product-price">Rs. {product.price?.toLocaleString() || product.price}</span>
          </div>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuantityModal(true)}
            className="btn btn-primary add-to-cart-btn"
          >
            <span>Add to Cart</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 2L7 6m8-4l-2 4M3 6h18l-2 13H5L3 6z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showQuantityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="quantity-modal-overlay"
            onClick={() => setShowQuantityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="quantity-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Select Quantity</h3>
              <p className="product-name-modal">{product.name}</p>
              <p className="quantity-hint">Maximum: 999 items</p>
              <div className="quantity-selector">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  −
                </motion.button>
                <input
                  type="number"
                  min="1"
                  max="999"
                  step="1"
                  value={quantity}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 1 : parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1) {
                      setQuantity(Math.min(999, Math.max(1, val)));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '' || parseInt(e.target.value) < 1) {
                      setQuantity(1);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setQuantity(Math.min(999, quantity + 1));
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setQuantity(Math.max(1, quantity - 1));
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddWithQuantity();
                    }
                  }}
                  className="quantity-input"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.min(999, quantity + 1))}
                  className="quantity-btn"
                >
                  +
                </motion.button>
              </div>
              <div className="quantity-quick-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(5)}
                  className="quantity-quick-btn"
                >
                  5
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(10)}
                  className="quantity-quick-btn"
                >
                  10
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(20)}
                  className="quantity-quick-btn"
                >
                  20
                </motion.button>
              </div>
              <div className="quantity-total">
                <span>Total: Rs. {(product.price * quantity).toLocaleString()}</span>
              </div>
              <div className="quantity-modal-actions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuantityModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddWithQuantity}
                  className="btn btn-primary"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
