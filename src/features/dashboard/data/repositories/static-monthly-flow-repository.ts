import type { MonthlyFlow } from '../../domain/models/monthly-flow';
import type { MonthlyFlowRepository } from '../../domain/repositories/monthly-flow-repository';

const monthlyFlow: MonthlyFlow[] = [
	{ month: 'Jun', income: 38000, expenses: 25000 },
	{ month: 'Jul', income: 45000, expenses: 30000 },
	{ month: 'Ago', income: 28000, expenses: 22000 },
	{ month: 'Sep', income: 50000, expenses: 33000 },
	{ month: 'Oct', income: 42000, expenses: 28000 },
	{ month: 'Nov', income: 47000, expenses: 35000 },
];

export const staticMonthlyFlowRepository: MonthlyFlowRepository = {
	getMonthlyFlow: () => monthlyFlow,
};
