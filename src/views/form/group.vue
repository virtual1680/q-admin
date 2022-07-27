<template>
	<div>
		<div class="wel__header">分组展示</div>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit">
			<template #group1-header="{ column }">
				<i :class="column.icon"></i><el-tag>{{ column.label }}</el-tag>
			</template>
			<template #text3="{}"> <el-input placeholder="自定义" v-model="config.form.text3"></el-input> </template
		></qv-form>
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
	reload: Math.random(),
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
			label: '内容',
			prop: 'text'
		}
	],
	group: [
		{
			icon: 'Info',
			label: '分组1',
			collapse: true,
			prop: 'group1',
			column: [
				{
					label: '内容1',
					prop: 'text1'
				}
			]
		},
		{
			icon: 'Info',
			label: '分组2',
			arrow: false,
			prop: 'group2',
			column: [
				{
					label: '选项卡2',
					prop: 'text2'
				},
				{
					label: '选项卡3',
					prop: 'text3'
				}
			]
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
