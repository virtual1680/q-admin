<template>
	<basic-container>
		<template #header>
			<span>CRUD 基础</span>
		</template>
		<div class="main-content">
			<el-row style="margin-bottom: 20px; font-size: 15px">
				<el-col :span="4">等待加载框: <el-switch size="small" v-model="showLoading"> </el-switch></el-col>
				<el-col :span="4">显示边框: <el-switch size="small" v-model="showBorder"> </el-switch></el-col>
				<el-col :span="4">显示斑马纹: <el-switch size="small" v-model="showStripe"> </el-switch></el-col>
				<el-col :span="4">显示索引: <el-switch size="small" v-model="showIndex"> </el-switch></el-col>
				<el-col :span="4">显示多选框: <el-switch size="small" v-model="showCheckbox"> </el-switch></el-col>
				<el-col :span="4">显示表头: <el-switch size="small" v-model="showHeader"> </el-switch></el-col>
				<el-col :span="4">显示分页: <el-switch size="small" v-model="showPage"> </el-switch></el-col>
				<el-col :span="4">卡片模式: <el-switch size="small" v-model="showCard"> </el-switch></el-col>
			</el-row>
			<el-row style="margin-bottom: 20px">
				类型：<el-radio-group v-model="menuType" size="small">
					<el-radio-button label="text">默认</el-radio-button>
					<el-radio-button label="icon">菜单按钮</el-radio-button>
					<el-radio-button label="link">文本按钮</el-radio-button>
					<el-radio-button label="menu">合并菜单</el-radio-button>
				</el-radio-group>
			</el-row>
			<el-row style="margin-bottom: 20px">
				大小：<el-radio-group v-model="sizeValue" size="small">
					<el-radio-button label="default">默认</el-radio-button>
					<el-radio-button label="small">small</el-radio-button>
					<el-radio-button label="large">large</el-radio-button>
				</el-radio-group>
			</el-row>
			<qv-crud :data="config.data" :option="option" :table-loading="showLoading" :v-model:page="config.page"> </qv-crud>
		</div>
	</basic-container>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';
import type { QvOption } from 'qv-vue/es/types/qvue-ui';
const menuType = ref('link');
const showLoading = ref(false);
const showCard = ref(false);
const showBorder = ref(false);
const showStripe = ref(false);
const showHeader = ref(true);
const showIndex = ref(true);
const showCheckbox = ref(false);
const showPage = ref(true);
const sizeValue = ref('default');

let config = reactive({
	page: {
		total: 100,
		currentPage: 1
	},
	data: [
		{ name: '张三', sex: '男' },
		{ name: '李四', sex: '女' },
		{ name: '王五', sex: '女' },
		{ name: '赵六', sex: '男' }
	]
});

const option = computed((): QvOption => {
	return {
		title: '表格的标题',
		titleSize: 'h3',
		titleStyle: {
			color: 'red'
		},
		height: 'auto', //当设置高度为 auto 时 ，calcHeight 必须设置
		calcHeight: 85,
		searchMenuSpan: 6,
		card: showCard.value,
		border: showBorder.value,
		stripe: showStripe.value,
		showHeader: showHeader.value,
		index: showIndex.value,
		size: sizeValue.value,
		selection: showCheckbox.value,
		page: showPage,
		align: 'center',
		menuAlign: 'center',
		menuType: menuType.value,
		menuBtnTitle: '自定义名称',
		viewBtn: true,
		column: [
			{ label: '姓名', prop: 'name', search: true },
			{ label: '性别', prop: 'sex' }
		]
	};
});
</script>
<style lang="scss" scoped>
.main-content {
	height: calc(100vh - 225px);
	overflow-y: auto;
}
</style>
