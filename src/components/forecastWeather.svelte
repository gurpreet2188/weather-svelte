<script lang="ts">
	import Graph from './forecast/graph.svelte';
	import HourlyDailyIcons from './forecast/hourlyDailyIcons.svelte';
	import WeatherDataTypeIcons from './forecast/weatherDataTypeIcons.svelte';
	import { forecastWeather } from '../stores/weatherData';
	import { HOURLY_DAILY, WEATHER_DATA_TYPES } from '../constants/forecast';
	import {
		snowRainIcon,
		forecastWeatherDataTypes,
		forecastWeatherHourlyDaily,
		forecastWeatherValueArr
	} from '../stores/forecastData';

	import { FORECAST_HOURLY_DATA_JSON, FORECAST_DAILY_DATA_JSON } from '../constants/weatherData';
	import WeatherDataNames from './forecast/weatherDataNames.svelte';

	let rainArr: number[] | null;
	let snowArr: number[] | null;

	const checkVal = (v: Array<number>) => {
		if (Math.max(...v) === Math.min(...v)) return false;
		else return true;
	};

	const setVals = (
		arr: { [key: string]: any },
		weatherType: string,
		weatherJSONType: { [key: string]: any }
	) => {
		rainArr = arr[weatherType]
			.slice(0, 6)
			.map((v: number) => weatherJSONType[WEATHER_DATA_TYPES.RAIN](v));
		snowArr = arr[weatherType]
			.slice(0, 6)
			.map((v: number) => weatherJSONType[WEATHER_DATA_TYPES.SNOW](v));
		forecastWeatherValueArr.set(
			arr[weatherType].slice(0, 6).map((v: number) => weatherJSONType[$forecastWeatherDataTypes](v))
		);
	};

	$: if ($forecastWeatherHourlyDaily === HOURLY_DAILY.HOURLY && $forecastWeather && $forecastWeatherDataTypes) {
		setVals($forecastWeather, HOURLY_DAILY.HOURLY, FORECAST_HOURLY_DATA_JSON);
	}
	$: if ($forecastWeatherHourlyDaily === HOURLY_DAILY.DAILY && $forecastWeather  && $forecastWeatherDataTypes) {
		setVals($forecastWeather, HOURLY_DAILY.DAILY, FORECAST_DAILY_DATA_JSON);
	}

	$: rainArr,
		snowArr,
		$forecastWeatherHourlyDaily,
		(rainArr, snowArr) &&
			snowRainIcon.set({
				[WEATHER_DATA_TYPES.SNOW]: checkVal(snowArr as number[]),
				[WEATHER_DATA_TYPES.RAIN]: checkVal(rainArr as number[])
			});
</script>
<!-- 
<div class="flex flex-col justify-between items-center gap-[1rem] w-[100vw] bg-black lg:w-[10vw] md:contents  p-1">
		{#if $snowRainIcon}
		<HourlyDailyIcons />
		<Graph />
		<WeatherDataNames />
		<WeatherDataTypeIcons />
		{/if}
</div> -->

<div class="flex flex-col justify-between items-center gap-[1rem]  w-[100vw] h-[100%]  landscape:w-[50%] lg:flex lg:gap-[2rem] lg:w-[50%]">
	{#if $snowRainIcon}
	<div class="flex justify-between items-center w-[100%] h-[25%] px-[2rem]">
		<HourlyDailyIcons />
		<WeatherDataNames />
	</div>
	<Graph />
	<WeatherDataTypeIcons />
	{/if}
</div>
