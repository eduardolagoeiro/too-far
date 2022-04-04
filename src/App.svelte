<script>
	import { linear } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import { differenceInDays } from 'date-fns';
	import flyover from './transitions/flyover';
	import typewriter from './transitions/typewritter';
	import arrow from './assets/arrow.svg';
	import sleep from './utils/sleep';
	import { calcCrow, toDeg } from './utils/distance';
	import { countries as c, sanitizeCountryName } from './utils/countries';
	import Autocomplete from './components/autocomplete.svelte';
	import { gen } from './utils/random';
	import { lang, t } from './lang';

	const storageVersion = 'v0';
	const storageName = 'store/game';
	const diff = differenceInDays(new Date(), new Date(2022, 0, 1, 0, 0, 0, 0));

	const persisted = (() => {
		try {
			const saved = JSON.parse(localStorage.getItem(storageName));
			if (saved.diff === diff && saved.v === storageVersion) {
				return saved;
			}
		} catch (err) {}
	})();

	document.getElementById('splash')?.remove();

	const END_TURN = 10;

	const countries = c.map(({ names, ...country }) => ({
		...country,
		name: names[lang] ?? country.name
	}));

	let turn = persisted?.turn ?? 0;

	const countryPool = countries
		// .filter(({ code }) =>
		// 	['AT', 'BR', 'AR', 'CO', 'CH', 'PE', 'VZ', 'ES', 'PT', 'CU', 'CR'].includes(code)
		// )
		.filter((country) => !country.disabled);

	const indexes = gen(countryPool.length, diff, END_TURN + 1);

	let selectedCountries = persisted?.selectedCountries ?? [];

	const AWAIT_ANIMATION = 1000;

	const IMG_ANIM_DUR = 1000;
	const IMG_ANIM_DELAY = 500;

	const ARROW_ANIM_DUR = 1000;
	const ARROW_ANIM_DELAY = 500;

	async function getTerritoryComponent(code) {
		return {
			Component: (await import(`./territories/${code.toLowerCase()}.svelte`)).default,
			code
		};
	}

	function num(raw, pre = '+') {
		if (raw === 0) return '0';
		return raw > 0 ? `${pre}${raw.toFixed(0)}` : raw.toFixed(0);
	}

	const blockedCountries = [...countries].filter((country) => !!country.disabled);

	let refCountry = countryPool[indexes[indexes.length - 1]];
	let targetCountry = countryPool[indexes[turn - (turn === END_TURN ? 1 : 0)]];

	let IMG_ANIM_X_OFFSET = 10 * (refCountry.longitude - targetCountry.longitude);
	let IMG_ANIM_Y_OFFSET = 10 * (refCountry.latitude - targetCountry.latitude);
	$: direction = toDeg(
		Math.atan2(
			targetCountry.longitude - refCountry.longitude,
			targetCountry.latitude - refCountry.latitude
		)
	);

	let answerHistoric = persisted?.answerHistoric ?? [];
	let answersList;

	let answering = false;
	let plus;
	let isRight = persisted?.isRight ?? false;
	let preEnunciate = persisted?.preEnunciate;
	let streak = persisted?.streak ?? 0;

	let message = { content: '' };

	async function tryAnswer(value) {
		if (gameEnded) {
			return;
		}

		if (!value || answering) {
			return;
		}

		const sanitezed = sanitizeCountryName(value);
		if (selectedCountries.some(({ name }) => sanitizeCountryName(name) === sanitezed)) {
			message = { content: t('error', 'already-been-chosen') };
			return;
		}

		const blockedGuess = blockedCountries.find(
			({ name }) => sanitizeCountryName(name) === sanitezed
		);

		const foundIndex = countryPool.findIndex(({ name }) => sanitizeCountryName(name) === sanitezed);

		if (foundIndex === -1 && !blockedGuess) {
			message = { content: t('error', 'country-not-found') };
			return;
		}

		isRight = foundIndex === indexes[turn];

		isRight ? streak++ : (streak = 0);

		const guess = countryPool[foundIndex] || blockedGuess;

		selectedCountries = [...selectedCountries, countryPool[indexes[turn]]];

		answering = true;

		const dist = calcCrow(guess, targetCountry);

		answerHistoric = [
			...answerHistoric,
			{
				ref: refCountry,
				guess: guess,
				target: targetCountry,
				points: Math.floor(10000 - dist) / 100
			}
		];
		plus = answerHistoric[answerHistoric.length - 1].points;

		preEnunciate = { show: true, country: targetCountry.name };
		await sleep(AWAIT_ANIMATION);

		turn = turn + 1;
		if (turn !== END_TURN) {
			const newTarget = countryPool[indexes[turn]];

			IMG_ANIM_X_OFFSET = 10 * (newTarget.longitude - targetCountry.longitude);
			IMG_ANIM_Y_OFFSET = -10 * (newTarget.latitude - targetCountry.latitude);

			refCountry = targetCountry;

			targetCountry = newTarget;
		}

		if (answersList) answersList.scrollTop = -10000;

		await sleep(AWAIT_ANIMATION);
		answering = false;
	}

	$: totalPoints = num(
		answerHistoric.reduce((acc, a) => acc + a.points, 0),
		''
	);

	$: distance = calcCrow(refCountry, targetCountry);

	$: enunciate = t('enunciate', {
		km: distance.toFixed(0),
		country: refCountry.name
	});

	$: gameEnded = turn === END_TURN ? true : false;

	$: {
		localStorage.setItem(
			storageName,
			JSON.stringify({
				turn,
				diff,
				selectedCountries,
				answerHistoric,
				isRight,
				preEnunciate,
				streak,
				v: storageVersion
			})
		);
	}
</script>

<div class="container">
	<div class="total-points" class:danger={totalPoints < 0}>
		{#if totalPoints && false}
			<span transition:fly={{ y: 20 }} style="position: absolute;">
				{totalPoints}
			</span>
		{/if}
	</div>
	{#if gameEnded}
		<ul class="answers" bind:this={answersList} in:slide>
			{#if answerHistoric.length > 0}
				<li class="answer bold">
					<div>{t('answers', 'guess')}</div>
					<div>{t('answers', 'answer')}</div>
					<div>{t('answers', 'points')}</div>
				</li>
			{/if}
			{#each answerHistoric as answer, i}
				<li class="answer">
					<div class="name">
						{answer.guess.name}
					</div>
					<div class="name">
						{answer.target.name}
					</div>
					<div class="points" class:success={answer.points > 0} class:danger={answer.points < 0}>
						{num(answer.points)}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
	<div class="guessing-img-wrapper">
		{#key targetCountry}
			<div
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
				class="guessing-img"
				alt="a territory"
			>
				{#await getTerritoryComponent(targetCountry.code) then Territory}
					<Territory.Component
						flagexpand={{ duration: 200, easing: linear }}
						drawin={{ duration: 1000 }}
						strokeColor="black"
						fill="#eee"
						strokeWidth={6}
						style={'position: absolute; height: 100%; width: 100%;'}
						showFlag={selectedCountries.some(({ code }) => code === Territory.code)}
						mainColor={targetCountry.color}
					/>
				{:catch err}
					error: {err.message}
				{/await}
			</div>
		{/key}
	</div>
	<div class="distance">
		<div style="position: relative;">
			{#if !gameEnded}
				<img
					in:slide
					src={arrow}
					class="arrow"
					alt="an arrow"
					style={`transform: rotate(${direction.toFixed(2)}deg);
					transition-delay: ${ARROW_ANIM_DELAY / 1000}s;
					transition-duration: ${ARROW_ANIM_DUR / 1000}s;`}
				/>
			{/if}
			{#if !isNaN(plus)}
				<span
					in:flyover={{
						y: 20 * (plus > 0 ? 1 : -1),
						yOffset: 20 * (plus > 0 ? 1 : -1),
						duration: 1000,
						fadeT: 0.8
					}}
					on:introend={() => (plus = undefined)}
					class="plus-points"
					class:danger={plus < 0}
				>
					{num(plus)}
				</span>
			{/if}
		</div>
		{#key preEnunciate}
			<span class="answer-text" class:right={isRight} class:wrong={!isRight}>
				{#if preEnunciate?.show}
					{#if isRight}
						{t('pre-enunciate', 'on-point')}{streak > 1 ? ` (x${streak})` : ''}
					{:else}
						{t('pre-enunciate', 'right-answer')}
						<span class="right-answer">{preEnunciate.country}</span>.
					{/if}
				{/if}
			</span>
		{/key}
		{#key enunciate}
			{#if enunciate && !gameEnded}
				<div class="you-are-wrapper">
					<span class="you-are" in:typewriter={{ speed: 2 }}>{enunciate}</span>
				</div>
			{/if}
		{/key}
	</div>
	{#if !gameEnded}
		<div out:slide>
			<Autocomplete
				getList={(input) =>
					countries
						.filter(({ name }) => sanitizeCountryName(name).includes(sanitizeCountryName(input)))
						.splice(0, 4)}
				disabled={answering}
				onSelect={tryAnswer}
				error={{ msg: message.content }}
			/>
		</div>
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

	.total-points {
		font-size: 2rem;
		position: relative;
		color: var(--main-color);
	}

	.total-points.danger {
		color: var(--danger-color);
	}

	.plus-points {
		font-size: 1.5rem;
		position: absolute;
		color: var(--success-color);
	}

	.plus-points.danger {
		color: var(--danger-color);
	}

	.container {
		margin: 1vh auto;
		max-width: min(95vmin, 600px);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: calc(100vh - 65px);
		box-sizing: border-box;
	}

	@supports (-webkit-touch-callout: none) {
		.container {
			min-height: calc(100vh - 100px);
		}
	}

	.distance {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 2vh;
		text-align: center;
	}

	.distance .arrow {
		width: max(5vh, 24px);
		height: max(5vh, 24px);
		transition: transform;
	}

	.distance .you-are-wrapper {
		min-height: 3rem;
		padding: 0 2rem;
	}

	.distance .you-are {
		min-height: 1.5rem;
		line-height: 1.5rem;
	}

	.distance .answer-text {
		min-height: 1.5rem;
		line-height: 1.5rem;
	}

	.distance .answer-text .right-answer {
		font-weight: 600;
	}

	.distance .answer-text.right {
		animation: heartBeat;
		animation-delay: 0.3s;
		animation-duration: 1s;
	}

	.distance .answer-text.wrong {
		animation: headShake;
		animation-delay: 0.3s;
		animation-duration: 0.5s;
	}

	.guessing-img-wrapper {
		position: relative;
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
		display: grid;
		grid-gap: 1.5vh;
		gap: 1vh;
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
