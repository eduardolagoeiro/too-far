import fs from 'fs';

(async () => {
	const baseDir = 'tmp/maps';
	const res = fs.readdirSync(baseDir);
	const files = res.filter((f) => f.includes('.svg'));
	// .filter(
	// 	(file) =>
	// 		file.length === 6 &&
	// 		['BR', 'AR', 'CO', 'CH', 'PE', 'VZ', 'ES', 'PT', 'CU', 'CR']
	// 			.map((el) => el.toLowerCase() + '.svg')
	// 			.includes(file)
	// );
	files.forEach((file) => {
		const code = file.replace('.svg', '');
		const svgContent = fs.readFileSync(`${baseDir}/${file}`, { encoding: 'utf-8' });

		const imgPattern = `
    <defs><pattern id="${code}" patternUnits="userSpaceOnUse" width="100%" height="100%">
      {#key showFlag}
      ${fs
				.readFileSync(`tmp/flags/${file}`, { encoding: 'utf-8' })
				.replace('<svg ', '<svg {preserveAspectRatio} in:expand={flagexpand} ')}
      {/key}
    </pattern></defs>`;

		const template = `<script>
        import { draw } from 'svelte/transition';
        import { linear } from 'svelte/easing';
        import { expand } from '../transitions/expand';
    
        export let style;
        export let drawin = { duration: 1000 };
        export let flagexpand = { duration: 400, delay: 1000, easing: linear }
        export let strokeColor = 'black';
        export let fill = 'transparent';
		export let mainColor = 'black';
		export let showFlag = false;
        export let strokeWidth = 5;
        $: pathStyle = \`stroke: \${showFlag ? mainColor : strokeColor }; fill: \${showFlag ? 'url(#${code})' : fill}; stroke-width: \${strokeWidth};\`;

	      const preserveAspectRatio = 'xMidYMid slice';
    </script>
    
    ${svgContent
			.replace('<svg ', '<svg {style} ')
			.replace(/<path /ig, '<path fill="url(#flag)" in:draw={drawin} style={pathStyle} ')
			.replace('>', `> ${imgPattern}`)}
    `;
		fs.writeFileSync(`src/territories/${file.replace('.svg', '.svelte')}`, template, {
			encoding: 'utf-8'
		});
	});
})();
