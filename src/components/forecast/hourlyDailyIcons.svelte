<script lang="ts">
	import { HOURLY_DAILY } from '../../constants/forecast';
	import type {Root as HOURLY_DAILY_TYPE, Hourly as HOURLY, Daily as DAILY} from '../../types/forecastWeather'
	import { forecastWeatherHourlyDaily, forecastWeatherArr,  } from '../../stores/forecastData';
	import {forecastWeather} from '../../stores/weatherData'
	import CgCalendar from 'svelte-icons-pack/cg/CgCalendar';
	import CgTime from 'svelte-icons-pack/cg/CgTime';
	import {Clock,Calendar} from 'lucide-svelte'
	import IconsBase from './icons/iconsBase.svelte';
	import { transition } from '../../stores/svgTransitions';
	import { onMount } from 'svelte';
	// type forcastWeatherKey
	const icons = [{component:Clock, label:'Clock'},{component:Calendar, label:'Calendar'}];
	const iconNames: Array<string> = Object.keys(HOURLY_DAILY).map(
		(v: string) => HOURLY_DAILY[v as keyof typeof HOURLY_DAILY]
	);

	
	
	$: $forecastWeather, $forecastWeather &&  forecastWeatherArr.set($forecastWeather[$forecastWeatherHourlyDaily] as HOURLY[] | DAILY[])
	
	const setValueArr = (btnType:string)=>{
		// if($forecastWeather) {
			if(btnType === HOURLY_DAILY.HOURLY && $forecastWeather) {
				return forecastWeatherArr.set($forecastWeather[HOURLY_DAILY.HOURLY].slice(0,6))
			}else if (btnType === HOURLY_DAILY.DAILY && $forecastWeather) {
				return forecastWeatherArr.set($forecastWeather[HOURLY_DAILY.DAILY].slice(0,6))
			}
			// 
		// }
	}

	
</script>

<IconsBase iconNames={iconNames} icons={icons} iconType={forecastWeatherHourlyDaily} btnAction={setValueArr}/>


