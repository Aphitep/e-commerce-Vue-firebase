import { defineStore } from "pinia";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [],
  }),
  actions: {
    filterProducts(query) {
      return this.list.filter((product) => product.name.includes(query));
    },
    async loadProduct() {
      try {
        const productsCol = query(
          collection(db, "products"),
          where("status", "==", "open"),
        );
        const productSnapshot = await getDocs(productsCol);
        const products = productSnapshot.docs.map((doc) => {
          const convertedData = doc.data();
          convertedData.productId = doc.id;
          return convertedData;
        });
        if (products) {
          this.list = products;
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
});
