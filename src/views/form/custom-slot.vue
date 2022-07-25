<template>
	<div>
		<div class="wel__header">自定义卡槽</div>
		<qv-form v-model="config.form" ref="qvFormRef" :option="config.option">
			<!-- 自定义label -->
			<template #text-label>
				<span>姓名22</span>
				<el-tooltip class="item" effect="dark" content="文字提示" placement="top-start">
					<i class="el-icon-warning"></i>
				</el-tooltip>
			</template>
			<!-- 自定义内容 #text 是 column 的 prop 与之相对应 -->
			<template #text="scope">
				<div>
					<el-tag>{{ config.form.text ? config.form.text : '暂时没有内容' }}</el-tag>
					<el-input v-model="config.form.text" placeholder="这里是自定的表单"></el-input>
					{{ scope }}
				</div>
			</template>
			<!-- 自定义错误提示 -->
			<template #text-error="{ error }">
				<p style="color: pink">自定义提示{{ error }}</p>
			</template>
			<!-- 自定义按钮 -->
			<template #menu-form="{}">
				<el-button icon="el-icon-user" type="primary" @click="handleSubmit">自定义提交</el-button>
				<el-button icon="el-icon-delete" @click="handleEmpty">自定义清空</el-button>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'qv-vue';
import type { Ref } from 'vue';
import { QvOption } from 'qv-vue/es/types/qvue-ui';
const qvFormRef: Ref<FormInstance | undefined> = ref();
let config = reactive({
	form: {
		text: ''
	},
	option: {
		emptyBtn: false, //隐藏本身的清空按钮
		submitBtn: false, //隐藏本身的提交按钮
		column: [
			{
				label: '姓名',
				prop: 'text',
				rules: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}
				]
			},
			{
				label: '性别',
				prop: 'sex',
				labelPosition: 'top',
				span: 6,
				className: 'formClassName' //自定义样式
			}
		]
	} as QvOption
});
const handleEmpty = () => {
	qvFormRef.value?.resetForm();
	config.form.text = '';
};
const handleSubmit = () => {
	//this.$refs.form.submit();
	qvFormRef.value?.validate((vaild, done) => {
		if (vaild) {
			ElMessage.success(JSON.stringify(config.form));
			setTimeout(() => {
				done();
			}, 2000);
		}
	});
};
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
}
.formClassName {
	padding: 0 0 0 55px !important;
	color: #ffffff;
	background-color: #409eff;
}
</style>
