<template>
	<basic-container>
		<div style="height: 2000px; background-color: #ffffff">
			<h3>往下拉就会出现返回菜单</h3>
		</div>
		<el-backtop target="#qv-view" :bottom="200"></el-backtop>
		<el-backtop target="#qv-view" :bottom="100">
			<div class="top">返回顶端</div>
		</el-backtop>
	</basic-container>
</template>

<style scoped>
.top {
	padding: 10px;
	font-size: 14px;
	color: #ffffff;
	text-align: center;
	background: rgb(0 153 229 / 70%);
	border-radius: 2px;
}
</style>
