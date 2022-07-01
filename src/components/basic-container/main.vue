<template>
	<div class="basic-container" :style="styleName" :class="{ 'basic-container--block': block }">
		<el-card class="basic-container__card">
			<slot></slot>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="basicContainer">
import { computed } from 'vue';

const props = defineProps({
	radius: {
		type: [String, Number],
		default: 10
	},
	background: {
		type: String
	},
	block: {
		type: Boolean,
		default: false
	}
});
const styleName = computed(() => {
	return {
		borderRadius: `${props.radius}px`,
		background: props.background
	};
});
</script>

<style lang="scss">
.basic-container {
	box-sizing: border-box;
	padding: 10px 6px;
	&--block {
		height: 100%;
		.basic-container__card {
			height: 100%;
		}
	}
	&__card {
		width: 100%;
	}
	&:first-child {
		padding-top: 0;
	}
}
</style>
