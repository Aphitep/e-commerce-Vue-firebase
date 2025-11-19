import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    status: false,
    data: {},
  }),
  actions: {
    popupMessage(status, data) {
      this.data = {
        status,
        data,
      };
    },
  },
});
