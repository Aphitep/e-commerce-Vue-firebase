<script setup>
import { RouterLink } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useAdminOrderStore } from "@/stores/admin/order";

import Table from "@/components/Table.vue";

const adminOrderStore = useAdminOrderStore();
</script>
<template>
    <AdminLayout
        ><div class="text-3xl font-bold m-4">Order List</div>
        <Table :header="['Customer name', 'Price', 'Status', 'Update at', '']">
            <tr v-for="(order, index) in adminOrderStore.list">
                <td>{{ order.customerName }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.updatedAt }}</td>
                <td>
                    <RouterLink
                        :to="{
                            name: 'admin-order-detail',
                            params: { id: index },
                        }"
                        class="btn"
                        >See detail</RouterLink
                    >
                </td>
            </tr>
        </Table></AdminLayout
    >
</template>
