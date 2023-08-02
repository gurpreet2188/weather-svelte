<script lang="ts">
    import {currentWeather} from '../stores/weatherData'
</script>
{#if $currentWeather}
<div class="flex justify-between p-4 bg-slate-200">
   <div class="flex flex-col">
    <h1 class="text-2xl">{$currentWeather.name}</h1>
    <p class="font-light">{$currentWeather.sys.country}</p>
   </div>
</div>
{/if}
