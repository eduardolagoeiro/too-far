<script>
	import { linear } from 'svelte/easing';
	import { fly, blur } from 'svelte/transition';
	import arrow from './assets/arrow.svg';
	import sleep from './utils/sleep';
	import { calcCrow, bearing } from './utils/distance';
	import { countries as c, sanitizeCountryName } from './utils/countries';

	const countries = c.filter(({ code }) =>
		['BR', 'AR', 'CO', 'CH', 'PE', 'VZ', 'ES', 'PT', 'CU', 'CR'].includes(code)
	);

	const AWAIT_ANIMATION = 1000;

	const IMG_ANIM_DUR = 1000;
	const IMG_ANIM_DELAY = 500;

	const HISTORIC_ANIM_DUR = 400;

	let IMG_ANIM_X_OFFSET = 0;
	let IMG_ANIM_Y_OFFSET = 0;

	const ARROW_ANIM_DUR = 1000;
	const ARROW_ANIM_DELAY = 500;

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

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

	let newAnswerInput;
	let newAnswer = '';
	let answerHistoric = [];

	let answering = false;
	let plus;

	async function tryAnswer() {
		if (!newAnswer) {
			console.log({ newAnswer });
			// TODO: alert
			return;
		}

		const foundIndex = leftCountries.findIndex(
			({ name }) => sanitizeCountryName(name) === sanitizeCountryName(newAnswer)
		);

		if (foundIndex === -1) {
			console.log({ foundIndex, newAnswer });
			// TODO: alert
			return;
		}

		const guess = leftCountries[foundIndex];

		// remove target from guess
		leftCountries.splice(0, 1);

		answering = true;
		await sleep(200);

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

		const newTarget = leftCountries[0];
		IMG_ANIM_X_OFFSET = 10 * (newTarget.longitude - targetCountry.longitude);
		IMG_ANIM_Y_OFFSET = -10 * (newTarget.latitude - targetCountry.latitude);

		refCountry = targetCountry;

		targetCountry = newTarget;

		newAnswer = '';

		newAnswerInput?.focus();

		await sleep(AWAIT_ANIMATION);
		answering = false;
	}

	$: totalPoints = num(answerHistoric.reduce((acc, a) => acc + a.points, 0));

	$: distance = calcCrow(refCountry, targetCountry);
	$: direction = bearing(refCountry, targetCountry);

	$: targetImg = getImgFromCode(targetCountry.code);

	$: {
		console.log({ refCountry, targetCountry, distance, direction });
	}

	$: enunciate = `New guess is ${distance.toFixed(0)} Km from ${refCountry.name}`;
</script>

<div class="container">
	<div class="guessing-img">
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
		{#key enunciate}
			<span class="you-are" in:typewriter={{ speed: 2 }}>{enunciate}</span>
		{/key}
	</div>
	<input
		bind:this={newAnswerInput}
		class="new-answer-input"
		disabled={answering}
		type="text"
		placeholder="type a country"
		on:keypress={(e) => {
			if (e.key === 'Enter') tryAnswer();
		}}
		bind:value={newAnswer}
	/>

	<ul class="answers">
		{#each answerHistoric as answer, i}
			<li class="answer" in:fly={{ y: -10, duration: HISTORIC_ANIM_DUR }}>
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
			<li class="answer bold" in:fly={{ y: -10, duration: HISTORIC_ANIM_DUR }}>
				<div>Guess:</div>
				<div>Answer:</div>
				<div>Points:</div>
			</li>
		{/if}
	</ul>
</div>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		--danger-color: #bb2124;
		--sucess-color: #22bb33;
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

	.guessing-img {
		width: 40vh;
		height: 40vh;
	}

	.new-answer-input {
		width: 100%;
		margin: 2.5vh 0;
		box-sizing: border-box;
		font-size: 1.25rem;
		line-height: 150%;
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
		color: var(--sucess-color);
	}

	.answer .points.danger {
		color: var(--danger-color);
	}
</style>
