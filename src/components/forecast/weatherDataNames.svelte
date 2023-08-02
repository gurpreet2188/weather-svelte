<script lang="ts">
	import { forecastWeatherDataTypes } from "../../stores/forecastData";
    import {WEATHER_DATA_NAMES} from '../../constants/forecast'

    console.log($forecastWeatherDataTypes)
    let textValue = ''
    // @ts-ignore
    $: $forecastWeatherDataTypes, textValue= WEATHER_DATA_NAMES[$forecastWeatherDataTypes]
</script>

 
<p class="tracking-[2px] text-[#415a77] text-xl font-bold">{textValue}</p>