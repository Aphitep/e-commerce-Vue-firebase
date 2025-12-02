import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    alert: false,
    data: {},
  }),
  actions: {
    popupMessage(attribute, message) {
      this.alert = true;
      this.data = {
        attribute,
        message,
      };
      setTimeout(() => {
        this.clearMessage();
      }, 3000);
    },
    clearMessage() {
      this.alert = false;
      this.data = {};
    },
  },
});
