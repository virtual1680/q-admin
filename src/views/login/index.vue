<script setup lang="ts" name="login">
import { ref, reactive, onMounted } from 'vue';
import { GetCaptcha, login } from 'api/auth';
import { ElLoading } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { authStore } from 'app/store';
import router from 'router/index';
import { encryptionPassword } from 'utils/util';

const authState = authStore();

const ruleFormRef = ref<FormInstance>();

const rules: FormRules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'change' }],
	code: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ min: 5, message: '密码长度最少为5位', trigger: 'blur' }
	]
};
let ruleForm = reactive({
	tenantId: '000000',
	username: '',
	password: '',
	code: '',
	type: 'account',
	//验证码的索引
	key: '',
	//预加载白色背景
	image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
});
const refreshCode = () => {
	GetCaptcha().then(res => {
		ruleForm.key = res.key;
		ruleForm.image = res.image;
	});
};
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid: boolean) => {
		if (valid) {
			const loading = ElLoading.service({
				lock: true,
				text: '登录中,请稍后...',
				// spinner: "el-icon-loading",
				background: 'rgba(0, 0, 0, 0.8)'
			});
			let pwd = encryptionPassword(ruleForm.username, ruleForm.password);
			login(ruleForm.tenantId, ruleForm.username, pwd, ruleForm.type, ruleForm.key, ruleForm.code)
				.then(res => {
					loading.close();
					authState.setToken(res.access_token);
					authState.setUserId(res.user_id);
					router.push('/nav');
				})
				.catch(() => {
					refreshCode();
					loading.close();
				});
		} else {
			refreshCode();
			console.log('error submit!');
		}
	});
};
onMounted(refreshCode);
</script>

<template>
	<screen-container>
		<div class="login_box">
			<div class="login_area">
				<div class="title">蓝天停车大数据分析平台</div>
				<div class="content">
					<el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" class="demo-ruleForm">
						<div class="label">账号</div>
						<el-form-item prop="username">
							<el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
						</el-form-item>
						<div class="label">密码</div>
						<el-form-item prop="password">
							<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<div class="label">验证码</div>
						<el-form-item prop="code">
							<el-input
								style="width: calc(100% - 100px)"
								class="login-input"
								@keyup.enter="submitForm(ruleFormRef)"
								v-model="ruleForm.code"
								auto-complete="off"
								placeholder="请输入验证码">
							</el-input>
							<div class="login-code">
								<img :src="ruleForm.image" class="login-code-img" @click="refreshCode" />
							</div>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" color="#2AACD9" @click="submitForm(ruleFormRef)">登录</el-button>
						</el-form-item>
					</el-form>
					<div class="copyright">Copyright 2021 leliven</div>
				</div>
			</div>
		</div>
	</screen-container>
</template>

<style scoped lang="scss">
.login_box {
	position: relative;
	width: 1920px;
	height: 1080px;
	background-image: url('../../assets/login/login_bg.png');
	background-repeat: no-repeat;
	background-size: cover;
	.login_area {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.title {
			margin-bottom: 20px;
			font-size: 24px;
			font-weight: 400;
			line-height: 30px;
			color: #ffffff;
			text-align: center;
		}
		:deep(.el-form-item__content) {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;
		}
		.content {
			box-sizing: border-box;
			width: 410px;
			height: 538px;
			padding: 50px 30px;
			background-image: url('../../assets/login/login_box.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.label {
				font-size: 16px;
				font-weight: 400;
				line-height: 34px;
				color: #ffffff;
				text-align: left;
			}
			.copyright {
				font-size: 14px;
				font-weight: 300;
				line-height: 20px;
				color: #ffffff;
				text-align: center;
			}
		}
		:deep(.el-input__wrapper) {
			background: none;
		}
		:deep(.el-form-item.is-required) {
			height: 56px;
			background-image: url('../../assets/login/BG.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			input {
				height: 56px;
				font-size: 16px;
				color: #ffffff;

				// line-height: 56px;
				background: none;
				border: 0; // 去除未选中状态边框
				outline: none; // 去除选中状态边框
				// ::input-placeholder {
				// 	font-size: 16px;

				// 	/* WebKit browsers */
				// 	color: #999999;
				// }
				// ::placeholder {
				// 	font-size: 16px;

				// 	/* Mozilla Firefox 19+ */
				// 	color: #999999;
				// }
				// :input-placeholder {
				// 	font-size: 16px;

				// 	/* Internet Explorer 10+ */
				// 	color: #999999;
				// }
			}
		}
		:deep(.el-button) {
			width: 100%;
			height: 54px;

			// line-height: 54px;
			margin-top: 20px;
			margin-bottom: 30px;
		}
	}
}
.login-code {
	// position: absolute;
	// right: 0;
	// top: 0;
	line-height: 10px;
}
.login-code-img {
	width: 110px;
	height: 54px;
	font-size: 14px;
	font-weight: bold;
	color: #333333;
	text-align: center;
	text-indent: 5px;
	letter-spacing: 5px;
	cursor: pointer !important;
	background-color: #fdfdfd;
	border: 1px solid #f0f0f0;
}
</style>
