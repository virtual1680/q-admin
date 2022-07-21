<template>
	<div>
		<div class="wel__header">隐藏字段</div>
		<qv-form v-model="config.form" :option="config.option"></qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

let config = reactive({
	form: {},
	option: {
		column: [
			{
				label: '姓名',
				prop: 'name',
				span: 8
			},
			{
				label: '密码',
				prop: 'password',
				type: 'password',
				display: false //对应的字段配置 display 为 false 即可隐藏
			}
		]
	}
});
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
}
</style>
