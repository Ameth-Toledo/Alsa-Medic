import { GetFinancialOverviewUseCase } from '../domain/use-cases/get-financial-overview';
import { financialOverviewRepository } from './financial-overview-repository';

export const getFinancialOverviewUseCase = new GetFinancialOverviewUseCase(
	financialOverviewRepository,
);
