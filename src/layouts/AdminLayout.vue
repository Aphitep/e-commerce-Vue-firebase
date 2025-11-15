<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

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
    {
        name: "Logout",
        routerName: "admin-login",
    },
];

const route = useRoute();
const activeRoute = ref("");

onMounted(() => {
    activeRoute.value = route.name;
});
</script>
<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
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
                <!-- Sidebar content here -->
                <li v-for="menu in menuList">
                    <RouterLink
                        :class="
                            menu.routerName === activeRoute ? 'menu-active' : ''
                        "
                        :to="{ name: menu.routerName }"
                        >{{ menu.name }}</RouterLink
                    >
                </li>
            </ul>
        </div>
    </div>
</template>
