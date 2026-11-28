import type { SaleFormOptions } from "../models/sale-form-options";

export interface SaleFormOptionsRepository {
	getFormOptions(): SaleFormOptions;
}
