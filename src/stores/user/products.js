import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [],
  }),
  actions: {
    filterProducts(query) {
      return this.list.filter((product) => product.name.includes(query));
    },
    loadProduct() {
      const products = localStorage.getItem("admin-product");
      if (products) {
        this.list = JSON.parse(products);
      }
    },
  },
});
