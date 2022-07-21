<template>
	<div>
		<div class="wel__header">标题字段宽度</div>
		<qv-form v-model="config.form" :option="config.option"></qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

let config = reactive({
	form: {
		name: '我是50的宽度',
		sex: '我的宽度是150'
	},
	option: {
		// 所有字段生效
		labelWidth: 150,
		column: [
			{
				// 单个字段生效 优先级高于所有字段
				labelWidth: 50,
				label: '姓名',
				prop: 'name'
			},
			{
				label: '性别',
				prop: 'sex'
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
