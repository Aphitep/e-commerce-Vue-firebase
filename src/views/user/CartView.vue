<script setup>
import Layout from "@/layouts/UserLayout.vue";
import router from "@/router";

import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();

const changeQuantity = (event, index) => {
    const quantity = parseInt(event.target.value);
    cartStore.updateQuantity(index, quantity);
};
</script>
<template>
    <Layout>
        <h1 class="text-3xl font-bold my-4">Shopping Cart</h1>

        <div class="flex my-4">
            <div class="flex-1 bg-base-300 w-64 px-3 py-4">
                <div
                    v-if="cartStore.items.length === 0"
                    class="flex h-full items-center justify-center"
                >
                    <p class="text-3xl font-bold text-neutral/50">
                        Cart is Empty
                    </p>
                </div>
                <div
                    v-else
                    class="card bg-base-100 shadow-sm p-3 mb-1"
                    v-for="(item, index) in cartStore.items"
                >
                    <div class="flex">
                        <div class="flex-1">
                            <img
                                class="w-60 rounded-sm"
                                :src="item.imageUrl"
                                alt="Product Image"
                            />
                        </div>
                        <div class="flex-1">
                            <div
                                class="relative flex flex-col justify-between h-full"
                            >
                                <div class="grid grid-cols-2 pr-6">
                                    <div>
                                        <div>
                                            <b>{{ item.name }}</b>
                                        </div>
                                        <div>"{{ item.about }}"</div>
                                        <div>{{ item.price }} B</div>
                                    </div>
                                    <div>
                                        <select
                                            v-model="item.quantity"
                                            @change="
                                                changeQuantity($event, index)
                                            "
                                            class="select select-md"
                                        >
                                            <option selected>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <button
                                        @click="
                                            cartStore.removeItemInCart(index)
                                        "
                                        class="absolute top-0 right-0"
                                    >
                                        <svg
                                            class="fill-error"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            height="15"
                                        >
                                            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                            <path
                                                d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div>In stock ✅</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="flex-1 flex justify-center w-32 h-1/3">
                <div class="card w-96 bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="card-title">Order Summary</h2>
                        <div class="flex justify-between">
                            <div>ราคาสินค้าทั้งหมด</div>
                            <div>{{ cartStore.cartSummaryPrice }}</div>
                        </div>
                        <div class="flex justify-between">
                            <div>ค่าส่ง</div>
                            <div>0</div>
                        </div>
                        <div class="flex justify-between">
                            <div class="text-xl">รวมทั้งหมด</div>
                            <div>{{ cartStore.cartSummaryPrice }}</div>
                        </div>
                        <div class="justify-center card-actions">
                            <RouterLink
                                :to="{ name: 'checkout' }"
                                class="btn btn-primary w-full"
                            >
                                Buy Now
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Order Summary -->
        </div>
    </Layout>
</template>
