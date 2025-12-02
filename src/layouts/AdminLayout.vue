<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
const menuList = [
    {
        name: "Order",
        routerName: "admin-order-list",
    },
    {
        name: "Product",
        routerName: "admin-product-list",
    },
    {
        name: "User",
        routerName: "admin-user-list",
    },
];

const route = useRoute();
const router = useRouter();
const useAccout = useAccountStore();
const activeRoute = ref("");

onMounted(() => {
    activeRoute.value = route.name;
});

const logout = async () => {
    try {
        await useAccout.logout();
        router.push({ name: "home" });
    } catch (error) {
        console.log("error", error);
    }
};
</script>
<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-4">
            <!-- Page content here -->
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label
                for="my-drawer-3"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <li class="text-3xl font-bold">
                    <RouterLink :to="{ name: 'admin-dashboard' }">
                        BackOffice
                    </RouterLink>
                </li>
                <li v-for="menu in menuList">
                    <RouterLink
                        :class="
                            menu.routerName === activeRoute ? 'menu-active' : ''
                        "
                        :to="{ name: menu.routerName }"
                        >{{ menu.name }}</RouterLink
                    >
                </li>
                <!-- Sidebar content here -->
                <li><button @click="logout">Logout</button></li>
            </ul>
        </div>
    </div>
</template>
