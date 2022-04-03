const defaultLang = 'en';

export function getLang() {
	try {
		const lang = navigator.language.split('-')[0];
		if (['en', 'pt'].includes(lang)) {
			return lang;
		}
		return defaultLang;
	} catch (e) {
		return defaultLang;
	}
}
