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
  orderBy,
  limit,
  limitToLast,
  getCountFromServer,
  startAfter,
  endBefore,
} from "firebase/firestore";
import { db } from "@/firebase";
export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    docList: [],
    total: 1,
    filter: {
      search: "",
      status: "",
      sort: {
        updateAt: "desc",
      },
    },
  }),
  getters: {
    list(state) {
      return state.docList.map((doc) => {
        const convertProduct = doc.data();
        convertProduct.productId = doc.id;
        convertProduct.updatedAt = convertProduct.updatedAt.toDate();

        return convertProduct;
      });
    },
    totalPage(state) {
      return Math.ceil(state.total / 1);
    },
  },
  actions: {
    async loadProduct() {
      let productsCol = query(
        collection(db, "products"),
        orderBy("updatedAt", this.filter.sort.updateAt)
      );
      if (this.filter.search) {
        productsCol = query(
          productsCol,
          where("name", "==", this.filter.search)
        );
      }

      if (this.filter.status) {
        productsCol = query(
          productsCol,
          where("status", "==", this.filter.status)
        );
      }
      const rawProductsCol = productsCol;

      productsCol = query(productsCol, limit(1));

      const productsSnapshot = await getDocs(productsCol);
      this.docList = productsSnapshot.docs;

      const allSnapshot = await getCountFromServer(rawProductsCol);
      this.total = allSnapshot.data().count;
    },

    async loadNextProduct(mode) {
      let productsCol = query(
        collection(db, "products"),
        orderBy("updatedAt", this.filter.sort.updateAt)
      );
      if (mode === "next") {
        const lastDocument = this.docList[this.docList.length - 1];
        productsCol = query(productsCol, startAfter(lastDocument), limit(1));
      } else {
        const firstDocument = this.docList[0];
        productsCol = query(
          productsCol,
          endBefore(firstDocument),
          limitToLast(1)
        );
      }

      const productsSnapshot = await getDocs(productsCol);
      this.docList = productsSnapshot.docs;
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
