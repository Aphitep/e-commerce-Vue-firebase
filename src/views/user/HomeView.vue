<script setup>
import Layout from "@/layouts/UserLayout.vue";

import Product from "@/components/Product.vue";

import { useProductStore } from "@/stores/user/products";
import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();
const productStore = useProductStore();
const addToCart = (product) => {
    cartStore.addtoCart(product);
};
</script>
<template>
    <Layout>
        <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Welcome to our website</h1>
                    <p class="py-6">"Honor your self"</p>
                </div>
            </div>
        </div>

        <!-- Products -->

        <Product :products="productStore.list" :addToCart="addToCart"></Product>
    </Layout>
</template>
