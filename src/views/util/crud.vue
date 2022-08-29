<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-11 17:21:48
 * @LastEditTime: 2022-08-29 14:06:40
 * @Description: 暂无
-->
<template>
	<basic-container>
		<qv-crud v-bind="bindVal" v-on="onEvent" v-model:page="page" v-model="form"> </qv-crud>
	</basic-container>
</template>

<script lang="ts" setup>
import { useCrud } from '@/hooks/useCrud';
import { onMounted } from 'vue';
// import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance();
interface RowData {
	name: string;
	sex: string;
}
let { bindVal, onEvent, page, form, crud, api, avueOption, params } = useCrud<RowData>({
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
		console.log(params.value);
		// params.value['queryTime'];
		// page.value.size = 50;
	},
	listAfter: res => {
		console.log('this is listAfter', res.record[0].name);
	}
});

onMounted(() => {
	console.log(api.list);
	console.log(avueOption.value);
	console.log(crud.value);
});
</script>

<style lang="scss" scoped></style>
