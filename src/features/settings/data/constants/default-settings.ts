import type { BusinessSettings } from '../../domain/models/business-settings';

export const defaultSettings: BusinessSettings = {
	businessName: 'Alsa Medic',
	slogan: 'Soluciones médicas confiables',
	phone: '',
	rfc: '',
	address: '',
	currency: 'MXN',
	theme: 'dark',
	incomeCategories: ['Consultas', 'Ventas', 'Servicios'],
	expenseCategories: ['Nómina', 'Proveedores', 'Impuestos'],
};
