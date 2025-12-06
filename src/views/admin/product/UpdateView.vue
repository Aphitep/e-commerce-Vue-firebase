<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { onMounted, reactive, ref } from "vue";
import { useAdminProductStore } from "@/stores/admin/products";
import { useRoute, useRouter } from "vue-router";

const adminProductStore = useAdminProductStore();
const router = useRouter();
const route = useRoute();

const mode = ref("Add");
const productId = ref(-1);

const formData = [
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Image",
        field: "imageUrl",
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
    imageUrl: "",
    price: 0,
    quantity: 0,
    about: "",
    status: "",
});

const sendProductData = async () => {
    try {
        if (mode.value === "Edit") {
            await adminProductStore.updateProduct(productId.value, productData);
        } else {
            await adminProductStore.addProducts(productData);
        }
        router.push({ name: "admin-product-list" });
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    if (route.params.id) {
        productId.value = route.params.id;
        mode.value = "Edit";
        const selectProduct = await adminProductStore.getProduct(
            productId.value,
        );
        productData.name = selectProduct.name;
        productData.imageUrl = selectProduct.imageUrl;
        productData.price = selectProduct.price;
        productData.quantity = selectProduct.quantity;
        productData.about = selectProduct.about;
        productData.status = selectProduct.status;
    }
});
</script>
<template>
    <AdminLayout
        ><div class="shadow-xl p-8">
            <div class="text-2xl font-bold">Product {{ mode }}</div>
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
                    <RouterLink
                        :to="{ name: 'admin-product-list' }"
                        class="btn btn-ghost"
                        >back</RouterLink
                    >
                    <button class="btn btn-neutral" @click="sendProductData">
                        {{ mode }}
                    </button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
