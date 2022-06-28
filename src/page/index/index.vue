<template>
	<div class="avue-contail" :class="{ 'avue--collapse': isCollapse }">
		<div class="avue-layout" :class="{ 'avue-layout--horizontal': isHorizontal }">
			<div class="avue-sidebar" v-show="validSidebar">
				<!-- 左侧导航栏 -->
				<logo />
				<sidebar />
			</div>
			<div class="avue-main">
				<!-- 顶部导航栏 -->
				<!-- <top ref="top" /> -->
				<!-- 顶部标签卡 -->
				<!-- <tags /> -->
				<!-- <search class="avue-view" v-show="isSearch"></search> -->
				<!-- 主体视图层 -->
				<div id="avue-view" v-show="!isSearch" v-if="isRefresh">
					<router-view #="{ Component }">
						<keep-alive :include="tStore.getTagsKeep">
							<component :is="Component" />
						</keep-alive>
					</router-view>
				</div>
				<div class="avue-footer">
					<p class="copyright">© 2018-2021 Avue designed by smallwei</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="index">
// import index from '@/mixins/index';
import { validatenull } from 'utils/validate';
// import tags from './tags.vue';
// import search from './search.vue';
import logo from './logo.vue';
// import top from './top/index.vue';
import sidebar from './sidebar/index.vue';
import { provide, computed } from 'vue';
import { userStore } from '@/store/user';
import { commonStore } from '@/store/common';
import { tagsStore } from '@/store/tags';
import { useRouter, useRoute } from 'vue-router';
import { AVueRouter } from '../../router/index';

const uStore = userStore();
const cStore = commonStore();
const tStore = tagsStore();
const router = useRouter() as AVueRouter;
const route = useRoute();
// mixins: [index],
const isHorizontal = computed(() => {
	return cStore.getIsHorizontal;
});
const isRefresh = computed(() => {
	return cStore.getIsRefresh;
});
const isLock = computed(() => {
	return cStore.getIsLock;
});
const isCollapse = computed(() => {
	return cStore.getIsCollapse;
});
const isSearch = computed(() => {
	return cStore.getIsSearch;
});
const menu = computed(() => {
	return uStore.getMenu;
});
const setting = computed(() => {
	return cStore.getSetting;
});
const validSidebar = computed(() => {
	return !((route.meta || {}).menu == false || (route.query || {}).menu == 'false');
});
//打开菜单
const openMenu = (item: any = {}) => {
	uStore.GetMenu(item.parentId).then((data: any[]) => {
		if (data.length !== 0) {
			router.avueRouter?.formatRoutes(data, true);
		}
		//当点击顶部菜单做的事件
		if (!validatenull(item)) {
			let itemActive = {} as { [key: string]: string },
				childItemActive = 0;
			//vue-router路由
			if (item.path) {
				itemActive = item;
			} else {
				if (menu[childItemActive].length == 0) {
					itemActive = menu[childItemActive];
				} else {
					itemActive = menu[childItemActive].children[childItemActive];
				}
			}
			uStore.SET_MENUID(item);

			router.push({
				path: itemActive.path
			});
		}
	});
};
provide('openMenu', openMenu);
</script>
