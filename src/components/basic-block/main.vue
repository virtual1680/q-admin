<template>
	<div class="basic-block" :style="styleName">
		<div class="box" :style="boxStyleName">
			<router-link :to="to">
				<span v-text="text"></span>
				<p v-text="dept"></p>
				<i :class="icon"></i>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup name="basicBlock">
import { computed, toRefs } from 'vue';
const props = defineProps({
	icon: {
		type: String
	},
	background: {
		type: String
	},
	to: {
		type: Object,
		default: () => {
			return {};
		}
	},
	text: {
		type: String
	},
	dept: {
		type: String
	},
	time: {
		type: [Number, String]
	},
	gutter: {
		type: [Number, String],
		default: 5
	},
	color: {
		type: String
	},
	width: {
		type: [Number, String]
	},
	height: {
		type: [Number, String]
	}
});
//TODO
const { time, width, height, gutter, color, background } = toRefs(props);
const styleName = computed(() => {
	return {
		animationDelay: `${time?.value || 1 / 25}s`,
		width: `${width?.value}px`,
		height: `${height?.value}px`,
		margin: `${gutter.value}px`
	};
});
const boxStyleName = computed(() => {
	return {
		backgroundColor: color?.value,
		backgroundImage: `url('${background?.value}')`
	};
});
</script>

<style lang="scss">
.basic-block {
	box-sizing: border-box;
	color: #ffffff;
	opacity: 0;
	animation: mymove 1s;
	animation-fill-mode: forwards;
	.box {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 15px;
		background-size: cover;
		transition: all 1s;
		&:hover {
			transform: rotateY(360deg);
		}
	}
	a {
		color: #ffffff;
	}
	span {
		display: block;
		font-size: 16px;
	}
	p {
		width: 80%;
		font-size: 10px;
		line-height: 22px;
		color: #eeeeee;
	}
	i {
		position: absolute;
		right: 15px;
		bottom: 15px;
		font-size: 50px !important ;
	}
	@keyframes mymove {
		from {
			opacity: 0;
			transform: scale(0);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
