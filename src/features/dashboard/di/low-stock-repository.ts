import { staticLowStockRepository } from "../data/repositories/static-low-stock-repository";
import type { LowStockRepository } from "../domain/repositories/low-stock-repository";

export const lowStockRepository: LowStockRepository = staticLowStockRepository;
