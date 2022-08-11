import { ref, Ref, reactive, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { isFunction } from 'lodash-es';
import { DataPage, Result } from '@/typings/axios';
type BaseParams = string | number | boolean | symbol;
type SearchParams = Record<string, BaseParams | BaseParams[]>;
interface CrudOption<T> {
	/** 唯一值 key */
	rowKey?: string;
	/** api 接口文件路径  */
	apiPath: string;
	// option 配置文件路径
	optionPath: string;
	// api 接口名称
	apiName?: {
		list?: string;
		add?: string;
		update?: string;
		del?: string;
	};
	// res?: (data: Result<DataPage<T>>) => T[];
	// 对搜索的参数进行改造
	searchParams?: (params: SearchParams) => SearchParams;

	listAfter?: (data: DataPage<T>) => void;
	listBefore?: () => void;
	addAfter?: (data?: Result) => void;
	addBefore?: () => void;
	updateAfter?: (data?: Result) => void;
	updateBefore?: () => void;
	delAfter?: (data: Result, row: Partial<T>, index: number) => void;
	delBefore?: () => void;

	totalKey?: string;
	dataKey?: string;
}
let optionObj = import.meta.globEager(`../option/**/**`);
let apiObj = import.meta.globEager(`../api/**/**`);

/**
 * 表单基本逻辑
 */
export const useCrud = <T = any>(option: CrudOption<T>) => {
	console.log(option.optionPath);

	let avueOption = ref(optionObj[`../option/${option.optionPath}.ts`].default());
	let api = apiObj[`../api/${option.apiPath}.ts`];

	const list = ref([]);
	let form = ref({});
	let params = reactive({});
	let crud: Ref<HTMLElement | undefined> = ref();
	let loading = ref(false);
	const page = ref({
		current: 1,
		size: 20,
		total: 0
	});

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
	// * 分页数据请求
	const getList = () => {
		const callback = () => {
			loading.value = true;
			const paramsObj = Object.assign({ current: page.value.current, size: page.value.size }, params);
			list.value = [];
			api[option.apiName?.list || 'list'](paramsObj)
				.then((res: Result<DataPage<T>>) => {
					const { data } = res;
					page.value.total = data[option.totalKey || 'total'];
					const result = data[option.dataKey || 'record'];
					list.value = result;
					if (isFunction(option.listAfter)) {
						option.listAfter?.(data);
					}
				})
				.finally(() => {
					loading.value = false;
				});
		};
		if (isFunction(option.listBefore)) {
			option.listBefore?.();
		}
		callback();
	};
	// * 数据保存请求
	const rowSave = (row: any, done: () => void, loading: () => void) => {
		const callback = () => {
			Reflect.deleteProperty(form.value, 'params');
			api[option.apiName?.add || 'add'](form.value)
				.then((data: Result) => {
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
	const rowUpdate = (row: Partial<T>, index: number, done: () => void, loading: () => void) => {
		const callback = () => {
			Reflect.deleteProperty(form.value, 'params');
			api[option.apiName?.update || 'update'](form.value)
				.then((data: Result) => {
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
	const rowDel = (row: Partial<T>, index: number) => {
		const callback = () => {
			api[option.apiName?.del || 'del'](row[rowKey.value], row).then((data: Result) => {
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
	const searchChange = (sep: SearchParams, done: () => void) => {
		console.log('原参数---', sep);
		if (done) done();
		params = option.searchParams?.(sep) || sep;
		console.log('改造变后参数---', params);
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
	getList();
	return { bindVal, onEvent, rowKey, crud, refreshChange, page, form, params, api, avueOption };
};
