<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useAdminProductStore } from "@/stores/admin/products";

import Trash from "@/components/icons/Trash.vue";
import Edit from "@/components/icons/Edit.vue";
import { onMounted } from "vue";

const adminProductsStore = useAdminProductStore();

onMounted(() => {
    adminProductsStore.loadProduct();
});

const removeProduct = (index) => {
    adminProductsStore.removeProduct(index);
};
</script>
<template>
    <AdminLayout
        ><div class="flex justify-between my-4">
            <div class="text-3xl font-bold">Product List</div>
            <div>
                <RouterLink
                    :to="{ name: 'admin-add-product' }"
                    class="btn btn-neutral"
                    >Add new</RouterLink
                >
            </div>
        </div>
        <div class="divided"></div>
        <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
        >
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Update At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(product, index) in adminProductsStore.list">
                        <td>{{ product.name }}</td>
                        <td>
                            <img class="w-10" :src="product.image" alt="" />
                        </td>
                        <td>{{ product.price }}</td>
                        <td>
                            {{ product.remainQuantity }}/{{ product.quantity }}
                        </td>
                        <td>
                            <div
                                :class="
                                    product.status === 'open'
                                        ? 'badge badge-success'
                                        : 'badge badge-error'
                                "
                            >
                                {{ product.status }}
                            </div>
                        </td>
                        <td>{{ product.updateAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <div>
                                    <RouterLink
                                        :to="{
                                            name: 'admin-product-update',
                                            params: { id: index },
                                        }"
                                    >
                                        <Edit
                                            class="btn btn-xs btn-ghost fill-amber-400"
                                        ></Edit>
                                    </RouterLink>
                                </div>
                                <div>
                                    <Trash
                                        class="btn btn-xs btn-ghost fill-red-600"
                                        @click="removeProduct(index)"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table></div
    ></AdminLayout>
</template>
