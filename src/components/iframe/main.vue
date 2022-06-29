<template>
	<basic-container>
		<iframe :src="src" class="iframe" ref="iframe" />
	</basic-container>
</template>

<script lang="ts" setup name="AvueIframe">
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { computed, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const iframe: Ref<HTMLIFrameElement | undefined> = ref();
NProgress.configure({ showSpinner: false });
const src = computed(() => {
	return (route.query.url as string).replace(/#/g, '&');
});

watch(
	() => route.query,
	() => {
		load();
	}
);

// 显示等待框
const show = () => {
	NProgress.start();
};
// 隐藏等待狂
const hide = () => {
	NProgress.done();
};
// 加载组件
const load = () => {
	show();
	//超时3s自动隐藏等待狂，加强用户体验
	let time = 3;
	const timeFunc = setInterval(() => {
		time--;
		if (time == 0) {
			hide();
			clearInterval(timeFunc);
		}
	}, 1000);
	iframeInit();
};
//iframe窗口初始化
const iframeInit = () => {
	const clientHeight = document.documentElement.clientHeight - 150;
	if (!iframe.value) return;
	iframe.value.style.height = `${clientHeight}px`;
	// TODO
	// if (iframe.value.attachEvent) {
	// 	iframe.value.attachEvent('onload', () => {
	// 		hide();
	// 	});
	// } else {
	// 	iframe.value.onload = () => {
	// 		hide();
	// 	};
	// }
	iframe.value.onload = () => {
		hide();
	};
};

load();
</script>

<style lang="scss">
.iframe {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border: 0;
}
</style>
