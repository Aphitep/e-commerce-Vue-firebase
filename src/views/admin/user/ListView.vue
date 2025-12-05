<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";

import { useAdminUserStore } from "@/stores/admin/user";

import Trash from "@/components/icons/Trash.vue";
import Edit from "@/components/icons/Edit.vue";
import Table from "@/components/Table.vue";

const adminUserStore = useAdminUserStore();
const changeStatus = (index) => {
    let selectedUser = adminUserStore.list[index];

    if (selectedUser.status === "active") {
        selectedUser.status = "inactive";
    } else {
        selectedUser.status = "active";
    }
    adminUserStore.updateUser(index, selectedUser);
};

onMounted(() => {
    adminUserStore.loadUser();
});
</script>
<template>
    <AdminLayout>
        <div>
            <div class="text-3xl font-bold m-4">User List</div>
            <Table :header="['Name', 'Role', 'Status', 'Update at', '']">
                <tr v-for="(user, index) in adminUserStore.list">
                    <td>{{ user.fullname }}</td>
                    <td>
                        {{ user.role }}
                    </td>
                    <td>
                        <div
                            class="badge"
                            :class="
                                user.status === 'active'
                                    ? ' badge-success'
                                    : ' badge-ghost'
                            "
                        >
                            {{ user.status }}
                        </div>
                    </td>
                    <td>{{ user.updateAt }}</td>
                    <td>
                        <div class="flex gap-1">
                            <RouterLink
                                :to="{
                                    name: 'admin-user-update',
                                    params: { id: user.uid },
                                }"
                                class="btn"
                                >Edit</RouterLink
                            ><button class="btn" @click="changeStatus(index)">
                                {{
                                    user.status === "active"
                                        ? "Disable"
                                        : "Enable"
                                }}
                            </button>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
    </AdminLayout>
</template>
