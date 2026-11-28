import type { SaleFormOptions } from "../models/sale-form-options";
import type { SaleFormOptionsRepository } from "../repositories/sale-form-options-repository";

export class GetSaleFormOptionsUseCase {
	constructor(private readonly repository: SaleFormOptionsRepository) {}

	execute(): SaleFormOptions {
		return this.repository.getFormOptions();
	}
}
