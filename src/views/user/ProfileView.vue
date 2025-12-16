<script setup>
import Layout from "@/layouts/UserLayout.vue";
import { onMounted, reactive, ref } from "vue";
import { storage } from "@/firebase";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();

const profileData = reactive({
    profileImage: "",
    fullname: "",
    email: "",
});

const handleFileImage = async (event) => {
    const fileImage = event.target.files[0];

    if (fileImage) {
        const uploadRef = storageRef(
            storage,
            `users/${accountStore.user.uid}/${fileImage.name}`,
        );

        const snapshot = await uploadBytes(uploadRef, fileImage);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        profileData.profileImage = downloadUrl;
        // reader.readAsDataURL(fileImage);
    }
};

const updateProfile = async () => {
    // console.log(profileData)
    try {
        const updateUserData = {
            fullname: profileData.fullname,
            imageUrl: profileData.profileImage,
            email: profileData.email,
        };

        await accountStore.updateUser(updateUserData);
    } catch (err) {
        console.log(err);
    }
};

onMounted(() => {
    let setProfile = accountStore.profile;

    profileData.profileImage =
        setProfile.imageUrl ||
        "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";
    profileData.email = setProfile.email;
    profileData.fullname = setProfile.fullname;
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
                        disabled
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">name</span>
                    </label>
                    <input
                        v-model="profileData.fullname"
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
