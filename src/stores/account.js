import { defineStore } from "pinia";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    user: {},
  }),
  actions: {
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user;
            this.isLoggedIn = true;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    async googleLogin() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.isLoggedIn = true;
        this.user = result.user;
      } catch (error) {
        console.log("error :", error);
      }
    },
    async logout() {
      this.isLoggedIn = false;
      await signOut(auth);
    },
  },
});
