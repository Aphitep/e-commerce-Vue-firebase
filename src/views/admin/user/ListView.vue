<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import Trash from "@/components/icons/Trash.vue";
import Edit from "@/components/icons/Edit.vue";
import Table from "@/components/Table.vue";
</script>
<template>
    <AdminLayout>
        <div>
            <div class="text-3xl font-bold m-4">User List</div>
            <Table :header="['Name', 'Role', 'Status', 'Update at', '']">
                <tr></tr>
            </Table>
        </div>
    </AdminLayout>
</template>
