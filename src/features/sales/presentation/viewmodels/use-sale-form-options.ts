import { getSaleFormOptionsUseCase } from "../../di/sale-form-options-use-cases";

export function getSaleFormOptions() {
	return getSaleFormOptionsUseCase.execute();
}
