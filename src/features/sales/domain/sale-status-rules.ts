import type { Sale } from "./models/sale";
import type { SaleStatus } from "./models/sale-status";

export function getSaleBalance(sale: Sale) {
	return Math.max(0, sale.total - sale.paid);
}

export function getSaleStatus(sale: Sale): SaleStatus {
	if (sale.paid <= 0) return "Pendiente";
	if (getSaleBalance(sale) === 0) return "Pagada";
	return "Parcial";
}
