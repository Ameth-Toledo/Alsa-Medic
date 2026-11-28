import type { SaleStatus } from "../../domain/models/sale-status";

const statusStyles: Record<SaleStatus, string> = {
	Pendiente: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	Parcial: "bg-[#2A78D6]/10 text-[#2A78D6]",
	Pagada: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function SaleStatusBadge({ status }: { status: SaleStatus }) {
	return (
		<span
			className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[status]}`}
		>
			{status}
		</span>
	);
}
