<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { getLocation } from '../helper/location';
	import { locationPos, citiesPos } from '../stores/location';
	import WelcomeButton from './welcome/welcomeButton.svelte';

	const loadingInfo: Writable<boolean> = writable(false);
	const posStatus: Writable<string> = writable('waiting for location..');

	const locationOnCLick = async () => {
		loadingInfo.set(true);
		let msg: string = '';
		try {
			posStatus.set('Loading Device location');
			const pos = await getLocation()
				.then((d) => d as GeolocationPosition)
				.catch((e) => {
					msg = e.message;
					console.log(e);
				});
				
			if (pos) {
				
				locationPos.set({ lat: pos.coords.latitude, lon: pos.coords.longitude });
			} else {
				posStatus.set('Loaction permission failed');
			}
		} catch (e) {
			posStatus.set('Loaction permission failed');
		}
	};

	const randomCityOnClick = () => {
		// const defaultCity:City = $citiesPos[0]
		const randomIndex = Math.floor(Math.random() * ($citiesPos.length - 1));
		locationPos.set($citiesPos[randomIndex]);
	};
</script>

<div class="flex flex-col justify-center items-center w-[100%] h-[100%] md:w-[80%]">
	<div
		class="flex flex-col justify-center items-center gap-[2rem] lg:border lg:border-black/50 lg:p-[1rem] rounded-lg w-[100%] h-[100%] lg:w-[80%] lg:h-[100%]"
	>
		<div
			class="flex flex-col justify-center items-center gap-[2rem] bg-[#748cab] text-[#f0ebd8] p-[1rem] w-[100%] h-[50%]"
		>
			<h1 class="text-6xl text-center self-center font-bold">Weather</h1>
			<p class="text-4xl text-center">
				This Web app requires Location permission to show the weather information of your present
				City.
			</p>
		</div>
		<div class="flex flex-col justify-between items-center gap-[1rem] p-[1rem] w-[100%] h-[50%]">
			<WelcomeButton
				infoText="Grant Location Permission"
				onClick={locationOnCLick}
				{posStatus}
				loadingInfo={$loadingInfo}
			/>
			<span class="hidden lg:block h-[100%] w-[1px] bg-black/50" />
			<WelcomeButton
				infoText="Show Weather Info. of Random City"
				onClick={randomCityOnClick}
				loadingInfo={false}
				{posStatus}
			/>
		</div>
	</div>
</div>
