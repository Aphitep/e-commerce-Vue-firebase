<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { reactive } from "vue";
import { useAdminProductStore } from "@/stores/admin/products";
import { useRouter } from "vue-router";

const adminProductStore = useAdminProductStore();
const router = useRouter();
const formData = [
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Image",
        field: "image",
    },
    {
        name: "Price",
        field: "price",
    },
    {
        name: "Quantity",
        field: "quantity",
    },
    {
        name: "About",
        field: "about",
    },
];

const productData = reactive({
    name: "",
    image: "",
    price: "",
    quantity: "",
    about: "",
    status: "",
});

const sendProductData = () => {
    adminProductStore.addProducts(productData);
    router.push({ name: "admin-product-list" });
};
</script>
<template>
    <AdminLayout
        ><div class="shadow-xl p-8">
            <div class="text-2xl font-bold">Product update</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <fieldset v-for="form in formData" class="fieldset w-full">
                    <legend class="fieldset-legend">
                        {{ form.name }}
                    </legend>
                    <textarea
                        v-if="form.name === 'About'"
                        v-model="productData[form.field]"
                        class="input h-20 w-full"
                    ></textarea>
                    <input
                        v-else
                        v-model="productData[form.field]"
                        type="text"
                        class="input w-full"
                        placeholder="Type here"
                    />
                </fieldset>
            </div>
            <div class="divider"></div>
            <div>
                <div class="text-2xl font-bold">Status</div>
                <fieldset
                    class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
                >
                    <legend class="fieldset-legend">options</legend>
                    <div class="flex gap-2">
                        <label class="label">
                            <input
                                v-model="productData['status']"
                                value="open"
                                type="radio"
                                name="radio-3"
                                class="radio radio-success"
                            />
                            Open
                        </label>
                        <label class="label">
                            <input
                                v-model="productData['status']"
                                value="close"
                                type="radio"
                                name="radio-3"
                                class="radio radio-error"
                            />
                            Close
                        </label>
                    </div>
                </fieldset>
                <div class="flex justify-between w-full mt-3">
                    <button class="btn btn-ghost">back</button>
                    <button class="btn btn-neutral" @click="sendProductData">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
