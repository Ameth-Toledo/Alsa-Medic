import { formatAmount } from "@/core/lib/format-amount";
import { getAccountsReceivable } from "../viewmodels/use-accounts-receivable";

export default function AccountsReceivablePanel() {
	const accounts = getAccountsReceivable();

	return (
		<section className="rounded-xl border border-border bg-background p-5">
			<div>
				<h2 className="text-sm font-semibold text-foreground">
					Cuentas por cobrar
				</h2>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="w-full text-left text-xs">
					<thead className="text-muted-foreground">
						<tr className="border-b border-border">
							<th className="py-2 pr-4 font-medium">Cliente</th>
							<th className="py-2 text-right font-medium">Saldo</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map((account) => (
							<tr key={account.cliente} className="border-b border-border last:border-0">
								<td className="py-3 pr-4 text-muted-foreground">
									{account.cliente}
								</td>
								<td className="whitespace-nowrap py-3 text-right font-medium text-foreground">
									{formatAmount(account.saldo)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
