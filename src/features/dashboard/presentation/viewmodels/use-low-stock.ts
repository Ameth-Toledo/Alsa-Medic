import { getLowStockUseCase } from "../../di/low-stock-use-cases";

export function getLowStock() {
	return getLowStockUseCase.execute();
}
