<template>
	<basic-container>
		<avue-crud v-bind="bindVal" v-on="onEvent" v-model:page="page" v-model="form"> </avue-crud>
	</basic-container>
</template>

<script lang="ts" setup>
import { useCrud } from '@/hooks/useCrud';
import { onMounted } from 'vue';
// import { getCurrentInstance, onMounted } from 'vue';
// const instance = getCurrentInstance();

let { bindVal, onEvent, page, form, crud } = useCrud({
	// api,
	// option: option(),
	sourcePath: 'crud/index'
});
onMounted(() => {
	console.log(crud.value);
});
</script>

<style lang="scss" scoped></style>
