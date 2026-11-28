import { getNavigationItemsUseCase } from '../../di/navigation-use-cases';
import { navigationIconsReact } from '../navigation-icons-react';

export function getNavigationItemsForReact() {
	return getNavigationItemsUseCase.execute().map((item) => ({
		...item,
		Icon: navigationIconsReact[item.icon],
	}));
}
