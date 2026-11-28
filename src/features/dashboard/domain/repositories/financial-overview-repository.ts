import type { FinancialOverview } from '../models/financial-overview';

export interface FinancialOverviewRepository {
	getOverview(): FinancialOverview;
}
