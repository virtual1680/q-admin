<template>
	<i :class="isFullScren ? 'icon-tuichuquanping' : 'icon-quanping'" @click="handleScreen"></i>
</template>
<script>
import { mapState } from 'pinia';
import { fullscreenToggel, listenfullscreen } from 'utils/util';
export default {
	computed: {
		...mapState(['isFullScren'])
	},
	mounted() {
		listenfullscreen(this.setScreen);
	},
	methods: {
		setScreen() {
			this.$store.commit('SET_FULLSCREN');
		},
		handleScreen() {
			fullscreenToggel();
		}
	}
};
</script>
