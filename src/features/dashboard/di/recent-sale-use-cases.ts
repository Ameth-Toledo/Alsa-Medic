import { GetRecentSalesUseCase } from "../domain/use-cases/get-recent-sales";
import { recentSaleRepository } from "./recent-sale-repository";

export const getRecentSalesUseCase = new GetRecentSalesUseCase(recentSaleRepository);
