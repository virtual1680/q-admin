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
				<top />
				<!-- 顶部标签卡 -->
				<tags />
				<search class="avue-view" v-show="isSearch"></search>
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
import tags from './tags.vue';
import search from './search.vue';
import logo from './logo.vue';
import top from './top/index.vue';
import sidebar from './sidebar/index.vue';
import { provide, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AVueRouter } from '../../router/index';
import { useUserStore, useCommonStore, useTagsStore } from 'store/index';

const uStore = useUserStore();
const cStore = useCommonStore();
const tStore = useTagsStore();
const router = useRouter() as AVueRouter;
const route = useRoute();

const isHorizontal = computed(() => {
	return cStore.getIsHorizontal;
});
const isRefresh = computed(() => {
	return cStore.getIsRefresh;
});
// const isLock = computed(() => {
// 	return cStore.getIsLock;
// });
// const setting = computed(() => {
// 	return cStore.getSetting;
// });
const isCollapse = computed(() => {
	return cStore.getIsCollapse;
});
const isSearch = computed(() => {
	return cStore.getIsSearch;
});
const menu = computed(() => {
	return uStore.getMenu;
});

const validSidebar = computed(() => {
	return !((route.meta || {}).menu == false || (route.query || {}).menu == 'false');
});

/**
 * 1.在 sidebar/index.vue 中初始化菜单； 2. top/top-menu中点击加载对应菜单
 * @item item 菜单
 * @isInit 是否是自动加载
 */
const openMenu = (item: Partial<RouterMenu>, isInit: boolean) => {
	uStore.GetMenu(item.parentId).then((data: any[]) => {
		if (data.length !== 0) {
			router.avueRouter?.formatRoutes(data, true);
		}
		//当点击顶部菜单做的事件
		if (!isInit) {
			let itemActive: Partial<RouterMenu>,
				childItemActive = 0;
			//vue-router路由
			if (item.path) {
				itemActive = item;
			} else {
				// 选中第一个item，有child选child
				if (menu.value.length && menu.value[childItemActive].children.length === 0) {
					itemActive = menu.value[childItemActive];
				} else {
					itemActive = menu.value[childItemActive].children[childItemActive];
				}
			}
			// 保存top menu菜单id ，刷新后加载对应菜单列表
			uStore.SET_MENUID(item?.parentId || '0');
			router.push({
				path: itemActive.path!
			});
		}
	});
};
provide('openMenu', openMenu);
</script>
