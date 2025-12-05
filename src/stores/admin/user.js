import { defineStore } from "pinia";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { db } from "@/firebase";
export const useAdminUserStore = defineStore("admin-users", {
  state: () => ({
    list: [],
  }),
  actions: {
    async loadUser() {
      try {
        const userCol = collection(db, "users");
        const userSnapshot = await getDocs(userCol);
        const userList = userSnapshot.docs.map((doc) => {
          let convertUser = doc.data();
          convertUser.uid = doc.id;
          convertUser.updatedAt = convertUser.updatedAt.toDate();
          return convertUser;
        });

        this.list = userList;
      } catch (error) {
        console.log("error", error);
      }
    },
    async getUser(uid) {
      try {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);
        return userSnapshot.data();
      } catch (error) {
        console.log("error", error);
      }
    },
    async updateUser(uid, userData) {
      try {
        const updateUser = {
          fullname: userData.fullname,
          status: userData.status,
          role: userData.role,
          updatedAt: new Date(),
        };

        const userRef = doc(db, "users", uid);
        await setDoc(userRef, updateUser);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
