import type { Sale } from "../../domain/models/sale";
import type { SaleRepository } from "../../domain/repositories/sale-repository";
import { seedSales } from "../constants/seed-sales";

const STORAGE_KEY = "alsa-medic-sales";

function readSales(): Sale[] {
	if (typeof window === "undefined") return seedSales;

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (!stored) return seedSales;

		const parsed: unknown = JSON.parse(stored);
		return Array.isArray(parsed) ? (parsed as Sale[]) : seedSales;
	} catch {
		return seedSales;
	}
}

function writeSales(sales: Sale[]) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
}

export const localStorageSaleRepository: SaleRepository = {
	getSales: () =>
		[...readSales()].sort(
			(a, b) => b.date.localeCompare(a.date) || b.folio.localeCompare(a.folio),
		),

	saveSale: (sale) => {
		writeSales([
			sale,
			...readSales().filter((item) => item.folio !== sale.folio),
		]);
	},

	getNextFolio: () => {
		const numbers = readSales()
			.map((sale) => Number(sale.folio.replace("VTA-", "")))
			.filter((number) => Number.isFinite(number));

		return `VTA-${String(Math.max(0, ...numbers) + 1).padStart(4, "0")}`;
	},
};
