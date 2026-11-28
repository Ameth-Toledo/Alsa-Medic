import type { SaleConceptType } from "./sale-concept-type";

export interface SaleCatalogItem {
	id: string;
	description: string;
	type: SaleConceptType;
	price: number;
}
