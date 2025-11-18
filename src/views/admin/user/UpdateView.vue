<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";

const updateUser = () => {};
</script>
<template>
    <AdminLayout>
        <div class="shadow-2xl p-4 m-4">
            <div class="text-2xl font-bold">User Update</div>
            <div class="divider"></div>
            <div></div>
            <div class="flex justify-between w-full mt-3">
                <button class="btn btn-ghost">back</button>
                <button class="btn btn-neutral" @click="updateUser">
                    Update
                </button>
            </div>
        </div>
    </AdminLayout>
</template>
