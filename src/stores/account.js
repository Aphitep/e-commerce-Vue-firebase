import { defineStore } from "pinia";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
  }),
  actions: {
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user;
            this.isLoggedIn = true;
            if (user.email === "admin@admin.com") {
              this.isAdmin = true;
            }
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
    async adminLogin(email, password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.isLoggedIn = true;
        this.isAdmin = true;
        this.user = result.user;
      } catch (error) {
        console.log("error", error.code);
        switch (error.code) {
          case "auth/invalid-email":
            throw new Error("อีเมลไม่ถูกต้อง");
          case "auth/wrong-password":
            throw new Error("รหัสผ่านไม่ถูกต้อง");
          default:
            throw new Error("มีข้อผิดพลาดในการเข้าสู่ระบบ");
        }
      }
    },
    async logout() {
      this.isLoggedIn = false;
      this.isAdmin = false;
      await signOut(auth);
    },
  },
});
