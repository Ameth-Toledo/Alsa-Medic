import type { NavigationItem } from '../models/navigation-item';
import type { NavigationRepository } from '../repositories/navigation-repository';

export class GetNavigationItemsUseCase {
	constructor(private readonly repository: NavigationRepository) {}

	execute(): NavigationItem[] {
		return this.repository.getItems();
	}
}
