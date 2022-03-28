<script lang="ts">
	import Keyboard from './keyboard.svelte';
	import { fly, slide, fade } from 'svelte/transition';

	interface Item {
		name: string;
	}

	export let error: { msg: string };
	export let disabled: boolean;
	export let getList: (Item) => Item[];
	export let onSelect: (...args) => Promise<void>;

	let input = '';

	$: list = getList(input);

	let emsg: string;
	let showError: boolean;

	$: {
		if (error?.msg) {
			showError = true;
		}
	}

	$: {
		if (!input && error) {
			emsg = error.msg;
		} else {
			showError = false;
			emsg = '';
		}
	}

	let focus = false;
	let alreadyTyped = false;

	const onType = (key) => {
		if (!alreadyTyped) alreadyTyped = true;

		key = key.toLowerCase();

		if (key === 'clear') {
			input = '';
			return;
		}

		if (key === 'space') {
			input = input + ' ';
			return;
		}
		if (key === 'backspace') {
			if (input.length > 0) {
				input = input.substring(0, input.length - 1);
			}
			return;
		}
		if ('qwertyuiopasdfghjklzxcvbnm'.split('').includes(key)) {
			input = input + key;
			return;
		}

		if (key === 'enter') {
			if (input === '') return;
			const value = input;
			input = '';
			if (list.length > 0) {
				onSelect(list[0].name);
				return;
			}
			onSelect(value);
			return;
		}
	};

	let kb;

	const onKeydown = (event) => {
		const v = event.key.trim() || event.code;
		kb?.tip(v);
		return onType(v);
	};
</script>

<svelte:window on:keydown={onKeydown} />

<div class="autocomplete">
	<div
		class="typing-box-wrapper"
		class:flick={focus && !input}
		class:focus={focus || input}
		on:click={() => (focus = true)}
	>
		{#if input && list.length > 0}
			<div class="select">
				{#each list as item, i}
					<div
						class="item"
						transition:slide
						on:click={() => {
							input = '';
							onSelect(item.name);
						}}
					>
						{item.name}
					</div>
				{/each}
			</div>
		{/if}
		<div class="typing-box">
			{!input && focus ? '|' : ''}{input}
		</div>
	</div>
	{#if false}
		<input
			class="new-answer-input"
			class:disabled
			class:error={showError}
			type="text"
			placeholder="type a country"
			on:keypress={(e) => {
				if (!input) return;
				if (e.key === 'Enter') {
					const value = input;
					input = '';
					if (list.length > 0) {
						return onSelect(list[0].name);
					}
					onSelect(value);
				}
			}}
			bind:value={input}
		/>
	{/if}
	<div class="error-wrapper">
		{#key emsg}
			<p class="error-msg" in:fly={{ y: -40 }} out:fade>
				{showError ? emsg : ''}
			</p>
		{/key}
	</div>
	<div class="keyboard-wrapper" class:focus={!alreadyTyped && focus}>
		<Keyboard bind:this={kb} type={({ key }) => onType(key)} />
	</div>
</div>

<style>
	.typing-box {
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.typing-box-wrapper {
		position: relative;
		width: 80%;
		margin: 0.5rem auto 0;
		padding: 0.25rem;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 0.25rem;
		font-size: 1.2rem;
		line-height: 150%;
		height: 2.5rem;
		display: flex;
		justify-content: center;
	}

	.typing-box-wrapper.flick {
		animation: flick;
		animation-duration: 0.8s;
		animation-iteration-count: infinite;
	}

	@keyframes flick {
		0% {
			color: inherit;
		}
		49% {
			color: inherit;
		}
		50% {
			color: transparent;
		}
		100% {
			color: transparent;
		}
	}

	.typing-box-wrapper.focus {
		border-color: var(--main-color);
	}

	.typing-box-wrapper:hover {
		cursor: pointer;
	}

	.keyboard-wrapper.focus {
		animation: shakeX;
		animation-duration: 1s;
	}

	.error-wrapper {
		height: 2rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.error-msg {
		position: absolute;
		font-size: 1rem;
		line-height: 1rem;
		color: var(--danger-color);
	}

	.new-answer-input {
		margin: 1rem 0;
		padding: 0.25rem;
		box-sizing: border-box;
		border: 2px solid black;
		border-radius: 0.25rem;
		font-size: 1.2rem;
		line-height: 150%;
	}
	.new-answer-input.error {
		animation: shake 0.2s ease-in-out 0s 2;
	}

	.new-answer-input:focus,
	.new-answer-input:focus-visible {
		outline: var(--main-color) auto 1px;
		outline-color: var(--main-color);
		outline-style: auto;
		outline-width: 2px;
	}

	.autocomplete {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: min(90vw, 400px);
	}

	.select {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		position: absolute;
		border: solid 2px lightgray;
		border-radius: 1rem 1rem 0 0;
		bottom: 2.5rem;
		background-color: white;
		width: 100%;
	}

	.select .item {
		padding: 1rem;
		border-bottom: solid 1px lightgray;
		box-sizing: border-box;
		width: 100%;
	}
	.select .item:first-child {
		border: none;
	}

	@keyframes shake {
		0% {
			margin-left: 0rem;
		}
		25% {
			margin-left: 0.2rem;
		}
		75% {
			margin-left: -0.2rem;
		}
		100% {
			margin-left: 0rem;
		}
	}
</style>
