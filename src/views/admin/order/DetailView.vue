<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { useAdminOrderStore } from "@/stores/admin/order";

import AdminLayout from "@/layouts/AdminLayout.vue";

const route = useRoute();
const orderIndex = ref(-1);
const orderData = ref({});

const adminOrderStore = useAdminOrderStore();

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id);
        const selectOrder = adminOrderStore.getOrder(orderIndex.value);

        orderData.value = selectOrder;
    }
});
</script>
<template>
    <AdminLayout>
        <div class="shadow-2xl p-3 m-4">
            <div class="text-3xl font-bold">Order detail</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2">
                <div>
                    <div class="font-bold">Order number</div>
                    <p>{{ orderData.updatedAt }}</p>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <p>{{ orderData.no }}</p>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <p>{{ orderData.paymentMethod }}</p>
                </div>
                <div>
                    <div class="font-bold">Adress</div>
                    <p>{{ orderData.address }}</p>
                </div>
            </div>
            <div class="divider"></div>
            <div>
                <div
                    v-for="product in orderData.products"
                    class="grid grid-cols-3 items-center justify-items-center"
                >
                    <div class="flex gap-1 items-center">
                        <img :src="product.imageUrl" class="h-20 w-30" alt="" />
                        <div>
                            <p class="font-bold">{{ product.name }}</p>
                            <p>{{ product.description }}</p>
                        </div>
                    </div>
                    <div>
                        <p>จำนวน {{ product.quantity }} ชิ้น</p>
                    </div>
                    <div>
                        <p>ราคา {{ product.price }} B</p>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between">
                    <div class="font-bold">รวมทั้งหมด</div>
                    <p>{{ orderData.totalPrice }}</p>
                </div>
                <div class="divider"></div>
                <RouterLink
                    :to="{ name: 'admin-order-list' }"
                    class="btn btn-ghost"
                    >Back</RouterLink
                >
            </div>
        </div>
    </AdminLayout>
</template>
