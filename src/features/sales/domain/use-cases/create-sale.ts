import type { CreateSaleInput } from "../models/create-sale-input";
import type { Sale } from "../models/sale";
import type { SaleRepository } from "../repositories/sale-repository";

export class CreateSaleUseCase {
	constructor(private readonly repository: SaleRepository) {}

	execute(input: CreateSaleInput): Sale {
		const sale: Sale = {
			folio: this.repository.getNextFolio(),
			date: input.date,
			client: input.client,
			project: input.project,
			concepts: input.concepts,
			notes: input.notes,
			total: input.concepts.reduce(
				(sum, concept) => sum + concept.quantity * concept.unitPrice,
				0,
			),
			paid: 0,
		};

		this.repository.saveSale(sale);
		return sale;
	}
}
