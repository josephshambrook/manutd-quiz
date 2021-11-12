import { writable } from "svelte/store";

export const score = writable(0);
export const chosenTeam = writable("");
export const topScorers = writable([]);
