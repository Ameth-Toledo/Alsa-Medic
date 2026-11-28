export function formatCurrency(value: number, currency = 'MXN') {
	const amount = new Intl.NumberFormat('es-MX', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		currency,
	}).format(Math.abs(value));

	return `${value < 0 ? '-$' : '$'} ${amount}`;
}
