import type { RevenueMixItem } from "../../domain/models/revenue-mix-item";
import type { RevenueMixRepository } from "../../domain/repositories/revenue-mix-repository";

const revenueMix: RevenueMixItem[] = [
	{ category: "Productos", value: 68 },
	{ category: "Servicios", value: 32 },
];

export const staticRevenueMixRepository: RevenueMixRepository = {
	getRevenueMix: () => revenueMix,
};
