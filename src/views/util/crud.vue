<template>
	<basic-container>
		<avue-crud v-bind="bindVal" v-on="onEvent" v-model:page="page" v-model="form"> </avue-crud>
	</basic-container>
</template>

<script lang="ts" setup>
import { useCrud } from '@/hooks/useCrud';
import { onMounted } from 'vue';
// import { getCurrentInstance, onMounted } from 'vue';
// const instance = getCurrentInstance();
interface RowData {
	name: string;
	sex: string;
}
let { bindVal, onEvent, page, form, crud } = useCrud<RowData>({
	apiPath: 'crud/index',
	optionPath: 'crud/index',
	// 对搜索的参数进行改变 返回我们需要的参数格式
	searchParams: params => {
		if (Reflect.has(params, 'queryTime')) {
			params.startTime = params.queryTime[0];
			params.endTime = params.queryTime[0];
			Reflect.deleteProperty(params, 'queryTime');
		}
		return params;
	},
	listBefore: () => {
		// params['queryTime'];
		// page.value.size = 50;
	},
	listAfter: res => {
		console.log('this is listAfter', res.record[0].name);
	}
});
onMounted(() => {
	console.log(crud.value);
});
</script>

<style lang="scss" scoped></style>
