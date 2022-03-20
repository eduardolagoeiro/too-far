<script>
	import { linear } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import logo from './assets/svelte.png';
	import arrow from './assets/arrow.svg';
	import sleep from './utils/sleep';
	import { calcCrow, bearing } from './utils/distance';
	import { countries, sanitizeCountryName } from './utils/countries';

	function getImgFromCode(code) {
		return logo;
	}

	function num(raw) {
		return raw > 0 ? `+${raw.toFixed(0)}` : raw.toFixed(0);
	}

	const leftCountries = [...countries].sort(() => (Math.random() > 0.5 ? 1 : -1));

	let [refCountry] = leftCountries.splice(0, 1);

	// always get target from index 0
	let targetCountry = leftCountries[0];

	let newAnswer = '';
	let answers = [];

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

		// remove the guess/target from left countries
		const [guess] = leftCountries.splice(foundIndex, 1);

		// if guess is not target
		if (foundIndex !== 0) {
			// remove target from guess
			leftCountries.splice(0, 1);
		}

		answering = true;
		await sleep(200);

		answers = [
			...answers,
			{
				ref: refCountry,
				guess: guess,
				target: targetCountry,
				points: Math.floor(10000 - calcCrow(guess, targetCountry)) / 10
			}
		];
		plus = answers[answers.length - 1].points;

		refCountry = guess;

		targetCountry = leftCountries[0];

		newAnswer = '';

		answering = false;
	}

	$: totalPoints = num(answers.reduce((acc, a) => acc + a.points, 0));

	$: distance = calcCrow(refCountry, targetCountry);
	$: direction = bearing(refCountry, targetCountry);

	$: targetImg = getImgFromCode(targetCountry.code);

	$: {
		console.log({ refCountry, targetCountry, distance, direction });
	}
</script>

<div class="container">
	<div class="total-points" class:danger={totalPoints < 0}>
		{#key totalPoints}
			<span transition:fly={{ y: 20 }}>
				{totalPoints}
			</span>
		{/key}
		{#if !isNaN(plus)}
			<span
				in:fly={{ y: 25, duration: 250, easing: linear }}
				out:fly={{ y: -25, duration: 250, easing: linear }}
				on:introend={() => (plus = undefined)}
				class="plus-points"
				class:danger={plus < 0}
			>
				{num(plus)}
			</span>
		{/if}
	</div>
	<img src={targetImg} class="guessing-img" alt="a territory" />
	<div class="distance">
		<img
			src={arrow}
			class="arrow"
			alt="an arrow"
			style={`transform: rotate(${direction.toFixed(2)}deg)`}
		/>
		<span class="km">{distance.toFixed(0)} km</span>
		<span class="you-are">New guess is {distance.toFixed(0)} km far from {refCountry.name}</span>
	</div>
	<input
		class="new-answer-input"
		disabled={answering}
		type="text"
		placeholder="type a country"
		on:keypress={(e) => {
			if (e.key === 'Enter') tryAnswer();
		}}
		bind:value={newAnswer}
	/>

	{#if answers.length > 0}
		guesses:
	{/if}
	<ul class="answers">
		{#each answers as answer, i}
			<li class="answer">
				<div class="name">
					{answer.ref.name}
				</div>
				<div class="name">
					{answer.guess.name}
				</div>
				<div class="points" class:danger={answer.points < 0}>
					{num(answer.points)}
				</div>
				<div class="name">
					({answer.target.name})
				</div>
			</li>
		{/each}
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

	.total-points {
		font-size: 2rem;
		color: var(--main-color);
	}
	.total-points.danger {
		color: var(--danger-color);
	}

	.plus-points {
		font-size: 1.5rem;
		position: absolute;
		color: var(--sucess-color);
	}
	.plus-points.danger {
		color: var(--danger-color);
	}

	.distance {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2vh;
		text-align: center;
	}

	.distance .arrow {
		width: max(5vh, 24px);
		height: max(5vh, 24px);
		transition-duration: 200ms;
	}

	.distance .km {
		font-size: 1.5rem;
	}

	.guessing-img {
		width: 40vh;
	}

	.new-answer-input {
		width: 100%;
		margin: 2.5vh 0;
		box-sizing: border-box;
		font-size: 1.25rem;
		line-height: 150%;
	}

	.answers {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5vh;
		font-size: 1rem;
		line-height: 1rem;
		overflow-y: scroll;
		max-height: 20vh;
		padding: 2vh;
		margin: 2vh 0;
	}

	.answer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 5vw;
	}

	.answer .name {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.answer .points {
		color: var(--sucess-color);
	}

	.answer .points.danger {
		color: var(--danger-color);
	}
</style>
