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
		showFlag ? 'url(#uy)' : fill
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
		><pattern id="uy" patternUnits="userSpaceOnUse" width="100%" height="100%">
			{#key showFlag}
				<svg
					{preserveAspectRatio}
					in:expand={flagexpand}
					viewBox="-5 -5 945 630"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M-5-5h945v630H-5z" fill="#fff" /><path
						d="M345 65h595v70H345zm0 140h595v70H345zM-5 345h945v70H-5zm0 140h945v70H-5z"
						fill="#0038a8"
					/><g transform="translate(234.285 -392.52) scale(3.77953)"
						><g stroke="#7b3f00" stroke-miterlimit="20"
							><g fill="#fcd116"
								><path
									d="m-19.106 157.888 3.066 4.578c-12.597 9.115-4.906 14.506-13.833 17.424 5.552-5.418-.734-6.254 3.944-17.547"
									stroke-linecap="square"
									stroke-width=".611"
								/><g stroke-width=".6"
									><path
										d="m-24.894 153.753-1.07 5.405c-15.352-2.461-13.726 6.788-22.101 2.54 7.757.094 4.078-5.01 15.371-9.688"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-24.894 153.754-2.419-.436.025.1c-6.453 1.582-9.957 4.257-12.701 6.29-1.373 1.017-2.558 1.881-3.842 2.35a5.763 5.763 0 0 1-2.666.32c6.662 2.367 6.221-5.512 20.534-3.218z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-27.361 153.121c-13.014 3.186-14.245 10.862-20.704 8.576"
										fill="none"
										stroke-width=".611"
									/></g
								><path
									d="m-17.009 148.833-4.322-4.321-19.448 28.09 28.092-19.447-4.322-4.322-23.77 23.77"
									stroke-width=".611"
								/><g stroke-width=".6"
									><path
										d="m-26.064 146.737-4.577 3.065c-9.116-12.596-14.507-4.906-17.424-13.833 5.418 5.552 6.305-.723 17.599 3.955"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-26.064 146.738-1.402-2.019-.053.088c-5.682-3.445-10.051-4.03-13.43-4.534-1.689-.252-3.137-.478-4.377-1.055a5.763 5.763 0 0 1-2.112-1.658c3.038 6.384 8.297.5 16.796 12.244z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-27.361 144.545c-11.455-6.95-17.753-2.392-20.704-8.576"
										fill="none"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833v-6.112l-33.615 6.112 33.615 6.112v-6.112h-33.615"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833v6.112-6.112h-33.615l33.615 6.112"
										fill="#7b3f00"
										stroke="none"
									/><path
										d="m-21.929 140.948-5.404-1.069c2.46-15.353-6.789-13.727-2.54-22.102-.095 7.757 5.272 4.699 9.95 15.992"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-21.93 140.949.436-2.42-.1.026c-1.581-6.454-4.257-9.958-6.29-12.702-1.016-1.373-1.88-2.557-2.349-3.842a5.763 5.763 0 0 1-.32-2.665c-2.367 6.661 5.512 6.22 3.218 20.534z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-21.297 138.481c-3.185-13.014-10.862-14.244-8.576-20.704"
										fill="none"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833 4.322-4.321-28.092-19.448 19.448 28.091 4.322-4.322-23.77-23.77"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833-4.322 4.322 4.322-4.322-23.77-23.77 19.448 28.092"
										fill="#7b3f00"
										stroke="none"
									/><path
										d="m-14.912 139.779-3.066-4.578c12.597-9.116 4.906-14.506 13.833-17.424-5.552 5.418.702 6.312-3.976 17.605"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-14.913 139.778 2.018-1.402-.088-.053c3.445-5.681 4.031-10.05 4.534-13.429.252-1.69.478-3.138 1.056-4.378a5.763 5.763 0 0 1 1.657-2.111c-6.384 3.037-.5 8.296-12.244 16.795z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-12.72 138.481c6.949-11.455 2.391-17.753 8.575-20.704"
										fill="none"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833h6.112l-6.112-33.615-6.112 33.615h6.112v-33.615"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833h-6.112 6.112v-33.615l-6.112 33.615"
										fill="#7b3f00"
										stroke="none"
									/><path
										d="m-9.124 143.913 1.07-5.404c15.352 2.461 13.726-6.789 22.102-2.54-7.758-.094-4.302 5.036-15.595 9.714"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-9.124 143.912 2.419.436-.025-.1c6.453-1.581 9.957-4.256 12.701-6.29 1.373-1.016 2.558-1.88 3.842-2.349a5.763 5.763 0 0 1 2.666-.32c-6.662-2.367-6.22 5.512-20.534 3.218z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-6.657 144.545c13.014-3.185 14.245-10.862 20.705-8.576"
										fill="none"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833 4.322 4.322L6.76 125.064l-28.092 19.448 4.322 4.321 23.77-23.77"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833-4.322-4.321 4.322 4.321 23.77-23.77-28.092 19.449"
										fill="#7b3f00"
										stroke="none"
									/><path
										d="m-7.954 150.93 4.577-3.065c9.116 12.596 14.507 4.906 17.425 13.832-5.419-5.552-6.436.661-17.73-4.017"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-7.954 150.93 1.402 2.018.053-.089c5.682 3.445 10.051 4.031 13.43 4.534 1.689.252 3.138.479 4.377 1.056a5.763 5.763 0 0 1 2.112 1.658c-3.037-6.384-8.297-.501-16.796-12.244z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-6.657 153.121c11.455 6.95 17.753 2.392 20.705 8.576"
										fill="none"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833v6.112l33.615-6.112-33.615-6.112v6.112h33.615"
										stroke-width=".611"
									/><path
										d="M-17.009 148.833v-6.112 6.112h33.615l-33.615-6.112"
										fill="#7b3f00"
										stroke="none"
									/><path
										d="m-12.089 156.719 5.405 1.069c-2.462 15.353 6.788 13.726 2.54 22.102.094-7.757-5.014-4.165-9.691-15.458"
										stroke-linecap="square"
										stroke-width=".611"
									/><path
										d="m-12.088 156.718-.436 2.419.1-.025c1.582 6.453 4.257 9.957 6.29 12.702 1.016 1.373 1.88 2.557 2.349 3.842a5.763 5.763 0 0 1 .321 2.665c2.367-6.662-5.513-6.22-3.219-20.534z"
										fill="#7b3f00"
										stroke-linecap="square"
										stroke-width=".278"
									/><path
										d="M-12.72 159.186C-9.536 172.2-1.86 173.43-4.146 179.89"
										fill="none"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833-4.322 4.322 28.092 19.448-19.448-28.091-4.322 4.321 23.77 23.77"
										stroke-width=".611"
									/><path
										d="m-17.009 148.833 4.322-4.321-4.322 4.321 23.77 23.77-19.448-28.091"
										fill="#7b3f00"
										stroke="none"
									/></g
								></g
							><path
								d="m-19.105 157.888-2.018 1.403.088.053c-3.445 5.681-4.03 10.05-4.534 13.429-.252 1.69-.478 3.138-1.056 4.377a5.763 5.763 0 0 1-1.657 2.112c6.384-3.037.5-8.297 12.244-16.796z"
								fill="#7b3f00"
								stroke-linecap="square"
								stroke-width=".278"
							/><g stroke-width=".611"
								><path
									d="M-21.297 159.186c-6.95 11.454-2.392 17.752-8.576 20.704"
									fill="none"
								/><path
									d="M-17.009 148.833h-6.112l6.112 33.616 6.112-33.616h-6.112v33.616"
									fill="#fcd116"
								/></g
							></g
						><path d="M-17.009 148.833h6.112-6.112v33.616l6.112-33.616" fill="#7b3f00" /><path
							d="m-17.009 148.833 4.322 4.322-4.322-4.322-23.77 23.77 28.092-19.448"
							fill="#7b3f00"
						/><circle
							cx="-17.009"
							cy="148.833"
							fill="#fcd116"
							r="11.205"
							stroke="#7b3f00"
							stroke-miterlimit="20"
							stroke-width=".611"
						/><g fill="#7b3f00"
							><path
								d="M-8.758 144.351c-.713.815-1.12-.61-3.667-.61-2.547 0-2.954 1.527-3.362 1.221-.407-.305 2.14-2.139 2.955-2.24.814-.102 3.157.713 4.074 1.63m-2.954.916c.713.611.102 1.936-.611 1.936s-2.037-1.223-1.426-2.038"
							/><path
								d="M-15.074 146.185c.102-1.223 1.121-1.426 2.75-1.426 1.63 0 2.344 1.222 2.955 1.528-.713 0-1.324-1.019-2.954-1.019-1.63 0-1.63 0-2.75 1.019m.305.203c.408-.61.917.612 2.037.612 1.12 0 1.732-.306 2.445-.815.713-.51-1.019 1.222-2.139 1.222s-2.649-.611-2.343-1.019m-7.945-1.324c-.51.204-1.325 1.223 0 1.936-1.02-.713-.204-1.732 0-1.936z"
							/><path
								d="M-11.304 145.166c.203.204 1.018 1.223 0 1.936 1.324-.713.509-1.732 0-1.936zm-7.335 4.38c-.917.204-.611 1.528-1.426 1.63-.815.102-1.222 1.019-1.12.917.509-.407 1.63-.713 2.444-.713.815 0 1.019.51 1.732.51s.917-.51 1.732-.51 1.935.306 2.445.713c.101.102-.306-.815-1.12-.917-.816-.102-.51-1.426-1.427-1.63 0 .408.305.306.407.917 0 .51-.916.51-1.12 0 .204.815-.408.815-.917.815s-1.12 0-.917-.815c-.203.51-1.12.51-1.12 0 .102-.611.407-.51.407-.917zm-3.158 3.464c-.815.611-1.018.917-1.12 1.63.244-.428.364-.604.55-.855l-.142-.062c.059.007.112.016.17.024.122-.166.232-.31.542-.737z"
							/><path
								d="m-22.34 153.747-.013.018c.128.03.263.043.404.044a10.998 10.998 0 0 0-.39-.062zm.391.062c.636.112 1.134.258 1.591.406.57-.042 1.357-.187 3.35-.187s2.778.145 3.348.187c.457-.148.956-.294 1.59-.406-1.122.004-2.618-.8-3.31-.8-.814 0-1.018.204-1.629.204s-.815-.203-1.63-.203c-.691 0-2.187.803-3.31.799zm9.879 0c.142 0 .278-.015.405-.044l-.013-.018c-.136.02-.267.04-.391.062z"
							/><path
								d="M-11.678 153.747c.057-.008.11-.017.17-.024-.051.021-.093.04-.143.062.186.251.306.427.55.855-.102-.713-.305-1.019-1.12-1.63.31.427.42.57.543.737z"
							/><path
								d="M-11.65 153.785a.037.037 0 0 0-.006-.007c-1.063.41-1.437.48-2.004.437-.966.313-1.762.629-3.349.629s-2.383-.316-3.349-.629c-.567.042-.941-.027-2.004-.437a.037.037 0 0 1-.005.007c3.2 1.377 2.85 1.873 5.358 1.873s2.158-.496 5.358-1.873zm-10.712-.007a.72.72 0 0 1 .01-.013 1.29 1.29 0 0 1-.157-.042c.058.023.093.034.147.055zm10.706 0c.054-.021.09-.032.148-.055-.05.018-.104.03-.157.042a.72.72 0 0 0 .01.013zm-13.604-9.427c.713.815 1.12-.61 3.667-.61s2.954 1.527 3.362 1.221-2.14-2.139-2.954-2.24-3.158.713-4.075 1.63m2.954.916c-.713.611-.102 1.936.611 1.936s2.038-1.223 1.426-2.038"
							/><path
								d="M-18.944 146.185c-.102-1.223-1.12-1.426-2.75-1.426s-2.344 1.222-2.955 1.528c.713 0 1.324-1.019 2.954-1.019s1.63 0 2.75 1.019m-.305.203c-.407-.61-.917.612-2.037.612s-1.732-.306-2.445-.815 1.019 1.222 2.14 1.222 2.648-.611 2.342-1.019m2.241 10.085c-.51 0-1.833.306 0 .306s.51-.306 0-.306"
							/></g
						></g
					></svg
				>
			{/key}
		</pattern></defs
	><path
		fill="url(#flag)"
		in:draw={drawin}
		style={pathStyle}
		d="M285.5 2c-1.4 1.5-3.1 2-7.2 2-2.9 0-5.3.4-5.3 1 0 .5-1.6 1.7-3.5 2.6-1.9.9-3.5 2.2-3.5 2.8 0 .6-1.5 4.3-3.3 8.1-2.5 5.3-3.1 7.7-2.6 10 1.3 5.6 1 6.3-2.3 7-1.7.4-4.7 2.4-6.7 4.4l-3.5 3.6-.4-2.5c-.2-1.4-.9-2.8-1.6-3.2-1.8-1.2-3.6-.9-3.6.6 0 .8-.8 2.4-1.8 3.6-2 2.4-4.8 1.9-5.7-1.1-.6-1.7-.8-1.8-3.1-.3-1.8 1.2-3.6 1.5-6.9 1-4.2-.7-4.5-.6-5.1 1.8-.8 3.2-1.1 3.2-3.6.1-1.7-2.1-2.8-2.5-7.7-2.5-3.7 0-6.5.6-8.1 1.7-1.7 1.2-2.5 1.3-2.8.5-.2-.7-1.5-2.6-2.8-4.1-1.9-2.3-2.3-3.6-1.8-6 .6-2.6.2-3.7-2.1-6.1-2.1-2.2-3.9-3-8.7-3.5-3.2-.4-6.1-.5-6.4-.3-.2.3.3 2.1 1.1 4.1.9 2.3 1.5 6.8 1.5 11.9 0 7.5-.3 8.7-3 12.8-1.6 2.5-10.1 11.5-18.9 20l-15.9 15.5L139 94c-1.7 10.1.4 18.6 6.6 26 4.3 5.1 6.3 14.1 5.7 25.7-.6 10.8.8 20.7 3.3 23.4 1.2 1.4 1.3 2.2.4 3.8-.6 1.2-.8 2.5-.5 3 .3.5 3.9 3 7.9 5.4l7.5 4.5 2.2-2.4c1.3-1.4 3.4-2.4 5-2.4 1.5 0 3.1-.5 3.4-1 1.1-1.8 2.5-1 2.5 1.4 0 2-1.1 2.7-8.6 5.5-4.8 1.7-8.8 3-8.9 2.9 0-.2-.6-1.4-1.1-2.7-.8-2-2.6-2.8-9.1-4.6-7.4-1.9-8.5-2-12.8-.7l-4.7 1.3 2.4 2.7c1.9 2.1 2.7 4.6 3.6 11.2.7 4.7 1.5 9.5 1.8 10.7.5 1.8 0 2.5-2.1 3.5-1.7.7-3.5 2.9-4.6 5.2-1.5 3.5-1.6 4.3-.3 7.9.8 2.2 2.3 5.4 3.3 7.1 2 3.2 4.7 12.3 3.9 13.2-.3.2-2.2-1-4.4-2.6l-3.8-3.1-1.8 2.3c-1 1.3-2.3 4.2-2.9 6.5-1 3.6-1.8 4.6-5.6 6.4-5.1 2.5-8.2 7.8-8.3 14.1 0 5.3-3.3 11.9-7.4 14.8-5.2 3.6-6.3 8.4-3.5 14.4 1.6 3.2 3.3 4.9 6 6.1 5.8 2.7 6.4 7.2 3.5 26.1-2.1 14.1-2.5 15.4-7.7 25.4l-5.4 10.5-5.7 2c-7.7 2.8-10.5 5.6-11.3 11.5-.6 4.4-.3 5.4 2.3 9.2 1.6 2.4 3.5 6.1 4.1 8.3 1.4 5.1 1.4 14.4 0 19.9-.9 3.6-.8 4.9.6 7.5.8 1.7 2 5.7 2.6 8.8.6 3.3 2.2 7.1 3.7 9.1 2.4 3.2 2.7 4.5 3 13.5.5 14-1 20.8-6.3 28.3-2.4 3.3-5.4 8.7-6.7 12l-2.4 5.9 4.3 13.2c3.8 11.8 4.4 14.7 5.3 28 1.9 28.9 1.8 28.3 11.4 39.2 7.4 8.3 7.6 10.4 2.5 26-4.9 15.5-8.9 21.8-15.3 24.4-4.1 1.7-14.3 3.4-22.6 3.9-3.9.3-4.7.7-6.5 3.8-1.8 3.1-2 5.2-2 20-.1 17.4-.3 18.6-5.3 24.5l-2.4 2.9 2.8 2.3 2.9 2.3h-3.7c-4.5 0-4.7.8-1.3 4.8 3.2 3.8 3.2 7.2-.1 15.2-2.4 6-2.5 7-2.5 28.4-.1 12.1.5 27.7 1.2 34.6.7 6.9 1.2 15.2 1.1 18.5-.3 9.9 1.8 14.5 9.7 20.9 5.6 4.5 7 6.2 7.6 9.3.4 2.5 2.5 5.8 6.2 10.1l5.5 6.2.5 8.1c.7 9.2 2 10.9 8.8 10.9 2.2 0 6.3.3 9.1.6 4.7.6 5.3 1 8.5 5.8 4.6 7 11.9 15.7 20.3 24.4l7.1 7.2.4 8.1.3 8 5.2 2.9c5.8 3.4 12.4 3.9 18.1 1.6 1.9-.8 5.6-1.8 8.2-2.2 2.6-.3 7.1-1.5 9.8-2.5 6-2.3 12.3-2.4 14.9-.4 2.8 2.1 5.9 1.9 9.1-.6 2.5-2 3.1-2.1 8-1 4.2.9 5.9 1 7.6 0 1.5-.8 4.2-.9 8.3-.4 3.4.4 10.9.6 16.7.5 19.8-.3 28.1 2.8 32.3 12.1 2 4.4 13.2 15.2 24.6 23.8 2.5 1.9 6.5 5.3 9 7.6s6.1 5.1 8.1 6.2c4.2 2.4 21.2 8.5 28.4 10.2 2.8.7 7.6 2.5 10.8 4.2 5.3 2.7 6.6 2.9 16.4 2.9 10.3 0 11 .2 18.6 3.7l7.9 3.7-3.6 1.1c-2.1.6-4.6 2.4-6.1 4.5l-2.5 3.4 2.2.9c1.3.4 3.4 1.8 4.8 3.1s4.1 2.9 6 3.6c1.9.7 4.6 2.4 6.1 3.7 1.9 1.8 3.7 2.3 7.6 2.3 4.8 0 5.2-.2 6.2-3.1l1-3 3.1 1.7c2.1 1.3 3 2.6 3 4.5 0 1.8.9 3.2 2.7 4.4 3.9 2.6 6.9 2.2 10.2-1.4 2.3-2.5 3.7-3.1 6.9-3.1 3.1 0 5.1-.8 8.4-3.4 8.7-7 42-23.6 47.4-23.7 1.6 0 4.9-.8 7.4-1.8l4.5-1.9 3.8 3.5c3.2 2.8 4.1 3.2 5.3 2.2 1.2-1 2.2-1 4.8-.1 9 3.3 20 4.7 28.8 3.8 9.7-1 11.8-.6 11.8 2.4 0 1.7.6 2 4.8 2 5.3 0 9.2 2.6 9.2 6.1 0 2.5 2.6 7.7 5.3 10.6 2.4 2.7 5.1 2.9 10 .8 2.5-1 7.1-1.5 14.1-1.5 12.2 0 14 .4 12.6 3-.8 1.6-.3 2 4.3 3 8.4 2 11.3 3.5 13.6 7.4l2.3 3.6 5.1-4.4c6.6-5.5 4.6-4.6 37.4-18.2 19.5-8.1 33-14.5 45.3-21.3 19.6-11 29.9-14.9 42.1-15.9l8.3-.7 1.6-5.3c2.7-9.2 15.9-23.2 28.5-30.2 3.3-1.8 10.7-6.1 16.5-9.5 5.8-3.5 12.4-6.9 14.8-7.6 3.6-1.1 4.2-1.6 4.2-4 0-1.8.7-3.2 2-3.9 2.6-1.4 2.5-2.4-.6-6.6-2.1-2.7-2.5-4.1-2.1-7 1.2-7.2 3.9-11.2 18.3-27.5 1.2-1.3 7.6-7.5 14.2-13.6 11.1-10.4 12-11.6 12.5-15.5.7-6.1 2.2-11.9 3.5-14.5.7-1.2 1.2-5 1.2-8.5v-6.3l7-7.4c6.9-7.3 16-19.3 16-21.1 0-.6-1.5-1-3.4-1-3.6 0-4.6-1.5-4.6-7.2 0-2.3-.5-2.7-4.2-3.3-12.3-1.8-12.3-1.8-12.4-14.4 0-6.8-.6-10.8-1.8-13.6l-1.7-4-1.3 2.4-1.4 2.4-.7-2.2c-.5-1.8 0-3 2.4-5.5l3.2-3.3-2.5-1.1c-2.1-.9-2.6-2.3-4.1-10.7-1.9-10.3-1.3-15.8 2-18.5 2.2-1.8 1.9-2.6-1.6-4.1l-3.1-1.2.6-6.1c.5-4.7 1.2-6.6 3.4-8.9l2.7-2.8-2.9 1.1c-1.6.6-3.2.7-3.5.2-.3-.4-2.5-3.3-4.8-6.3-4.3-5.5-4.8-7.3-3.7-11.6.5-1.7 1.4-2.3 3.5-2.3 3.3 0 3.4-.5 1.4-4-2.5-4.4-1.9-7.6 2-10l3.5-2.1-2-3.9c-2.5-4.9-2.5-6 0-6 1.1 0 2 .7 2 1.5 0 2.4 2.9 1.7 5.6-1.3 1.3-1.5 3.8-5.3 5.6-8.5 4.2-7.8 8.8-11.7 13.7-11.7 2.1 0 7.2-.3 11.4-.6 7.3-.7 7.7-.8 7.7-3.1 0-3.4 1.7-6.3 6.1-10.4 3.5-3.3 3.9-4.2 3.9-8.5 0-2.7.3-5.9.6-7.1.5-2 0-2.4-5.5-4-4.5-1.3-6.1-2.3-6.1-3.6 0-2.1 3.1-2.3 6.3-.4 1.4.9 4 1.2 7 .9 3.9-.3 5-.9 6.4-3.2 1.8-3.1 4.3-4.5 9.7-5.5 3.8-.8 3.9-1 1.4-10.8-1.4-5.6-9.8-13.3-15.4-14.1-3.6-.4-20-8.5-24-11.7-.6-.5-1.7-2.8-2.5-5.1-.9-2.8-2.3-4.7-4.3-5.7-1.6-.9-4.5-3-6.5-4.7-2-1.7-6.2-4-9.5-5-3.9-1.2-6.4-2.7-7.4-4.4-.9-1.4-3-4.1-4.8-6.1-3.1-3.5-3.2-3.9-2.7-10.2.5-6 .2-7.3-3-14.4-2-4.3-4.1-11-4.8-14.8-.9-5.6-1.8-7.7-4.4-10.5-3.2-3.4-7.5-10.9-7.5-13 0-.5 1.1-1 2.4-1 5.3 0 5.7-.8 2.8-5.5-2.4-4-3-4.4-7.7-5.1-2.7-.3-6.7-1.6-8.7-2.8-3.1-1.7-3.8-2.7-3.8-5.3 0-2.9-.5-3.4-7.2-6.7-3.9-2-9.2-5.6-11.7-7.9-5-4.7-15.4-12.7-16.4-12.7-.4 0-2.5 2-4.8 4.5l-4.2 4.5-1.7-3.9c-1.4-2.9-3.4-4.8-8.3-7.8-4.4-2.6-8.3-6.1-11.7-10.3-2.8-3.5-7.9-8.3-11.3-10.6-3.4-2.3-12.1-10.2-19.3-17.6-12.8-13-13.2-13.4-14.3-19.2-1.5-8-7.4-20-11.1-22.6-1.7-1.2-3.9-3.9-5-6.1l-2-3.9h-7.1c-5.2 0-8-.5-11.2-2.2-3.4-1.8-6.4-2.2-16.2-2.6l-12-.4-5.1-5.4c-4.3-4.6-5.5-5.4-8.7-5.4-3 0-3.7-.4-3.7-1.9 0-1-1.1-2.6-2.5-3.5-2-1.3-2.5-2.5-2.5-6 0-2.9-.7-5.3-2.2-7.2-1.2-1.6-2.2-3-2.3-3.1-.1-.1-1.8-.9-3.8-1.8L645 250l-2.5 5c-2.3 4.5-2.8 5-6 5-2.4 0-3.7-.6-4.5-2-.6-1.1-3.4-3.8-6.1-6-4.3-3.4-5.8-4-9.7-4-4.4 0-4.8-.2-6.4-3.8-5-10.6-10.5-18.8-14.1-20.7-2-1.1-3.7-2.8-3.7-3.7 0-4.6-4.6-13.6-9.7-18.9-2.9-3.1-5.9-7.2-6.5-9.1-1.5-4.3-9.5-12.9-17.8-19.3-3.2-2.5-7.5-6.6-9.6-9-4.3-5.3-7.6-5.9-12.3-2-2.4 2.1-3.1 3.6-3.7 8.3-.3 3.1-1.3 7.4-2.1 9.4-1.4 3.6-1.8 3.8-5.9 3.8-3.7 0-4.5.4-5.8 2.8-1 1.9-3.3 3.5-7.1 5.1-5.2 2.2-5.8 2.2-6.7.7-.5-.9-1.9-1.6-3.1-1.6-1.2 0-6.7-3.2-12.2-7.1-12-8.5-11.1-7.5-9.5-9.4 1.2-1.4.8-2.2-2.8-5.5-2.3-2.1-4.2-4.4-4.2-5.1 0-.8-1.4-4.3-3-7.7-2.9-6.1-6.9-10.5-20.9-22.8-2.9-2.6-3.2-3.3-2.3-5.1 1-1.8.6-2.3-2.5-4.4-2.1-1.3-6.1-5.8-9-9.9-4.3-6-6.3-7.9-10.3-9.7-3.7-1.7-5-2.8-5-4.3 0-4.1-8.1-9.5-17.2-11.4-2.1-.5-2.8-1.2-2.8-3 0-3.2-3.2-6.9-11.7-13.5-3.9-3-9.9-9.1-13.4-13.7-5.7-7.3-7-8.4-11.6-9.9l-5.1-1.6.1-4.2c.1-5.5-3.1-12.1-6.1-12.5-1.2-.2-2.2-.9-2.2-1.6 0-2.3-2.9-4.1-4.2-2.8-1.8 1.8-2.6 1.4-3.3-1.7-.6-3-2.6-4.1-7.7-4.1-4.9 0-5.8-.9-5.8-5.5 0-3.9-.4-4.7-4.4-7.9-3.4-2.9-5.2-3.6-8.5-3.6-2.3 0-5.4.6-6.9 1.4-5.8 2.9-9.2 2.8-14.8-.4-6.4-3.6-6.6-3.6-8.9-1z"
	/></svg
>
