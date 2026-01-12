import React from 'react'
import { motion } from 'framer-motion'

function AnimatedBackground() {
  return (
    <div className="animated-background">
      {/* Floating circles with enhanced animations */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="floating-circle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 100}px`,
            height: `${30 + Math.random() * 100}px`,
          }}
          animate={{
            y: [0, -50, 50, -30, 0],
            x: [0, 30, -30, 20, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
            opacity: [0.2, 0.7, 0.4, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced gradient orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="gradient-orb"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${150 + Math.random() * 150}px`,
            height: `${150 + Math.random() * 150}px`,
          }}
          animate={{
            x: [0, 200, -200, 100, 0],
            y: [0, 150, -150, 100, 0],
            scale: [1, 1.8, 0.6, 1.4, 1],
            opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced sparkle particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0.5, 1, 0],
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2.5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced wave animations */}
      <motion.div
        className="wave wave-1"
        animate={{
          x: ['-100%', '100%'],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="wave wave-2"
        animate={{
          x: ['100%', '-100%'],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="wave wave-3"
        animate={{
          x: ['-100%', '100%'],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Additional floating shapes with more variety */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="floating-shape"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${40 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 80}px`,
            borderRadius: `${Math.random() * 50}%`,
          }}
          animate={{
            y: [0, -60, 60, -40, 0],
            x: [0, 40, -40, 30, 0],
            rotate: [0, 360, 720],
            scale: [1, 1.5, 0.7, 1.3, 1],
            opacity: [0.3, 0.7, 0.4, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* New: Rotating gradient rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          style={{
            position: 'absolute',
            left: `${20 + i * 20}%`,
            top: `${20 + i * 15}%`,
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            border: `3px solid rgba(233, 30, 99, ${0.1 + i * 0.05})`,
            borderRadius: '50%',
            borderStyle: 'dashed',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.2, 0.5, 0.3, 0.2],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* New: Pulsing dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '8px',
            height: '8px',
            background: 'rgba(233, 30, 99, 0.6)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(233, 30, 99, 0.8)',
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* New: Floating lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            height: '2px',
            background: `linear-gradient(90deg, transparent, rgba(233, 30, 99, ${0.3 + Math.random() * 0.3}), transparent)`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.6, 0.3, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground

