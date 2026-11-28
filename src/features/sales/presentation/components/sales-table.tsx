import { formatAmount } from "@/core/lib/format-amount";
import { Eye } from "lucide-react";
import type { Sale } from "../../domain/models/sale";
import { getSaleBalance, getSaleStatus } from "../../domain/sale-status-rules";
import { formatSaleDate } from "../format-sale-date";
import SaleStatusBadge from "./sale-status-badge";

export default function SalesTable({ sales }: { sales: Sale[] }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[1100px] text-left text-xs">
				<thead className="text-muted-foreground">
					<tr className="border-b border-border">
						<th className="py-2 pr-4 font-medium">Folio</th>
						<th className="py-2 pr-4 font-medium">Cotización</th>
						<th className="py-2 pr-4 font-medium">Fecha</th>
						<th className="py-2 pr-4 font-medium">Cliente</th>
						<th className="py-2 pr-4 font-medium">Proyecto</th>
						<th className="py-2 pl-4 text-right font-medium">Total</th>
						<th className="py-2 pl-4 text-right font-medium">Abonado</th>
						<th className="py-2 pl-4 text-right font-medium">Saldo</th>
						<th className="py-2 pl-4 font-medium">Estado</th>
						<th className="py-2 pl-4 text-right font-medium">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{sales.map((sale) => {
						const balance = getSaleBalance(sale);

						return (
							<tr key={sale.folio} className="border-b border-border last:border-0">
								<td className="py-3 pr-4 font-semibold text-foreground">
									{sale.folio}
								</td>
								<td className="py-3 pr-4 text-muted-foreground">
									{sale.quotationFolio ?? "—"}
								</td>
								<td className="py-3 pr-4 text-muted-foreground">
									{formatSaleDate(sale.date)}
								</td>
								<td className="py-3 pr-4 text-foreground">{sale.client}</td>
								<td className="py-3 pr-4">
									{sale.project ? (
										<span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
											{sale.project}
										</span>
									) : (
										<span className="text-muted-foreground">—</span>
									)}
								</td>
								<td className="whitespace-nowrap py-3 pl-4 text-right font-medium text-foreground">
									{formatAmount(sale.total)}
								</td>
								<td
									className={`whitespace-nowrap py-3 pl-4 text-right font-medium ${
										sale.paid > 0
											? "text-emerald-600 dark:text-emerald-400"
											: "text-muted-foreground"
									}`}
								>
									{formatAmount(sale.paid)}
								</td>
								<td
									className={`whitespace-nowrap py-3 pl-4 text-right font-medium ${
										balance > 0
											? "text-red-600 dark:text-red-400"
											: "text-muted-foreground"
									}`}
								>
									{formatAmount(balance)}
								</td>
								<td className="py-3 pl-4">
									<SaleStatusBadge status={getSaleStatus(sale)} />
								</td>
								<td className="py-3 pl-4 text-right">
									<a
										href={`/ventas/detalle?folio=${encodeURIComponent(sale.folio)}`}
										aria-label={`Ver detalle de ${sale.folio}`}
										title="Ver detalle"
										className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									>
										<Eye aria-hidden="true" className="size-4" />
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
