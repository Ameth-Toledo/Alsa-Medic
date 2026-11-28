import type { RevenueMixItem } from "../models/revenue-mix-item";

export interface RevenueMixRepository {
	getRevenueMix(): RevenueMixItem[];
}
