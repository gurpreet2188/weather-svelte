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
	import { fly } from 'svelte/transition';

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

	
</script>

{#if $currentWeather}
	<div
		 class="flex md:flex landscape:px-1 lg:landscape:flex flex-col justify-between items-center gap-[1rem] bg-[#e0e1dd] h-[100%] lg:landscape:flex-row lg:landscape:border lg:landscape:border-black/50"
	>
		<div
		in:fly={{duration:1000,y:'100px'}}	
		class="landscape:m-auto flex flex-col justify-between lg:landscape:h-[70%] h-[100dvh] lg:landscape:border lg:landscape::border-black/50 lg:w-[70rem] lg:landscape:w-[60rem] w-[100vw] landscape:px-1 lg:landscape:p-[1rem] lg:p-[4rem]"
		>
			<Location />
			<div class="flex lg:flex-row landscape:flex-row flex-col justify-between items-center gap-[2rem] w-[100%] h-[90%] landscape:h-[100%]">
				<CurrentWeatherCondition />
				<ForecastWeather />
			</div>
		</div>
	</div>
{:else if $locationPermissionState === 'prompt' || $locationPermissionState ==='denied'}
	<div out:fly={{duration:300, y:'-100px'}}>
		<Welcome />
	</div>
{:else if $locationPermissionState === 'granted'}
<Loading/>
{:else}
	<Loading/>
{/if}

<style>
</style>
