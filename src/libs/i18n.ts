import i18next from 'i18next';

import * as en from 'src/libs/translations/en.json';
import * as zh_CN from 'src/libs/translations/zh-CN.json';

import { moment } from 'obsidian';

i18next.init({
	lng: moment.locale(),
	fallbackLng: {
		'zh-TW': ['zh-CN', 'en'],
		default: ['en'],
	},
	resources: {
		en: en,
		'zh-CN': zh_CN,
	},
});

export const i18n = i18next;
