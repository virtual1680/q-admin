// import { commonStore } from 'store/common';
import { createI18n } from 'vue-i18n';
import elementEnLocale from 'element-plus/es/locale/lang/en';
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';
import AvueEnLocale from '@smallwei/avue/lib/locale/lang/en';
import AvueZhLocale from '@smallwei/avue/lib/locale/lang/zh';
import { ComponentCustomProperties, inject, provide } from 'vue';
export const messages = {
	en: {
		...enLocale,
		...AvueEnLocale,
		...elementEnLocale
	},
	'zh-cn': {
		...zhLocale,
		...AvueZhLocale,
		...elementZhLocale
	}
};

const i18n = createI18n({
	locale: 'zh-cn', //cStore?.language
	messages
});

const i18nSymbol = Symbol();
export function provideI18n() {
	provide(i18nSymbol, i18n);
}

export function useI18n(): ComponentCustomProperties {
	const i18n = inject(i18nSymbol) as ComponentCustomProperties;
	if (!i18n) throw new Error('No i18n provided!!!');
	return i18n;
}

export default i18n;
