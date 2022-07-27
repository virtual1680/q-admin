<template>
	<div>
		<div class="wel__header">基础用法</div>
		<div>设置gutter属性调节栏之间的距离</div>
		<el-slider v-model="config.gutter"></el-slider>
		<div>
			详情展示:<el-button @click="config.detail = !config.detail" style="margin-left: 20px">{{ !config.detail ? '展示详情' : '展示表单' }}</el-button>
		</div>

		<qv-form ref="form" v-model="config.obj" :option="option" @reset-change="emptytChange" @submit="submit">
			<template #menu-form>
				<el-button @click="tip">自定义按钮</el-button>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { QvOption, QvValue } from 'qv-vue/es/types/qvue-ui';
const DIC = {
	VAILD: [
		{ label: '真', value: 'true' },
		{ label: '假', value: 'false' }
	],
	SEX: [
		{ label: '男', value: 0 },
		{ label: '女', value: 1 }
	]
};
let config = reactive({
	showLoading: false,
	obj: {},
	sizeValue: 'default' as '' | 'default' | 'small' | 'large',
	gutter: 20,
	detail: false
});
const option = computed<QvOption>((): QvOption => {
	return {
		size: config.sizeValue,
		submitText: '完成',
		printBtn: false,
		gutter: config.gutter,
		detail: config.detail,
		column: [
			{
				label: '用户名',
				prop: 'username',
				tip: '这是信息提示',
				span: 8, //格栅栏数
				suffixIcon: 'Plus',
				prefixIcon: 'Search',
				maxlength: 3,
				minlength: 2,
				rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				click: ({ value, column }: { value: QvValue; column: unknown }) => {
					console.log(value, column);
					ElMessage.success('click');
				}
			},
			{ label: '姓名', prop: 'name', disabled: true, span: 8 },
			{ label: '密码', prop: 'password', type: 'password', span: 8 },
			{ label: '类型', prop: 'type', type: 'select', dicData: DIC.VAILD, span: 8 },
			{
				label: '权限',
				prop: 'grade',
				span: 8,
				type: 'checkbox',
				dicData: DIC.VAILD
			},
			{
				label: '开关',
				prop: 'switch',
				span: 8,
				type: 'switch',
				dicData: DIC.SEX,
				hide: true,
				row: true
			},
			{
				label: '性别',
				prop: 'sex',
				type: 'radio',
				dicData: DIC.SEX,
				row: true,
				span: 24,
				order: 1 // 字段排序
			},
			{
				label: '数字',
				prop: 'number',
				type: 'number',
				precision: 2,
				minRows: 0,
				maxRows: 3
			},
			{
				label: '网站',
				span: 12,
				prop: 'url',
				prepend: 'http://',
				append: 'com',
				row: true,
				value: '90909090'
			},
			{
				label: '日期',
				prop: 'date',
				type: 'date',
				span: 8,
				format: 'YYYY-MM-DD',
				valueFormat: 'YYYY-MM-DD'
			},
			{
				label: '日期时间',
				prop: 'datetime',
				type: 'datetime',
				span: 8,
				format: 'YYYY-MM-DD hh:mm:ss',
				valueFormat: 'YYYY-MM-DD hh:mm:ss'
			},
			{
				label: '时间',
				prop: 'time',
				type: 'time',
				span: 8,
				format: 'HH:mm:ss',
				valueFormat: 'HH:mm:ss'
			},
			{
				label: '地址',
				span: 24,
				prop: 'address'
			},
			{
				label: '建议',
				span: 24,
				type: 'upload',
				action: 'api/upload',
				listType: 'picture-img',
				prop: 'adit'
			}
		]
	};
});
const emptytChange = () => {
	ElMessage.success('清空方法回调');
};
const submit = (form: any, done: () => void) => {
	console.log('过滤数据--', form);
	console.log('正常数据--', config.obj);
	done();
	// ElMessage.success('当前数据' + JSON.stringify(config.obj));
};
const tip = () => {
	ElMessage.success('自定义按钮');
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
	&__info {
		display: flex;
		align-items: center;
		&-img {
			display: block;
			width: 72px;
			height: 72px;
			border-radius: 72px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			margin-left: 24px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-title {
			margin-bottom: 12px;
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
			color: rgb(0 0 0 / 85%);
		}
		&-subtitle {
			position: relative;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
	}
	&__extra {
		&-item {
			position: relative;
			display: inline-block;
			padding: 0 32px;
			&:last-child {
				&::after {
					display: none;
				}
			}
			&::after {
				position: absolute;
				top: 30px;
				right: 0;
				width: 1px;
				height: 40px;
				content: '';
				background-color: #e8e8e8;
			}
		}
		&-title {
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-subtitle {
			margin: 0;
			font-size: 30px;
			line-height: 38px;
			color: rgb(0 0 0 / 85%);
			span {
				font-size: 20px;
				color: rgb(0 0 0 / 45%);
			}
		}
	}
}
</style>
