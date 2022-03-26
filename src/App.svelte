<script>
	import { linear } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import typewriter from './transitions/typewritter';
	import arrow from './assets/arrow.svg';
	import sleep from './utils/sleep';
	import { calcCrow, toDeg } from './utils/distance';
	import { countries, sanitizeCountryName } from './utils/countries';
	import Autocomplete from './components/autocomplete.svelte';

	// const countries = c.filter(({ code }) =>
	// 	['BR', 'AR', 'CO', 'CH', 'PE', 'VZ', 'ES', 'PT', 'CU', 'CR'].includes(code)
	// );

	let selectedCountries = [];

	const AWAIT_ANIMATION = 1000;

	const IMG_ANIM_DUR = 1000;
	const IMG_ANIM_DELAY = 500;

	const HISTORIC_ANIM_DUR = 400;

	const ARROW_ANIM_DUR = 1000;
	const ARROW_ANIM_DELAY = 500;

	function getImgFromCode(code) {
		return `/maps/${code.toLowerCase()}.svg`;
	}

	function num(raw) {
		if (raw === 0) return '0';
		return raw > 0 ? `+${raw.toFixed(0)}` : raw.toFixed(0);
	}

	const leftCountries = [...countries].sort(() => (Math.random() > 0.5 ? 1 : -1));

	let refCountry = leftCountries[leftCountries.length - 1];

	// always get target from index 0
	let targetCountry = leftCountries[0];

	let IMG_ANIM_X_OFFSET = 10 * (refCountry.longitude - targetCountry.longitude);
	let IMG_ANIM_Y_OFFSET = 10 * (refCountry.latitude - targetCountry.latitude);
	$: direction = toDeg(
		Math.atan2(
			targetCountry.longitude - refCountry.longitude,
			targetCountry.latitude - refCountry.latitude
		)
	);

	let answerHistoric = [];
	let answersList;

	let answering = false;
	let plus;
	let preEnunciate;
	let streak = 0;

	let message = { content: '' };

	async function tryAnswer(value) {
		if (!value || answering) {
			return;
		}

		const sanitezed = sanitizeCountryName(value);
		if (selectedCountries.some(({ name }) => sanitizeCountryName(name) === sanitezed)) {
			message = { content: 'Country has already been chosen.' };
			return;
		}

		const foundIndex = leftCountries.findIndex(
			({ name }) => sanitizeCountryName(name) === sanitezed
		);

		if (foundIndex === -1) {
			message = { content: 'Country not found.' };
			return;
		}

		const isRight = foundIndex === 0;

		isRight ? streak++ : (streak = 0);

		const guess = leftCountries[foundIndex];

		// remove target from guess
		selectedCountries = [...selectedCountries, ...leftCountries.splice(0, 1)];

		answering = true;

		const dist = calcCrow(guess, targetCountry);

		answerHistoric = [
			...answerHistoric,
			{
				ref: refCountry,
				guess: guess,
				target: targetCountry,
				points: Math.floor(10000 - dist) / 10
			}
		];
		plus = answerHistoric[answerHistoric.length - 1].points;

		preEnunciate = isRight
			? `On point!${streak > 1 ? ` (x${streak})` : ''}`
			: `Right answer was: ${targetCountry.name}.`;
		await sleep(AWAIT_ANIMATION);

		const newTarget = leftCountries[0];
		IMG_ANIM_X_OFFSET = 10 * (newTarget.longitude - targetCountry.longitude);
		IMG_ANIM_Y_OFFSET = -10 * (newTarget.latitude - targetCountry.latitude);

		refCountry = targetCountry;

		targetCountry = newTarget;

		if (answersList) answersList.scrollTop = -10000;

		await sleep(AWAIT_ANIMATION);
		answering = false;
	}

	$: totalPoints = num(answerHistoric.reduce((acc, a) => acc + a.points, 0));

	$: distance = calcCrow(refCountry, targetCountry);
	// $: direction = bearing(refCountry, targetCountry);

	$: targetImg = getImgFromCode(targetCountry.code);

	$: {
		console.log({ refCountry, targetCountry, distance, direction });
	}

	$: enunciate = `New guess is ${distance.toFixed(0)} Km from ${refCountry.name}.`;
</script>

<div class="container">
	<div class="guessing-img-wrapper">
		{#key targetImg}
			<img
				in:fly={{
					x: IMG_ANIM_X_OFFSET,
					y: IMG_ANIM_Y_OFFSET,
					duration: IMG_ANIM_DUR,
					delay: IMG_ANIM_DELAY,
					easing: linear
				}}
				out:fly={{
					x: -IMG_ANIM_X_OFFSET,
					y: -IMG_ANIM_Y_OFFSET,
					duration: IMG_ANIM_DUR,
					delay: IMG_ANIM_DELAY,
					easing: linear
				}}
				style="position: absolute;"
				src={targetImg}
				class="guessing-img"
				alt="a territory"
			/>
		{/key}
	</div>
	<div class="distance">
		<img
			src={arrow}
			class="arrow"
			alt="an arrow"
			style={`transform: rotate(${direction.toFixed(2)}deg);
			transition-delay: ${ARROW_ANIM_DELAY / 1000}s;
			transition-duration: ${ARROW_ANIM_DUR / 1000}s;`}
		/>
		{#key preEnunciate}
			<span class="you-are" in:fade>{preEnunciate || ''}</span>
		{/key}
		{#key enunciate}
			<span class="you-are" in:typewriter={{ speed: 2 }}>{enunciate}</span>
		{/key}
	</div>
	<Autocomplete
		getList={(input) =>
			countries
				.filter(({ name }) => sanitizeCountryName(name).includes(sanitizeCountryName(input)))
				.splice(0, 4)}
		disabled={answering}
		onSelect={tryAnswer}
		error={{ msg: message.content }}
	/>
	{#if false}
		<ul class="answers" bind:this={answersList}>
			{#each answerHistoric as answer, i}
				<li class="answer">
					<div class="name">
						{answer.guess.name}
					</div>
					<div class="name">
						({answer.target.name})
					</div>
					<div class="points" class:success={answer.points > 0} class:danger={answer.points < 0}>
						{num(answer.points)}
					</div>
				</li>
			{/each}
			{#if answerHistoric.length > 0}
				<li class="answer bold">
					<div>Guess:</div>
					<div>Answer:</div>
					<div>Points:</div>
				</li>
			{/if}
		</ul>
	{/if}
</div>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		--danger-color: #bb2124;
		--success-color: #22bb33;
		--warning-color: #f0ad4e;
		--main-color: #5bc0de;
		--bg-color: #aaaaaa;
	}

	.container {
		margin: 3vh auto 0;
		max-width: min(90vmin, 600px);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 80vh;
	}

	.distance {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 2vh;
		gap: 2vh;
		text-align: center;
	}

	.distance .arrow {
		width: max(5vh, 24px);
		height: max(5vh, 24px);
		transition: transform;
	}

	.distance .you-are {
		min-height: 1.5rem;
		line-height: 1.5rem;
	}

	.guessing-img-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;
		margin-bottom: 1vh;
		flex-grow: 2;
	}

	.guessing-img {
		width: 100%;
		height: 100%;
	}

	.bold {
		font-weight: 600;
	}

	.answers {
		width: 90%;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: space-between;
		gap: 1.5vh;
		font-size: 1rem;
		line-height: 1rem;
		overflow-y: scroll;
		max-height: 20vh;
		padding: 2vh;
		margin: 2vh 0;
	}

	.answer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-content: space-between;
		width: 100%;
		gap: 5vw;
		text-align: left;
	}

	.answer :last-child {
		width: 30%;
	}

	.answer .name {
		text-overflow: ellipsis;
		line-height: 120%;
		white-space: nowrap;
		overflow-x: hidden;
	}

	.answer .points.success {
		color: var(--success-color);
	}

	.answer .points.danger {
		color: var(--danger-color);
	}
</style>
