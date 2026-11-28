export function formatAmount(value: number) {
	return `$${new Intl.NumberFormat("es-MX", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)}`;
}
