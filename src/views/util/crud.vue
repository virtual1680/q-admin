<!--
 * @Author: fuxu 1435322241@qq.com
 * @Date: 2022-08-10 20:03:19
 * @LastEditors: fuxu 1435322241@qq.com
 * @LastEditTime: 2022-08-11 11:43:53
 * @FilePath: /q-admin/src/views/util/crud.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<basic-container>
		<qv-crud v-bind="bindVal" v-on="onEvent" v-model:page="page" v-model="form"> </qv-crud>
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
let { bindVal, onEvent, page, form, crud, api, avueOption } = useCrud<RowData>({
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
	console.log(api.list);
	console.log(avueOption.value);
	console.log(crud.value);
});
</script>

<style lang="scss" scoped></style>
