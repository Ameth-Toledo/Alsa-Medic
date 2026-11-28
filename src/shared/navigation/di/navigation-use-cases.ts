import { GetNavigationItemsUseCase } from '../domain/use-cases/get-navigation-items';
import { navigationRepository } from './navigation-repository';

export const getNavigationItemsUseCase = new GetNavigationItemsUseCase(
	navigationRepository,
);
