<template>
	<div class="login-container" @keyup.enter="handleLogin">
		<div class="login-time">
			{{ time }}
		</div>
		<div class="login-weaper">
			<div class="login-left animate__animated animate__fadeInLeft">
				<img class="img" src="/img/logo.png" alt="" />
				<p class="title">{{ $t('login.info') }}</p>
			</div>
			<div class="login-border animate__animated animate__fadeInRight">
				<div class="login-main">
					<div class="lock-form animate__animated animate__bounceInDown">
						<div class="animate__animated" :class="{ shake: passwdError, animate__bounceOut: pass }">
							<h3 style="color: #333333">{{ userInfo.username }}</h3>
							<el-input placeholder="请输入登录密码" type="password" class="input-with-select animated" v-model="passwd" @keyup.enter="handleLogin">
								<template #append>
									<i class="icon-bofangqi-suoping" @click="handleLogin"></i>
									&nbsp; &nbsp;
									<i class="icon-tuichu" @click="handleLogout"></i>
								</template>
							</el-input>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="lock">
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCommonStore, useUserStore, useTagsStore } from 'store/index';

const userStore = useUserStore();
const commonStore = useCommonStore();
const tagsStore = useTagsStore();
const router = useRouter();
const time = ref('');
const passwd = ref('');
const passwdError = ref(false);
const pass = ref(false);
// ...mapState(['userInfo', 'tag', 'lockPasswd'])

const userInfo = computed(() => {
	return userStore.getUserInfo;
});
const lockPasswd = computed(() => {
	return commonStore.getLockPasswd;
});
const tag = computed(() => {
	return tagsStore.getTag;
});

const getTime = () => {
	time.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss');
};
const handleLogout = () => {
	ElMessageBox.confirm('是否退出系统, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		userStore.LogOut().then(() => {
			router.push({ path: '/login' });
		});
	});
};
const handleLogin = () => {
	if (passwd.value != lockPasswd.value) {
		passwd.value = '';
		ElMessage.error({
			message: '解锁密码错误,请重新输入',
			type: 'error'
		});
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
getTime();
setInterval(() => {
	getTime();
}, 1000);
</script>

<style lang="scss"></style>
