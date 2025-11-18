<script setup>
defineProps({
    header: Array,
});
</script>
<template>
    <div
        class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    >
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th v-for="header in header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
