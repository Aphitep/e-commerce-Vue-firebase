<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
const options = {
    chart: {
        id: "vuechart-example",
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
};
const series = [
    {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
];
</script>
<template>
    <AdminLayout>
        <div>Dashboard</div>
        <div class="stats stats-vertical lg:stats-horizontal shadow">
            <div class="stat">
                <div class="stat-title">Downloads</div>
                <div class="stat-value">31K</div>
                <div class="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div class="stat">
                <div class="stat-title">New Users</div>
                <div class="stat-value">4,200</div>
                <div class="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div class="stat">
                <div class="stat-title">New Registers</div>
                <div class="stat-value">1,200</div>
                <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>
        </div>
        <div>
            <apexchart
                width="500"
                type="bar"
                :options="options"
                :series="series"
            ></apexchart></div
    ></AdminLayout>
</template>
