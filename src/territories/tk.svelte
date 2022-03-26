<script>
	import { draw } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { expand } from '../transitions/expand';

	export let style;
	export let drawin = { duration: 1000 };
	export let flagexpand = { duration: 400, delay: 1000, easing: linear };
	export let strokeColor = 'black';
	export let fill = 'transparent';
	export let mainColor = 'black';
	export let showFlag = false;
	export let strokeWidth = 5;
	$: pathStyle = `stroke: ${showFlag ? mainColor : strokeColor}; fill: ${
		showFlag ? 'url(#tk)' : fill
	}; stroke-width: ${strokeWidth};`;

	const preserveAspectRatio = 'xMidYMid slice';
</script>

<svg
	{style}
	version="1.0"
	xmlns="http://www.w3.org/2000/svg"
	width="1365.333"
	height="1365.333"
	viewBox="0 0 1024 1024"
>
	<defs
		><pattern id="tk" patternUnits="userSpaceOnUse" width="100%" height="100%">
			{#key showFlag}
				<svg
					{preserveAspectRatio}
					in:expand={flagexpand}
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 1800 900"
					><defs
						><g id="b"
							><g id="a"
								><path d="M1 0H0v.5z" transform="translate(0 -.325)" /><path
									d="M1 0H0v-.5z"
									transform="rotate(-36 .5 -.162)"
								/></g
							><use xlink:href="#a" transform="rotate(72)" /><use
								xlink:href="#a"
								transform="rotate(144)"
							/><use xlink:href="#a" transform="rotate(216)" /><use
								xlink:href="#a"
								transform="rotate(288)"
							/></g
						></defs
					><path fill="#012169" d="M0 0h1800v900H0z" /><path
						d="M329.376 777.265c-17.934-.15 168.624-99.431 324.77-226.6C858.788 384 1299.54 117.157 1429.115 73.796c13.543-4.532-27.776 23.073-33.14 32.016-138.341 163.74-27.925 472.724 144.973 628.048 51.99 39.763 49.327 41.85 145.707 45.746v9l-1357.28-11.34zm-11.251 18.06S304.962 804.727 305 811.73c.043 7.772 14.766 18.047 14.766 18.047l1338.745 14.765 24.609-16.406-34.453-21.328-1330.542-11.484z"
						fill="#ffd100"
					/><g fill="#fff"
						><use xlink:href="#b" transform="matrix(45 0 0 45 342.957 112.581)" /><use
							xlink:href="#b"
							transform="matrix(37.5 0 0 37.5 521.205 267.53)"
						/><use xlink:href="#b" transform="matrix(45 0 0 45 135 321.808)" /><use
							xlink:href="#b"
							transform="matrix(52.5 0 0 52.5 342.957 652.581)"
						/></g
					></svg
				>
			{/key}
		</pattern></defs
	><path
		fill="url(#flag)"
		in:draw={drawin}
		style={pathStyle}
		d="M221.1 1.4c-1 1.2-.8 1.7.8 2.5 1.1.6 2.7 1.1 3.6 1.1 1.9 0 6.5-2.9 6.5-4.1 0-1.5-9.6-1-10.9.5zM234.7 1.7C232.1 4.2 236.9 9 242 9c2.4 0 2.5-1.1.5-5-1.2-2.3-2.3-3-4.4-3-1.5 0-3.1.3-3.4.7zM225 11.5c-1 1.1-1 1.9-.2 2.7 1.5 1.5 4.4.2 4-1.9-.4-2.3-2.2-2.7-3.8-.8zM243.2 16.4c.1 2.6-.6 4-2.6 5.8-1.9 1.6-2.5 2.9-2.1 4 1.5 3.7 10.5-1.3 10.5-5.7 0-2.3-3.5-7.5-5-7.5-.5 0-.9 1.5-.8 3.4zM224 17.9c0 1.5 2.9 3.3 4.5 2.7 2.8-1 1.7-3.6-1.5-3.6-1.6 0-3 .4-3 .9zM227.3 24.7c-1 2.5 2.3 4.8 5.4 3.7 4.1-1.4 3.8-3-.7-4.2-3.4-.8-4.2-.8-4.7.5zM472.3 231.7c-2.1.4-5.2 5.8-4 7 .4.3 2.6.9 4.9 1.4 3.9.7 4.5.6 6.5-1.6l2.2-2.5-2.3-2.5c-2.3-2.5-3-2.6-7.3-1.8zM451.7 241.8c-2.1 2.3-2.1 3.6-.3 5.1 1.1.9 1.9.5 4-2 1.4-1.7 2.4-3.5 2-4-.9-1.5-4-1-5.7.9zM479.5 244c-.3.5.1 1 .9 1 .9 0 1.6-.5 1.6-1 0-.6-.4-1-.9-1-.6 0-1.3.4-1.6 1zM480.8 249.6c-.4.3.5 3.8 1.8 7.7 1.3 3.9 2.4 8.1 2.4 9.4 0 2.5 1 2.9 2.8 1.1 1.9-1.9 1.4-6.2-1.3-11.6-1.4-2.8-2.5-5.5-2.5-6.1 0-1.2-2.2-1.5-3.2-.5zM452 252c0 1.2-1 3.4-2.2 5-2.1 2.9-2.1 3-.3 5s2 2 3.2.4c1.5-2.1 1.8-12.4.3-12.4-.5 0-1 .9-1 2zM457.7 268.7c-1.4 1.3-.6 3.3 1.2 3.3 2.5 0 3.8-2 2-3.1-1.7-1.1-2.4-1.1-3.2-.2zM476 271c0 .5.9 1 2.1 1 1.1 0 1.7-.5 1.4-1-.3-.6-1.3-1-2.1-1s-1.4.4-1.4 1zM470.5 272c.3.5 1.3 1 2.1 1s1.4-.5 1.4-1c0-.6-.9-1-2.1-1-1.1 0-1.7.4-1.4 1zM465.8 273.7c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zM727.8 324.4c-2.7 2-2.1 3.3 1.9 4.3 2.9.7 4.3 1.8 6.3 5.3 3.1 5.3 5.4 5.8 5.8 1.5.3-3.3-2.3-6.4-8.8-10.3-2.9-1.7-3.8-1.8-5.2-.8zM734 346.2c.1 1.8.7 4.4 1.5 5.8.8 1.4 1.4 4.6 1.5 7.2 0 4.1.3 4.8 2 4.8s2-.7 2-5.1c0-2.8-.6-6.5-1.4-8.2-.8-1.8-1.6-4.1-1.8-5.2-.2-1.1-1.1-2.1-2.1-2.3-1.3-.3-1.7.3-1.7 3zM721.1 346.3c-.8 1.1-.6 1.8.8 3.1 1.6 1.5 1.9 1.5 3.1.1 1-1.2 1-1.8 0-3-1.5-1.9-2.4-1.9-3.9-.2zM729 357.5c.7.8 1.6 1.2 2.1.9 1.3-.8.1-2.4-1.8-2.4-1.3 0-1.3.3-.3 1.5zM733 362c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM791.3 1014c-5.1 2.1-.8 10 5.3 10 3.3 0 7.4-3.5 7.4-6.2 0-4-7-6.1-12.7-3.8z"
	/></svg
>
