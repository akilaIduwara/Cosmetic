const STORAGE_KEY = 'kevina_products'

export const getProducts = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  // Default products from original HTML
  return [
    {
      id: 1,
      name: 'The Ordinary Alpha Arbutin',
      price: 5800,
      image: 'https://www.blushme.lk/cdn/shop/files/3_5802d669-e3fa-4c30-816a-16c5e53d16bb.png?v=1735488701'
    },
    {
      id: 2,
      name: 'Odinary Glycolic Acid 240ML',
      price: 6200,
      image: 'https://budgethut.lk/wp-content/uploads/2025/07/Untitleddesign_69.png'
    },
    {
      id: 3,
      name: 'Odinary Nicenamide 30ML',
      price: 3000,
      image: 'https://libertystore.lk/wp-content/uploads/2025/03/New-Project-2025-03-18T140720.784.png'
    },
    {
      id: 4,
      name: 'Odinary Peeling Solution 30ML',
      price: 4200,
      image: 'https://erange.lk/wp-content/uploads/2022/04/The-Ordinary-AHA-30-BHA-2-Peeling-Solution-600x781.jpeg'
    },
    {
      id: 5,
      name: 'Ordinary Salicylic Acid 2% Anhydrous Solution 30ML',
      price: 4500,
      image: 'https://simplyglow.lk/wp-content/uploads/2025/04/1743444615_13457346-1894912002988002.jpg'
    },
    {
      id: 6,
      name: 'Ordinary Marine Hyaluronics Serum 30ml',
      price: 4700,
      image: 'https://www.essentials.lk/cdn/shop/files/TheOrdinaryMarineHyaluronicsSerum30ml.jpg?crop=center&height=1000&v=1731904212&width=1000.jpg'
    },
    {
      id: 7,
      name: 'Ordinary Soothing and Barrier Support Serum 30ml (A multi-active solution)',
      price: 4900,
      image: 'https://www.thecareak.com/wp-content/uploads/2025/05/The-Ordinary-Soothing-Barrier-Support-Serum.jpg'
    },
    {
      id: 8,
      name: 'Ordinary Ascorbyl Glucoside Solution 12%(Vitamin C) 30ML',
      price: 7800,
      image: 'https://www.beautygalleryng.com/wp-content/uploads/2022/03/rdn-ascorbyl-glucoside-solution-12pct-30ml-3.png'
    },
    {
      id: 9,
      name: 'Ordinary Multi Antioxidant Radiance Serum 30ML',
      price: 6450,
      image: 'https://m.media-amazon.com/images/I/51Haw2Z4HfL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 10,
      name: 'Odinary Saccharomyces Ferment 30% Milky Toner 100ML',
      price: 7500,
      image: 'https://histyle.ie/wp-content/uploads/2024/05/Hi-Style-2-2.jpg'
    },
    {
      id: 11,
      name: 'Ordinary Squalane Cleanser 50ml',
      price: 5950,
      image: 'https://shopxonline.lk/cdn/shop/files/the-ordinary-squalane-face-cleanser-50ml-canada-512580.webp?v=1725949181.jpg'
    },
    {
      id: 12,
      name: 'Ordinary Natural Moisturizing Factors + HA 30ml',
      price: 8750,
      image: 'https://www.essentials.lk/cdn/shop/products/TheOrdinaryNaturalMoisturizingFactors_HA.jpg?v=1614435828.jpg'
    },
    {
      id: 13,
      name: 'TRESemmé Keratin Smooth Shampoo 700Ml (Uk)',
      price: 4500,
      image: 'https://static-01.daraz.lk/p/9cc32aa9ad5c9c2cc1ab2a2d87973edf.jpg'
    },
    {
      id: 14,
      name: 'Tresemme Keratin Smooth Conditioner 700ml',
      price: 4600,
      image: 'https://supersavings.lk/wp-content/uploads/2022/11/tresemme-keratin-shampoo-700ml.jpg'
    },
    {
      id: 15,
      name: 'TRESemme Botanique Nourish & Replenish Shampoo 700ml',
      price: 3750,
      image: 'https://supersavings.lk/wp-content/uploads/2023/09/tresemme-botanique-shampoo.jpg'
    },
    {
      id: 16,
      name: 'Tresemme Botanique Nourish + Replenish Conditioner, Coconut Oil and Aloe Vera 700Ml',
      price: 3750,
      image: 'https://shopxonline.lk/cdn/shop/files/Untitleddesign-2024-11-11T161311.241.png?v=1731321803'
    },
    {
      id: 17,
      name: 'OGX Renewing + Argan Oil of Morocco Shampoo 385ml',
      price: 5000,
      image: 'https://static.beautytocare.com/media/catalog/product/o/g/ogx-renewing-argan-oil-of-morocco-shampoo-385ml_2.jpg'
    },
    {
      id: 18,
      name: 'OGX Renewing + Argan Oil of Morocco Conditioner 385ml',
      price: 5100,
      image: 'https://static.beautytocare.com/media/catalog/product//o/g/ogx-renewing-argan-oil-of-morocco-conditioner-385ml_2.jpg'
    },
    {
      id: 19,
      name: 'OGX Biotin and Collagen Shampoo 385ml',
      price: 5000,
      image: 'https://images.albertsons-media.com/is/image/ABS/960133960-C1N1?$ng-ecom-pdp-mobile$&defaultImage=Not_Available.jpg'
    }
  ]
}

export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export const getCart = () => {
  const stored = localStorage.getItem('kevina_cart')
  const cart = stored ? JSON.parse(stored) : []
  // Ensure all items have quantity (for backward compatibility)
  return cart.map(item => ({
    ...item,
    quantity: item.quantity || 1
  }))
}

export const saveCart = (cart) => {
  localStorage.setItem('kevina_cart', JSON.stringify(cart))
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
}

export const addToCart = (product, quantity = 1) => {
  const cart = getCart()
  const existingItemIndex = cart.findIndex(item => item.id === product.id)
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item
    cart.push({
      ...product,
      cartId: Date.now(),
      quantity: quantity
    })
  }
  
  saveCart(cart)
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  return cart
}

export const updateCartItemQuantity = (cartId, quantity) => {
  const cart = getCart()
  const itemIndex = cart.findIndex(item => item.cartId === cartId)
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = quantity
    }
    saveCart(cart)
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  }
  
  return cart
}

export const removeFromCart = (cartId) => {
  const cart = getCart()
  const newCart = cart.filter(item => item.cartId !== cartId)
  saveCart(newCart)
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: newCart }))
  return newCart
}

export const getOrders = () => {
  const stored = localStorage.getItem('kevina_orders')
  return stored ? JSON.parse(stored) : []
}

export const saveOrder = (order) => {
  const orders = getOrders()
  const newOrder = {
    ...order,
    id: Date.now(),
    date: new Date().toISOString()
  }
  orders.push(newOrder)
  localStorage.setItem('kevina_orders', JSON.stringify(orders))
  return newOrder
}

// Content Management
const CONTENT_KEY = 'kevina_site_content'

const defaultContent = {
  hero: {
    title: 'Discover Your True Radiance',
    subtitle: 'Premium cosmetics crafted for the modern individual. Embrace your natural beauty with our exclusive collection.',
    button1: 'Shop Collection',
    button2: 'Our Story'
  },
  home: {
    features: [
      { icon: '✨', title: 'Premium Quality', description: 'Carefully selected products from trusted brands' },
      { icon: '🚚', title: 'Islandwide Delivery', description: 'Fast and reliable delivery across Sri Lanka' },
      { icon: '💳', title: 'Secure Payment', description: 'Safe and secure payment options' },
      { icon: '🎁', title: 'Special Offers', description: 'Exclusive deals and discounts' }
    ],
    featuredTitle: 'Featured Collection',
    featuredSubtitle: 'Discover our handpicked selection of premium products',
    viewAllButton: 'View All Products',
    whyChooseTitle: 'Why Choose Kevina?',
    whyChooseText1: 'We believe that beauty is a personal journey. Our products are cruelty-free, sustainably sourced, and designed to enhance your natural features rather than mask them.',
    whyChooseText2: 'Based in Boralesgamuwa, we offer islandwide delivery, bringing premium beauty products directly to your doorstep. Experience the difference with Kevina Cosmetics.',
    learnMoreButton: 'Learn More'
  },
  about: {
    heroTitle: 'Our Story',
    heroSubtitle: 'Redefining beauty with nature and science',
    welcomeTitle: 'Welcome to Kevina Cosmetics',
    welcomeText1: 'At Kevina Cosmetics, we believe that beauty is a personal journey. Founded with a passion for premium quality and natural ingredients, we\'ve been serving customers across Sri Lanka with the finest cosmetics and skincare products.',
    welcomeText2: 'Our mission is to enhance your natural beauty while maintaining the highest standards of quality, sustainability, and ethical practices. Every product in our collection is carefully selected to ensure it meets our rigorous standards for effectiveness and safety.',
    welcomeText3: 'Based in Boralesgamuwa, we offer islandwide delivery, bringing premium beauty products directly to your doorstep. Whether you\'re looking for skincare essentials, haircare solutions, or the latest beauty trends, we\'ve got you covered.',
    whyChooseTitle: 'Why Choose Us',
    features: [
      { icon: '🌍', title: 'Trusted Global Brands', description: 'Our products come from internationally recognized brands known for quality, safety, and proven results.' },
      { icon: '💰', title: 'Affordable & Competitive Prices', description: 'Get premium skincare and haircare products at reasonable prices without compromising quality.' },
      { icon: '🚚', title: 'Fast & Reliable Delivery', description: 'We ensure quick and safe delivery across Sri Lanka, right to your doorstep.' }
    ],
    stats: [
      { number: '10K+', label: 'Happy Customers' },
      { number: '500+', label: 'Products' },
      { number: '50+', label: 'Cities Served' },
      { number: '5+', label: 'Years Experience' }
    ],
    missionTitle: 'Our Mission',
    missionText: 'To empower individuals to express their unique beauty through premium, ethically-sourced cosmetics and skincare products. We are committed to providing exceptional quality, outstanding customer service, and sustainable practices that benefit both our customers and the planet.'
  },
  contact: {
    heroTitle: 'Get in Touch',
    heroSubtitle: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    infoTitle: 'Contact Information',
    infoDescription: 'Have a question or need assistance? We\'re here to help! Reach out to us through any of the following channels.',
    contactInfo: [
      { icon: '📍', title: 'Location', details: 'Boralesgamuwa, Sri Lanka' },
      { icon: '📞', title: 'Phone', details: '+94702886067' },
      { icon: '✉️', title: 'Email', details: 'kevinacosmetics2026@gmail.com' },
      { icon: '🕒', title: 'Hours', details: 'Mon - Sat: 9:00 AM - 6:00 PM' }
    ],
    mapNote: 'Islandwide Delivery Available',
    formTitle: 'Send us a Message',
    submitButton: 'Send Message'
  },
  footer: {
    tagline: 'Redefining beauty with nature and science. Premium cosmetics for the modern you.',
    newsletterTitle: 'Stay Updated',
    newsletterText: 'Subscribe to our newsletter for exclusive offers, beauty tips, and new product launches.',
    newsletterButton: 'Subscribe',
    location: '📍 Boralesgamuwa | Islandwide Delivery',
    copyright: `© ${new Date().getFullYear()} Kevina Cosmetics. All rights reserved.`
  },
  shop: {
    heroTitle: 'Our Collection',
    heroSubtitle: 'Discover premium cosmetics and skincare products'
  }
}

export const getContent = () => {
  const stored = localStorage.getItem(CONTENT_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  // Initialize with default content
  saveContent(defaultContent)
  return defaultContent
}

export const saveContent = (content) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content))
}

export const updateContent = (section, field, value) => {
  const content = getContent()
  if (field.includes('.')) {
    // Handle nested fields like features[0].title
    const parts = field.split('.')
    const arrayMatch = parts[0].match(/^(\w+)\[(\d+)\]$/)
    if (arrayMatch) {
      const arrayName = arrayMatch[1]
      const index = parseInt(arrayMatch[2])
      const subField = parts[1]
      if (!content[section][arrayName]) {
        content[section][arrayName] = []
      }
      if (!content[section][arrayName][index]) {
        content[section][arrayName][index] = {}
      }
      content[section][arrayName][index][subField] = value
    }
  } else {
    content[section][field] = value
  }
  saveContent(content)
  return content
}

// Delivery Fee Management
const DELIVERY_FEE_KEY = 'kevina_delivery_fee'

export const getDeliveryFee = () => {
  const stored = localStorage.getItem(DELIVERY_FEE_KEY)
  if (stored) {
    return parseFloat(stored) || 0
  }
  // Default delivery fee
  const defaultFee = 0
  saveDeliveryFee(defaultFee)
  return defaultFee
}

export const saveDeliveryFee = (fee) => {
  localStorage.setItem(DELIVERY_FEE_KEY, fee.toString())
}


