<template>
	<template v-for="item in props.menu">
		<el-menu-item v-if="validatenull(item[childrenKey]) && validRoles(item)" :index="getPath(item)" @click="open(item)" :key="item[labelKey]">
			<i :class="item[iconKey]"></i>
			<template #title>
				<span :alt="item[pathKey]">{{ getTitle(item) }}</span>
			</template>
		</el-menu-item>
		<el-sub-menu v-else-if="!validatenull(item[childrenKey]) && validRoles(item)" :index="getPath(item)" :key="item[labelKey] + '1'">
			<template #title>
				<i :class="item[iconKey]"></i>
				<span>{{ getTitle(item) }}</span>
			</template>
			<template v-for="(child, cindex) in item[childrenKey]" :key="child[labelKey]">
				<el-menu-item :index="getPath(child)" @click="open(child)" v-if="validatenull(child[childrenKey])">
					<i :class="child[iconKey]"></i>
					<template #title>
						<span>{{ getTitle(child) }}</span>
					</template>
				</el-menu-item>
				<sidebar-item v-else :menu="[child]" :key="cindex"></sidebar-item>
			</template>
		</el-sub-menu>
	</template>
</template>
<script setup lang="ts" name="sidebarItem">
import { validatenull } from 'utils/validate';
import website from '@/config/website';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { AVueRouter } from '../../../router/index';
import { userStore } from '../../../store/user';
const router = useRouter() as AVueRouter;
const uStore = userStore();
const props = defineProps({
	menu: Array
});
const labelKey = computed(() => {
	return website.menu.label;
});
const pathKey = computed(() => {
	return website.menu.path;
});
const queryKey = computed(() => {
	return website.menu.query;
});
const iconKey = computed(() => {
	return website.menu.icon;
});
const childrenKey = computed(() => {
	return website.menu.children;
});
const roles = computed(() => {
	return uStore.getRoles;
});

const getPath = (item: any) => {
	return item[pathKey.value];
};
const getTitle = (item: any) => {
	return router.avueRouter?.generateTitle(item, website.menu);
};
const validRoles = (item: any) => {
	item.meta = item.meta || {};
	return item.meta.roles ? item.meta.roles.includes(roles) : true;
};
const open = (item: any) => {
	router.push({
		path: item[pathKey.value],
		query: item[queryKey.value]
	});
};
</script>
