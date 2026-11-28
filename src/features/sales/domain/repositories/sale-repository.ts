import type { Sale } from "../models/sale";

export interface SaleRepository {
	getSales(): Sale[];
	saveSale(sale: Sale): void;
	getNextFolio(): string;
}
