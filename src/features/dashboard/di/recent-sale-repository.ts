import { staticRecentSaleRepository } from "../data/repositories/static-recent-sale-repository";
import type { RecentSaleRepository } from "../domain/repositories/recent-sale-repository";

export const recentSaleRepository: RecentSaleRepository = staticRecentSaleRepository;
