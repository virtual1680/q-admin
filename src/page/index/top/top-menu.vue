<template>
	<el-menu class="top-menu" :default-active="activeIndex" mode="horizontal" text-color="#333">
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
import { inject, Ref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AVueRouter } from '../../../router/index';
import { useUserStore } from 'store/user';

const router = useRouter() as AVueRouter;
const uStore = useUserStore();
const activeIndex = ref('0');
const items: Ref<Menu[]> = ref([]);
// ...mapState(['tagCurrent', 'menu'])
const menu = computed(() => {
	return uStore.getMenu;
});
// TODO
// const tagCurrent = computed(() => {
// 	return uStore.getTag
// })

const openMenu = (item: Menu) => {
	(inject('openMenu') as (item: Menu) => void)(item);
};
const getMenu = () => {
	uStore.GetTopMenu().then(res => {
		items.value = res;
	});
};
const generateTitle = (item: Menu) => {
	return router.avueRouter?.generateTitle(item);
};
getMenu();
</script>
