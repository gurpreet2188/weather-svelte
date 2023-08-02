import { browser } from "$app/environment"
import { writable, type Writable } from "svelte/store"
import type { Root as CURRENT_WEATHER } from "../types/currentWether"
import type { Root as FORECAST_WEATHER } from '../types/forecastWeather'
export async function fetchWeatherData(type: string, pos:{lat:number,lon:number}) {
    const res = await fetch('/weather', { method: 'POST', body: JSON.stringify({ ...pos, 'type': type }) })
    const data = await res.json()
    if (!data['err'] && Object.keys(data).length > 1) {
        return await data
    }
}

export const currentWeather: Writable<CURRENT_WEATHER | null> = writable(browser && (JSON.parse(sessionStorage.getItem('currentWeather') as string) || null))
export const forecastWeather: Writable<FORECAST_WEATHER | null> = writable(browser && (JSON.parse(sessionStorage.getItem('forecastWeather') as string) || null))

currentWeather.subscribe((v) => browser && window.sessionStorage.setItem('currentWeather', JSON.stringify(v)))
forecastWeather.subscribe((v) => browser && window.sessionStorage.setItem('forecastWeather', JSON.stringify(v)))