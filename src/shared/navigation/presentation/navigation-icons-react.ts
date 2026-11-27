import {
	ArrowLeftRight,
	Boxes,
	ChartNoAxesCombined,
	CreditCard,
	FileText,
	FolderKanban,
	Landmark,
	LayoutDashboard,
	ReceiptText,
	ShoppingCart,
	Truck,
	Users,
} from 'lucide-react';

import type { NavigationIcon } from '../domain/models/navigation-icon';

export const navigationIconsReact = {
	dashboard: LayoutDashboard,
	projects: FolderKanban,
	quotations: FileText,
	sales: ShoppingCart,
	inventory: Boxes,
	customers: Users,
	suppliers: Truck,
	bank: Landmark,
	transactions: ArrowLeftRight,
	credits: CreditCard,
	taxes: ReceiptText,
	reports: ChartNoAxesCombined,
} satisfies Record<NavigationIcon, typeof LayoutDashboard>;
