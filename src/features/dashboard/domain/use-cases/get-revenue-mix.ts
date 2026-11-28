import type { RevenueMixItem } from "../models/revenue-mix-item";
import type { RevenueMixRepository } from "../repositories/revenue-mix-repository";

export class GetRevenueMixUseCase {
	constructor(private readonly repository: RevenueMixRepository) {}

	execute(): RevenueMixItem[] {
		return this.repository.getRevenueMix();
	}
}
