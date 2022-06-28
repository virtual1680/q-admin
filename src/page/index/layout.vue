<template>
	<router-view #="{ Component }">
		<keep-alive :include="tStore.getTagsKeep">
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
<script lang="ts" setup>
import { tagsStore } from 'store/tags';
const tStore = tagsStore();
</script>
