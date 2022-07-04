import website from 'app/config/website';
import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';
// import { isFunction } from 'lodash-es';
const tagWel = website.fistPage;
interface TagsStore {
	tagList: RouterTag[];
	tag: RouterTag;
	tagWel: { name: string; path: string };
	// 点击 tag item 时是否级联top-menu and sidebar -> default value false
	isCascade: boolean;
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const useTagsStore = defineStore({
	id: 'TagsStore',
	state: (): TagsStore => ({
		tagList: [],
		tag: {} as RouterMenu,
		tagWel: tagWel,
		isCascade: false
	}),
	getters: {
		getTagList: state => state.tagList,
		getTag: state => state.tag,
		getTagWel: state => state.tagWel,
		getTagsKeep: state => {
			return state.tagList
				.filter(ele => {
					return (ele.meta || {}).keepAlive;
				})
				.map(ele => ele.fullPath);
		},
		getIsCascade: state => state.isCascade
	},
	actions: {
		SET_IS_CASCADE(isCascade: boolean) {
			this.isCascade = isCascade;
		},
		ADD_TAG(action: RouterTag) {
			// if (isFunction(action.name)) action.name = action.name(action.query);
			this.tag = action;
			if (this.tagList.some(ele => ele.fullPath == action.fullPath)) return;
			this.tagList.push(action);
		},
		DEL_TAG(fullPath?: string) {
			this.tagList = this.tagList.filter(item => {
				return item?.fullPath !== fullPath;
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
