<template>
	<el-menu class="top-menu" :default-active="tagCurrent" mode="horizontal" text-color="#333">
		<template v-for="(item, index) in items" :key="index">
			<el-menu-item :index="item.parentId + ''" @click="openMenu(item)">
				<template #title>
					<i class="icon-caidan"></i>
					<span>{{ generateTitle(item) }}</span>
				</template>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script setup lang="ts" name="top-menu">
import { computed, inject, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AVueRouter } from '../../../router/index';
import { useUserStore } from 'store/index';

const router = useRouter() as AVueRouter;
const uStore = useUserStore();
const items: Ref<RouterMenu[]> = ref([]);
// 当前选中的top-menu
const tagCurrent = computed(() => {
	return uStore.menuId.toString();
});

const injectOpenMenu = inject<(item: Partial<RouterMenu>, isInit: boolean) => void>('openMenu');

const openMenu = (item: Partial<RouterMenu>) => {
	injectOpenMenu?.(item, false);
};
const getMenu = () => {
	uStore.GetTopMenu().then(res => {
		items.value = res;
	});
};
const generateTitle = (item: RouterMenu) => {
	return router.avueRouter?.generateTitle(item);
};
getMenu();
</script>
