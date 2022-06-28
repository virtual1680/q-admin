<template>
	<!-- @keyup.enter="handleLogin" -->
	<div class="login-container">
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
					<p class="login-title">
						{{ $t('login.title') }}{{ website.title }}
						<top-lang></top-lang>
					</p>
					<userLogin v-if="activeName === 'user'"></userLogin>
					<codeLogin v-else-if="activeName === 'code'"></codeLogin>
					<faceLogin v-else-if="activeName === 'face'"></faceLogin>
					<div class="login-menu">
						<a href="#" @click.stop="activeName = 'user'">{{ $t('login.userLogin') }}</a>
						<a href="#" @click.stop="activeName = 'code'">{{ $t('login.phoneLogin') }}</a>
						<a href="#" @click.stop="activeName = 'face'">{{ $t('login.faceLogin') }}</a>
					</div>
					<thirdLogin></thirdLogin>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="Login">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElLoading } from 'element-plus';
import website from 'app/config/website';
import dayjs from 'dayjs';
import userLogin from './userlogin.vue';
import codeLogin from './codelogin.vue';
import thirdLogin from './thirdlogin.vue';
import faceLogin from './facelogin.vue';
import { validatenull } from 'utils/validate';
import topLang from 'app/page/index/top/top-lang.vue';

const route = useRoute();
const time = ref('');
const activeName = ref('user');
const getTime = () => {
	time.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss');
};
getTime();
setInterval(() => {
	getTime();
}, 1000);
watch(
	() => route,
	() => {
		const params = route.query as any;
		if (!validatenull(params?.state)) {
			const loading = ElLoading.service({
				lock: true,
				text: `${params.state === 'WX' ? '微信' : 'QQ'}登录中,请稍后。。。`,
				spinner: 'el-icon-loading'
			});
			setTimeout(() => {
				loading.close();
			}, 2000);
		}
	}
);
</script>
