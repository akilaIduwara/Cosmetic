// Firestore service functions for products
import { 
  db, 
  PRODUCTS_COLLECTION 
} from '../config/firebase'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore'

/**
 * Get all products from Firestore
 * @returns {Promise<Array>} Array of products
 */
export const getProductsFromFirestore = async () => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    
    // Try to query with orderBy, but handle case where createdAt might not exist
    let querySnapshot
    try {
      const q = query(productsRef, orderBy('createdAt', 'desc'))
      querySnapshot = await getDocs(q)
    } catch (orderError) {
      // If orderBy fails (e.g., no createdAt field or index), just get all products
      console.warn('Firestore: Could not order by createdAt, fetching all products:', orderError)
      querySnapshot = await getDocs(productsRef)
    }
    
    const products = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to regular date if needed
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
      })
    })
    
    // Sort by createdAt if available, otherwise keep original order
    products.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })
    
    console.log('Firestore: Fetched products, count:', products.length)
    return products
  } catch (error) {
    console.error('Error fetching products from Firestore:', error)
    console.error('Error details:', error.code, error.message)
    
    // If permission denied, show helpful message
    if (error.code === 'permission-denied') {
      console.error('Firestore: Permission denied. Please check Firestore security rules.')
    }
    
    return []
  }
}

/**
 * Add a new product to Firestore
 * @param {Object} productData - Product data (name, price, image)
 * @returns {Promise<string>} Document ID of the new product
 */
export const addProductToFirestore = async (productData) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const newProduct = {
      name: productData.name.trim(),
      price: parseFloat(productData.price),
      image: productData.image.trim(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    const docRef = await addDoc(productsRef, newProduct)
    console.log('Firestore: Product added with ID:', docRef.id)
    
    // Dispatch custom event for immediate UI updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { 
      detail: await getProductsFromFirestore(),
      bubbles: true
    }))
    
    return docRef.id
  } catch (error) {
    console.error('Error adding product to Firestore:', error)
    throw error
  }
}

/**
 * Update an existing product in Firestore
 * @param {string} productId - Document ID of the product
 * @param {Object} productData - Updated product data
 * @returns {Promise<void>}
 */
export const updateProductInFirestore = async (productId, productData) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId)
    const updatedData = {
      name: productData.name.trim(),
      price: parseFloat(productData.price),
      image: productData.image.trim(),
      updatedAt: Timestamp.now()
    }
    
    await updateDoc(productRef, updatedData)
    console.log('Firestore: Product updated:', productId)
    
    // Dispatch custom event for immediate UI updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { 
      detail: await getProductsFromFirestore(),
      bubbles: true
    }))
    
  } catch (error) {
    console.error('Error updating product in Firestore:', error)
    throw error
  }
}

/**
 * Delete a product from Firestore
 * @param {string} productId - Document ID of the product
 * @returns {Promise<void>}
 */
export const deleteProductFromFirestore = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId)
    await deleteDoc(productRef)
    console.log('Firestore: Product deleted:', productId)
    
    // Dispatch custom event for immediate UI updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { 
      detail: await getProductsFromFirestore(),
      bubbles: true
    }))
    
  } catch (error) {
    console.error('Error deleting product from Firestore:', error)
    throw error
  }
}

/**
 * Set up a real-time listener for products
 * @param {Function} callback - Callback function that receives products array
 * @returns {Function} Unsubscribe function
 */
export const subscribeToProducts = (callback) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    
    // Try to query with orderBy, but handle case where createdAt might not exist
    let q
    try {
      q = query(productsRef, orderBy('createdAt', 'desc'))
    } catch (error) {
      // If orderBy fails (e.g., no createdAt field), just get all products
      console.warn('Firestore: Could not order by createdAt, fetching all products:', error)
      q = productsRef
    }
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        })
      })
      
      // Sort by createdAt if available, otherwise keep original order
      products.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
        return 0
      })
      
      console.log('Firestore: Real-time update, products count:', products.length)
      callback(products)
      
      // Dispatch custom event for components that use event listeners
      window.dispatchEvent(new CustomEvent('productsUpdated', { 
        detail: products,
        bubbles: true
      }))
    }, (error) => {
      console.error('Firestore: Real-time listener error:', error)
      console.error('Error details:', error.code, error.message)
      
      // If permission denied, show helpful message
      if (error.code === 'permission-denied') {
        console.error('Firestore: Permission denied. Please check Firestore security rules.')
        alert('Cannot load products. Please check Firestore security rules allow read access.')
      }
      
      // Fallback to fetching products
      getProductsFromFirestore().then(callback).catch((fetchError) => {
        console.error('Firestore: Fallback fetch also failed:', fetchError)
        callback([]) // Return empty array on complete failure
      })
    })
    
    return unsubscribe
  } catch (error) {
    console.error('Error setting up products listener:', error)
    // Fallback to fetching products
    getProductsFromFirestore().then(callback).catch((fetchError) => {
      console.error('Firestore: Fallback fetch failed:', fetchError)
      callback([]) // Return empty array on complete failure
    })
    return () => {} // Return empty unsubscribe function
  }
}

