import { createI18n, VueI18n } from 'vue-i18n';
import elementEnLocale from 'element-plus/es/locale/lang/en';
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';
import AvueEnLocale from '@smallwei/avue/lib/locale/lang/en';
import AvueZhLocale from '@smallwei/avue/lib/locale/lang/zh';
import { inject, provide } from 'vue';
import { getStore } from '../utils/store';
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
	locale: getStore({ name: 'language' }), //cStore?.language
	messages
});

const i18nSymbol = Symbol('i18n');
export function provideI18n() {
	console.log('-=0=0=0', i18n);

	provide(i18nSymbol, i18n.global);
}

export function useI18n(): VueI18n {
	const i18n = inject(i18nSymbol) as VueI18n;
	if (!i18n) throw new Error('No i18n provided!!!');
	return i18n;
}

export default i18n;
