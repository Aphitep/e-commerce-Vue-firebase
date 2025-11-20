import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
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
        const productSnapshot = await getDocs(collection(db, "products"));
        const products = productSnapshot.docs.map((doc) => doc.data());
        console.log(products);
        if (products) {
          this.list = products;
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
});
