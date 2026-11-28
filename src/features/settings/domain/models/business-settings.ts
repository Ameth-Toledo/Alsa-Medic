import type { Currency } from './currency';
import type { ThemeMode } from './theme-mode';

export interface BusinessSettings {
	businessName: string;
	slogan: string;
	phone: string;
	rfc: string;
	address: string;
	currency: Currency;
	theme: ThemeMode;
	incomeCategories: string[];
	expenseCategories: string[];
}
