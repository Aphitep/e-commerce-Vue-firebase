<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { onMounted, reactive, ref } from "vue";
import { useAdminProductStore } from "@/stores/admin/products";
import { useRoute, useRouter } from "vue-router";
import { storage } from "@/firebase";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

const adminProductStore = useAdminProductStore();
const router = useRouter();
const route = useRoute();

const mode = ref("Add");
const productIndex = ref(-1);

const formData = [
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Image",
        field: "imageUrl",
        type: "upload-image",
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
            await adminProductStore.updateProduct(
                productIndex.value,
                productData,
            );
        } else {
            await adminProductStore.addProducts(productData);
        }
        router.push({ name: "admin-product-list" });
    } catch (error) {
        console.log(error);
    }
};
const handleFileImage = async (event) => {
    const fileImage = event.target.files[0];
    let mainPath = "";
    if (productIndex.value !== -1) {
        mainPath = productIndex.value + "-";
    }
    if (fileImage) {
        const uploadRef = storageRef(
            storage,
            `products/${mainPath}/${fileImage.name}`,
        );

        const snapshot = await uploadBytes(uploadRef, fileImage);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        productData.imageUrl = downloadUrl;
        // reader.readAsDataURL(fileImage);
    }
};
onMounted(async () => {
    if (route.params.id) {
        productIndex.value = route.params.id;
        mode.value = "Edit";
        const selectProduct = await adminProductStore.getProduct(
            productIndex.value,
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
                        v-else-if="form.type != 'upload-image'"
                        v-model="productData[form.field]"
                        type="text"
                        class="input w-full"
                        placeholder="Type here"
                    />
                    <div v-else>
                        <div class="avatar">
                            <div class="w-24 rounded">
                                <img :src="productData[form.field]" />
                            </div>
                        </div>
                        <input
                            type="file"
                            class="file-input"
                            @change="handleFileImage"
                        />
                    </div>
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
