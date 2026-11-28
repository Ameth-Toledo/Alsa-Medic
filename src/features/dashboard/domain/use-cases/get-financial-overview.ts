import type { FinancialOverview } from '../models/financial-overview';
import type { FinancialOverviewRepository } from '../repositories/financial-overview-repository';

export class GetFinancialOverviewUseCase {
	constructor(private readonly repository: FinancialOverviewRepository) {}

	execute(): FinancialOverview {
		return this.repository.getOverview();
	}
}
