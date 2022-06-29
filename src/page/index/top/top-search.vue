<template>
	<el-autocomplete
		class="top-search"
		popper-class="my-autocomplete"
		v-model="value"
		:fetch-suggestions="querySearch"
		:placeholder="$t('search')"
		@select="handleSelect">
		<template #default="{ item }">
			<i :class="[item[iconKey], 'icon']"></i>
			<div class="name">{{ item[labelKey] }}</div>
			<div class="addr">{{ item[pathKey] }}</div>
		</template>
	</el-autocomplete>
</template>

<script setup lang="ts">
import website from '@/config/website';
import { validatenull } from '@/utils/validate';
import { computed, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'store/user';

const uStore = useUserStore();
const router = useRouter();
const value = ref('');
const menuList: Ref<RouterMenu[]> = ref([]);
const menu = computed(() => {
	return uStore.getMenu;
});
const labelKey = computed(() => {
	return website.menu.label;
});
const pathKey = computed(() => {
	return website.menu.path;
});
const iconKey = computed(() => {
	return website.menu.icon;
});
const childrenKey = computed(() => {
	return website.menu.children;
});

watch(
	() => menu,
	() => {
		getMenuList();
	}
);
const getMenuList = () => {
	const findMenu = (list: RouterMenu[]) => {
		for (let i = 0; i < list.length; i++) {
			const ele = Object.assign({}, list[i]);
			if (validatenull(ele[childrenKey.value])) {
				menuList.value.push(ele);
			} else {
				findMenu(ele[childrenKey.value]);
			}
		}
	};
	menuList.value = [];
	findMenu(menu.value);
};
const querySearch = (queryString: string, cb: (results: any) => void) => {
	let restaurants = menuList.value;
	let results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
	// 调用 callback 返回建议列表的数据
	cb(results);
};
const createFilter = (queryString: string) => {
	return (restaurant: any) => {
		return restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
	};
};
const handleSelect = (item: RouterMenu) => {
	value.value = '';
	router.push({
		path: item[pathKey.value],
		query: item.query
	});
};
getMenuList();
</script>

<style lang="scss">
.my-autocomplete {
	li {
		line-height: normal !important;
		padding: 7px !important;
		.icon {
			margin-right: 5px;
			display: inline-block;
			vertical-align: middle;
		}
		.name {
			display: inline-block;
			text-overflow: ellipsis;
			overflow: hidden;
			vertical-align: middle;
		}
		.addr {
			padding-top: 5px;
			width: 100%;
			font-size: 12px;
			color: #b4b4b4;
		}

		.highlighted .addr {
			color: #ddd;
		}
	}
}
</style>
