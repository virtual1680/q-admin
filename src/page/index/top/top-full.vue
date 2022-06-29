<template>
	<i :class="isFullScren ? 'icon-tuichuquanping' : 'icon-quanping'" @click="handleScreen"></i>
</template>
<script setup lang="ts">
import { fullscreenToggel, listenfullscreen } from 'utils/util';
import { useCommonStore } from 'store/common';
import { computed } from 'vue';
const cStore = useCommonStore();

const isFullScren = computed(() => {
	return cStore.getIsFullScren;
});

const setScreen = () => {
	cStore.SET_FULLSCREN();
};
const handleScreen = () => {
	fullscreenToggel();
};
listenfullscreen(setScreen);
</script>
