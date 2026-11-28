import type { MonthlyFlow } from '../models/monthly-flow';

export interface MonthlyFlowRepository {
	getMonthlyFlow(): MonthlyFlow[];
}
