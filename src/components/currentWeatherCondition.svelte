<script lang="ts">
	import { currentWeather } from '../stores/weatherData';
	import {ChevronDown, ChevronUp} from 'lucide-svelte'
	import WeatherIcon from './weatherIcon.svelte';
	import { ICONS } from '../constants/themeConfig';

	const iconColor: string = ICONS.COLOR_LIGHT
	const weatherIconColor: string = ICONS.COLOR_LIGHT_WEATHER
	const iconSize:number = ICONS.SIZE_DEFAULT_MOBILE
</script>

{#if $currentWeather}
	<div class="flex flex-col justify-center items-center gap-[1rem] p-8 rounded-lg bg-[#778da9] border-[0.1rem] border-[#778da9] w-[70%] lg:landscape::w-[50%] landscape:w-[50%] h-[50%]">
		<div>
			<h2 class="capitalize text-center text-4xl text-[#e0e1dd]/80 font-bold leading-[1rem]">{$currentWeather.weather[0].description}</h2>
		</div>
			<WeatherIcon weatherID={$currentWeather.weather[0].id} size={128} color={'#e0e1dd'}/>
		
		<div class="flex flex-row justify-center items-center top-[12rem]">
			<div
				class="flex justify-center items-center gap-[0.5rem]"
			>
				<div class="flex flex-col justify-center items-center ">
					<div class="relative flex flex-col justify-center items-center">
						<div class="absolute top-[0rem] bottom-auto opacity-50">							
							<ChevronUp color={iconColor} size={iconSize} />
						</div>
						<p class="text-4xl text-[#e0e1dd]/70 font-bold">{$currentWeather.main.temp_max.toFixed()}</p>
					</div>
					<div class="relative flex flex-col justify-center items-center ">
						<p class="text-4xl text-[#e0e1dd]/70 font-bold">{$currentWeather.main.temp_min.toFixed()}</p>
						<div class="absolute bottom-[-0.7rem] top-auto opacity-50">
							<ChevronDown color={iconColor} size={iconSize}/>
							
						</div>
					</div>
				</div>
				<div class="flex">
					<p class=" text-[10rem] tracking-[0.5px] text-[#e0e1dd] leading-[0] mb-[3rem]">
						{$currentWeather.main.temp.toFixed()}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.temp-icons) {
		/* position: absolute; */
		opacity: 0.4;
	}
</style>
