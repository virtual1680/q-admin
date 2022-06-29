<template>
	<div class="mac_bg"></div>
	<div class="desktop">
		<div class="top">
			<el-dropdown trigger="click">
				<div class="logo"><i class="iconfont icon-pingguo"></i></div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<div>{{ userInfo.username }}</div>
						</el-dropdown-item>
						<el-dropdown-item>
							<top-lock text="锁定屏幕"></top-lock>
						</el-dropdown-item>
						<el-dropdown-item>
							<div @click="switchTheme">退出主题</div>
						</el-dropdown-item>
						<el-dropdown-item @click="logout">{{ $t('navbar.logOut') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<div class="space"></div>
			<div class="status">
				<div class="audio"><i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-39"></i></div>
				<div class="datetime">{{ timeString }}</div>
				<div class="notification"><i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-25"></i></div>
			</div>
		</div>
		<div class="body">
			<div class="desktop-app">
				<template v-for="item in deskTopAppList" :key="item.key">
					<div class="app-item" @click="openApp(item)" v-if="!item.hideInDesktop">
						<div class="icon" :style="{ backgroundColor: item.iconBgColor, color: item.iconColor }">
							<i class="iconfont" :class="item[iconKey]"></i>
						</div>
						<div class="title">{{ item[labelKey] }}</div>
					</div>
				</template>
			</div>
		</div>
		<div class="footer">
			<div class="space"></div>
			<div class="dock">
				<template v-for="item in openAppList" :key="item.key">
					<div class="item" @click="openApp(item)">
						<i :style="{ backgroundColor: item.iconBgColor, color: item.iconColor }" class="iconfont" :class="item[iconKey]"></i>
						<small style="margin-top: 5px; font-size: 10px">{{ item[labelKey] }}</small>
					</div>
				</template>
			</div>
			<div class="space"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import $Mode from './mode/index';
// import index from '@/mixins/index';
import topLock from '@/page/index/top/top-lock.vue';
import { computed, ref } from 'vue';
import website from '@/config/website';
import { useCommonStore, useUserStore } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
// mixins: [index],
const router = useRouter();
const userStore = useUserStore();
// const tagsStore = useTagsStore();
const commonStore = useCommonStore();
// const app = ref(false);
const timeString = ref('');

// const isMacOs = computed(() => {
// 	return commonStore.getIsMacOs;
// });
// const tagList = computed(() => {
// 	return tagsStore.getTagList;
// });
// const tag = computed(() => {
// 	return tagsStore.getTag;
// });
const userInfo = computed(() => {
	return userStore.getUserInfo;
});
const menu = computed(() => {
	return userStore.getMenu;
});
const labelKey = computed(() => {
	return website.menu.label;
});
const openAppList = computed(() => {
	return [] as RouterMenu[];
});

const deskTopAppList = computed(() => {
	return menuList.value;
});
const menuList = computed(() => {
	let result: RouterMenu[] = [];
	const findMenu = (list: RouterMenu[]) => {
		list.forEach(ele => {
			if (ele[childrenKey.value] && ele[childrenKey.value].length !== 0) {
				findMenu(ele[childrenKey.value]);
			} else {
				result.push(ele);
			}
		});
	};
	findMenu(menu.value);
	return result;
});
const iconKey = computed(() => {
	return website.menu.icon;
});
// const queryKey = computed(() => {
// 	return website.menu.query;
// });
const childrenKey = computed(() => {
	return website.menu.children;
});
const hrefKey = computed(() => {
	return website.menu.href;
});
const pathKey = computed(() => {
	return website.menu.path;
});
const switchTheme = () => {
	commonStore.SET_THEME_NAME('');
	location.reload();
};
const logout = () => {
	userStore.LogOut().then(() => {
		router.push({ path: '/login' });
	});
};
const startTimer = () => {
	setInterval(() => {
		timeString.value = dayjs().format('YYYY年MM月DD日 HH:mm');
	}, 1000);
};
const openApp = (item: RouterMenu) => {
	$Mode({
		title: item[labelKey.value],
		path: item[hrefKey.value] ? item[hrefKey.value] : item[pathKey.value]
	});
};
startTimer();
userStore.GetMenu();
</script>
<style>
.top .el-dropdown {
	height: 100% !important;
	color: white !important;
}
</style>
<style scoped>
.desktop {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	color: white;
	text-shadow: 0 2px 2px rgb(0 0 0 / 10%);
}
.top {
	z-index: 100;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 28px;
	padding: 0 5px;
	font-size: 14px;
	background-color: rgb(0 0 0 / 30%);
	backdrop-filter: blur(20px);
}
.space {
	flex-grow: 1;
}
.logo {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 0 15px;
	cursor: pointer;
}
.logo .el-select {
	position: absolute;
	opacity: 0;
}
.logo:hover {
	background-color: rgb(255 255 255 / 10%);
}
.logo .iconfont {
	margin-top: -3px;
	font-size: 16px;
}
.menu .item:hover {
	background-color: rgb(255 255 255 / 10%);
}
.status {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.audio .iconfont,
.notification .iconfont {
	font-size: 20px;
}
.datetime,
.audio,
.notification {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 0 10px;
	text-align: center;
	cursor: pointer;
}
.datetime:hover,
.audio:hover,
.notification:hover {
	background-color: rgb(255 255 255 / 10%);
}
.body {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
}
.footer {
	position: fixed;
	right: 5px;
	bottom: 5px;
	left: 5px;
	z-index: 100;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.footer .dock {
	display: flex;
	flex-direction: row;
	padding: 2px;
	background-color: rgb(255 255 255 / 10%);
	border: 1px solid rgb(255 255 255 / 10%);
	border-radius: 10px;
	box-shadow: 0 0 10px rgb(0 0 0 / 20%);
	backdrop-filter: blur(20px);
}
.dock .item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3px;
}
.dock .dot {
	position: absolute;
	bottom: 0;
	display: inline-block;
	width: 3px;
	height: 3px;
	font-size: 0;
	background: rgb(0 0 0 / 80%);
	border-radius: 5px;
}
.dock .item .iconfont {
	display: inline-block;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	padding: 2px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	background-color: rgb(255 255 255 / 10%);
	border-radius: 20px;
	border-radius: 10px;
	transition: transform 0.3s, margin 0.3s;
}
.dock .item:hover .iconfont {
	margin: 0 15px;
	box-shadow: 0 0 10px rgb(0 0 0 / 30%);
	transform: scale(2) translateY(-10px);
}
.dock .nearby .iconfont {
	margin: 0 12px;
	box-shadow: 0 0 10px rgb(0 0 0 / 30%);
	transform: scale(1.6) translateY(-8px);
}
.dock .nearby1 .iconfont {
	margin: 0 9px;
	box-shadow: 0 0 10px rgb(0 0 0 / 30%);
	transform: scale(1.2) translateY(-6px);
}
.dock .nearby2 .iconfont {
	margin: 0 7px;
	box-shadow: 0 0 10px rgb(0 0 0 / 30%);
	transform: scale(1.1) translateY(-5px);
}
.desktop-app {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-flow: column wrap-reverse;
	align-items: flex-end;
	justify-content: flex-start;
	padding: 20px;
}
.app-item {
	flex-direction: column;
	padding: 5px;
	margin: 5px 10px;
	text-align: center;
	text-shadow: 0 0 2px rgb(0 0 0 / 50%);
	cursor: pointer;
	border: 2px solid transparent;
	border-radius: 10px;
}
.app-item .icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 10px;
}
.app-item .iconfont {
	font-size: 36px;
}
.app-item .title {
	width: 50px;
	margin-top: 5px;
	overflow: hidden;
	font-size: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.app-item:hover {
	border: 2px solid rgb(255 255 255 / 50%);
}
</style>
