import type { FinancialOverview } from '../../domain/models/financial-overview';
import type { FinancialOverviewRepository } from '../../domain/repositories/financial-overview-repository';

const overview: FinancialOverview = {
	banks: -3250.5,
	receivables: 18400,
	payables: 6200,
	credits: 4500,
	inventory: 22344.16,
	investedHistorical: 19244.41,
	clientsCount: 1,
	suppliersCount: 3,
};

export const staticFinancialOverviewRepository: FinancialOverviewRepository = {
	getOverview: () => overview,
};
