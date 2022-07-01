<template>
	<el-dropdown trigger="click" @command="handleSetLanguage">
		<i class="icon-zhongyingwen"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="language === 'zh-cn'" command="zh-cn">中文</el-dropdown-item>
				<el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="TopLang">
import { AVueRouter } from '@/router';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore, useTagsStore } from 'store/index';
import { useI18n } from '@/lang';
const cStore = useCommonStore();
const tStore = useTagsStore();
const router = useRouter() as AVueRouter;
const i18n = useI18n();
const language = computed(() => {
	return cStore.getLanguage;
});
const handleSetLanguage = (lang: string) => {
	i18n.locale = lang;
	cStore.SET_LANGUAGE(lang);
	let tag = tStore.getTag;
	let title = router.avueRouter?.generateTitle(tag);
	//根据当前的标签也获取label的值动态设置浏览器标题
	router.avueRouter?.setTitle(title);
};
</script>

<style lang="scss" scoped></style>
