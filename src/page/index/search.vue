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
	return (restaurant: RouterMenu) => {
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
	z-index: 1024;
	width: 100%;
	height: 100%;
	padding-top: 50px;
	background-color: #ffffff;
	&__title {
		margin-bottom: 60px;
		font-size: 42px;
		font-weight: bold;
		text-align: center;
		text-indent: 2px;
		letter-spacing: 2px;
	}
	&__form {
		width: 50%;
		margin: 0 auto 50px;
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
		width: 70%;
		padding: 20px 30px;
		margin: 0 auto;
		overflow: hidden;
		color: #303133;
		background-color: #ffffff;
		border: 1px solid #ebeef5;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		transition: 0.3s;
	}
	&__item {
		padding: 5px 0;
		border-bottom: 1px dashed #eeeeee;
		&-icon {
			margin-right: 5px;
			font-size: 18px;
		}
		&-title {
			font-size: 20px;
			font-weight: 500;
			color: #333333;
		}
		&-path {
			line-height: 30px;
			color: #666666;
		}
	}
}
</style>
