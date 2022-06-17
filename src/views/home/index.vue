<script setup lang="ts" name="home">
import HelloWorld from "components/HelloWorld.vue";
import { GetCaptcha } from "api/auth";
import { ref } from "vue";
// import { useDownload } from "app/hooks/useDownload";
const captcha = ref("");
GetCaptcha().then(res => {
	console.log("-=-=-=", res);
	captcha.value = res.image;
});
// useDownload(await getExcel({ name: "222" }));
// GetCaptcha1().then(res => {
// 	console.log("====", res);
// 	captcha.value = res.image;
// });

// GetCaptcha2().then(res => {
// 	console.log("-=-=-=", res);
// 	captcha.value = res.image;
// });
// GetCaptcha3().then(res => {
// 	console.log("====", res);
// 	captcha.value = res.image;
// });
</script>

<template>
	<div class="imgs">
		<div class="text">
			<div>9090</div>
			<div class="ok">福达合金卡dd</div>
			<icon-svg name="icon-msg" color="red"></icon-svg>
		</div>
	</div>
	<img :src="captcha" alt="" />
	<img width="200" alt="Vue logo" src="../../assets/111.jpg" />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
	<el-input v-model="captcha"></el-input>
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
