<template>
	<div>
		<div class="wel__header">控制其它字段</div>
		<avue-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit"> </avue-form>
	</div>
</template>

<script lang="ts" setup>
import type { QvOption } from 'qv-vue/es/types/qvue-ui';
import { reactive, ref } from 'vue';
import type { FormInstance } from 'qv-vue';
import type { Ref } from 'vue';
const qvFormRef: Ref<FormInstance | undefined> = ref();

let config = reactive({
	tabs: true,
	form: {
		text: '文本',
		text1: '文本1',
		text2: '文本2',
		text3: '文本3'
	}
});
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '内容1',
			prop: 'text1',
			type: 'radio',
			control: (val: number, form: any) => {
				console.log(form);
				if (val === 0) {
					return {
						text2: {
							display: true
						},
						text3: {
							label: '内容3'
						}
					};
				} else {
					return {
						text2: {
							display: false
						},
						text3: {
							label: '有没有发现我变了'
						}
					};
				}
			},
			dicData: [
				{
					label: '显示',
					value: 0
				},
				{
					label: '隐藏',
					value: 1
				}
			]
		},
		{
			label: '内容2',
			prop: 'text2',
			display: true
		},
		{
			label: '内容3',
			prop: 'text3'
		}
	]
} as QvOption);

const submit = (form: any, done: () => void) => {
	console.log('过滤数据--', form);
	done();
	// ElMessage.success('当前数据' + JSON.stringify(config.obj));
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
</style>
