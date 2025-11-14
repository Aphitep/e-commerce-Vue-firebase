import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/user/HomeView.vue";
import SearchView from "@/views/user/SearchView.vue";
import SuccessView from "@/views/user/SuccessView.vue";
import CartView from "@/views/user/CartView.vue";
import CheckoutView from "@/views/user/CheckoutView.vue";
import ProfileView from "@/views/user/ProfileView.vue";

import DashboardView from "@/views/admin/DashboardView.vue";
import AdminLoginView from "@/views/admin/LoginView.vue";
import OrderDetailView from "@/views/admin/order/DetailView.vue";
import OrderListView from "@/views/admin/order/ListView.vue";
import ProductListView from "@/views/admin/product/ListView.vue";
import ProductUpdateView from "@/views/admin/product/UpdateView.vue";
import UserListView from "@/views/admin/user/ListView.vue";
import UserUpdateView from "@/views/admin/user/UpdateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/success",
      name: "success",
      component: SuccessView,
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: AdminLoginView,
    },
    {
      path: "/admin/order/detail",
      name: "admin-order-detail",
      component: OrderDetailView,
    },
    {
      path: "/admin/order",
      name: "admin-order-list",
      component: OrderListView,
    },
    {
      path: "/admin/product",
      name: "admin-product-list",
      component: ProductListView,
    },
    {
      path: "/admin/product/update/:id",
      name: "admin-product-update",
      component: ProductUpdateView,
    },
    {
      path: "/admin/user",
      name: "admin-user-list",
      component: UserListView,
    },
    {
      path: "/admin/user/update/:id",
      name: "admin-user-update",
      component: UserUpdateView,
    },
  ],
});

export default router;
