import fs from 'fs';
import { countries } from './countries.js';

const enabledCountries = [...countries].filter((country) => !country.disabled);

const errors = [];
enabledCountries.forEach((country) => {
	try {
		if (!country.names.pt) {
			throw new Error(`country not fount in pt ${country.name}`)
		}
		fs.readFileSync(`src/territories/${country.code.toLowerCase()}.svelte`);
	} catch (error) {
		console.error(error);
		errors.push(country.name);
	}
});

if (errors.length > 0) {
	console.log('error while reading', errors);
	process.exit(1);
}

console.log('everything alright');
