"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import CategoryInput from "../components/category-input";
import type { BusinessSettings } from "../../domain/models/business-settings";
import type { Currency } from "../../domain/models/currency";
import type { ThemeMode } from "../../domain/models/theme-mode";
import { applyTheme, getSettings, saveSettings } from "../viewmodels/use-settings";

const inputClassName =
	"min-h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

export default function SettingsView() {
	const [settings, setSettings] = useState<BusinessSettings>(() => getSettings());
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		const stored = getSettings();
		setSettings(stored);
		applyTheme(stored.theme);
	}, []);

	function update<K extends keyof BusinessSettings>(
		key: K,
		value: BusinessSettings[K],
	) {
		setSettings((current) => ({ ...current, [key]: value }));
		setSaved(false);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		saveSettings(settings);
		setSaved(true);
	}

	function handleThemeChange(theme: ThemeMode) {
		update("theme", theme);
		applyTheme(theme);
	}

	return (
		<section className="space-y-6">
			<div>
				<p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
					Configuración
				</p>
				<h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
					Configuración del negocio
				</h1>
				<p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
					Define la información general, la moneda, el tema y las categorías que usa Alsa Medic.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2 sm:col-span-2">
							<label htmlFor="businessName" className="block text-xs font-medium text-foreground">
								Nombre del negocio
							</label>
							<input
								id="businessName"
								type="text"
								value={settings.businessName}
								onChange={(event) => update("businessName", event.target.value)}
								className={inputClassName}
							/>
						</div>

						<div className="space-y-2 sm:col-span-2">
							<label htmlFor="slogan" className="block text-xs font-medium text-foreground">
								Eslogan / giro
							</label>
							<input
								id="slogan"
								type="text"
								value={settings.slogan}
								onChange={(event) => update("slogan", event.target.value)}
								placeholder="Se muestra bajo el nombre del negocio"
								className={inputClassName}
							/>
							<p className="text-[11px] text-muted-foreground">
								Se muestra debajo del nombre del negocio.
							</p>
						</div>

						<div className="space-y-2">
							<label htmlFor="phone" className="block text-xs font-medium text-foreground">
								Teléfono
							</label>
							<input
								id="phone"
								type="tel"
								value={settings.phone}
								onChange={(event) => update("phone", event.target.value)}
								placeholder="55 1234 5678"
								className={inputClassName}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="rfc" className="block text-xs font-medium text-foreground">
								RFC
							</label>
							<input
								id="rfc"
								type="text"
								value={settings.rfc}
								onChange={(event) => update("rfc", event.target.value.toUpperCase())}
								placeholder="ABC123456XYZ"
								className={inputClassName}
							/>
						</div>

						<div className="space-y-2 sm:col-span-2">
							<label htmlFor="address" className="block text-xs font-medium text-foreground">
								Dirección
							</label>
							<textarea
								id="address"
								rows={3}
								value={settings.address}
								onChange={(event) => update("address", event.target.value)}
								placeholder="Calle, número, colonia, ciudad"
								className={`${inputClassName} resize-none py-2`}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="currency" className="block text-xs font-medium text-foreground">
								Moneda
							</label>
							<select
								id="currency"
								value={settings.currency}
								onChange={(event) => update("currency", event.target.value as Currency)}
								className={inputClassName}
							>
								<option value="MXN">MXN — Peso mexicano</option>
								<option value="USD">USD — Dólar estadounidense</option>
								<option value="EUR">EUR — Euro</option>
							</select>
						</div>
					</div>
				</div>

				<div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-4">
					<div>
						<h2 className="text-sm font-semibold text-foreground">Tema</h2>
						<p className="mt-1 text-xs text-muted-foreground">
							Elige el modo oscuro o claro para la interfaz.
						</p>
					</div>
					<div className="inline-flex rounded-xl border border-border bg-background p-1">
						<button
							type="button"
							onClick={() => handleThemeChange("dark")}
							aria-pressed={settings.theme === "dark"}
							className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
								settings.theme === "dark"
									? "bg-muted text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Moon aria-hidden="true" className="size-3.5" />
							Oscuro
						</button>
						<button
							type="button"
							onClick={() => handleThemeChange("light")}
							aria-pressed={settings.theme === "light"}
							className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
								settings.theme === "light"
									? "bg-muted text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Sun aria-hidden="true" className="size-3.5" />
							Claro
						</button>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-2">
					<div className="rounded-2xl border border-border bg-muted/30 p-4">
						<CategoryInput
							label="Categorías de ingresos"
							items={settings.incomeCategories}
							placeholder="Ej. Consultas"
							onChange={(items) => update("incomeCategories", items)}
						/>
					</div>
					<div className="rounded-2xl border border-border bg-muted/30 p-4">
						<CategoryInput
							label="Categorías de egresos"
							items={settings.expenseCategories}
							placeholder="Ej. Proveedores"
							onChange={(items) => update("expenseCategories", items)}
						/>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3">
					{saved ? (
						<span className="text-xs font-medium text-emerald-500">Cambios guardados</span>
					) : null}
					<button
						type="submit"
						className="inline-flex min-h-10 items-center rounded-xl bg-foreground px-4 text-xs font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
					>
						Guardar cambios
					</button>
				</div>
			</form>
		</section>
	);
}
