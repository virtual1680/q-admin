import website from 'app/config/website';
import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';
const tagWel = website.fistPage;
interface TagsStore {
	tagList: any[];
	tag: any;
	tagWel: { name: string; path: string };
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const tagsStore = defineStore({
	id: 'TagsStore',
	state: (): TagsStore => ({
		tagList: [],
		tag: {},
		tagWel: tagWel
	}),
	getters: {
		tagList: state => state.tagList,
		tag: state => state.tag,
		tagWel: state => state.tagWel
	},
	actions: {
		ADD_TAG(action: any) {
			if (typeof action.name == 'function') action.name = action.name(action.query);
			this.tag = action;
			if (this.tagList.some(ele => ele.fullPath == action.fullPath)) return;
			this.tagList.push(action);
		},
		DEL_TAG(action: any) {
			this.tagList = this.tagList.filter(item => {
				return item.fullPath !== action.fullPath;
			});
		},
		DEL_ALL_TAG(tagList = []) {
			this.tagList = tagList;
		},
		DEL_TAG_OTHER() {
			this.tagList = this.tagList.filter(item => {
				return [this.tag.fullPath, website.fistPage.path].includes(item.fullPath);
			});
		}
	},
	persist: piniaPersistConfig('TagsStore')
});
