import type { RevenueMixCategory } from "./revenue-mix-category";

export interface RevenueMixItem {
	category: RevenueMixCategory;
	value: number;
}
