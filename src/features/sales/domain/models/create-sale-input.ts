import type { SaleConcept } from "./sale-concept";

export interface CreateSaleInput {
	client: string;
	project?: string;
	date: string;
	concepts: SaleConcept[];
	notes?: string;
}
