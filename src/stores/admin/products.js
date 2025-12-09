import { defineStore } from "pinia";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    filter: {
      search: "",
      status: "",
      sort: {
        updateAt: "asc",
      },
    },
  }),
  actions: {
    async loadProduct() {
      let productsCol = query(collection(db, "products"));
      if (this.filter.search) {
        productsCol = query(
          productsCol,
          where("name", "==", this.filter.search),
        );
      }

      if (this.filter.status) {
        productsCol = query(
          productsCol,
          where("status", "==", this.filter.status),
        );
      }
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
    async addProducts(productData) {
      try {
        productData.remainQuantity = productData.quantity;
        productData.updatedAt = new Date();
        const productsCol = collection(db, "products");

        await addDoc(productsCol, productData);
      } catch (error) {
        console.log("error :", error);
      }
    },
    async updateProduct(productId, productData) {
      try {
        const updateProduct = {
          ...productData,
          remainQuantity: productData.quantity,
          updatedAt: new Date(),
        };
        const productRef = doc(db, "products", productId);
        await setDoc(productRef, updateProduct);
      } catch (error) {
        console.log("error :", error);
      }
    },
    async removeProduct(productId) {
      try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        await this.loadProduct();
      } catch (error) {
        console.log("error :", error);
      }
    },
  },
});
