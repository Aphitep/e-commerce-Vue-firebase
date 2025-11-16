import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [
      {
        name: "My items",
        image: "https://picsum.photos/id/0/200/300",
        price: 200,
        quantity: 10,
        remainQuantity: 5,
        status: "open",
        updateAt: new Date().toISOString(),
      },
    ],
  }),
  actions: {
    getProducts(index) {
      return this.list[index];
    },
    addProducts(productData) {
      productData.remainQuantity = productData.quantity;
      productData.updateAt = new Date().toISOString();
      this.list.push(productData);
    },
    updateProduct(index, productData) {
      this.list[index] = {
        ...structuredClone(productData),
        updateAt: new Date().toISOString(),
      };
    },
    removeProduct(index) {
      this.list.splice(index, 1);
    },
  },
});
