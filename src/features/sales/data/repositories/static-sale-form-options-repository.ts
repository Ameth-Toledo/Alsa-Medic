import type { SaleFormOptionsRepository } from "../../domain/repositories/sale-form-options-repository";
import { seedSaleFormOptions } from "../constants/sale-form-options";

export const staticSaleFormOptionsRepository: SaleFormOptionsRepository = {
	getFormOptions: () => seedSaleFormOptions,
};
