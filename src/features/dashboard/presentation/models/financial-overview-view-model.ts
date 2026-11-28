import type { FinancialOverview } from '../../domain/models/financial-overview';

export interface FinancialOverviewViewModel extends FinancialOverview {
	projectedAvailable: number;
	patrimony: number;
	utilities: number;
}
