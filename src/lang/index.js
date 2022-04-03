import pt from './pt.json';
import en from './en.json';

const defaultLang = 'en';

let config;

function getLang() {
	if (import.meta.env.VITE_LANG) return import.meta.env.VITE_LANG;
	try {
		const l = navigator.language.split('-')[0];
		if (['en', 'pt'].includes(l)) {
			return l;
		}
		return defaultLang;
	} catch (e) {
		return defaultLang;
	}
}

export const lang = getLang();

if (lang === 'pt') {
	config = pt;
} else {
	config = en;
}

export function t(ctx, key, vars) {
	if (!vars) {
		if (typeof key === 'object') {
			vars = key;
			key = 'content';
		} else {
			vars = {};
		}
	}
	let template = config[ctx][key];
	if (!template) return;
	Object.keys(vars).map((key) => {
		const regex = new RegExp(`{{${key}}}`, 'ig');
		template = template.replace(regex, vars[key]);
	});
	return template;
}
