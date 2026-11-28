import type { RecentSaleStatus } from "./recent-sale-status";

export interface RecentSale {
	folio: string;
	cliente: string;
	total: number;
	saldo: number;
	estado: RecentSaleStatus;
}
