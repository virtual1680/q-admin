<template>
	<el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { messages } from 'app/lang/';
import { computed } from 'vue';
import { commonStore } from 'store/common';
let store = commonStore();
const locale = computed(() => {
	let languageType = store.language;
	return messages[languageType];
});
</script>

<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}
</style>
