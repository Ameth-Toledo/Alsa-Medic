import { GetLowStockUseCase } from "../domain/use-cases/get-low-stock";
import { lowStockRepository } from "./low-stock-repository";

export const getLowStockUseCase = new GetLowStockUseCase(lowStockRepository);
