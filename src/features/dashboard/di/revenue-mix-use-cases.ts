import { GetRevenueMixUseCase } from "../domain/use-cases/get-revenue-mix";
import { revenueMixRepository } from "./revenue-mix-repository";

export const getRevenueMixUseCase = new GetRevenueMixUseCase(revenueMixRepository);
