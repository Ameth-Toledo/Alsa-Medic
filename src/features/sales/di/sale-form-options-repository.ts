import { staticSaleFormOptionsRepository } from "../data/repositories/static-sale-form-options-repository";
import type { SaleFormOptionsRepository } from "../domain/repositories/sale-form-options-repository";

export const saleFormOptionsRepository: SaleFormOptionsRepository =
	staticSaleFormOptionsRepository;
