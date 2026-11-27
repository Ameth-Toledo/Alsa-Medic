import { navigationRepository } from '../../di/navigation-repository';
import { navigationIconsReact } from '../navigation-icons-react';

export function getNavigationItemsForReact() {
	return navigationRepository.getItems().map((item) => ({
		...item,
		Icon: navigationIconsReact[item.icon],
	}));
}
