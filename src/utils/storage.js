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
  return stored ? JSON.parse(stored) : []
}

export const saveCart = (cart) => {
  localStorage.setItem('kevina_cart', JSON.stringify(cart))
}


