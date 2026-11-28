import { getRecentSalesUseCase } from "../../di/recent-sale-use-cases";

export function getRecentSales() {
	return getRecentSalesUseCase.execute();
}
