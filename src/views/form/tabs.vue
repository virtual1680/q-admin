<template>
	<div>
		<div class="wel__header">tab展示</div>
		<el-button @click="config.tabs = !config.tabs">转化</el-button><br /><br />
		<qv-form v-model="config.form" @tab-click="handleTabClick" ref="qvFormRef" :option="option" @submit="submit">
			<template #group1-header>
				<h4>自定义表头</h4>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import type { QvOption } from 'qv-vue/es/types/qvue-ui';
import { reactive, ref } from 'vue';
import type { FormInstance } from 'qv-vue';
import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
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
	tabs: config.tabs,
	tabsActive: '2',
	column: [
		{
			label: '内容1',
			prop: 'text1'
		}
	],
	group: [
		{
			icon: 'el-icon-info',
			label: '分组1',
			prop: 'group1',
			column: [
				{
					label: '内容1',
					prop: 'text1'
				}
			]
		},
		{
			icon: 'el-icon-info',
			label: '分组2',
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
const handleTabClick = (tabs: any) => {
	ElMessage.success('序号为:' + tabs.index);
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
