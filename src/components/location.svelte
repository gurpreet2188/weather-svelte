<script lang="ts">
    import {currentWeather} from '../stores/weatherData'
</script>


<div class="p-4">
    <h1 class="relative flex flex-col justify-center items-center text-[3rem] landscape:md:text-[3rem] landscape:sm:text-[1.5rem] text-center leading-none font-semibold opacity-80 tracking-wide drop-shadow-2xl text-[#415a77]">{$currentWeather?.name || 'Unknown Location'} <span class="text-[0.9rem]">({$currentWeather?.sys.country || ''})</span></h1>
</div>