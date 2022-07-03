<template>
	<div class="avue-tags" ref="tagsRef" v-if="setting.tag" @click="contextmenuFlag = false">
		<!-- tag盒子 -->
		<div v-if="contextmenuFlag" class="avue-tags__contentmenu" :style="{ left: contentmenuX + 'px', top: contentmenuY + 'px' }">
			<div class="item" @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</div>
			<div class="item" @click="closeAllTags">{{ $t('tagsView.closeAll') }}</div>
		</div>
		<div class="avue-tags__box">
			<el-tabs v-model="active" type="card" @contextmenu="handleContextmenu" :closable="tagLen !== 1" @tab-click="openTag" @edit="menuTag">
				<el-tab-pane v-for="(item, index) in tagList" :key="index" :label="generateTitle(item)" :name="item.fullPath">
					<template #label>
						<span>
							{{ generateTitle(item) }}
							<i class="el-icon-refresh" :class="{ turn: refresh }" @click="handleRefresh" v-if="active == item.fullPath"></i>
						</span>
					</template>
				</el-tab-pane>
			</el-tabs>
			<el-dropdown class="avue-tags__menu">
				<el-button type="primary">
					{{ $t('tagsView.menu') }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="openSearch">{{ $t('tagsView.search') }}</el-dropdown-item>
						<el-dropdown-item @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</el-dropdown-item>
						<el-dropdown-item @click="closeAllTags">{{ $t('tagsView.closeAll') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup name="tags">
import { ref, watch, computed, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTagsStore, useCommonStore } from 'store/index';
import { AVueRouter } from '../../router/index';
import { TabsPaneContext } from 'element-plus';
const router = useRouter() as AVueRouter;
const commonStore = useCommonStore();
const tagsStore = useTagsStore();
const refresh = ref(false);
const active: Ref<string | undefined> = ref('');
const contentmenuX = ref(0);
const contentmenuY = ref(0);
const contextmenuFlag = ref(false);
const tagsRef: Ref<HTMLDivElement | undefined> = ref();
const tagWel = computed(() => {
	return tagsStore.getTagWel;
});
const tagList = computed(() => {
	return tagsStore.getTagList;
});
const tag = computed(() => {
	return tagsStore.getTag;
});
const setting = computed(() => {
	return commonStore.getSetting;
});
const tagLen = computed(() => {
	return tagList.value.length || 0;
});
watch(
	() => tag.value,
	val => {
		active.value = val.fullPath;
	},
	{ immediate: true }
);
watch(
	() => contextmenuFlag.value,
	() => {
		window.addEventListener('mousedown', watchContextmenu);
	}
);

const openSearch = () => {
	commonStore.SET_IS_SEARCH(true);
};
const handleRefresh = () => {
	refresh.value = true;
	commonStore.SET_IS_SEARCH(false);
	setTimeout(() => {
		commonStore.SET_IS_SEARCH(true);
	}, 100);
	setTimeout(() => {
		refresh.value = false;
	}, 500);
};
const generateTitle = (item: RouterTag) => {
	return router.avueRouter?.generateTitle({
		...item,
		...{ name: item.name }
	});
};

const watchContextmenu = (event: MouseEvent) => {
	if (!tagsRef.value?.contains(event.target as Node) || event.button !== 0) {
		contextmenuFlag.value = false;
	}
	window.removeEventListener('mousedown', watchContextmenu);
};
const handleContextmenu = (event: MouseEvent) => {
	let target: Element | null = event.target as Element;
	let flag = false;
	if (target?.className.indexOf('el-tabs__item') > -1) {
		flag = true;
	} else if ((target.parentNode as Element)?.className.indexOf('el-tabs__item') > -1) {
		target = target.parentNode as Element;
		flag = true;
	}
	if (flag) {
		event.preventDefault();
		event.stopPropagation();
		contentmenuX.value = event.clientX;
		contentmenuY.value = event.clientY;
		// tagName.value = target.getAttribute('aria-controls')?.slice(5);
		contextmenuFlag.value = true;
	}
};

const menuTag = (value: string, action: string) => {
	if (action === 'remove') {
		let { tag: t, key } = findTag(value);
		tagsStore.DEL_TAG(t?.fullPath || '');
		if (t?.fullPath === tag.value.fullPath) {
			t = tagList.value[key - 1];
			router.push({
				path: t.path,
				query: t.query
			});
		}
	}
};

const openTag = (item: TabsPaneContext) => {
	let value = item.props.name as string;
	let { tag } = findTag(value);
	router.push({
		path: tag?.path,
		query: tag?.query
	});
};
const findTag = (fullPath: string) => {
	let tag = tagList.value.find(item => item.fullPath === fullPath);
	let key = tagList.value.findIndex(item => item.fullPath === fullPath);
	return { tag, key };
};
const closeOthersTags = () => {
	contextmenuFlag.value = false;
	tagsStore.DEL_TAG_OTHER();
};
const closeAllTags = () => {
	contextmenuFlag.value = false;
	tagsStore.DEL_ALL_TAG();
	router.push(tagWel.value);
};
</script>
