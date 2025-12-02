<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
import { useEventStore } from "@/stores/event";

const eventStore = useEventStore();
const useAccount = useAccountStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
    try {
        await useAccount.adminLogin(email.value, password.value);
        router.push({ name: "admin-dashboard" });
    } catch (error) {
        console.log("error", error.message);
        eventStore.popupMessage("error", error.message);
    }
};
</script>

<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl bg-base-100 shadow-2xl mx-auto p-6">
            <div class="flex flex-col items-center">
                <h2 class="text-2xl">Login</h2>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Email</legend>
                    <input
                        v-model="email"
                        type="text"
                        class="input w-full"
                        placeholder="email"
                    />
                </fieldset>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Password</legend>
                    <input
                        v-model="password"
                        type="password"
                        class="input w-full"
                        placeholder="password"
                    />
                </fieldset>

                <button @click="login" class="btn btn-neutral w-1/2">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>
