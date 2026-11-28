import type { LowStockItem } from "../models/low-stock-item";

export interface LowStockRepository {
	getLowStock(): LowStockItem[];
}
