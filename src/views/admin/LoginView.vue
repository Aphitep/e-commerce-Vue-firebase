<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl bg-base-100 shadow-2xl mx-auto p-6">
            <div class="flex flex-col items-center">
                <h2 class="text-2xl">Login</h2>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Email</legend>
                    <input
                        type="text"
                        class="input w-full"
                        placeholder="email"
                    />
                </fieldset>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Password</legend>
                    <input
                        type="password"
                        class="input w-full"
                        placeholder="password"
                    />
                </fieldset>

                <RouterLink
                    :to="{ name: 'admin-dashboard' }"
                    class="btn btn-neutral w-1/2"
                >
                    Login
                </RouterLink>
            </div>
        </div>
    </div>
</template>
