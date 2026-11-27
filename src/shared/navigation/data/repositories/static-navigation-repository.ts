import type { NavigationItem } from '../../domain/models/navigation-item';
import type { NavigationRepository } from '../../domain/repositories/navigation-repository';

const items: NavigationItem[] = [
	{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
	{ label: 'Proyectos', href: '/proyectos', icon: 'projects' },
	{ label: 'Cotizaciones', href: '/cotizaciones', icon: 'quotations' },
	{ label: 'Ventas', href: '/ventas', icon: 'sales' },
	{ label: 'Inventario', href: '/inventario', icon: 'inventory' },
	{ label: 'Clientes', href: '/clientes', icon: 'customers' },
	{ label: 'Proveedores', href: '/proveedores', icon: 'suppliers' },
	{ label: 'Banco', href: '/banco', icon: 'bank' },
	{ label: 'Ingresos y Egresos', href: '/ingresos-egresos', icon: 'transactions' },
	{ label: 'Creditos', href: '/creditos', icon: 'credits' },
	{ label: 'Impuestos', href: '/impuestos', icon: 'taxes' },
	{ label: 'Reportes', href: '/reportes', icon: 'reports' },
];

export const staticNavigationRepository: NavigationRepository = {
	getItems: () => items,
};
