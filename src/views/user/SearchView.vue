<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import Layout from "@/layouts/UserLayout.vue";
import Product from "@/components/Product.vue";

import { useProductStore } from "@/stores/user/products";
import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const searchQuery = ref("");

watch(
    () => route.query.q,
    (newSearchQuery) => {
        searchQuery.value = newSearchQuery;
    },
    { immediate: true },
);
const filterProduct = computed(() => {
    return productStore.filterProducts(searchQuery.value);
});
const addToCart = (product) => {
    cartStore.addtoCart(product);
};
</script>
<template>
    <Layout>
        <div class="text-xl m-3">Search : {{ searchQuery }}</div>
        <Product :products="filterProduct" :addToCart="addToCart"></Product>
    </Layout>
</template>
