<script setup>
import Layout from "@/layouts/UserLayout.vue";

import { useCartStore } from "@/stores/user/cart";
import { onMounted, reactive, ref } from "vue";

const cartStore = useCartStore();
const checkOutData = ref({});
onMounted(() => {
    cartStore.loadCheckout();
    if (cartStore.checkOut.orderNumber) {
        checkOutData.value = cartStore.checkOut;
    }
});
</script>
<template>
    <Layout>
        <div class="card bg-base-200 shadow-sm max-w-2xl mx-auto m-5 p-5">
            <div class="font-bold text-2xl">Your order Successful !!!</div>
            <p>Hi ,{{ checkOutData.name }}</p>
            <p>รอรับสินค้าของคุณได้เลย !</p>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div>
                    <div class="font-bold">Order Date</div>
                    <p>{{ checkOutData.createDate }}</p>
                </div>
                <div>
                    <div class="font-bold">Order Number</div>
                    <p>{{ checkOutData.orderNumber }}</p>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <p>{{ checkOutData.address }}</p>
                </div>
            </div>
            <div class="divider"></div>
            <div class="my-1.5" v-for="item in checkOutData.product">
                <div class="grid grid-cols-4 gap-1.5 items-center">
                    <img class="w-50" :src="item.imageUrl" alt="" />
                    <div>
                        <div class="font-bold">{{ item.name }}</div>
                        <p>{{ item.about }}</p>
                    </div>
                    <p>จำนวน {{ item.quantity }} ชิ้น</p>
                    <p>ราคา {{ item.price * item.quantity }} B</p>
                </div>
            </div>
            <div class="divider"></div>
            <div>
                <div class="flex justify-between">
                    <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                    <p>{{ cartStore.cartSummaryPrice }}</p>
                </div>
                <div class="flex justify-between">
                    <div class="font-bold">ค่าส่ง</div>
                    <p>0</p>
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">รวมทั้งสิ้น</div>
                <p>{{ cartStore.cartSummaryPrice }}</p>
            </div>
            <div class="divider"></div>
            <p>ขอบคุณที่ใช้บริการ🙇‍♀️🙇‍♂️</p>
        </div>
    </Layout>
</template>
