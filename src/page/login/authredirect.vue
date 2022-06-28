<template>
	<div></div>
</template>

<script setup lang="ts" name="AuthRedirect">
import { useRoute } from 'vue-router';
const route = useRoute();
window.close();
const params = route.query;
const state = params.state;
const code = params.code;
window.opener.location.href = `${window.location.origin}/#/login?state=${state}&code=${code}`;
</script>

<style></style>
