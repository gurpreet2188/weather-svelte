import { writable, type Writable } from "svelte/store";

export const transition:Writable<boolean> = writable(false) 