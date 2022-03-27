import { linear } from 'svelte/easing';

export type EasingFunction = (t: number) => number;

export interface FlyParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	x?: number;
	y?: number;
	xOffset?: number;
	yOffset?: number;
	fade?: boolean;
	fadeT?: number;
}

export interface TransitionConfig {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	css?: (t: number, u: number) => string;
	tick?: (t: number, u: number) => void;
}

export default function flyover(
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = linear,
		fade = true,
		x = 0,
		y = 0,
		xOffset = 0,
		yOffset = 0,
		fadeT = 0.5
	}: FlyParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const old_o = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t) => {
			let o = old_o;
			if (fade) {
				if (t % fadeT < 1 - fadeT) {
					if (t < 0.5) {
						o = (t % fadeT) * (1 / (1 - fadeT));
					} else {
						o = 1 - (t % fadeT) * (1 / (1 - fadeT));
					}
				} else {
					o = 1;
				}
			}
			return `
			transform: ${transform} translate(${(1 - t) * x - xOffset}px, ${(1 - t) * y - yOffset}px);
			opacity: ${o}`;
		}
	};
}
