<script setup>
import { RouterLink, RouterView } from "vue-router";
import { computed, onMounted } from "vue";

import { useCartStore } from "@/stores/user/cart";
import { useProductStore } from "./stores/user/products";
import { useEventStore } from "@/stores/event";

const cartStore = useCartStore();
const userProductStore = useProductStore();
const eventStore = useEventStore();
const alertType = computed(() => {
    return "alert-" + eventStore.data.attribute;
});
onMounted(() => {
    cartStore.loadCart();
    userProductStore.loadProduct();
});
</script>

<template>
    <RouterView />
    <div v-if="eventStore.alert" class="toast toast-top toast-center">
        <div class="alert" :class="alertType">
            <span class="text-white">{{ eventStore.data.message }}</span>
        </div>
    </div>
</template>
