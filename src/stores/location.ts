import { writable, type Writable } from "svelte/store";

export const locationPermissionState: Writable<string> = writable('prompt')
locationPermissionState.subscribe(v => v)

export const locationPos: Writable<{ lat: number, lon: number } | null> = writable()
locationPos.subscribe(v => v)

