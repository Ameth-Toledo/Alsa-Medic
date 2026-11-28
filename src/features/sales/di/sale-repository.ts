import { localStorageSaleRepository } from "../data/repositories/local-storage-sale-repository";
import type { SaleRepository } from "../domain/repositories/sale-repository";

export const saleRepository: SaleRepository = localStorageSaleRepository;
