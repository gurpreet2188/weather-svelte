import { writable } from "svelte/store";

export const iconColor = writable('#1e1e1e')
iconColor.subscribe(v=>v)

export const iconSize = writable('1.5rem')
iconSize.subscribe(v=>v)
