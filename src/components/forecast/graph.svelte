<script lang="ts">
	import {
		forecastWeatherArr,
		forecastWeatherDataTypes,
		forecastWeatherHourlyDaily,
		forecastWeatherValueArr,
		forecastWeatherGraphProps
	} from '../../stores/forecastData';
	import { calcXYAxis } from '../../helper/calculateXYAxis';
	import { HOURLY_DAILY } from '../../constants/forecast';
	import { draw, fade } from 'svelte/transition';
	import { transition } from '../../stores/svgTransitions';
	import WeatherIcon from '../weatherIcon.svelte';
	import { ICONS } from '../../constants/themeConfig';

	let height: number;
	let width: number;
	const iconSize: number = ICONS.SIZE_DEFAULT_MOBILE;
	const weatherIconColor: string = ICONS.COLOR_LIGHT_WEATHER;

	$: $forecastWeatherValueArr,
		$forecastWeatherDataTypes,
		$forecastWeatherValueArr &&
			height &&
			width &&
			calcXYAxis($forecastWeatherValueArr, height, width);

	setTimeout(() => {
		transition.set(true);
	}, 2);

	const unixToTime = (time: number) => {
		const date = new Date(time * 1000);
		const hours = date.getHours();
		
		const day = date.getDay();
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		if ($forecastWeatherHourlyDaily === HOURLY_DAILY.HOURLY) {
			return `${hours >= 13 ? hours - 12 : hours === 0 ? 12 : hours}${hours >= 12 ? ' pm' : ' am'}`;
		} else {
			return days[day];
		}
	};
</script>


<div class="h-[50%] sm:landscape:h-[50%] md:landscape:h-[65%] w-[100vw] lg:w-[100%] landscape:w-[100%]" bind:clientHeight={height} bind:clientWidth={width}>

	<svg width="{width ? width: 0}px" height="{height ? height:0}px" viewBox="0, 0, {width ? width: 0}, {height ? height:0}">
		{#if $transition && height && width}
		<g style="transform: translate({width - width * 0.91}px,0);" in:fade out:fade>
			$:{#if $forecastWeatherArr && $forecastWeatherValueArr && $forecastWeatherGraphProps}
				{#each $forecastWeatherGraphProps.xAxis as x, i}
					<foreignObject
						x={x - 7}
						y={$forecastWeatherGraphProps.yAxis[i] - 55}
						width="100%"
						height="100%"
					>
						<WeatherIcon
							weatherID={$forecastWeatherArr[i].weather[0].id}
							size={iconSize}
							color={weatherIconColor}
						/>
					</foreignObject>
					<text
						{x}
						y={$forecastWeatherGraphProps.yAxis[i] - 15}
						text-anchor="middle"
						dominant-baseline="centeral"
						style="font-size: 2.5rem; fill:#415a77;"
						>{!Number.isInteger($forecastWeatherValueArr[i])
							? $forecastWeatherValueArr[i].toFixed(2)
							: $forecastWeatherValueArr[i]}</text
					>
					<text
						{x}
						y={height - 20}
						text-anchor="middle"
						dominant-baseline="middle"
						
						style="font-size: {$forecastWeatherHourlyDaily === HOURLY_DAILY.HOURLY
							? '1.8rem'
							: '1.3rem'}; fill:#1b263b;">{unixToTime($forecastWeatherArr[i].dt)}</text
					>
					<!-- <circle cx={x} cy={$forecastWeatherGraphProps.yAxis[i]} r="2" fill={weatherIconColor} /> -->
				{/each}
			{/if}
			$:{#if $forecastWeatherGraphProps && $transition}

				<polygon
					fill="#778da9"
					fill-opacity='0.1'
					stroke-opacity='0.3'
					stroke={weatherIconColor}
					stroke-width={'1px'}
					transition:draw={{delay:2000, duration:1000}}
					opacity="1"
					points='{0},{height - height * 0.25} {$forecastWeatherGraphProps.xyAxis} {$forecastWeatherGraphProps.xAxis[$forecastWeatherGraphProps.xAxis.length - 1]},{height - height * 0.25}'
				/>
			{/if}
		</g>
		{/if}
	</svg>

</div>

