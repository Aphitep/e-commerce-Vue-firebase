<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";

import { useAdminUserStore } from "@/stores/admin/user";
import { useEventStore } from "@/stores/event";

const eventStore = useEventStore();
const adminUserStore = useAdminUserStore();
const route = useRoute();
const router = useRouter();
const userUID = ref(-1);
const formData = {
    role: ["admin", "member"],
};

const userData = reactive({
    fullname: "",
    role: "",
    status: "",
});
onMounted(async () => {
    if (route.params.id) {
        userUID.value = route.params.id;
        const selectedUser = await adminUserStore.getUser(userUID.value);

        userData.fullname = selectedUser.fullname;
        userData.role = selectedUser.role;
        userData.status = selectedUser.status;
    }
});
const updateUser = () => {
    adminUserStore.updateUser(userIndex.value, userData);
    eventStore.popupMessage("info", "Update user successful");
    router.push({ name: "admin-user-list" });
};
</script>
<template>
    <AdminLayout>
        <div class="shadow-2xl p-4 m-4">
            <div class="text-2xl font-bold">User Update</div>
            <div class="divider"></div>
            <div>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">User</legend>
                    <input
                        type="text"
                        class="input w-full"
                        placeholder="Type here"
                        v-model="userData.fullname"
                    />
                </fieldset>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Role</legend>
                    <select class="select w-full" v-model="userData.role">
                        <option v-for="role in formData.role">
                            {{ role }}
                        </option>
                    </select>
                </fieldset>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Status</legend>
                    <div class="flex gap-1.5">
                        <label class="label">
                            <input
                                type="radio"
                                name="radio-1"
                                class="radio radio-success"
                                :value="'active'"
                                v-model="userData.status"
                            />
                            active
                        </label>

                        <label class="label">
                            <input
                                type="radio"
                                name="radio-1"
                                class="radio radio-error"
                                :value="'inactive'"
                                v-model="userData.status"
                            />
                            inactive
                        </label>
                    </div>
                </fieldset>
            </div>
            <div class="flex justify-between w-full mt-3">
                <button class="btn btn-ghost">back</button>
                <button class="btn btn-neutral" @click="updateUser">
                    Update
                </button>
            </div>
        </div>
    </AdminLayout>
</template>
