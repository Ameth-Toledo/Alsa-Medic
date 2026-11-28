import type { SaleConcept } from "./sale-concept";

export interface Sale {
	folio: string;
	quotationFolio?: string;
	date: string;
	client: string;
	project?: string;
	concepts: SaleConcept[];
	notes?: string;
	total: number;
	paid: number;
}
