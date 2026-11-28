import type { LowStockItem } from "../../domain/models/low-stock-item";
import type { LowStockRepository } from "../../domain/repositories/low-stock-repository";

const lowStock: LowStockItem[] = [
	{
		name: "Equipo ligador de varices esofágicas y rectales con 9 bandas y cable disparador de 1.4 mm. No estéril. Desechable. Pieza. Marca: LGMD",
		stock: 1,
		minimum: 2,
	},
];

export const staticLowStockRepository: LowStockRepository = {
	getLowStock: () => lowStock,
};
