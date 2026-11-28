import { getFinancialOverviewUseCase } from '../../di/financial-overview-use-cases';
import type { FinancialOverviewViewModel } from '../models/financial-overview-view-model';

export function getFinancialOverview(): FinancialOverviewViewModel {
	const overview = getFinancialOverviewUseCase.execute();
	const projectedAvailable =
		overview.banks + overview.receivables - overview.payables - overview.credits;
	const patrimony = projectedAvailable + overview.inventory;

	return {
		...overview,
		projectedAvailable,
		patrimony,
		utilities: patrimony - overview.investedHistorical,
	};
}
