import { ref, Ref, reactive, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { isFunction } from 'lodash-es';

interface CrudOption {
	rowKey?: string;
	sourcePath: string;

	list?: string;
	add?: string;
	update?: string;
	del?: string;

	res?: (data: any) => any;

	listAfter?: (data: any[]) => void;
	listBefore?: () => void;
	addAfter?: (data?: any[]) => void;
	addBefore?: () => void;
	updateAfter?: (data?: any[]) => void;
	updateBefore?: () => void;
	delAfter?: (data: any, row: any, index: number) => void;
	delBefore?: () => void;

	totalKey?: string;
	dataKey?: string;
}
let optionObj = import.meta.glob(`../option/**/**`);
let apiObj = import.meta.glob(`../api/**/**`);

/**
 * 表单基本逻辑
 */
export const useCrud = (option: CrudOption) => {
	let optionO = optionObj[`../option/${option.sourcePath}.ts`];
	let apiO = apiObj[`../api/${option.sourcePath}.ts`];
	const list = ref([]);
	let form = ref({});
	let params = reactive({});
	let avueOption = ref({});
	let api = reactive({});
	let crud: Ref<HTMLElement | undefined> = ref();
	let loading = ref(false);
	const page = ref({
		current: 1,
		size: 20,
		total: 0
	});

	console.log(api);

	const bindVal = computed(() => {
		return {
			ref: 'crud',
			option: avueOption.value,
			data: list.value,
			tableLoading: loading.value
		};
	});
	const onEvent = computed(() => {
		return {
			'size-change': sizeChange,
			'current-change': currentChange,
			'row-save': rowSave,
			'row-update': rowUpdate,
			'row-del': rowDel,
			'refresh-change': refreshChange,
			'search-reset': searchChange,
			'search-change': searchChange
		};
	});
	const rowKey = computed(() => {
		return option.rowKey || 'id';
	});
	optionO().then(mode => {
		avueOption.value = mode.default();
	});
	apiO().then(mode => {
		api = mode;
		getList();
	});
	// * 分页数据请求
	const getList = () => {
		const callback = () => {
			loading.value = true;
			const paramsObj = Object.assign({ current: page.value.current, size: page.value.size }, params);
			list.value = [];
			api[option.list || 'list'](paramsObj)
				.then((res: any) => {
					loading.value = false;
					let data;
					if (option.res) {
						data = option.res(res.data);
					} else {
						data = res.data;
					}
					page.value.total = data[option.totalKey || 'total'];
					const result = data[option.dataKey || 'data'];
					list.value = result;
					if (isFunction(option.listAfter)) {
						option.listAfter(data);
					}
				})
				.finally(() => {
					loading.value = false;
				});
		};
		if (isFunction(option.listBefore)) {
			option.listBefore();
		}
		callback();
	};
	// * 数据保存请求
	const rowSave = (row: any, done: () => void, loading: () => void) => {
		const callback = () => {
			Reflect.deleteProperty(form.value, 'params');
			api[option.add || 'add'](form.value)
				.then((data: any) => {
					getList();
					if (option.addAfter) {
						option.addAfter(data);
					} else {
						ElMessage.success('新增成功');
					}
					done();
				})
				.catch(() => {
					loading();
				});
		};
		if (option.addBefore) {
			option.addBefore();
		}
		callback();
	};
	const rowUpdate = (row: any, index: number, done: () => void, loading: () => void) => {
		const callback = () => {
			Reflect.deleteProperty(form.value, 'params');
			api[option.update || 'update'](form.value)
				.then((data: any) => {
					getList();
					if (option.updateAfter) {
						option.updateAfter(data);
					} else {
						ElMessage.success('更新成功');
					}
					done();
				})
				.catch(() => {
					loading();
				});
		};
		if (option.updateBefore) {
			option.updateBefore();
		}
		callback();
	};
	const rowDel = (row: any, index: number) => {
		const callback = () => {
			api[option.del || 'del'](row[rowKey.value], row).then((data: any) => {
				getList();
				if (option.delAfter) {
					option.delAfter(data, row, index);
				} else {
					ElMessage.success('删除成功');
				}
			});
		};
		if (option.delBefore) {
			option.delBefore();
			callback();
		} else {
			ElMessageBox.confirm(`此操作将永久删除序号【${index}】的数据, 是否继续?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				callback();
			});
		}
	};
	const searchChange = (params: any, done: () => void) => {
		if (done) done();
		params = params;
		page.value.current = 1;
		getList();
	};
	const refreshChange = () => {
		getList();
	};
	const sizeChange = (val: number) => {
		page.value.current = 1;
		page.value.size = val;
		getList();
	};
	const currentChange = (val: number) => {
		page.value.current = val;
		getList();
	};
	console.log('-=-=-=-=-=', bindVal.value.option);

	return { bindVal, onEvent, rowKey, crud, refreshChange, page, form };
};
