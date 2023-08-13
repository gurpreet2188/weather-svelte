import { writable, type Writable } from "svelte/store";
import { cities } from "../data/cities";
import type { City } from "../types/cities";
export const locationPermissionState: Writable<string> = writable('prompt')
locationPermissionState.subscribe(v => v)

export const locationPos: Writable<{ lat: number, lon: number } | null> = writable()
locationPos.subscribe(v => v)

export const citiesPos:Writable<City[]> = writable(cities)


