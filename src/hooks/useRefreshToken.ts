import website from '@/config/website';
import { validatenull } from '@/utils/validate';
import dayjs from 'dayjs';
import { ref, onBeforeMount, onUnmounted, Ref } from 'vue';
import { useUserStore } from 'store/index';
import { getStore } from 'app/hooks/useStorage';

/**
 * 刷新token
 */
export const useRefreshToken = () => {
	const refreshLock = ref(false);
	const refreshTime: Ref<NodeJS.Timer | number> = ref(-1);
	const userStore = useUserStore();
	const refreshToken = () => {
		refreshTime.value = setInterval(() => {
			userStore.getToken;
			const token = getStore({ name: 'token', debug: true });
			let date1 = dayjs(token?.datetime);
			let date2 = dayjs();
			const date = date1.diff(date2, 'month');
			if (validatenull(date)) return;
			if (date >= website.tokenTime && !refreshLock.value) {
				refreshLock.value = true;
				userStore.RefreshToken().finally(() => {
					refreshLock.value = false;
				});
			}
		}, 1000);
	};
	onBeforeMount(refreshToken);
	onUnmounted(() => {
		clearTimeout(refreshTime.value as number);
	});
};
