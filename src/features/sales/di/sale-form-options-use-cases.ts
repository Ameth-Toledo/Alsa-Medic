import { GetSaleFormOptionsUseCase } from "../domain/use-cases/get-sale-form-options";
import { saleFormOptionsRepository } from "./sale-form-options-repository";

export const getSaleFormOptionsUseCase = new GetSaleFormOptionsUseCase(
	saleFormOptionsRepository,
);
