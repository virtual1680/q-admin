<template>
	<div class="mac_bg"></div>
	<div class="login animate__animated" :class="{ animate__bounceOut: pass }">
		<div class="head">
			<img src="https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401" alt="" />
		</div>
		<div class="message">{{ userInfo.username }}</div>
		<div class="form">
			<div class="item" style="width: 320px" :class="passwdError ? 'error' : ''">
				<input class="password" placeholder="password here..." v-model="passwd" type="password" />
				<i class="iconfont el-icon-unlock" @click="handleLogin"></i>
				<i class="iconfont icon-tuichu" @click="handleLogout"></i>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useCommonStore, useTagsStore, useUserStore } from '@/store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const passwdError = ref(false);
const passwd = ref('');
const pass = ref(false);

const router = useRouter();
const userStore = useUserStore();
const tagsStore = useTagsStore();
const commonStore = useCommonStore();

const userInfo = computed(() => {
	return userStore.getUserInfo;
});
const tag = computed(() => {
	return tagsStore.getTag;
});
const lockPasswd = computed(() => {
	return commonStore.getLockPasswd;
});

const handleLogout = () => {
	userStore.LogOut().then(() => {
		router.push({ path: '/login' });
	});
};
const handleLogin = () => {
	if (passwd.value != lockPasswd.value) {
		passwd.value = '';
		passwdError.value = true;
		setTimeout(() => {
			passwdError.value = false;
		}, 1000);
		return;
	}
	pass.value = true;
	setTimeout(() => {
		commonStore.CLEAR_LOCK();
		router.push({
			path: tag.value.path
		});
	}, 1000);
};
</script>
<style scoped>
@import './login.css';
</style>
