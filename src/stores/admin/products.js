import { defineStore } from "pinia";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    isLoaded: false,
  }),
  actions: {
    async loadProduct() {
      const productsCol = collection(db, "products");
      const productsSnapshot = await getDocs(productsCol);

      const products = productsSnapshot.docs.map((doc) => {
        const convertProduct = doc.data();
        convertProduct.productId = doc.id;
        convertProduct.updatedAt = convertProduct.updatedAt.toDate();

        return convertProduct;
      });
      if (products) {
        this.list = products;
      }
    },

    async getProduct(productId) {
      try {
        const productRef = doc(db, "products", productId);
        const productsSnapshot = await getDoc(productRef);
        return productsSnapshot.data();
      } catch (error) {
        console.log("error :", error);
      }
    },
    addProducts(productData) {
      productData.remainQuantity = productData.quantity;
      productData.updateAt = new Date().toISOString();
      this.list.push(productData);
      localStorage.setItem("admin-product", JSON.stringify(this.list));
    },
    updateProduct(index, productData) {
      this.list[index] = {
        ...structuredClone(productData),
        updateAt: new Date().toISOString(),
      };
      localStorage.setItem("admin-product", JSON.stringify(this.list));
    },
    removeProduct(index) {
      this.list.splice(index, 1);
      localStorage.setItem("admin-product", JSON.stringify(this.list));
    },
  },
});
