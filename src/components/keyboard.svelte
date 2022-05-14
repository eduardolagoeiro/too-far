<script lang="ts">
	interface Letter {
		key: string;
		value: string;
	}
	const backspaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve"><path d="M990 446.4v107.2H219.2l194 196.5-76.6 76.6L10 500l326.7-326.7 76.6 76.6-194 196.5H990z"/></svg>`;

	export let type: (Letter) => void;
	const keyboard: Letter[] = [
		{ key: 'q', value: 'q' },
		{ key: 'w', value: 'w' },
		{ key: 'e', value: 'e' },
		{ key: 'r', value: 'r' },
		{ key: 't', value: 't' },
		{ key: 'y', value: 'y' },
		{ key: 'u', value: 'u' },
		{ key: 'i', value: 'i' },
		{ key: 'o', value: 'o' },
		{ key: 'p', value: 'p' },
		{ key: 'spacer-1', value: '' },
		{ key: 'a', value: 'a' },
		{ key: 's', value: 's' },
		{ key: 'd', value: 'd' },
		{ key: 'f', value: 'f' },
		{ key: 'g', value: 'g' },
		{ key: 'h', value: 'h' },
		{ key: 'j', value: 'j' },
		{ key: 'k', value: 'k' },
		{ key: 'l', value: 'l' },
		{ key: 'backspace', value: backspaceSvg },
		{ key: 'spacer-2', value: '' },
		{ key: 'z', value: 'z' },
		{ key: 'x', value: 'x' },
		{ key: 'c', value: 'c' },
		{ key: 'v', value: 'v' },
		{ key: 'b', value: 'b' },
		{ key: 'n', value: 'n' },
		{ key: 'm', value: 'm' },
		{ key: 'enter', value: 'enter' },
		{ key: 'clear', value: 'clear' },
		{ key: 'space', value: 'space' }
	];

	let pressing = {};

	export function tip(key) {
		key = key.toLowerCase();
		pressing[key] = pressing[key] ? pressing[key] + 1 : 1;
		setTimeout(() => {
			pressing[key] = pressing[key] - 1;
		}, 150);
	}
</script>

<div class="keyboard">
	{#each keyboard as letter}
		<div
			class={letter.key + ' letter-wrapper'}
			on:click={() => {
				tip(letter.key);
				type(letter);
			}}
			class:active={pressing[letter.key] && pressing[letter.key] === 1}
		>
			<div class="letter">
				{@html letter.value.length === 1 ? letter.value.toUpperCase() : letter.value}
			</div>
		</div>
	{/each}
</div>

<style>
	.keyboard {
		display: grid;
		grid-template-columns: repeat(21, 1fr);
		grid-template-rows: repeat(4, 1fr);
		row-gap: 0.5vmin;
		column-gap: 0.5vmin;
	}

	.letter-wrapper {
		border: 1px solid black;
		border-radius: 0.2rem;
		text-align: center;
		line-height: 2rem;
		height: 2rem;
		grid-column-end: span 2;
		justify-content: center;
		align-items: center;
		display: flex;
	}

	.letter-wrapper.spacer-1 {
		grid-column-end: span 1;
		grid-row: 2;
		background-color: unset;
		border: none;
		pointer-events: none;
	}

	.letter-wrapper.spacer-2 {
		grid-row: 3;
		background-color: unset;
		border: none;
		pointer-events: none;
	}

	.letter-wrapper.backspace {
		grid-column-end: span 2;
		background-color: #eee;
	}

	.backspace .letter {
		height: 100%;
		width: 50%;
	}

	.letter-wrapper.enter {
		grid-column-end: span 4;
		background-color: #eee;
	}

	.letter-wrapper.space {
		grid-column-start: 7;
		grid-column-end: span 10;
		background-color: #eee;
	}

	.letter-wrapper.clear {
		grid-column-start: 2;
		grid-column-end: span 3;
		background-color: #eee;
	}

	.letter-wrapper.active {
		background-color: #ccc;
	}
</style>
