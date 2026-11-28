import { getLowStock } from "../viewmodels/use-low-stock";

export default function LowStockPanel() {
	const items = getLowStock();

	return (
		<section className="rounded-xl border border-border bg-background p-5">
			<div>
				<h2 className="text-sm font-semibold text-foreground">Stock bajo</h2>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="w-full text-left text-xs">
					<thead className="text-muted-foreground">
						<tr className="border-b border-border">
							<th className="py-2 pr-4 font-medium">Producto</th>
							<th className="py-2 text-right font-medium">Stock</th>
							<th className="py-2 pl-4 text-right font-medium">Mínimo</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.name} className="border-b border-border last:border-0">
								<td className="py-3 pr-4 leading-5 text-muted-foreground">
									{item.name}
								</td>
								<td className="whitespace-nowrap py-3 text-right font-semibold text-[#EB6834]">
									{item.stock}
								</td>
								<td className="whitespace-nowrap py-3 pl-4 text-right font-medium text-foreground">
									{item.minimum}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
