import { defineStore } from "pinia";
import { auth, db } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
    profile: {},
  }),
  actions: {
    async updateUser(userData) {
      console.log(userData);
      try {
        const updateUserData = {
          fullname: userData.fullname,
          imageUrl: userData.imageUrl,
        };
        const userRef = doc(db, `users/${this.user.uid}`);

        updateDoc(userRef, updateUserData);
      } catch (err) {
        console.log(err);
      }
    },
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              this.profile = docSnap.data();
            } else {
              const newUser = {
                fullname: user.displayName,
                role: "member",
                status: "active",
                updatedAt: new Date(),
              };

              await setDoc(docRef, newUser);
              this.profile = newUser;
            }

            if (this.profile.role === "admin") {
              this.isAdmin = true;
            }
            this.isLoggedIn = true;
            this.profile.email = user.email;
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
