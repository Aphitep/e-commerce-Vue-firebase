<script setup>
defineProps({
    products: Array,
    addToCart: Function,
});
</script>
<template>
    <section
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 m-3"
    >
        <div
            v-for="product in products"
            class="card bg-base-100 w-full shadow-sm"
        >
            <figure>
                <img :src="product.imageUrl" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{{ product.name }}</h2>
                <p>
                    {{ product.about }}
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="addToCart(product)">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
