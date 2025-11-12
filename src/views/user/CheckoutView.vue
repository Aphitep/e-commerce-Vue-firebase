<script setup>
import { reactive } from "vue";

import Layout from "@/layouts/UserLayout.vue";

import { useCartStore } from "@/stores/user/cart";
import { useRoute } from "vue-router";
import router from "@/router";

const cartStore = useCartStore();
const checkoutForm = [
    {
        name: "Email Address",
        field: "email",
    },
    {
        name: "Name",
        field: "name",
    },
    {
        name: "Address",
        field: "address",
    },
    {
        name: "Note",
        field: "note",
    },
];
const checkout = () => {
    cartStore.sendCheckOut(formData);
    router.push({ name: "success" });
};

const formData = reactive({
    email: "",
    name: "",
    address: "",
    note: "",
});
</script>
<template>
    <Layout>
        <h1 class="text-3xl font-bold my-4">Checkout Cart</h1>
        <div class="flex">
            <section class="flex-auto w-64 bg-base-300">
                <div class="px-8 py-2">
                    <fieldset v-for="form in checkoutForm" class="fieldset">
                        <legend class="fieldset-legend">{{ form.name }}</legend>
                        <textarea
                            v-if="form.field === 'address'"
                            class="textarea w-full h-24"
                            placeholder="Note"
                            v-model="formData[form.field]"
                        ></textarea>
                        <input
                            v-else
                            v-model="formData[form.field]"
                            type="text"
                            class="input w-full"
                            placeholder="Type here"
                        />
                    </fieldset>
                </div>
            </section>
            <section
                class="flex flex-col justify-between flex-auto bg-stone-50 w-32 px-8 py-2"
            >
                <div>
                    <div class="font-bold">Review your cart</div>
                    <div class="py-1" v-for="item in cartStore.items">
                        <div class="flex bg-zinc-50 p-2 gap-3 shadow-sm">
                            <img :src="item.imageUrl" class="h-20 w-30" />
                            <div class="flex flex-col justify-between">
                                <div>
                                    <div class="font-bold">{{ item.name }}</div>
                                    <div>x{{ item.quantity }}</div>
                                </div>
                                <div class="font-bold">{{ item.price }} B</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="deviddivider">
                    <div class="flex justify-between">
                        <div>ราคาสินค้าทั้งหมด</div>
                        <div>{{ cartStore.cartSummaryPrice }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>ค่าส่ง</div>
                        <div>0</div>
                    </div>
                    <div class="flex justify-between">
                        <div>รวมทั้งหมด</div>
                        <div>{{ cartStore.cartSummaryPrice }}</div>
                    </div>
                    <div class="divider"></div>
                    <button class="btn btn-primary w-full" @click="checkout">
                        Paynow
                    </button>
                </div>
            </section>
        </div>
    </Layout>
</template>
