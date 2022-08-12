<template>
	<span v-if="text" @click="handleLock">{{ text }}</span>
	<i v-else class="icon-suoping" @click="handleLock"></i>
	<el-dialog title="设置锁屏密码" v-model="box" width="30%" append-to-body>
		<el-form :model="form" ref="elFormRef" label-width="80px">
			<el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空' }]">
				<el-input v-model="form.passwd" placeholder="请输入锁屏密码">
					<template #append>
						<el-button @click="handleSetLock(elFormRef)" icon="el-icon-lock"></el-button>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts" name="top-lock">
import { validatenull } from 'utils/validate';
import { reactive, computed, ref, toRefs } from 'vue';
import { useCommonStore } from '../../../store/common';
import { useRouter } from 'vue-router';
import { FormInstance } from 'element-plus';

const cStore = useCommonStore();
const router = useRouter();
const props = defineProps({ text: String });
const { text } = toRefs(props);
const elFormRef = ref<FormInstance | undefined>();
const box = ref(false);
let form = reactive({
	passwd: ''
});
const lockPasswd = computed(() => {
	return cStore.getLockPasswd;
});
const handleSetLock = async (elForm: FormInstance | undefined) => {
	if (!elForm) return;
	elForm.validate((valid: boolean) => {
		if (valid) {
			cStore.SET_LOCK_PASSWD(form.passwd);
			handleLock();
		}
	});
};
const handleLock = () => {
	if (validatenull(lockPasswd.value)) {
		box.value = true;
		return;
	}
	cStore.SET_LOCK();
	setTimeout(() => {
		router.push({ path: '/lock' });
	}, 100);
};
</script>

<style lang="scss" scoped></style>
