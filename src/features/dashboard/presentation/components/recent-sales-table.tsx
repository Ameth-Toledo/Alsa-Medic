import { formatAmount } from "@/core/lib/format-amount";
import type { RecentSaleStatus } from "../../domain/models/recent-sale-status";
import { getRecentSales } from "../viewmodels/use-recent-sales";

function statusClass(status: RecentSaleStatus) {
	return status === "Pagado"
		? "text-emerald-600 dark:text-emerald-400"
		: "text-amber-600 dark:text-amber-400";
}

export default function RecentSalesTable() {
	const sales = getRecentSales();

	return (
		<section className="rounded-xl border border-border bg-background p-5">
			<div>
				<h2 className="text-sm font-semibold text-foreground">Ventas recientes</h2>
				<p className="mt-1 text-xs text-muted-foreground">
					Últimas ventas registradas
				</p>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="w-full min-w-[560px] text-left text-xs">
					<thead className="text-muted-foreground">
						<tr className="border-b border-border">
							<th className="py-2 pr-4 font-medium">Folio</th>
							<th className="py-2 pr-4 font-medium">Cliente</th>
							<th className="py-2 pr-4 font-medium">Total</th>
							<th className="py-2 pr-4 font-medium">Saldo</th>
							<th className="py-2 font-medium">Estado</th>
						</tr>
					</thead>
					<tbody>
						{sales.map((sale) => (
							<tr key={sale.folio} className="border-b border-border last:border-0">
								<td className="py-3 pr-4 font-medium text-foreground">
									{sale.folio}
								</td>
								<td className="py-3 pr-4 text-muted-foreground">
									{sale.cliente}
								</td>
								<td className="py-3 pr-4 text-foreground">
									{formatAmount(sale.total)}
								</td>
								<td className="py-3 pr-4 text-foreground">
									{formatAmount(sale.saldo)}
								</td>
								<td className={`py-3 font-medium ${statusClass(sale.estado)}`}>
									{sale.estado}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
