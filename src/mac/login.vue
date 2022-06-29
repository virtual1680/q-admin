import { reactive } from 'vue';
<template>
	<div class="mac_bg"></div>
	<div class="login animate__animated" :class="{ animate__bounceOut: pass }">
		<div class="head">
			<img src="https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401" alt="" />
		</div>
		<div class="message">Login Please</div>
		<div class="form">
			<div class="item" :class="isUserNameError ? 'error' : ''">
				<input class="account" placeholder="account here..." v-model="form.username" type="email" />
			</div>
			<div class="item" :class="isUserPasswordError ? 'error' : ''">
				<input class="password" placeholder="password here..." v-model="form.password" type="password" />
				<i class="iconfont icon-send" @click="handleLogin"></i>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useTagsStore, useUserStore } from '@/store';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {} from '../store/user';
const router = useRouter();
const userStore = useUserStore();
const tagsStore = useTagsStore();
const pass = ref(false);
const isUserNameError = ref(false);
const isUserPasswordError = ref(false);
let form = reactive({
	username: '',
	password: ''
});
const tagWel = computed(() => {
	return tagsStore.getTagWel;
});
const handleLogin = () => {
	if (form.username == '') {
		isUserNameError.value = true;
		setTimeout(() => {
			isUserNameError.value = false;
		}, 1000);
		return;
	} else if (form.password == '') {
		isUserPasswordError.value = true;
		setTimeout(() => {
			isUserPasswordError.value = false;
		}, 1000);
		return;
	}
	userStore.LoginByUsername(form).then(() => {
		pass.value = true;
		setTimeout(() => {
			router.push(tagWel.value);
		}, 1000);
	});
};
</script>
<style scoped>
@import './login.css';
</style>
