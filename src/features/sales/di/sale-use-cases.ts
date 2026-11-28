import { CreateSaleUseCase } from "../domain/use-cases/create-sale";
import { GetSalesUseCase } from "../domain/use-cases/get-sales";
import { saleRepository } from "./sale-repository";

export const getSalesUseCase = new GetSalesUseCase(saleRepository);
export const createSaleUseCase = new CreateSaleUseCase(saleRepository);
