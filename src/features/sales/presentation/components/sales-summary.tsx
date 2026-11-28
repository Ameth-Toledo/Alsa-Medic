import { formatAmount } from "@/core/lib/format-amount";
import { BadgeCheck, Receipt, Wallet } from "lucide-react";
import type { Sale } from "../../domain/models/sale";

export default function SalesSummary({ sales }: { sales: Sale[] }) {
	const cards = [
		{
			label: "Total facturado",
			value: formatAmount(
				sales.reduce((sum, sale) => sum + sale.total, 0),
			),
			detail: `${sales.length} ventas`,
			Icon: Receipt,
		},
		{
			label: "Total cobrado",
			value: formatAmount(
				sales.reduce((sum, sale) => sum + sale.paid, 0),
			),
			detail: "Abonos aplicados",
			Icon: BadgeCheck,
		},
		{
			label: "Por cobrar",
			value: formatAmount(
				sales.reduce(
					(sum, sale) => sum + Math.max(0, sale.total - sale.paid),
					0,
				),
			),
			detail: "Saldo pendiente",
			Icon: Wallet,
		},
	];

	return (
		<div className="flex w-full gap-4">
			{cards.map(({ label, value, detail, Icon }) => (
				<div
					key={label}
					className="min-w-0 flex-1 rounded-xl border border-border bg-background p-5"
				>
					<div className="flex items-center justify-between">
						<p className="text-xs text-muted-foreground">{label}</p>
						<Icon aria-hidden="true" className="size-4 text-muted-foreground" />
					</div>
					<p className="mt-3 text-xl font-semibold text-foreground">{value}</p>
					<p className="mt-1 text-xs text-muted-foreground">{detail}</p>
				</div>
			))}
		</div>
	);
}
