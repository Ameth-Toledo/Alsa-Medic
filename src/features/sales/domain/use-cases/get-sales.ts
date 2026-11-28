import type { Sale } from "../models/sale";
import type { SaleRepository } from "../repositories/sale-repository";

export class GetSalesUseCase {
	constructor(private readonly repository: SaleRepository) {}

	execute(): Sale[] {
		return this.repository.getSales();
	}
}
