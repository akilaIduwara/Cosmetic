import { motion } from 'framer-motion'

function SuccessPage({ onReturn }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="success-page"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 2
        }}
        className="success-icon"
      >
        🎉
      </motion.div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Order Sent Successfully!
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your order has been sent to WhatsApp. We'll contact you soon!
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReturn}
        className="return-button"
      >
        Return Home
      </motion.button>
    </motion.div>
  )
}

export default SuccessPage


