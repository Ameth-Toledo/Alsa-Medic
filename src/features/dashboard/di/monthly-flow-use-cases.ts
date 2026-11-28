import { GetMonthlyFlowUseCase } from '../domain/use-cases/get-monthly-flow';
import { monthlyFlowRepository } from './monthly-flow-repository';

export const getMonthlyFlowUseCase = new GetMonthlyFlowUseCase(
	monthlyFlowRepository,
);
