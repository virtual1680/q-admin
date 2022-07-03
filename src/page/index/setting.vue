<template>
	<el-button @click="show = true" class="setting-icon" type="primary" icon="el-icon-setting" circle></el-button>
	<el-drawer append-to-body :with-header="false" v-model="show" size="30%">
		<div class="setting">
			<h5>导航模式</h5>
			<div class="setting-checkbox">
				<el-tooltip class="item" effect="dark" content="侧边菜单布局" placement="top">
					<div @click="setting.sidebar = 'vertical'" class="setting-checkbox-item setting-checkbox-item--side"></div>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="顶部菜单布局" placement="top">
					<div @click="setting.sidebar = 'horizontal'" class="setting-checkbox-item setting-checkbox-item--top"></div>
				</el-tooltip>
			</div>
			<h5>页面布局</h5>
			<div class="setting-checkbox">
				<div class="setting-item" v-for="(item, index) in list1" :key="index">
					{{ item.label }}:
					<el-switch v-model="setting[item.value]"> </el-switch>
				</div>
			</div>
			<h5>功能调试</h5>
			<div class="setting-checkbox">
				<div class="setting-item" v-for="(item, index) in list2" :key="index">
					{{ item.label }}:
					<el-switch v-model="setting[item.value]"> </el-switch>
				</div>
			</div>
		</div>
	</el-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCommonStore } from 'store/index';

const cStore = useCommonStore();
const show = ref(false);
// const isHorizontal = computed(() => {
// 	return cStore.getIsHorizontal;
// });
const setting = computed(() => {
	return cStore.getSetting;
});
const list1 = ref([
	{ label: '导航标签', value: 'tag' },
	{ label: '菜单折叠', value: 'collapse' },
	{ label: '菜单搜索', value: 'search' },
	{ label: '屏幕全屏', value: 'fullscren' },
	{ label: '主题选择', value: 'theme' },
	{ label: '顶部菜单', value: 'menu' }
]);
const list2 = ref([
	{ label: '日志调试', value: 'debug' },
	{ label: '屏幕锁定', value: 'lock' }
]);
</script>

<style lang="scss">
.setting {
	&-icon {
		position: fixed;
		right: 20px;
		bottom: 200px;
		z-index: 2048;
		color: #666666;
		i {
			margin-left: 0;
		}
	}
	&-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
		font-size: 14px;
	}
	&-checkbox {
		&--check {
			position: absolute;
			top: 50%;
			left: 50%;
			color: #409eff;
			transform: translate(-50%, -50%);
		}
		&-item {
			position: relative;
			display: inline-block;
			width: 44px;
			height: 36px;
			margin-right: 16px;
			overflow: hidden;
			cursor: pointer;
			background-color: #f0f2f5;
			border-radius: 4px;
			box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
			&::before {
				position: absolute;
				top: 0;
				left: 0;
				width: 33%;
				height: 100%;
				content: '';
				background-color: #ffffff;
			}
			&::after {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 25%;
				content: '';
				background-color: #ffffff;
			}
			&--side {
				&::before {
					z-index: 1;
					content: '';
					background-color: #001529;
				}
				&::after {
					background-color: #ffffff;
				}
			}
			&--top {
				&::after {
					background-color: #001529;
				}
			}
		}
	}
}
</style>
