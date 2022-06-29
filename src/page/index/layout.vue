<template>
	<router-view #="{ Component }">
		<keep-alive :include="tStore.getTagsKeep">
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
<script lang="ts" setup>
import { useTagsStore } from 'store/tags';
const tStore = useTagsStore();
</script>
