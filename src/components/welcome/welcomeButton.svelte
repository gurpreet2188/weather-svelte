<script lang="ts">
    import {tweened} from 'svelte/motion'
	import type { Writable } from 'svelte/store';
	import { fade } from "svelte/transition";

	export let onClick: () => void;
	export let infoText: string;
	export let loadingInfo: boolean;
    export let posStatus: Writable<string>;
</script>

<div class="flex flex-col justify-start items-start self-start gap-[1rem] h-[50%]">
	<p class="text-3xl">{infoText}</p>
	<div class="flex gap-2">
		<button
			on:click={onClick}
			class="px-4 rounded-md text-2xl lg:text-3xl border border-[#748cab]/50 bg-[#748cab]/20"
			>Go</button
		>
		{#if loadingInfo}
			<p in:fade={{duration:2000}} class="text-3xl">{$posStatus}</p>
		{/if}
	</div>
</div>
