<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";

import { useCartStore } from "@/stores/user/cart";
import { useProductStore } from "./stores/user/products";
import { useEventStore } from "@/stores/event";

const cartStore = useCartStore();
const userProductStore = useProductStore();
const eventStore = useEventStore();
onMounted(() => {
    cartStore.loadCart();
    userProductStore.loadProduct();
});
</script>

<template>
    <RouterView />
    <div v-if="eventStore.alert" class="toast">
        <div class="alert" :class="`alert-${eventStore.data.attribute}`">
            <span>{{ eventStore.data.message }}</span>
        </div>
    </div>
</template>
