import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  orderBy,
  query,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const DEFAULT_CATEGORIES = ["MEN BRACELET", "WOMEN BRACELET", "RINGS"];
const INITIAL_PRODUCTS = [
  { name: "Warrior Leather Bracelet", category: "MEN BRACELET", price: 1500, image: "https://picsum.photos/id/20/400/300", description: "Handcrafted genuine leather with steel clasp. Durable and stylish for everyday wear." },
  { name: "Onyx Pendant Necklace", category: "MEN BRACELET", price: 1500, image: "https://picsum.photos/id/26/400/300", description: "Black onyx stone, modern masculine style." },
  { name: "Stealth Hoop Earrings", category: "RINGS", price: 1500, image: "https://picsum.photos/id/29/400/300", description: "Matte black hoops, surgical steel." },
  { name: "Carbon Fiber Ring", category: "RINGS", price: 1500, image: "https://picsum.photos/id/36/400/300", description: "Ultra-light carbon fiber ring." },
  { name: "Tungsten Carbide Ring", category: "RINGS", price: 1500, image: "https://picsum.photos/id/133/400/300", description: "Scratch-resistant, dome profile." },
];

export const useFirebase = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedProducts = JSON.parse(localStorage.getItem("products_cache")) || [];
    const cachedCategories = JSON.parse(localStorage.getItem("categories_cache")) || [];
    
    if (cachedProducts.length > 0) setProducts(cachedProducts);
    if (cachedCategories.length > 0) setCategories(cachedCategories);
    if (cachedProducts.length > 0) setLoading(false);

    // Categories listener
    const unsubscribeCats = onSnapshot(
      query(collection(db, "categories"), orderBy("name")),
      (snapshot) => {
        const catsList = snapshot.docs.map(doc => doc.data().name);
        setCategories(catsList);
        localStorage.setItem("categories_cache", JSON.stringify(catsList));
      },
      (error) => {
        console.error("Categories listener error:", error);
      }
    );

    // Products listener
    const unsubscribeProds = onSnapshot(
      query(collection(db, "products"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const prodList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(prodList);
        localStorage.setItem("products_cache", JSON.stringify(prodList));
        setLoading(false);
      },
      (error) => {
        console.error("Products listener error:", error);
        setLoading(false);
      }
    );

    seedInitialData();

    return () => {
      unsubscribeCats();
      unsubscribeProds();
    };
  }, []);

  const seedInitialData = async () => {
    try {
      const catsSnapshot = await getDocs(collection(db, "categories"));
      if (catsSnapshot.empty) {
        for (let cat of DEFAULT_CATEGORIES) {
          await addDoc(collection(db, "categories"), { 
            name: cat, 
            createdAt: serverTimestamp() 
          });
        }
      }
      
      const prodSnapshot = await getDocs(collection(db, "products"));
      if (prodSnapshot.empty) {
        for (let prod of INITIAL_PRODUCTS) {
          await addDoc(collection(db, "products"), { 
            ...prod, 
            createdAt: serverTimestamp() 
          });
        }
      }
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  const addProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw new Error("Failed to add product: " + error.message);
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      await updateDoc(doc(db, "products", productId), {
        ...productData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw new Error("Failed to update product: " + error.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (error) {
      throw new Error("Failed to delete product: " + error.message);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      await addDoc(collection(db, "categories"), {
        name: categoryName.toUpperCase(),
        createdAt: serverTimestamp()
      });
    } catch (error) {
      throw new Error("Failed to add category: " + error.message);
    }
  };

  const deleteCategory = async (categoryName) => {
    try {
      const q = query(collection(db, "categories"), where("name", "==", categoryName));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        await deleteDoc(doc(db, "categories", snapshot.docs[0].id));
      }
    } catch (error) {
      throw new Error("Failed to delete category: " + error.message);
    }
  };

  return {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory
  };
};
export default useFirebase;