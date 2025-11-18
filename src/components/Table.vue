<script setup>
defineProps({
    header: Array,
});
</script>
<template>
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
            <slot></slot>
        </tbody>
    </table>
</template>
