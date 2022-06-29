<template>
	<div class="user-info">
		<el-row :span="24">
			<el-col :span="8">
				<basic-container>
					<div class="user-info__content">
						<img class="user-info__img" :src="form.img" alt="" />
						<p class="user-info__name">{{ form.name }}</p>
						<router-link class="user-info__setting" :to="{ path: '/info/setting' }">个人设置</router-link>
						<p class="user-info__desc">{{ form.ms }}</p>
						<div class="user-info__detail-desc">
							<p>
								<i class="el-icon-message"></i><span>{{ form.yx }}</span>
							</p>
							<p>
								<i class="el-icon-postcard"></i><span>{{ form.gs }} · {{ form.bm }} · {{ form.zw }}</span>
							</p>
							<p>
								<i class="el-icon-location-information"></i><span>{{ form.dz }}</span>
							</p>
						</div>
						<div class="user-info__divider"></div>
						<h4>标签</h4>
						<div class="user-info__tags">
							<el-tag effect="plain" v-for="(tag, index) in tags" :key="index">
								{{ tag }}
							</el-tag>
						</div>
					</div>
				</basic-container>
			</el-col>
			<el-col :span="16">
				<basic-container>
					<el-tabs v-model="activeName">
						<el-tab-pane label="个人信息" :name="0">
							<el-form label-width="110px">
								<el-form-item label="头像">
									<el-upload class="avatar-uploader" :show-file-list="false">
										<img v-if="form.img" :src="form.img" class="avatar" />
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</el-form-item>
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
								<el-form-item label="用户名">
									<el-input v-model="form.username"></el-input>
								</el-form-item>
								<el-form-item label="邮箱">
									<el-input v-model="form.yx"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">确认</el-button>
									<el-button>取消</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="修改密码" :name="1">
							<el-form label-width="110px">
								<el-form-item label="原密码" prop="oldpassword">
									<el-input type="password" v-model="form.password" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="新密码" prop="newpassword">
									<el-input type="password" v-model="form.newpassword" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="newpasswords">
									<el-input type="password" v-model="form.newpasswords" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">确认</el-button>
									<el-button>重置</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</basic-container>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const activeName = ref(0);
const tags = ref([
	' 善解人意',
	'开朗乐观',
	'真诚热情',
	'心地善良',
	'谦恭有礼',
	'彬彬有礼',
	'虚怀若谷',
	'严于律己',
	'雍容大度',
	'热情洋溢',
	'从容自若',
	'诚挚',
	'温厚',
	'谦让',
	'勤恳',
	'耿直'
]);
let form = reactive({
	img: 'https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401',
	username: 'avue',
	name: 'smallwei',
	ms: '保护头发，人人有责',
	yx: '1634566606@qq.com',
	gs: '某某公司',
	bm: '某某部门',
	zw: '前端开发工程师',
	dz: '内蒙古',
	bq: [1, 2, 3, 4],
	password: '9999',
	oldpassword: 11111111,
	newpassword: 22222222,
	newpasswords: 22222222
});
</script>

<style lang="scss">
.user-info {
	.avue-tabs {
		padding: 0 10px;
	}
	.el-tabs__content {
		padding: 20px 0;
	}
	&__img {
		display: block;
		margin: 0 auto;
		border-radius: 100%;
		width: 100px;
		height: 100px;
	}
	&__name {
		text-align: center;
		font-size: 20px;
		line-height: 28px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);
		margin-bottom: 0;
		margin-top: 10px;
	}
	&__setting {
		margin-bottom: 12px;
		display: block;
		font-size: 12px;
		color: #409eff;
		text-align: center;
	}
	&__desc {
		text-align: center;
		width: 200px;
		margin: 0 auto;
	}
	&__detail-desc {
		margin-top: 50px;
		font-size: 14px;
		p {
			margin-bottom: 10px;
		}
		span {
			margin-left: 10px;
		}
	}
	&__divider {
		border-top: 1px dashed #e8e8e8;
		display: block;
		height: 0;
		width: 100%;
		margin: 24px 0;
		clear: both;
	}
	&__tags {
		.el-tag {
			margin: 0 5px 5px 0;
		}
	}
}
</style>
