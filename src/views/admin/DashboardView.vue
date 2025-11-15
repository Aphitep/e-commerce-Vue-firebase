<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
const priceChart = {
    options: {
        chart: {
            id: "vuechart-example",
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ],
};

const categoriesChart = {
    options: {},
    series: [44, 55, 41, 17, 15],
};
</script>
<template>
    <AdminLayout>
        <div class="text-3xl font-bold my-4">Dashboard</div>
        <div
            class="stats stats-vertical lg:stats-horizontal shadow w-full mb-4"
        >
            <div class="stat">
                <div class="stat-title">Products</div>
                <div class="stat-value">31K</div>
            </div>

            <div class="stat">
                <div class="stat-title">Orders</div>
                <div class="stat-value">4,200</div>
            </div>

            <div class="stat">
                <div class="stat-title">Users</div>
                <div class="stat-value">1,200</div>
            </div>
        </div>
        <div class="flex justify-center gap-3">
            <div class="flex-1">
                <apexchart
                    class="shadow-sm"
                    width="500"
                    type="bar"
                    :options="priceChart.options"
                    :series="priceChart.series"
                ></apexchart>
            </div>
            <div class="flex-1">
                <apexchart
                    class="shadow-sm"
                    width="500"
                    type="donut"
                    :options="categoriesChart.options"
                    :series="categoriesChart.series"
                ></apexchart>
            </div></div
    ></AdminLayout>
</template>
