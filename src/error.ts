import { App } from 'vue';
import { useLogsStore } from 'store/index';
export default {
	install: (app: App) => {
		app.config.errorHandler = (err, vm, info) => {
			useLogsStore().ADD_LOGS({
				type: 'error',
				message: (err as Error).message,
				stack: (err as Error).stack || '',
				info
			});
			if (process.env.NODE_ENV === 'development') {
				console.group('>>>>>> 错误信息 >>>>>>');
				console.log(info);
				console.groupEnd();
				console.group('>>>>>> Vue 实例 >>>>>>');
				console.log(vm);
				console.groupEnd();
				console.group('>>>>>> Error >>>>>>');
				console.log(err);
				console.groupEnd();
			}
		};
	}
};
