<template>
	<el-scrollbar class="avue-menu">
		<div v-if="menu && menu.length == 0 && !isHorizontal" class="avue-sidebar--tip">{{ $t('menuTip') }}</div>
		<el-menu unique-opened :default-active="activeMenu" :mode="setting.sidebar" :collapse="getScreen(isCollapse)">
			<sidebar-item :menu="menu"></sidebar-item>
		</el-menu>
	</el-scrollbar>
</template>

<script setup lang="ts" name="sidebar">
import sidebarItem from './sidebarItem.vue';
import { userStore } from '@/store/user';
import { commonStore } from '@/store/common';
// import { tagsStore } from '@/store/tags';
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { getScreen } from 'utils/util';
const route = useRoute();
const uStore = userStore();
const cStore = commonStore();
// const tStore = tagsStore();
// mixins: [index],
const isHorizontal = computed(() => {
	return cStore.getIsHorizontal;
});
// const tag = computed(() => {
// 	return tStore.getTag;
// });
const menu = computed(() => {
	return uStore.getMenu;
});
const isCollapse = computed(() => {
	return cStore.getIsCollapse;
});

// const menuId = computed(() => {
// 	return uStore.getMenuId;
// });
const setting = computed(() => {
	return cStore.getSetting;
});
const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta.activeMenu) {
		return meta.activeMenu;
	}
	return path;
});
(inject('openMenu') as () => void)();
</script>
<style lang="scss" scoped></style>
