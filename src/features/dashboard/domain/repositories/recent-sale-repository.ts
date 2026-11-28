import type { RecentSale } from "../models/recent-sale";

export interface RecentSaleRepository {
	getRecentSales(): RecentSale[];
}
