<template>
	<div>
		<div class="wel__header">数据过滤</div>
		<el-button size="small" type="danger" @click="filterDic">过滤数据字典</el-button>
		<el-button size="small" type="success" @click="filterNull">过滤空数据</el-button>
		<el-button size="small" type="primary" @click="filter">不过滤</el-button>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit"> </qv-form>
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
		cascader: [0, 1],
		tree: 0
	}
});
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '姓名',
			prop: 'name'
		},
		{
			label: '级别',
			prop: 'cascader',
			type: 'cascader',
			dicData: [
				{
					label: '一级',
					value: 0,
					children: [
						{
							label: '一级1',
							value: 1
						},
						{
							label: '一级2',
							value: 2
						}
					]
				}
			]
		},
		{
			label: '树型',
			prop: 'tree',
			type: 'tree',
			dicData: [
				{
					label: '一级',
					value: 0,
					children: [
						{
							label: '一级1',
							value: 1
						},
						{
							label: '一级2',
							value: 2
						}
					]
				}
			]
		}
	]
} as QvOption);
const refresh = () => {
	config.reload = Math.random();
};
const filter = () => {
	option.value.filterDic = false;
	option.value.filterNull = false;
	refresh();
};
const filterDic = () => {
	option.value.filterDic = true;
	refresh();
};
const filterNull = () => {
	option.value.filterNull = true;
	refresh();
};
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
