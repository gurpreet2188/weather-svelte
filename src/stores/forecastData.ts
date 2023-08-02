import { writable, type Writable } from "svelte/store";
import { HOURLY_DAILY, WEATHER_DATA_TYPES } from '../constants/forecast'
import type { Root as HOURLY_DAILY_TYPE, Hourly as HOURLY, Daily as DAILY  } from '../types/forecastWeather'


type SNOW_RAIN_ICONS= {
    [WEATHER_DATA_TYPES.SNOW]: boolean,
    [WEATHER_DATA_TYPES.RAIN]:boolean

}

export const forecastWeatherHourlyDaily: Writable<keyof HOURLY_DAILY_TYPE> = writable(HOURLY_DAILY.HOURLY)
forecastWeatherHourlyDaily.subscribe(v => v)

export const forecastWeatherDataTypes: Writable<string> = writable(WEATHER_DATA_TYPES.TEMP)
forecastWeatherDataTypes.subscribe(v => v)

export const forecastWeatherArr: Writable<HOURLY[] | DAILY[]| null> = writable()
forecastWeatherArr.subscribe(v => v)

export const forecastWeatherValueArr:Writable<number[]| null> = writable()
forecastWeatherValueArr.subscribe(v=>v)

export const snowRainIconsHourly: Writable<SNOW_RAIN_ICONS> = writable({[WEATHER_DATA_TYPES.SNOW]:false, [WEATHER_DATA_TYPES.RAIN]:false})
snowRainIconsHourly.subscribe(v=>v)
export const snowRainIconsDaily: Writable<SNOW_RAIN_ICONS> = writable({[WEATHER_DATA_TYPES.SNOW]:false, [WEATHER_DATA_TYPES.RAIN]:false})
snowRainIconsDaily.subscribe(v=>v)

export const snowRainIcon: Writable<SNOW_RAIN_ICONS | null> = writable()
snowRainIcon.subscribe(v=>v)
export const forecastWeatherGraphProps:Writable<{xAxis:number[],yAxis:number[],xyAxis:string}> = writable()
forecastWeatherGraphProps.subscribe(v=>v)
// export const forecastWeatherUnixTimeArr:Writable<number[]> = writable()
// export const forescastWeatherIDArr:Writable<number[]>=writable()