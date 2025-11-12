import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkOut: {},
  }),
  getters: {
    cartSummaryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    cartSummaryQuantity(state) {
      return state.items.reduce((acc, items) => acc + items.quantity, 0);
    },
  },
  actions: {
    loadCart() {
      const previousCart = JSON.parse(localStorage.getItem("cart-item"));
      if (previousCart) {
        this.items = previousCart;
      }
    },
    addtoCart(productData) {
      const findProductIndex = this.items.findIndex(
        (product) => product.name === productData.name,
      );

      if (findProductIndex < 0) {
        productData.quantity = 1;
        this.items.push(productData);
      } else {
        this.updateQuantity(findProductIndex, productData.quantity + 1);
      }
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },
    removeItemInCart(index) {
      this.items.splice(index, 1);
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },
    sendCheckOut(userData) {
      const checkout = {
        ...userData,
        totalPrice: this.cartSummaryPrice,
        createDate: new Date().toLocaleString(),
        orderNumber: `AA${Math.floor(Math.random() * 90000 * 10)}`,
        product: this.items,
      };
      localStorage.setItem("cart-checkout", JSON.stringify(checkout));
    },
    loadCheckout() {
      const checkOutData = localStorage.getItem("cart-checkout");
      if (checkOutData) {
        this.checkOut = JSON.parse(checkOutData);
      }
    },
  },
});
