import { defineStore } from "pinia";

export const useAdminUserStore = defineStore("admin-users", {
  state: () => ({
    list: [
      {
        fullname: "Mike lopster",
        role: "user",
        status: "active",
        updateAt: new Date().toISOString(),
      },
    ],
  }),
  actions: {
    getUser(index) {
      return this.list[index];
    },
    updateUser(index, userData) {
      this.list[index] = {
        ...userData,
        updateAt: new Date().toISOString(),
      };
    },
    removeUser(index) {
      this.list.splice(index, 1);
    },
  },
});
