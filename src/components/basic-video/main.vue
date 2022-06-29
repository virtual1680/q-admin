<template>
	<div :style="styleName" class="basic-video">
		<div class="basic-video__border">
			<span :style="borderStyleName"></span>
			<span :style="borderStyleName"></span>
			<span :style="borderStyleName"></span>
			<span :style="borderStyleName"></span>
		</div>
		<img :style="imgStyleName" class="basic-video__img" :src="background" />
		<video class="basic-video__main" ref="main" autoplay muted></video>
	</div>
</template>

<script lang="ts" setup name="basic-video">
import { computed, Ref, ref } from 'vue';
import RecordVideo from './plugin';
const main: Ref<HTMLAudioElement | undefined> = ref();
const emit = defineEmits<{ (e: 'data-change', value: string | ArrayBuffer | null): void }>();
const props = defineProps({
	background: {
		type: String
	},
	width: {
		type: Number,
		default: 500
	}
});
const styleName = computed(() => {
	return {
		width: `${props.width}px`
	};
});
const imgStyleName = computed(() => {
	return {
		width: `${props.width / 2}px`
	};
});
const borderStyleName = computed(() => {
	return {
		width: `${props.width / 15}px`,
		height: `${props.width / 15}px`,
		borderWidth: `${5}px`
	};
});
const videoObj = ref();
const init = () => {
	videoObj.value = new RecordVideo(main.value);
	const videoPromise = videoObj.value.init();
	videoPromise.then(() => {
		videoObj.value.mediaRecorder.addEventListener('stop', getData, false);
	});
};
// const startRecord = () => {
// 	videoObj.value.startRecord();
// };
// const stopRecord = () => {
// 	videoObj.value.stopRecord();
// };
const getData = () => {
	const blob = new Blob(videoObj.value.chunks, {
		type: 'video/mp4'
	});
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.addEventListener('loadend', () => {
		let video_base64 = reader.result;
		emit('data-change', video_base64);
	});
};

init();
</script>
<style lang="scss" scoped>
.basic-video {
	position: relative;
	margin: 0 auto;
	overflow: hidden;
	&__border {
		span {
			position: absolute;
			width: 30px;
			height: 30px;
			color: #0073eb;
			border-style: solid;
			border-width: 4px;
			&:nth-child(1) {
				top: 15px;
				left: 15px;
				border-right: 0;
				border-bottom: 0;
			}
			&:nth-child(2) {
				top: 15px;
				right: 15px;
				border-bottom: 0;
				border-left: 0;
			}
			&:nth-child(3) {
				bottom: 15px;
				left: 15px;
				border-top: 0;
				border-right: 0;
			}
			&:nth-child(4) {
				right: 15px;
				bottom: 15px;
				border-top: 0;
				border-left: 0;
			}
		}
	}
	&__img {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100px;
		transform: translate(-50%, -50%);
	}
	&__main {
		width: 100%;
	}
}
</style>
