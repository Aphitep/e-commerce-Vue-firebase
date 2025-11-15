<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";

import Trash from "@/components/icons/Trash.vue";
import Edit from "@/components/icons/Edit.vue";
const products = [
    {
        name: "My items",
        Image: "https://picsum.photos/id/0/200/300",
        price: 200,
        quantity: 10,
        remainQuantity: 5,
        status: "open",
        updateAt: new Date().toISOString(),
    },
];
</script>
<template>
    <AdminLayout
        ><div class="flex justify-between my-4">
            <div class="text-3xl font-bold">Product List</div>
            <div>
                <button class="btn btn-neutral">Add new</button>
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
                    <tr v-for="product in products">
                        <td>{{ product.name }}</td>
                        <td>
                            <img class="w-10" :src="product.Image" alt="" />
                        </td>
                        <td>{{ product.price }}</td>
                        <td>
                            {{ product.remainQuantity }}/{{ product.quantity }}
                        </td>
                        <td>
                            <div class="badge badge-success">
                                {{ product.status }}
                            </div>
                        </td>
                        <td>{{ product.updateAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <div>
                                    <Edit
                                        class="btn btn-xs btn-ghost fill-amber-400"
                                    />
                                </div>
                                <div>
                                    <Trash
                                        class="btn btn-xs btn-ghost fill-red-600"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table></div
    ></AdminLayout>
</template>
