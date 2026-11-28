"use client";

import { formatAmount } from "@/core/lib/format-amount";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { CreateSaleInput } from "../../domain/models/create-sale-input";
import type { SaleConceptType } from "../../domain/models/sale-concept-type";
import { getSaleFormOptions } from "../viewmodels/use-sale-form-options";

interface ConceptLine {
	key: number;
	catalogId: string;
	description: string;
	type: SaleConceptType;
	quantity: string;
	unitPrice: string;
}

interface LineErrors {
	description?: string;
	quantity?: string;
	unitPrice?: string;
}

interface FormErrors {
	client?: string;
	date?: string;
	concepts?: string;
	lines: Record<number, LineErrors>;
}

interface NewSaleModalProps {
	initialProjectId?: string;
	onClose: () => void;
	onCreate: (input: CreateSaleInput) => void;
}

const inputClass =
	"h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";
const errorClass = "mt-1 text-[10px] text-red-600 dark:text-red-400";

export default function NewSaleModal({
	initialProjectId,
	onClose,
	onCreate,
}: NewSaleModalProps) {
	const options = getSaleFormOptions();
	const clientRef = useRef<HTMLSelectElement>(null);
	const nextLineKey = useRef(2);

	const [client, setClient] = useState("");
	const [project, setProject] = useState(() => {
		if (!initialProjectId) return "";
		return (
			options.projects.find(
				(item) => item.id === initialProjectId || item.name === initialProjectId,
			)?.id ?? ""
		);
	});
	const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
	const [notes, setNotes] = useState("");
	const [lines, setLines] = useState<ConceptLine[]>([
		{
			key: 1,
			catalogId: "manual",
			description: "",
			type: "Producto",
			quantity: "1",
			unitPrice: "0",
		},
	]);
	const [errors, setErrors] = useState<FormErrors>({ lines: {} });
	const [isSaving, setIsSaving] = useState(false);

	const total = lines.reduce(
		(sum, line) =>
			sum + (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0),
		0,
	);

	useEffect(() => {
		clientRef.current?.focus();
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	const updateLine = (key: number, patch: Partial<ConceptLine>) => {
		setLines((current) =>
			current.map((line) => (line.key === key ? { ...line, ...patch } : line)),
		);
	};

	const handleCatalogChange = (key: number, value: string) => {
		if (value === "manual") {
			updateLine(key, {
				catalogId: "manual",
				description: "",
				type: "Producto",
				unitPrice: "0",
			});
			return;
		}

		const item = options.catalogItems.find((catalogItem) => catalogItem.id === value);
		if (!item) return;

		updateLine(key, {
			catalogId: value,
			description: item.description,
			type: item.type,
			unitPrice: String(item.price),
		});
	};

	const validate = () => {
		const next: FormErrors = { lines: {} };
		if (!client) next.client = "Selecciona un cliente";
		if (!date) next.date = "Selecciona una fecha";
		if (lines.length === 0) next.concepts = "Agrega al menos un concepto";

		lines.forEach((line) => {
			const lineErrors: LineErrors = {};
			if (!line.description.trim()) {
				lineErrors.description = "Escribe una descripción";
			}

			const quantity = Number(line.quantity);
			if (!Number.isFinite(quantity) || quantity <= 0) {
				lineErrors.quantity = "Mayor a 0";
			}

			const unitPrice = Number(line.unitPrice);
			if (!Number.isFinite(unitPrice) || unitPrice < 0) {
				lineErrors.unitPrice = "Mayor o igual a 0";
			}

			if (Object.keys(lineErrors).length > 0) {
				next.lines[line.key] = lineErrors;
			}
		});

		setErrors(next);
		return (
			!next.client &&
			!next.date &&
			!next.concepts &&
			Object.keys(next.lines).length === 0
		);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSaving || !validate()) return;

		setIsSaving(true);
		try {
			onCreate({
				client: options.clients.find((item) => item.id === client)?.name ?? client,
				project: project
					? options.projects.find((item) => item.id === project)?.name
					: undefined,
				date,
				notes: notes.trim() || undefined,
				concepts: lines.map((line) => ({
					description: line.description.trim(),
					type: line.type,
					quantity: Number(line.quantity),
					unitPrice: Number(line.unitPrice),
				})),
			});
			onClose();
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center"
			onMouseDown={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="new-sale-title"
				onMouseDown={(event) => event.stopPropagation()}
				className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-background shadow-xl"
			>
				<div className="flex items-start justify-between gap-4 border-b border-border p-5">
					<div>
						<h2 id="new-sale-title" className="text-sm font-semibold text-foreground">
							Nueva venta
						</h2>
						<p className="mt-1 text-xs text-muted-foreground">
							Selecciona cliente y agrega productos o servicios
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar"
						className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<X aria-hidden="true" className="size-4" />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="space-y-5 p-5">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-1">
								<label htmlFor="sale-client" className="text-xs text-muted-foreground">
									Cliente *
								</label>
								<select
									ref={clientRef}
									id="sale-client"
									value={client}
									onChange={(event) => setClient(event.target.value)}
									aria-invalid={Boolean(errors.client)}
									className={inputClass}
								>
									<option value="">— Selecciona —</option>
									{options.clients.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
								</select>
								{errors.client && <p className={errorClass}>{errors.client}</p>}
							</div>

							<div className="space-y-1">
								<label htmlFor="sale-project" className="text-xs text-muted-foreground">
									Proyecto
								</label>
								<select
									id="sale-project"
									value={project}
									onChange={(event) => setProject(event.target.value)}
									className={inputClass}
								>
									<option value="">— Sin proyecto —</option>
									{options.projects.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-1">
								<label htmlFor="sale-date" className="text-xs text-muted-foreground">
									Fecha *
								</label>
								<input
									id="sale-date"
									type="date"
									value={date}
									onChange={(event) => setDate(event.target.value)}
									aria-invalid={Boolean(errors.date)}
									className={inputClass}
								/>
								{errors.date && <p className={errorClass}>{errors.date}</p>}
							</div>

							<div className="space-y-1">
								<label htmlFor="sale-folio" className="text-xs text-muted-foreground">
									Folio
								</label>
								<input
									id="sale-folio"
									type="text"
									value="Automático"
									readOnly
									className={`${inputClass} text-muted-foreground`}
								/>
							</div>
						</div>

						<div className="space-y-3">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<h3 className="text-xs font-semibold text-foreground">Conceptos</h3>
								<button
									type="button"
									onClick={() => {
										setLines((current) => [
											...current,
											{
												key: nextLineKey.current++,
												catalogId: "manual",
												description: "",
												type: "Producto",
												quantity: "1",
												unitPrice: "0",
											},
										]);
									}}
									className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									+ Agregar concepto
								</button>
							</div>

							{errors.concepts && <p className={errorClass}>{errors.concepts}</p>}

							{lines.map((line, index) => (
								<div key={line.key} className="rounded-lg border border-border p-3">
									<div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
										<div className="space-y-1">
											<label
												htmlFor={`concept-catalog-${line.key}`}
												className="text-[10px] text-muted-foreground"
											>
												Descripción
											</label>
											<select
												id={`concept-catalog-${line.key}`}
												value={line.catalogId}
												onChange={(event) =>
													handleCatalogChange(line.key, event.target.value)
												}
												className={inputClass}
											>
												<option value="manual">— Manual —</option>
												{options.catalogItems.map((item) => (
													<option key={item.id} value={item.id}>
														{item.description}
													</option>
												))}
											</select>
											{line.catalogId === "manual" ? (
												<input
													type="text"
													value={line.description}
													onChange={(event) =>
														updateLine(line.key, {
															description: event.target.value,
														})
													}
													placeholder="Descripción"
													aria-label={`Descripción del concepto ${index + 1}`}
													className={inputClass}
												/>
											) : (
												<p className="text-[10px] leading-4 text-muted-foreground">
													{line.description}
												</p>
											)}
											{errors.lines[line.key]?.description && (
												<p className={errorClass}>
													{errors.lines[line.key].description}
												</p>
											)}
										</div>

										<div className="space-y-1">
											<label
												htmlFor={`concept-type-${line.key}`}
												className="text-[10px] text-muted-foreground"
											>
												Tipo
											</label>
											<select
												id={`concept-type-${line.key}`}
												value={line.type}
												onChange={(event) =>
													updateLine(line.key, {
														type: event.target.value as SaleConceptType,
													})
												}
												className={inputClass}
											>
												<option value="Producto">Producto</option>
												<option value="Servicio">Servicio</option>
											</select>
										</div>

										<div className="space-y-1">
											<label
												htmlFor={`concept-quantity-${line.key}`}
												className="text-[10px] text-muted-foreground"
											>
												Cantidad
											</label>
											<input
												id={`concept-quantity-${line.key}`}
												type="number"
												min="1"
												step="1"
												value={line.quantity}
												onChange={(event) =>
													updateLine(line.key, { quantity: event.target.value })
												}
												className={inputClass}
											/>
											{errors.lines[line.key]?.quantity && (
												<p className={errorClass}>
													{errors.lines[line.key].quantity}
												</p>
											)}
										</div>

										<div className="space-y-1">
											<label
												htmlFor={`concept-price-${line.key}`}
												className="text-[10px] text-muted-foreground"
											>
												Precio unit.
											</label>
											<input
												id={`concept-price-${line.key}`}
												type="number"
												min="0"
												step="0.01"
												value={line.unitPrice}
												onChange={(event) =>
													updateLine(line.key, {
														unitPrice: event.target.value,
													})
												}
												className={inputClass}
											/>
											{errors.lines[line.key]?.unitPrice && (
												<p className={errorClass}>
													{errors.lines[line.key].unitPrice}
												</p>
											)}
										</div>

										<button
											type="button"
											onClick={() =>
												setLines((current) =>
													current.filter((item) => item.key !== line.key),
												)
											}
											aria-label={`Quitar concepto ${index + 1}`}
											className="inline-flex size-9 items-end justify-center rounded-lg pb-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										>
											<X aria-hidden="true" className="size-4" />
										</button>
									</div>
								</div>
							))}
						</div>

						<div className="space-y-1">
							<label htmlFor="sale-notes" className="text-xs text-muted-foreground">
								Notas
							</label>
							<textarea
								id="sale-notes"
								value={notes}
								onChange={(event) => setNotes(event.target.value)}
								placeholder="Observaciones de la venta…"
								rows={3}
								className={`${inputClass} h-auto py-2`}
							/>
						</div>

						<div className="flex items-center justify-between rounded-lg bg-muted/40 p-4">
							<span className="text-xs font-medium text-muted-foreground">
								Total de la venta
							</span>
							<span className="text-lg font-semibold text-foreground">
								{formatAmount(total)}
							</span>
						</div>
					</div>

					<div className="flex flex-wrap justify-end gap-2 border-t border-border p-5">
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isSaving}
							className="rounded-lg bg-[#2A78D6] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isSaving ? "Guardando…" : "✓ Crear venta"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
