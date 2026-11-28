import type { SaleConceptType } from "./sale-concept-type";

export interface SaleConcept {
	description: string;
	type: SaleConceptType;
	quantity: number;
	unitPrice: number;
}
