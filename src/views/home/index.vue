<script setup lang="ts" name="homeScreen">
import { GetCaptcha } from "api/auth";
// import { useDownload } from "app/hooks/useDownload";
GetCaptcha().then(res => {
	console.log("-=-=-=", res);
});
</script>

<template>
	<screen-container>
		<div>444</div>
	</screen-container>
</template>
