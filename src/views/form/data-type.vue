<template>
	<div>
		<div class="wel__header">数据类型</div>
		<div>有些数据是数组形式的，我们传入字符串是无法识别的，解决数据字典和字段类型不匹配问题,配置dataType属性(string / number)</div>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option"> </qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'; //, nextTick
// import { findObject } from 'qv-vue';
import type { QvOption } from 'qv-vue/es/types/qvue-ui';
import type { FormInstance } from 'qv-vue';
import type { Ref } from 'vue';

const qvFormRef: Ref<FormInstance | undefined> = ref();

let config = reactive({
	form: {
		cascader: '1,2',
		province: 120000,
		radio: 1,
		checkbox: [1, 2, 3],
		selects: '1,2,3'
	}
});
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '单选',
			prop: 'radio',
			type: 'radio',
			dataType: 'number',
			dicData: [
				{ label: '选项1', value: 1 },
				{ label: '选项2', value: 2 },
				{ label: '选项3', value: 3 }
			]
		},
		{
			label: '多选',
			prop: 'checkbox',
			type: 'checkbox',
			dataType: 'string',
			dicData: [
				{ label: '选项1', value: 1 },
				{ label: '选项2', value: 2 },
				{ label: '选项3', value: 3 }
			]
		},
		{
			label: '多选',
			prop: 'selects',
			type: 'select',
			multiple: true,
			dicData: [
				{ label: '选项1', value: '1' },
				{ label: '选项2', value: '2' },
				{ label: '选项3', value: '3' }
			]
		},
		{
			label: '级联',
			prop: 'cascader',
			type: 'cascader',
			dataType: 'string',
			dicData: [
				{
					label: '级别1',
					value: 1,
					children: [{ label: '级别2', value: 2 }]
				}
			],
			rules: [{ required: true, message: '请选择级联', trigger: 'blur' }]
		},
		{
			label: '省份',
			prop: 'province',
			type: 'select',
			dataType: 'number',
			props: {
				label: 'name',
				value: 'code'
			},
			dicUrl: `/area/getProvince`,
			rules: [
				{
					required: true,
					message: '请选择省份',
					trigger: 'blur'
				}
			]
		}
	]
} as QvOption);
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
</style>
