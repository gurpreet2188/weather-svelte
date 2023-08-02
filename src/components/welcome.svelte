<script lang="ts">
	import { getLocation} from "../helper/location";
	import { locationPos} from "../stores/location";

const locationOnCLick = async ()=>{
    const pos = await getLocation().then(d=>d as GeolocationPosition)
    locationPos.set({lat:pos.coords.latitude, lon: pos.coords.longitude})
}

</script>

<div class="flex flex-col justify-center items-center w-[100%] h-[100%]">
	<div class="flex flex-col justify-center items-center gap-[2rem] lg:border lg:border-black/50 lg:p-[1rem] rounded-lg bg-[#f0ebd8] w-[100%]  h-[100%] lg:w-[80%] lg:h-[80%]">
		<div
			class="flex flex-col justify-center items-center gap-[2rem] bg-[#748cab] text-[#f0ebd8] p-[1rem] w-[100%]  h-[50%]"
		>
			<h1 class="text-6xl text-center self-center font-bold">Weather</h1>
			<p class="text-4xl text-center">
				This Web app requires Location permission to show the weather information of your present
				City.
			</p>
		</div>
		<div class="flex flex-col justify-between items-center gap-[1rem] p-[1rem] w-[100%]  h-[50%]">
			<div class="flex flex-col self-start justify-self-start justify-center items-start gap-[1rem] h-[50%]">
				<p class="text-4xl">Grant Location Permission</p>
				<button on:click={locationOnCLick} class="px-4 rounded-md text-4xl border border-[#748cab]/50 bg-[#748cab]/20">Go</button>
			</div>
            <!-- <span class="hidden lg:block h-[100%] w-[1px] bg-black/50"></span> -->
			<div class="flex flex-col justify-start items-start self-start gap-[1rem] h-[50%]">
				<p class="text-4xl">Show Weather Info. of Random City</p>
				<button class="px-4 rounded-md text-4xl border border-[#748cab]/50 bg-[#748cab]/20">Go</button>
			</div>
		</div>
	</div>
</div>
