import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [
      {
        name: "Flash Shore",
        imageUrl:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        quantity: 5,
        about: "Make your dreams come true",
        state: "open",
        price: 100,
      },
      {
        name: "Dark Flash Shore",
        imageUrl: "src/assets/image/men-shoes.jpg",
        quantity: 5,
        about: "Run fast as you can",
        state: "open",
        price: 200,
      },
    ],
  }),
  actions: {
    filterProducts(query) {
      return this.list.filter((product) => product.name.includes(query));
    },
  },
});
