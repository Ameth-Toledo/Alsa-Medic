import type { RecentSale } from "../../domain/models/recent-sale";
import type { RecentSaleRepository } from "../../domain/repositories/recent-sale-repository";

const recentSales: RecentSale[] = [
	{
		folio: "VTA-0010",
		cliente: "Dr. Alex de la Cruz Guillen",
		total: 0,
		saldo: 0,
		estado: "Pendiente",
	},
];

export const staticRecentSaleRepository: RecentSaleRepository = {
	getRecentSales: () => recentSales,
};
