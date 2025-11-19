import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    isLoaded: false,
  }),
  actions: {
    loadProduct() {
      const products = localStorage.getItem("admin-product");
      if (products) {
        this.list = JSON.parse(products);
        this.isLoaded = true;
      }
    },

    getProduct(index) {
      if (!this.isLoaded) {
        this.loadProduct();
      }
      return this.list[index];
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
