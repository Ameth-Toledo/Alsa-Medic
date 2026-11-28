import type { MonthlyFlow } from '../models/monthly-flow';
import type { MonthlyFlowRepository } from '../repositories/monthly-flow-repository';

export class GetMonthlyFlowUseCase {
	constructor(private readonly repository: MonthlyFlowRepository) {}

	execute(): MonthlyFlow[] {
		return this.repository.getMonthlyFlow();
	}
}
