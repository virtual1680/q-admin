<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-09-20 14:59:06
 * @LastEditTime: 2022-09-20 15:25:08
 * @Description: 暂无
-->
<template>
	<basic-container>
		<template #header>
			<span>CRUD 分页</span>
		</template>
		<div class="main-content">
			<qv-crud
				:data="config.data"
				:option="option"
				v-model:page="config.page"
				@size-change="sizeChange"
				@current-change="currentChange"
				@on-load="onLoad">
			</qv-crud>
		</div>
	</basic-container>
</template>

<script lang="ts" setup>
import { QvOption } from 'qv-vue/es/types/qvue-ui';
import { reactive, computed, ref, onMounted, nextTick } from 'vue';

const ElementPlus = ref();
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module;
	});
});

let config = reactive({
	page: {
		currentPage: 1,
		total: 4, //如果total为0则不显示分页组件
		// pagerCount:6,
		// layout: 'total,pager,prev, next',
		// background: true,
		pageSize: 10
	},
	data: [] as any[]
});

const option = computed((): QvOption => {
	return {
		align: 'center',
		// menuAlign: 'center',
		height: 300,
		column: [
			{
				label: '姓名',
				prop: 'name'
			},
			{
				label: '性别',
				prop: 'sex'
			}
		]
	};
});
const onLoad = () => {
	config.page.total = 4;
	if (config.page.currentPage === 1) {
		config.data = [
			{ id: 1, name: '张三', sex: '男' },
			{ id: 2, name: '李四', sex: '女' }
		];
	} else if (config.page.currentPage == 2) {
		config.data = [
			{ id: 3, name: '王五', sex: '女' },
			{ id: 4, name: '赵六', sex: '女' }
		];
	}
};
const sizeChange = (val: number) => {
	config.page.currentPage = 1;
	config.page.pageSize = val;
	onLoad();
	nextTick(() => {
		const { ElMessage } = ElementPlus.value;
		ElMessage.success('行数' + val);
	});
};
const currentChange = (val: number) => {
	config.page.currentPage = val;
	onLoad();
	nextTick(() => {
		const { ElMessage } = ElementPlus.value;
		ElMessage.success('页码' + val);
	});
};
</script>
<style lang="scss" scoped>
.main-content {
	height: calc(100vh - 225px);
	overflow-y: auto;
}
</style>
