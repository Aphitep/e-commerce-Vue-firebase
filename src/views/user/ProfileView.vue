<script setup>
import Layout from "@/layouts/UserLayout.vue";
import { onMounted, reactive, ref } from "vue";

const profileData = reactive({
    profileImage:
        "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    name: "",
    email: "",
});

const handleFileImage = (event) => {
    const fileImage = event.target.files[0];

    if (fileImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileData.profileImage = e.target.result;
        };
        reader.readAsDataURL(fileImage);
    }
};

const updateProfile = () => {
    // console.log(profileData);
    localStorage.setItem("profile-data", JSON.stringify(profileData));
};

onMounted(() => {
    let setProfile = localStorage.getItem("profile-data");

    if (setProfile) {
        setProfile = JSON.parse(setProfile);
        profileData.profileImage = setProfile.profileImage;
        profileData.email = setProfile.email;
        profileData.name = setProfile.name;
    }
});
</script>
<template>
    <Layout>
        <div class="card bg-base-200 shadow-sm max-w-2xl mx-auto m-5 p-5">
            <div class="font-bold">Your profile</div>
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                            <img :src="profileData.profileImage" />
                        </div>
                    </div>
                    <input
                        type="file"
                        class="file-input"
                        @change="handleFileImage"
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        v-model="profileData.email"
                        class="input input-bordered w-full"
                        type="text"
                        placeholder="Enter your email"
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">name</span>
                    </label>
                    <input
                        v-model="profileData.name"
                        class="input input-bordered w-full"
                        type="text"
                        placeholder="Enter your name"
                    />
                </div>
                <button class="btn btn-neutral mt-2" @click="updateProfile">
                    Update Profile
                </button>
            </div>
        </div>
    </Layout>
</template>
