import { getMonthlyFlowUseCase } from '../../di/monthly-flow-use-cases';

export function getMonthlyFlow() {
	return getMonthlyFlowUseCase.execute();
}
