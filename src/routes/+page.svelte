<script lang="ts">
	import '../app.css';
	import { currentWeather, forecastWeather, fetchWeatherData } from '../stores/weatherData';
	import CurrentWeatherCondition from '../components/currentWeatherCondition.svelte';
	import Location from '../components/location.svelte';
	import ForecastWeather from '../components/forecastWeather.svelte';
	import { onMount } from 'svelte';
	import { locationPermissionState, locationPos } from '../stores/location';
	import Welcome from '../components/welcome.svelte';
	import { getLocation, getLocationPermissionStatus } from '../helper/location';
	import Loading from '../components/loading.svelte';

	let checkSesssionstorage: boolean = false;
	let resetWeatherData: boolean;

	getLocationPermissionStatus().then((d) => locationPermissionState.set(d as string));
	$: if ($locationPermissionState === 'granted') {
		getLocation().then(
			(pos) => pos && locationPos.set({ lat: pos.coords.latitude, lon: pos.coords.longitude })
		);
	}

	$: if ($currentWeather === null && $locationPos) {
		fetchWeatherData('currentWeather', $locationPos).then((d) => {
			currentWeather.set(d);
		});
	}
	$: if ($forecastWeather === null && $locationPos) {
		fetchWeatherData('forecastWeather', $locationPos).then((d) => {
			forecastWeather.set(d);
		});
	}

	$: if ($forecastWeather && $currentWeather) {
		if (!sessionStorage.getItem('weatherTime')) {
			sessionStorage.setItem('weatherTime', JSON.stringify(Date.now()));
		}
	}
	onMount(() => {
		if (sessionStorage.getItem('weatherTime')) {
			if (
				parseInt(JSON.parse(sessionStorage.getItem('weatherTime') as string)) + 600 <
				Date.now()
			) {
				console.log('reset weather');
				currentWeather.set(null);
				forecastWeather.set(null);

				sessionStorage.setItem('weatherTime', JSON.stringify(Date.now()));
			}
		}
	});

	$: console.log($locationPos, resetWeatherData, checkSesssionstorage);
</script>

{#if $currentWeather}
	<div
		class="flex sm:landscape:contents md:flex landscape:px-1 lg:landscape:flex lg:landscape:px-[10rem] flex-col justify-center items-center gap-[1rem] bg-[#e0e1dd] h-[100%] py-[1rem] lg:p-[10rem] lg:flex-row lg:border lg:border-black/50"
	>
		<div
			class="landscape:m-auto landscape:flex flex-col lg:flex gap-[2rem] lg:border lg:border-black/50 lg:w-[70rem] lg:landscape:w-[70rem] landscape:w-[45rem] landscape:px-1 lg:landscape:p-[1rem] lg:p-[4rem]"
		>
			<Location />
			<div class="flex lg:flex-row flex-col justify-center items-center gap-[2rem] w-[100%] h-[90%]">
				<CurrentWeatherCondition />
				<ForecastWeather />
			</div>
		</div>
		<!-- <div
			class="lg:hidden flex flex-col justify-center items-center gap-[1rem] md:gap-[2rem] landscape:hidden h-[100%]"
		>
			<Location />
			<CurrentWeatherCondition />
			<ForecastWeather />
		</div> -->
	</div>
{:else if $locationPermissionState === 'prompt' || $locationPermissionState ==='denied'}
	<Welcome />
{:else if $locationPermissionState === 'granted'}
<Loading/>
{:else}
	<Loading/>
{/if}

<style>
</style>
