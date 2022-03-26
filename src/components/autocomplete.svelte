<script>
	import { fly, slide } from 'svelte/transition';

	export let error = { msg: '' };
	export let disabled = false;
	export let getList = (entry = '') => {
		return [];
	};
	export let onSelect = async (...args) => {};

	let input = '';

	$: list = getList(input);

	let emsg = '';
	let showError = false;

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
</script>

<div class="autocomplete">
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
	<input
		class="new-answer-input"
		class:disabled
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
	<p class="error-msg">
		{showError ? emsg : ''}
	</p>
</div>

<style>
	.error-msg {
		height: 1rem;
		font-size: 1rem;
		line-height: 1rem;
		color: var(--danger-color);
	}

	.new-answer-input {
		margin: 1rem 0;
		padding: 0.25rem;
		box-sizing: border-box;
		border-color: lightgray;
		font-size: 1.2rem;
		line-height: 150%;
	}

	.autocomplete {
		position: relative;
	}

	.select {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		position: absolute;
		border: solid 1px lightgray;
		border-radius: 1rem 1rem 0 0;
		bottom: 3.8rem;
		background-color: white;
		left: 0;
		right: 0;
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
</style>
