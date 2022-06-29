<template>
	<basic-video ref="video" :width="350"> </basic-video>
</template>

<script>
import { mapState } from 'pinia';
import basicVideo from '@/components/basic-video/main.vue';
import { useTagsStore } from '../../store/tags';
export default {
	components: {
		basicVideo
	},
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456'
			}
		};
	},
	created() {
		setTimeout(() => {
			this.handleLogin();
		}, 6000);
	},
	computed: {
		...mapState(useTagsStore(), ['tagWel'])
	},
	methods: {
		handleLogin() {
			this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
				this.$router.push(this.tagWel);
			});
		}
	}
};
</script>

<style></style>
