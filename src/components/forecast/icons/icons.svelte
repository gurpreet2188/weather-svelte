<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { transition } from '../../../stores/svgTransitions';
	import { snowRainIcon } from '../../../stores/forecastData';
	import { forecastWeatherHourlyDaily } from '../../../stores/forecastData';
	import type { SNOW_RAIN_ICONS } from '../../../types/icons';
	import { ICONS } from '../../../constants/themeConfig';

	// export let iconColor: string;
	export let btnAction: (btnType: string) => void | null;
	export let icon: any;
	export let id: string;
	export let iconType: Writable<string>;

	const iconColor = ICONS.COLOR_LIGHT;
	const iconSize = ICONS.SIZE_DEFAULT_MOBILE;
	const onClickHandle = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		if (btnAction) {
			btnAction(id);
		}
		iconType.set(id);
		transition.set(false);
		setTimeout(() => {
			transition.set(true);
		}, 500);
	};

	let iconDisplay: string = `block`;

	$: $forecastWeatherHourlyDaily,
		$snowRainIcon &&
			(iconDisplay =
				id in $snowRainIcon
					? $snowRainIcon[id as keyof SNOW_RAIN_ICONS]
						? 'block'
						: 'none'
					: 'block');

</script>

<button
	on:click={onClickHandle}
	id={$iconType}
	style="display:{iconDisplay}; background: {id === $iconType ? 'rgba(119,141,168,0.6)' : '#e0e1dd' }"
	class="bg-[#e0e1dd] rounded-lg p-[0.1rem] border-[2px] border-[{iconColor}]"
>
	<svelte:component this={icon.component} label={icon.lable} color={id === $iconType ? "#e0e1dd" :iconColor} size={iconSize} strokeWidth={id === $iconType ? 2 : 1} absoluteStrokeWidth />
</button>
