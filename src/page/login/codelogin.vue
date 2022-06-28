<template>
	<el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
		<el-form-item prop="phone">
			<el-input @keyup.enter="handleLogin" v-model="loginForm.phone" auto-complete="off" :placeholder="$t('login.phone')">
				<template #prefix>
					<i class="icon-shouji"></i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="code">
			<el-input @keyup.enter="handleLogin" v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.code')">
				<template #prefix>
					<i class="icon-yanzhengma"></i>
				</template>
				<template #append>
					<span @click="handleSend" class="msg-text" :class="[{ display: msgKey }]">{{ msgText }}</span>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.prevent="handleLogin" class="login-submit">{{ $t('login.submit') }}</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup name="CodeLogin">
import { isvalidatemobile } from 'utils/validate';
// import { tagsStore } from '../../store/tags';
import { computed, reactive, ref } from 'vue';
import { FormInstance } from 'element-plus';
// import { useRouter } from 'vue-router';
// import { userStore } from '../../store/user';
import { useI18n } from 'app/lang/index';
// const tStore = tagsStore();
// const router = useRouter();
// const uStore = userStore();
const i18n = useI18n();
const validatePhone = (rule: unknown, value: string, callback: (error?: Error) => void) => {
	if (isvalidatemobile(value)[0]) {
		callback(new Error(isvalidatemobile(value)[1].toString()));
	} else {
		callback();
	}
};
const validateCode = (rule: unknown, value: string, callback: (error?: Error) => void) => {
	if (value.length != 4) {
		callback(new Error('请输入4位数的验证码'));
	} else {
		callback();
	}
};
const msgText = ref('');
const msgTime = ref(0);
const msgKey = ref(false);
let loginForm = reactive({
	phone: '',
	code: ''
});

const loginRules = {
	phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
	code: [{ required: true, trigger: 'blur', validator: validateCode }]
};

const config = computed(() => {
	return {
		//TODO $t 已注册在全局，此取法有待优化
		MSGINIT: i18n.$t('login.msgText'),
		MSGSCUCCESS: i18n.$t('login.msgSuccess'),
		MSGTIME: 60
	};
});
// ...mapState(tagsStore(), ['tagWel']),
msgText.value = config.value.MSGINIT;
msgTime.value = config.value.MSGTIME;

const handleSend = () => {
	if (msgKey.value) return;
	msgText.value = msgTime.value + config.value.MSGSCUCCESS;
	msgKey.value = true;
	const time = setInterval(() => {
		msgTime.value--;
		msgText.value = msgTime.value + config.value.MSGSCUCCESS;
		if (msgTime.value == 0) {
			msgTime.value = config.value.MSGTIME;
			msgText.value = config.value.MSGINIT;
			msgKey.value = false;
			clearInterval(time);
		}
	}, 1000);
};

const handleLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid: boolean) => {
		if (valid) {
			// uStore.LoginByPhone(loginForm).then(() => {
			// 	router.push(tStore.getTagWel);
			// });
		}
	});
};
</script>

<style>
.msg-text {
	display: block;
	width: 60px;
	font-size: 12px;
	text-align: center;
	cursor: pointer;
}
.msg-text.display {
	color: #ccc;
}
</style>
