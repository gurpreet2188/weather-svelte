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
		// const mins = date.getMinutes()
		const day = date.getDay();
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		// console.log(day);
		if ($forecastWeatherHourlyDaily === HOURLY_DAILY.HOURLY) {
			return `${hours >= 13 ? hours - 12 : hours === 0 ? 12 : hours}${hours >= 12 ? ' pm' : ' am'}`;
		} else {
			return days[day];
		}
	};

	let transitionForecastComponent = false;

	setTimeout(() => {
		transitionForecastComponent = true;
	}, 1);

	console.log($transition);
</script>

<!-- {#if transitionForecastComponent} -->
<div class="h-[50%] w-[100vw] lg:w-[100%] landscape:w-[100%]" bind:clientHeight={height} bind:clientWidth={width}>
	<!-- {#if height && width}  -->
	<svg width="{width && width}px" height="{height && height}px" viewBox="0, 0, {width && width}, {height && height}">
		$: {#if $transition}
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
			$:{#if height && width && $forecastWeatherGraphProps}
				{console.log($forecastWeatherGraphProps.xyAxis)}
				<polygon
					fill="#778da9"
					fill-opacity='0.2'
					stroke={weatherIconColor}
					stroke-width={'1px'}
					opacity="1"
					points='{0},{ height - height * 0.25} {$forecastWeatherGraphProps.xyAxis} {$forecastWeatherGraphProps.xAxis[$forecastWeatherGraphProps.xAxis.length - 1]},{height - height * 0.25}'
				/>
			{/if}
		</g>
		{/if}
	</svg>
<!-- {/if} -->
</div>
<!-- {/if} -->
