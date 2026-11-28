"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function SaleDetailView() {
	const [folio, setFolio] = useState<string | null>(null);

	useEffect(() => {
		setFolio(new URLSearchParams(window.location.search).get("folio"));
	}, []);

	return (
		<div className="space-y-4">
			<a
				href="/ventas"
				className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft aria-hidden="true" className="size-4" />
				Volver a Ventas
			</a>

			<div className="rounded-xl border border-border bg-background p-5">
				<h1 className="text-sm font-semibold text-foreground">
					Detalle de la venta {folio ?? "—"}
				</h1>
				<p className="mt-2 text-xs text-muted-foreground">
					El detalle y la aplicación de abonos estarán disponibles en el siguiente
					issue.
				</p>
			</div>
		</div>
	);
}
