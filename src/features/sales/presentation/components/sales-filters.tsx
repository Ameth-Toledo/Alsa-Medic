import { Search } from "lucide-react";
import type { SaleStatusFilter } from "../../domain/models/sale-status-filter";

const filters: SaleStatusFilter[] = [
	"Todas",
	"Pendientes",
	"Parciales",
	"Pagadas",
];

interface SalesFiltersProps {
	query: string;
	onQueryChange: (value: string) => void;
	status: SaleStatusFilter;
	onStatusChange: (value: SaleStatusFilter) => void;
}

export default function SalesFilters({
	query,
	onQueryChange,
	status,
	onStatusChange,
}: SalesFiltersProps) {
	return (
		<div className="flex items-center gap-3 overflow-x-auto">
			<div className="flex h-9 w-64 shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
				<Search
					aria-hidden="true"
					className="size-4 shrink-0 text-muted-foreground"
				/>
				<input
					type="text"
					inputMode="search"
					value={query}
					onChange={(event) => onQueryChange(event.target.value)}
					placeholder="Buscar folio o cliente…"
					aria-label="Buscar folio o cliente"
					className="h-full min-w-0 flex-1 appearance-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
				/>
			</div>

			<div className="flex shrink-0 gap-1 rounded-lg border border-border p-1">
				{filters.map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => onStatusChange(item)}
						aria-pressed={status === item}
						className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
							status === item
								? "bg-muted text-foreground"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
}
