<template>
	<el-form class="login-form" status-icon :rules="loginRules" ref="ruleFormRef" :model="loginForm" label-width="0">
		<el-form-item prop="username">
			<el-input @keyup.enter="handleLogin" v-model="loginForm.username" auto-complete="off" :placeholder="$t('login.username')">
				<template #prefix>
					<i class="icon-yonghu"></i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input @keyup.enter="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.password')">
				<template #suffix>
					<i class="el-icon-view el-input__icon" @click="showPassword"></i>
				</template>
				<template #prefix>
					<i class="icon-mima"></i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="code">
			<el-input @keyup.enter="handleLogin" :maxlength="code.len" v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.code')">
				<template #prefix>
					<i class="icon-yanzhengma"></i>
				</template>
				<template #append>
					<div class="login-code">
						<span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{ code.value }}</span>
						<img :src="code.src" class="login-code-img" @click="refreshCode" v-else />
						<!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
					</div>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click.prevent="handleLogin(ruleFormRef)" class="login-submit">{{ $t('login.submit') }}</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup name="UserLogin">
import { reactive, ref } from 'vue';
import { randomLenNum } from 'utils/util';
import { FormInstance } from 'element-plus';
import { useUserStore, useTagsStore } from 'store/index';
import { useRouter } from 'vue-router';
const router = useRouter();
const uStore = useUserStore();
const tStore = useTagsStore();
let loginForm = reactive({
	username: 'admin',
	password: '123456',
	code: '',
	redomStr: ''
});
let code = reactive({
	src: '',
	value: '',
	len: 4,
	type: 'text'
});
const passwordType = ref('password');
// const checked = ref(false);
const ruleFormRef = ref<FormInstance>();

const refreshCode = () => {
	loginForm.redomStr = randomLenNum(code.len, true);
	code.type == 'text' ? (code.value = randomLenNum(code.len, false)) : (code.src = `/${loginForm.redomStr}`);
	loginForm.code = code.value;
};

const validateCode = (_: unknown, value: string, callback: (error?: Error) => void) => {
	if (code.value != value) {
		loginForm.code = '';
		refreshCode();
		callback(new Error('请输入正确的验证码'));
	} else {
		callback();
	}
};
const loginRules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码长度最少为6位', trigger: 'blur' }
	],
	code: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
		{ required: true, trigger: 'blur', validator: validateCode }
	]
};
refreshCode();
const showPassword = () => {
	passwordType.value == '' ? (passwordType.value = 'password') : (passwordType.value = '');
};
const handleLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			uStore.LoginByUsername(loginForm).then(() => {
				router.push(tStore.getTagWel);
			});
		} else {
			console.log('error submit!', fields);
		}
	});
};

// ...mapState(['tagWel'])
</script>

<style></style>
