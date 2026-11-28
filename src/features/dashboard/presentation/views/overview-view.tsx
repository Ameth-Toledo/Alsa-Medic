"use client";

import {
	Building2,
	Info,
	Landmark,
	Package,
	Scale,
	TrendingUp,
	Users,
	Wallet,
} from "lucide-react";
import { formatCurrency } from "@/core/lib/format-currency";
import AccountsReceivablePanel from "../components/accounts-receivable-panel";
import FinancialCard from "../components/financial-card";
import LowStockPanel from "../components/low-stock-panel";
import MonthlyFlowChart from "../components/monthly-flow-chart";
import RecentSalesTable from "../components/recent-sales-table";
import RevenueMixChart from "../components/revenue-mix-chart";
import { getFinancialOverview } from "../viewmodels/use-financial-overview";

const name = "Sara";

function Operator({ children }: { children: string }) {
	return (
		<span aria-hidden="true" className="self-center px-1 text-base font-normal leading-none text-muted-foreground">
			{children}
		</span>
	);
}

function SectionHeading({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-border border-b pb-3">
			<span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
				{number}
			</span>
			<h2 className="text-sm font-semibold text-foreground">{title}</h2>
			<p className="text-xs text-muted-foreground">— {description}</p>
		</div>
	);
}

export default function OverviewView() {
	const overview = getFinancialOverview();
	const money = (value: number) => formatCurrency(value);

	return (
		<section className="space-y-8">
			<div>
				<p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
					Dashboard
				</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
					¡Hola! {name}, este es tu resumen general
				</h1>
				<p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
					Métricas clave de Alsa Medic para el periodo actual.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<FinancialCard
					label="Balance general"
					value={money(overview.patrimony)}
					helper="Patrimonio: efectivo + por cobrar + inventario - deudas"
					icon={<Scale aria-hidden="true" className="size-4" />}
					emphasis
				/>
				<FinancialCard
					label="Bancos (efectivo)"
					value={money(overview.banks)}
					helper="Disponible ya: ingresos - egresos"
					icon={<Wallet aria-hidden="true" className="size-4" />}
					tone={overview.banks < 0 ? "negative" : "default"}
				/>
				<FinancialCard
					label="Por cobrar (clientes)"
					value={money(overview.receivables)}
					helper={`${overview.clientsCount} Clientes`}
					icon={<Users aria-hidden="true" className="size-4" />}
				/>
				<FinancialCard
					label="Por pagar (proveedores)"
					value={money(overview.payables)}
					helper={`${overview.suppliersCount} Proveedores`}
					icon={<Building2 aria-hidden="true" className="size-4" />}
				/>
				<FinancialCard
					label="Créditos por pagar"
					value={money(overview.credits)}
					helper="Préstamos (pasivo)"
					icon={<Landmark aria-hidden="true" className="size-4" />}
				/>
				<FinancialCard
					label="Utilidades"
					value={money(overview.utilities)}
					helper="Tu efectivo vs. lo que realmente vale tu negocio"
					icon={<TrendingUp aria-hidden="true" className="size-4" />}
					tone={overview.utilities >= 0 ? "positive" : "negative"}
				/>
			</div>

			<div className="space-y-4">
				<SectionHeading
					number="01"
					title="Flujo"
					description="efectivo que tendrás al cobrar y pagar"
				/>

				<div className="flex flex-wrap items-stretch gap-3">
					<FinancialCard
						label="Bancos"
						value={money(overview.banks)}
						helper="efectivo hoy"
						icon={<Wallet aria-hidden="true" className="size-4" />}
						tone={overview.banks < 0 ? "negative" : "default"}
						className="min-w-[150px] flex-1"
					/>
					<Operator>+</Operator>
					<FinancialCard
						label="Por cobrar"
						value={money(overview.receivables)}
						helper="Clientes"
						icon={<Users aria-hidden="true" className="size-4" />}
						className="min-w-[150px] flex-1"
					/>
					<Operator>-</Operator>
					<FinancialCard
						label="Por pagar"
						value={money(overview.payables)}
						helper="proveedores"
						icon={<Building2 aria-hidden="true" className="size-4" />}
						className="min-w-[150px] flex-1"
					/>
					<Operator>-</Operator>
					<FinancialCard
						label="Créditos"
						value={money(overview.credits)}
						helper="Préstamos"
						icon={<Landmark aria-hidden="true" className="size-4" />}
						className="min-w-[150px] flex-1"
					/>
					<Operator>=</Operator>
					<FinancialCard
						label="Disponible Proyectado"
						value={money(overview.projectedAvailable)}
						icon={<TrendingUp aria-hidden="true" className="size-4" />}
						className="min-w-[180px] flex-1"
					/>
				</div>
			</div>

			<div className="space-y-4">
				<SectionHeading
					number="02"
					title="Patrimonio"
					description="súmale lo que vale tu inventario"
				/>

				<div className="flex flex-wrap items-stretch gap-3">
					<FinancialCard
						label="Disponible proyectado"
						value={money(overview.projectedAvailable)}
						icon={<TrendingUp aria-hidden="true" className="size-4" />}
						className="min-w-[180px] flex-1"
					/>
					<Operator>+</Operator>
					<FinancialCard
						label="Inventario"
						value={money(overview.inventory)}
						helper="a costo"
						icon={<Package aria-hidden="true" className="size-4" />}
						className="min-w-[180px] flex-1"
					/>
					<Operator>=</Operator>
					<FinancialCard
						label="Balance general (patrimonio)"
						value={money(overview.patrimony)}
						icon={<Scale aria-hidden="true" className="size-4" />}
						emphasis
						className="min-w-[220px] flex-1"
					/>
				</div>
			</div>

			<div className="rounded-xl border border-border p-5">
				<p className="flex items-center gap-2 text-xs font-semibold text-foreground">
					<Info aria-hidden="true" className="size-4 text-muted-foreground" />
					Cómo se calcula
				</p>
				<p className="mt-3 text-xs leading-6 text-muted-foreground">
					Bancos es lo único que tienes disponible ya (ingresos − egresos); puede ser bajo o
					$0 aunque el negocio vaya bien, porque el dinero que invertiste se volvió
					inventario. Por eso ya no se resta «invertido» (se contaría dos veces: una al bajar
					Bancos cuando pagaste, y otra como resta). En su lugar se suma el inventario a
					costo, que es un activo tuyo y vuelve a ser dinero al vender. El Balance general
					(patrimonio) es lo que realmente vale tu negocio hoy.
				</p>
				<p className="mt-3 text-xs text-muted-foreground">
					Invertido histórico en compras/inversión:{" "}
					<span className="font-semibold text-foreground">
						{money(overview.investedHistorical)}
					</span>
					.
				</p>
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
				<MonthlyFlowChart />
				<RevenueMixChart />
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
				<RecentSalesTable />
				<div className="space-y-4">
					<AccountsReceivablePanel />
					<LowStockPanel />
				</div>
			</div>
		</section>
	);
}
