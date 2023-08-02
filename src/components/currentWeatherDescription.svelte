<script lang="ts">
    import {currentWeather} from '../stores/weatherData'
</script>

{#if $currentWeather}
<!-- <div class=""> -->
    <p class="capitalize text-2xl tracking-wide px-4">{$currentWeather.weather[0].description}</p>
<!-- </div> -->
{/if}