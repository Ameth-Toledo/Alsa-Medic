const months = [
	"ene",
	"feb",
	"mar",
	"abr",
	"may",
	"jun",
	"jul",
	"ago",
	"sep",
	"oct",
	"nov",
	"dic",
];

export function formatSaleDate(value: string) {
	const [year, month, day] = value.split("-").map(Number);
	if (!year || !month || !day) return value;
	return `${day} ${months[month - 1]} ${year}`;
}
