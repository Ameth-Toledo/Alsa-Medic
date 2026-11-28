import { getRevenueMixUseCase } from "../../di/revenue-mix-use-cases";

export function getRevenueMix() {
	return getRevenueMixUseCase.execute();
}
