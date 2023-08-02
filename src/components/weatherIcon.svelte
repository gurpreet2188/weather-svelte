<script lang="ts">
	import {CloudSunRain, CloudSun, Sun, Haze, SunSnow, CloudRain, CloudLightning, } from 'lucide-svelte'


	export let weatherID:number
	export let size: number
	export let color: string
	let strokeWidth = 1.5
    const iconStyle = {
        color: color,
        size: size,
        cssClass: 'custom-icon'
    }
</script>

{#if weatherID}
	<div>
		{#if weatherID > 800}
		<CloudSun size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID === 800}
		<Sun size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID < 800 && weatherID >= 700}
		<Haze size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID < 700 && weatherID >= 600}
		<SunSnow size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID < 600 && weatherID >= 500}
		<CloudSunRain size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID < 400 && weatherID >= 300}
		<CloudRain size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{:else if weatherID < 300 && weatherID >= 200}
		<CloudLightning size={size} color={iconStyle.color} strokeWidth={strokeWidth} absoluteStrokeWidth/>
		{/if}
	</div>
{/if}
