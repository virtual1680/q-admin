<template>
	<div
		class="moveBg"
		v-show="isShow"
		@click="handleFocus"
		@mousemove="mouseMove"
		@mouseup="mouseUp"
		@mouseleave.stop="mouseLeave"
		:style="{ pointerEvents: isBoxResizing || isBoxMoving ? 'auto' : 'none' }">
		<div
			class="box"
			:style="{ left: nowRect.left + 'px', top: nowRect.top + 'px', bottom: nowRect.bottom + 'px', right: nowRect.right + 'px' }"
			:class="getExtBoxClasses()">
			<div class="box-top">
				<div class="box-top-left" @mousedown="resizeMouseDown"></div>
				<div class="box-top-center" @mousedown="resizeMouseDown"></div>
				<div class="box-top-right" @mousedown="resizeMouseDown"></div>
			</div>
			<div class="box-center">
				<div class="box-center-left" @mousedown="resizeMouseDown"></div>
				<div class="box-center-center loader">
					<div class="app-bar" :style="{ backgroundColor: app?.tabbarBgColor }" @mousedown.stop="positionMouseDown" @dblclick="appBarDoubleClicked">
						<div class="controll">
							<div class="close" @click.stop="close"></div>
							<div class="full" :class="app?.disableResize ? 'full-disabled' : ''" @click.stop="switchFullScreen"></div>
						</div>
						<div class="title" :style="{ color: app?.tabbarTextColor }">{{ app?.title }}</div>
					</div>
					<iframe :src="location + app?.path" frameborder="0" class="iframe"></iframe>
				</div>
				<div class="box-center-right" @mousedown="resizeMouseDown"></div>
			</div>
			<div class="box-bottom">
				<div class="box-bottom-left" @mousedown="resizeMouseDown"></div>
				<div class="box-bottom-center" @mousedown="resizeMouseDown"></div>
				<div class="box-bottom-right" @mousedown="resizeMouseDown"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { isURL } from 'utils/validate';
import { ref, reactive, computed, toRefs } from 'vue';
const props = defineProps({
	app: Object,
	onDestroy: Function
});
const { app } = toRefs(props);
const isShow = ref(true);
// const defaultIndex = ref(10);
// const activeIndex = ref(20);
const isBoxMoving = ref(false);
let startPosition = reactive({ x: 0, y: 0 });
let nowRect = reactive({
	left: 100,
	right: 100,
	top: 100,
	bottom: 100
});
let startRect = reactive({
	left: 0,
	right: 0,
	top: 0,
	bottom: 0
});
const isBoxResizing = ref(false);
const moveDirection = ref('false');
const isMaxShowing = ref(false);
const isFullScreen = ref(false);

const location = computed(() => {
	return isURL(props.app?.path) ? '' : window.location.origin;
});

const handleFocus = () => {
	let list = document.getElementsByClassName('moveBg');
	if (list.length == 1) return;
	let max = 0;
	for (let i = 0; i < list.length; i++) {
		let ele = list[i];
		let box = ele.getElementsByClassName('box')[0]['style'];
		let zIndex = Number(box.zIndex);
		if (max < zIndex) {
			max = zIndex;
		}
	}
	max = max + 1;
	//TODO
	// this.$el.getElementsByClassName('box')[0].style.zIndex = max;
	document.getElementsByClassName('box')[0]['style'].zIndex = max;
};
const close = () => {
	isShow.value = false;
	props.onDestroy?.();
};
const switchFullScreen = () => {
	if (props.app?.disableResize) {
		return;
	}
	isFullScreen.value = !isFullScreen.value;
	if (isFullScreen.value) {
		isMaxShowing.value = true;
	} else {
		isMaxShowing.value = false;
	}
};
const getExtBoxClasses = () => {
	let str = '';
	if (!isBoxResizing.value && !isBoxMoving.value) {
		str += 'box-animation ';
	}
	if (isMaxShowing.value) {
		str += 'isMaxShowing ';
	}
	if (isFullScreen.value) {
		str += 'isFullScreen ';
	}
	if (props.app?.disableResize) {
		str += 'resize-disabled ';
	}
	if (props.app?.isTop) {
		str += 'isTop ';
	}
	return str;
};
const appBarDoubleClicked = () => {
	if (props.app?.disableResize) {
		return;
	}
	isMaxShowing.value = !isMaxShowing.value;
	if (!isMaxShowing.value) {
		isFullScreen.value = false;
	}
};
const positionMouseDown = (e: MouseEvent) => {
	if (isFullScreen.value || isMaxShowing.value) {
		return;
	}
	startRect = {
		left: nowRect.left,
		right: nowRect.right,
		top: nowRect.top,
		bottom: nowRect.bottom
	};
	startPosition.x = e.clientX;
	startPosition.y = e.clientY;
	isBoxMoving.value = true;
};
const mouseUp = () => {
	isBoxMoving.value = false;
	isBoxResizing.value = false;
	moveDirection.value = 'false';
};
const mouseLeave = () => {
	isBoxMoving.value = false;
	isBoxResizing.value = false;
	moveDirection.value = 'false';
};
const mouseMove = (e: MouseEvent) => {
	if (isBoxResizing.value) {
		isFullScreen.value = false;
		isMaxShowing.value = false;
		switch (moveDirection.value) {
			case 'box-top-left':
				nowRect.top = startRect.top + (e.clientY - startPosition.y);
				nowRect.left = startRect.left + (e.clientX - startPosition.x);
				break;
			case 'box-top-center':
				nowRect.top = startRect.top + (e.clientY - startPosition.y);
				break;
			case 'box-top-right':
				nowRect.top = startRect.top + (e.clientY - startPosition.y);
				nowRect.right = startRect.right - (e.clientX - startPosition.x);
				break;
			case 'box-center-left':
				nowRect.left = startRect.left + (e.clientX - startPosition.x);
				break;
			case 'box-bottom-left':
				nowRect.left = startRect.left + (e.clientX - startPosition.x);
				nowRect.bottom = startRect.bottom - (e.clientY - startPosition.y);
				break;
			case 'box-bottom-center':
				nowRect.bottom = startRect.bottom - (e.clientY - startPosition.y);
				break;
			case 'box-center-right':
				nowRect.right = startRect.right - (e.clientX - startPosition.x);
				break;
			case 'box-bottom-right':
				nowRect.right = startRect.right - (e.clientX - startPosition.x);
				nowRect.bottom = startRect.bottom - (e.clientY - startPosition.y);
				break;
			default:
		}
		return;
	}
	if (isBoxMoving.value) {
		isFullScreen.value = false;
		isMaxShowing.value = false;
		nowRect.left = startRect.left + (e.clientX - startPosition.x);
		nowRect.right = startRect.right - (e.clientX - startPosition.x);
		nowRect.top = startRect.top + (e.clientY - startPosition.y);
		nowRect.bottom = startRect.bottom - (e.clientY - startPosition.y);
		return;
	}
};
const resizeMouseDown = (e: MouseEvent) => {
	if (props.app?.disableResize) {
		return;
	}
	if (isFullScreen.value || isMaxShowing.value) {
		return;
	}
	startRect = {
		left: nowRect.left,
		top: nowRect.top,
		right: nowRect.right,
		bottom: nowRect.bottom
	};
	startPosition.x = e.clientX;
	startPosition.y = e.clientY;
	isBoxResizing.value = true;
	moveDirection.value = e.target?.['className'];
};

if (props.app?.width) {
	nowRect.left = nowRect.right = (document.body.clientWidth - props.app.width) / 2;
}
if (props.app?.height) {
	nowRect.bottom = (document.body.clientHeight - props.app.height) / 2 + 50;
	nowRect.top = (document.body.clientHeight - props.app.height) / 2 - 50;
}
</script>
<style scoped>
.iframe {
	width: 100%;
	height: calc(100% - 50px);
	margin-top: 5px;
	border-right: 5px;
}
.moveBg {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.box {
	position: absolute;
	display: flex;
	flex-direction: column;
	pointer-events: auto;

	--resize: 5px;
	--resize-bg: transparent;
	--resize-main: transparent;
	--resize-bg-main: transparent;
}
.box-top {
	display: flex;
	flex-direction: row;
}
.box-top-left {
	width: var(--resize);
	height: var(--resize);
	cursor: nw-resize;
	background: var(--resize-bg);
}
.box-top-center {
	flex-grow: 1;
	height: var(--resize);
	cursor: n-resize;
	background: var(--resize-bg-main);
}
.box-top-right {
	width: var(--resize);
	height: var(--resize);
	cursor: ne-resize;
	background: var(--resize-bg);
}
.box-center {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
}
.box-center-left {
	width: var(--resize);
	height: 100%;
	cursor: w-resize;
	background: var(--resize-bg-main);
}
.box-center-center {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
	overflow: hidden;
	background: rgb(255 255 255 / 80%);
	border-radius: 10px;
	box-shadow: 0 0 3px #999999;
	backdrop-filter: blur(20px);
}
.isTop .box-center-center {
	filter: none;
	box-shadow: 0 0 20px rgb(0 0 0 / 50%);
}
.box-animation {
	transition: width 0.1s, height 0.1s, left 0.1s, right 0.1s, top 0.1s, bottom 0.1s;
}
.isMaxShowing {
	top: 24px !important;
	right: -5px !important;
	bottom: 47px !important;
	left: -5px !important;
	height: calc(100% - 24px);
}
.isFullScreen {
	position: fixed !important;
	bottom: -5px !important;
	z-index: 999 !important;
}
.isMaxShowing .box-center-center,
.isFullScreen .box-center-center {
	border-radius: 0 !important;
}
.box-center-right {
	width: var(--resize);
	height: 100%;
	cursor: e-resize;
	background: var(--resize-bg-main);
}
.box-bottom {
	display: flex;
	flex-direction: row;
}
.box-bottom-left {
	width: var(--resize);
	height: var(--resize);
	cursor: sw-resize;
	background: var(--resize-bg);
}
.box-bottom-center {
	flex-grow: 1;
	height: var(--resize);
	cursor: s-resize;
	background: var(--resize-bg-main);
}
.box-bottom-right {
	width: var(--resize);
	height: var(--resize);
	cursor: se-resize;
	background: var(--resize-bg);
}
.loader {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
}
.app-bar {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	background: rgb(255 255 255 / 50%);
	backdrop-filter: blur(20px);
}
.app-bar .controll {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 15px;
}
.app-bar .controll div {
	width: 11px;
	height: 11px;
	margin-right: 8px;
	cursor: pointer;
	border-radius: 100%;
}
.app-bar .title {
	flex-grow: 1;
	margin-right: 80px;
	font-size: 13px;
	font-weight: 500;
	color: #333333;
	text-align: center;
	text-shadow: none;
	cursor: move;
}
.controll .close {
	background: #fc605c;
	border: 1px solid #fc635d;
}
.controll .min {
	background: #fcbb40;
	border: 1px solid #f8b438;
}
.controll .full {
	background: #34c648;
	border: 1px solid #2bc03f;
}
.full-disabled {
	background: #cccccc !important;
	border: 1px solid #cccccc !important;
}
.resize-disabled .box-top-left,
.resize-disabled .box-top-center,
.resize-disabled .box-top-right,
.resize-disabled .box-center-left,
.resize-disabled .box-center-right,
.resize-disabled .box-bottom-left,
.resize-disabled .box-bottom-center,
.resize-disabled .box-bottom-right {
	cursor: default;
}
.app-body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
}
</style>
