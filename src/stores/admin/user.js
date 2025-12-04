import { defineStore } from "pinia";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { db } from "@/firebase";
export const useAdminUserStore = defineStore("admin-users", {
  state: () => ({
    list: [{}],
  }),
  actions: {
    async loadUser() {
      const userCol = collection(db, "users");
      const userSnapshot = await getDocs(userCol);
      const userList = userSnapshot.docs.map((doc) => {
        let convertUser = doc.data();
        convertUser.uid = doc.id;
        convertUser.updateAt = convertUser.updatedAt.toDate();
        return convertUser;
      });

      this.list = userList;
      console.log(userList);
    },
    async getUser(index) {
      return this.list[index];
    },
    async updateUser(index, userData) {
      this.list[index] = {
        ...userData,
        updateAt: new Date().toISOString(),
      };
    },
  },
});
