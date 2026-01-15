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
    const q = query(productsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const products = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to regular date if needed
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt
      })
    })
    
    console.log('Firestore: Fetched products, count:', products.length)
    return products
  } catch (error) {
    console.error('Error fetching products from Firestore:', error)
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
    const q = query(productsRef, orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt
        })
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
      // Fallback to fetching products
      getProductsFromFirestore().then(callback)
    })
    
    return unsubscribe
  } catch (error) {
    console.error('Error setting up products listener:', error)
    // Fallback to fetching products
    getProductsFromFirestore().then(callback)
    return () => {} // Return empty unsubscribe function
  }
}

