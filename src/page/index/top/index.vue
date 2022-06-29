<template>
	<div class="avue-top">
		<div class="top-bar__left">
			<div class="avue-breadcrumb" :class="[{ 'avue-breadcrumb--active': isCollapse }]" v-if="setting.collapse && !isHorizontal">
				<i class="icon-navicon" @click="setCollapse"></i>
			</div>
		</div>
		<div class="top-bar__title">
			<top-menu ref="topMenu"></top-menu>
			<top-search class="top-bar__item" v-if="setting.search"></top-search>
		</div>
		<div class="top-bar__right">
			<div v-if="setting.lock" class="top-bar__item">
				<top-lock></top-lock>
			</div>
			<div v-if="setting.theme" class="top-bar__item">
				<top-theme></top-theme>
			</div>
			<div class="top-bar__item">
				<top-lang></top-lang>
			</div>
			<div class="top-bar__item" v-if="setting.fullscren">
				<top-full></top-full>
			</div>
			<div class="top-bar__item" v-if="setting.debug">
				<top-logs></top-logs>
			</div>
			<div class="top-user">
				<img class="top-bar__img" :src="userInfo.avatar" />
				<el-dropdown>
					<span class="el-dropdown-link">
						{{ userInfo.username }}
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<router-link to="/">{{ $t('navbar.dashboard') }}</router-link>
							</el-dropdown-item>
							<el-dropdown-item>
								<router-link to="/info/index">{{ $t('navbar.userinfo') }}</router-link>
							</el-dropdown-item>
							<el-dropdown-item>
								<router-link to="/info/setting">{{ $t('navbar.setting') }}</router-link>
							</el-dropdown-item>
							<el-dropdown-item @click="logout" divided>{{ $t('navbar.logOut') }}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<top-setting></top-setting>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="top">
import topLock from './top-lock.vue';
import topMenu from './top-menu.vue';
import topSearch from './top-search.vue';
import topTheme from './top-theme.vue';
import topLogs from './top-logs.vue';
import topLang from './top-lang.vue';
import topFull from './top-full.vue';
import topSetting from '../setting.vue';
import { computed } from 'vue';
import { useI18n } from 'app/lang/index';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore, useCommonStore, useTagsStore } from 'store/index';
const router = useRouter();
const uStore = useUserStore();
const cStore = useCommonStore();
const tStore = useTagsStore();
const i18n = useI18n();

const isHorizontal = computed(() => {
	return cStore.getIsHorizontal;
});
const userInfo = computed(() => {
	return uStore.getUserInfo;
});
const tagList = computed(() => {
	return tStore.getTagList;
});
const isCollapse = computed(() => {
	return cStore.getIsCollapse;
});
const tagWel = computed(() => {
	return tStore.getTagWel;
});
const menu = computed(() => {
	return uStore.getMenu;
});
const setting = computed(() => {
	return cStore.getSetting;
});
const tag = computed(() => {
	return tStore.getTagWel;
});
const logsLen = computed(() => {
	return uStore.getMenu;
});
const logsFlag = computed(() => {
	return cStore.getSetting;
});

const setCollapse = () => {
	cStore.SET_COLLAPSE();
};
const logout = () => {
	ElMessageBox.confirm(i18n.$t('logoutTip'), i18n.$t('tip'), {
		confirmButtonText: i18n.$t('submitText'),
		cancelButtonText: i18n.$t('cancelText'),
		type: 'warning'
	}).then(() => {
		uStore.LogOut().then(() => {
			router.push({ path: '/login' });
		});
	});
};
</script>

<style lang="scss" scoped></style>
