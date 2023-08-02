<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Icons from './icons.svelte';
	import { ICONS } from '../../../constants/themeConfig';

	export let btnAction: (btnType:string)=>void|null
	export let icons: Array<any>;
	export let iconNames: Array<string>;
    export let iconType:Writable<string>
</script>

<div class="flex flex-row justify-center items-center gap-[2rem]">
	{#each icons as icon, i (iconNames[i])}
		<Icons id={iconNames[i]} iconType={iconType} btnAction={btnAction}  icon={icon}/>
	{/each}
</div>
