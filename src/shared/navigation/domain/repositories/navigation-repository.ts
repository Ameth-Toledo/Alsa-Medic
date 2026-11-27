import type { NavigationItem } from '../models/navigation-item';

export interface NavigationRepository {
	getItems(): NavigationItem[];
}
