<template>
	<div>
		<el-dialog title="选择" v-model="box" width="50%">
			<el-radio-group v-model="text" class="list">
				<el-row :span="24">
					<el-col v-for="(item, index) in list" :key="index" :md="4" :xs="12" :sm="4">
						<el-radio :label="item.value">{{ item.name }}</el-radio>
					</el-col>
				</el-row>
			</el-radio-group>
		</el-dialog>

		<span>
			<i class="icon-zhuti" @click="open"></i>
		</span>
	</div>
</template>

<script setup lang="ts">
import { setTheme } from 'utils/util';
import { computed, ref, watch } from 'vue';
import { useCommonStore } from 'store/common';
const cStore = useCommonStore();
const box = ref(false);
const text = ref('');
const list = ref([
	{ name: '默认主题', value: 'default' },
	{ name: '白色主题', value: 'theme-white' },
	{ name: '黑色主题', value: 'theme-dark' },
	{ name: 'hey主题', value: 'theme-hey' },
	{ name: '炫彩主题', value: 'theme-star' },
	{ name: 'vip尊贵主题', value: 'theme-vip' },
	{ name: '智能工厂主题', value: 'theme-bule' },
	{ name: 'iview主题', value: 'theme-iview' },
	{ name: 'cool主题', value: 'theme-cool' },
	{ name: 'd2主题', value: 'theme-d2' },
	{ name: 'renren主题', value: 'theme-renren' },
	{ name: 'beautiful主题', value: 'theme-beautiful' },
	{ name: 'Mac OS主题', value: 'mac-os' }
]);
const themeName = computed(() => {
	return cStore.getThemeName;
});
watch(
	() => text.value,
	val => {
		cStore.SET_THEME_NAME(val);
		setTheme(val);
		if (cStore.getIsMacOs) {
			location.reload();
		}
	}
);

text.value = themeName.value;
if (!text.value) {
	text.value = '';
}
const open = () => {
	box.value = true;
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
}
</style>
