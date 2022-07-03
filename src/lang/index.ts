import { createI18n } from 'vue-i18n';
import elementEnLocale from 'element-plus/es/locale/lang/en';
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn';
import enLocale from './en';
import zhLocale from './zh';
import AvueEnLocale from '@smallwei/avue/lib/locale/lang/en';
import AvueZhLocale from '@smallwei/avue/lib/locale/lang/zh';
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
	locale: getStore<string>({ name: 'language' })?.content || 'zh-cn',
	messages
});

export default i18n;
