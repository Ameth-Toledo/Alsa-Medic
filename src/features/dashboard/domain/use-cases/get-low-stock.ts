import type { LowStockItem } from "../models/low-stock-item";
import type { LowStockRepository } from "../repositories/low-stock-repository";

export class GetLowStockUseCase {
	constructor(private readonly repository: LowStockRepository) {}

	execute(): LowStockItem[] {
		return this.repository.getLowStock();
	}
}
