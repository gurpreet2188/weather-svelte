<script lang="ts">
	import { HOURLY_DAILY, WEATHER_DATA_TYPES } from '../../constants/forecast';
	import { forecastWeatherArr,forecastWeatherDataTypes, forecastWeatherValueArr, forecastWeatherHourlyDaily } from '../../stores/forecastData';
	import WiThermometer from 'svelte-icons-pack/wi/WiThermometer';
	import WiHumidity from 'svelte-icons-pack/wi/WiHumidity';
	import WiRainMix from 'svelte-icons-pack/wi/WiRainMix';
	import WiHot from 'svelte-icons-pack/wi/WiHot';
	import WiRaindrop from 'svelte-icons-pack/wi/WiRaindrop';
	import WiSnowflakeCold from 'svelte-icons-pack/wi/WiSnowflakeCold';
	import IconsBase from './icons/iconsBase.svelte';
	import {Thermometer, Droplet, CloudRain, Sun, Droplets, Snowflake} from 'lucide-svelte'
	import { FORECAST_HOURLY_DATA_JSON, FORECAST_DAILY_DATA_JSON } from '../../constants/weatherData';
	import type { Daily, Hourly } from '../../types/forecastWeather';

	const icons = [{component:Thermometer, label:'Thermometer'},
	{component:Droplet, label:'Droplet'},
	{component: CloudRain, lalbel:'CloudRain'},
	{component:Sun, lalbel:'Sun'},
	{component:Droplets, lalbel:'Droplets'},
	{component:Snowflake, lalbel:Snowflake},];
	const iconNames: Array<string> = Object.keys(WEATHER_DATA_TYPES).map(
		(v: string) => WEATHER_DATA_TYPES[v as keyof typeof WEATHER_DATA_TYPES]
	);

	
</script>
<div class="flex justify-center items-center p-1 h-[25%]">
	<IconsBase {iconNames} {icons} iconType={forecastWeatherDataTypes} btnAction={()=>{}}/>

</div>
