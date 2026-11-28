import type { RecentSale } from "../models/recent-sale";
import type { RecentSaleRepository } from "../repositories/recent-sale-repository";

export class GetRecentSalesUseCase {
	constructor(private readonly repository: RecentSaleRepository) {}

	execute(): RecentSale[] {
		return this.repository.getRecentSales();
	}
}
