<template>
	<div class="avue-searchs" @click.self="handleEsc">
		<div class="avue-searchs__title">Avue菜单搜索</div>
		<div class="avue-searchs__content">
			<div class="avue-searchs__form">
				<el-input :placeholder="$t('search')" v-model="value" @keydown.esc="handleEsc">
					<template #append>
						<el-button icon="el-icon-search"></el-button>
					</template>
				</el-input>
				<p>
					<el-tag>你可以使用快捷键esc 关闭</el-tag>
				</p>
			</div>
			<div class="avue-searchs__list">
				<el-scrollbar class="avue-searchs__scrollbar">
					<div class="avue-searchs__item" v-for="(item, index) in menus" :key="index" @click="handleSelect(item)">
						<i :class="[item[iconKey], 'avue-searchs__item-icon']"></i>
						<span class="avue-searchs__item-title">{{ item[labelKey] }}</span>
						<div class="avue-searchs__item-path">
							{{ item[pathKey] }}
						</div>
					</div>
				</el-scrollbar>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import website from '@/config/website';
import { validatenull } from '@/utils/validate';
import { computed, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, useCommonStore } from 'store/index';
const router = useRouter();
const cStore = useCommonStore();
const uStore = useUserStore();
const value = ref('');
const menus: Ref<RouterMenu[]> = ref([]);
const menuList: Ref<RouterMenu[]> = ref([]);
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
const menu = computed(() => {
	return uStore.getMenu;
});
watch(
	() => value.value,
	() => {
		querySearch();
	}
);
watch(
	() => menu.value,
	() => {
		getMenuList();
	}
);
const handleEsc = () => {
	cStore.SET_IS_SEARCH(false);
};
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
	menus.value = menuList.value;
};
const querySearch = () => {
	let restaurants = menuList.value;
	let queryString = value.value;
	menus.value = queryString ? menuList.value.filter(createFilter(queryString)) : restaurants;
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

<style lang="scss" scoped>
.avue-searchs {
	padding-top: 50px;
	width: 100%;
	height: 100%;
	background-color: #fff;
	z-index: 1024;
	&__title {
		margin-bottom: 60px;
		text-align: center;
		font-size: 42px;
		font-weight: bold;
		letter-spacing: 2px;
		text-indent: 2px;
	}
	&__form {
		margin: 0 auto 50px auto;
		width: 50%;
		text-align: center;
		p {
			margin-top: 20px;
		}
	}
	&__scrollbar {
		height: 400px;
	}
	&__list {
		box-sizing: border-box;
		padding: 20px 30px;
		margin: 0 auto;
		width: 70%;
		border-radius: 4px;
		border: 1px solid #ebeef5;
		background-color: #fff;
		overflow: hidden;
		color: #303133;
		transition: 0.3s;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	&__item {
		padding: 5px 0;
		border-bottom: 1px dashed #eee;
		&-icon {
			margin-right: 5px;
			font-size: 18px;
		}
		&-title {
			font-size: 20px;
			font-weight: 500;
			color: #333;
		}
		&-path {
			line-height: 30px;
			color: #666;
		}
	}
}
</style>
