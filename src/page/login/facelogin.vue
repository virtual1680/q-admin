<template>
	<basic-video ref="video" :width="350"> </basic-video>
</template>

<script lang="ts" setup>
import basicVideo from '@/components/basic-video/main.vue';
import { useTagsStore, useUserStore } from 'store/index';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const tagsStore = useTagsStore();
const router = useRouter();
const loginForm = reactive({
	username: 'admin',
	password: '123456'
});
const tagWel = computed(() => {
	return tagsStore.getTagWel;
});
setTimeout(() => {
	handleLogin();
}, 6000);
const handleLogin = () => {
	userStore.LoginByUsername(loginForm).then(() => {
		router.push(tagWel.value);
	});
};
</script>

<style></style>
