<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "components/HelloWorld.vue";
</script>

<template>
	<div class="imgs">
		<div class="text">
			<div>9090</div>
			<div class="ok">福达合金卡dd</div>
			<icon-svg name="icon-msg" color="red"></icon-svg>
		</div>
	</div>
	<img width="200" alt="Vue logo" src="../../assets/111.jpg" />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style lang="scss">
.imgs {
	width: 120px;
	.text {
		color: red;
		.ok {
			font-weight: 900;
		}
	}
}
</style>
