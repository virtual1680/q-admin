<template>
	<div id="screen-container" ref="screenContainer">
		<slot></slot>
	</div>
</template>
<script name="ScreenContainer" lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { useAutoResize } from 'app/hooks/useAutoResize';
const props = defineProps({
	width: { type: Number, default: 1920 },
	height: { type: Number, default: 1080 }
});
let screenContainer: Ref<HTMLDivElement | null> = ref(null);
onMounted(() => {
	screenContainer.value!.style.width = `${props.width}px`;
	screenContainer.value!.style.height = `${props.height}px`;
	useAutoResize(screenContainer.value!);
});
</script>
<style>
#screen-container {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: hidden;
	background-color: red;
	transform-origin: left top;
}
</style>
