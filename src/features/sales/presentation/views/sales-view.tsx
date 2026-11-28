"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { SaleStatusFilter } from "../../domain/models/sale-status-filter";
import { getSaleStatus } from "../../domain/sale-status-rules";
import NewSaleModal from "../components/new-sale-modal";
import SalesFilters from "../components/sales-filters";
import SalesSummary from "../components/sales-summary";
import SalesTable from "../components/sales-table";
import { useSales } from "../viewmodels/use-sales";

const statusFilters: Record<ReturnType<typeof getSaleStatus>, SaleStatusFilter> = {
	Pendiente: "Pendientes",
	Parcial: "Parciales",
	Pagada: "Pagadas",
};

export default function SalesView() {
	const { sales, isLoading, error, createSale, retry } = useSales();
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState<SaleStatusFilter>("Todas");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [initialProjectId, setInitialProjectId] = useState<string>();

	useEffect(() => {
		const project = new URLSearchParams(window.location.search).get("proyecto");
		if (project) setInitialProjectId(project);
	}, []);

	const filteredSales = sales.filter((sale) => {
		const searchText = `${sale.folio} ${sale.client}`.toLowerCase();
		const matchesQuery = searchText.includes(query.trim().toLowerCase());
		const matchesStatus =
			status === "Todas" || statusFilters[getSaleStatus(sale)] === status;
		return matchesQuery && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center gap-3">
				<div className="min-w-0 flex-1">
					<h1 className="text-lg font-semibold text-foreground">Ventas</h1>
					<p className="mt-1 text-xs text-muted-foreground">
						Crea ventas y aplica abonos hasta liquidar la deuda
					</p>
				</div>
				<button
					type="button"
					onClick={() => setIsModalOpen(true)}
					className="ml-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2A78D6] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<Plus aria-hidden="true" className="size-4" />
					Nueva venta
				</button>
			</div>

			{isLoading ? (
				<div className="rounded-xl border border-border bg-background p-5 text-xs text-muted-foreground">
					Cargando ventas…
				</div>
			) : error ? (
				<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-5 text-xs">
					<p className="text-red-600 dark:text-red-400">{error}</p>
					<button
						type="button"
						onClick={retry}
						className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted"
					>
						Reintentar
					</button>
				</div>
			) : (
				<>
					<SalesSummary sales={sales} />

					<div className="space-y-4 rounded-xl border border-border bg-background p-5">
						<SalesFilters
							query={query}
							onQueryChange={setQuery}
							status={status}
							onStatusChange={setStatus}
						/>

						{sales.length === 0 ? (
							<div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
								<p className="text-sm font-medium text-foreground">
									Aún no hay ventas registradas.
								</p>
								<p className="text-xs text-muted-foreground">
									Crea la primera venta para empezar a llevar el control de cobros.
								</p>
								<button
									type="button"
									onClick={() => setIsModalOpen(true)}
									className="rounded-lg bg-[#2A78D6] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
								>
									Crear la primera venta
								</button>
							</div>
						) : filteredSales.length === 0 ? (
							<p className="py-12 text-center text-xs text-muted-foreground">
								No se encontraron ventas con los filtros actuales.
							</p>
						) : (
							<SalesTable sales={filteredSales} />
						)}
					</div>
				</>
			)}

			{isModalOpen && (
				<NewSaleModal
					initialProjectId={initialProjectId}
					onClose={() => setIsModalOpen(false)}
					onCreate={createSale}
				/>
			)}
		</div>
	);
}
