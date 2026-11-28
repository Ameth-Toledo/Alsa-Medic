"use client";

import { formatCurrency } from "@/core/lib/format-currency";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	type TooltipContentProps,
	XAxis,
	YAxis,
} from "recharts";
import { getMonthlyFlow } from "../viewmodels/use-monthly-flow";

const INCOME_COLOR = "#2A78D6";
const EXPENSE_COLOR = "#EB6834";
const tickValues = [0, 13000, 25000, 38000, 50000];

function formatTick(value: number) {
	return value === 0 ? "$0" : `$${Math.round(value / 1000)}k`;
}

function FlowTooltip({
	active,
	payload,
	label,
}: TooltipContentProps) {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-lg bg-background px-3 py-2 text-xs shadow-lg">
			<p className="font-medium text-foreground">{label}</p>
			{payload.map((entry) => (
				<p key={String(entry.dataKey ?? entry.name)} className="text-muted-foreground">
					{entry.name}:{" "}
					<span className="font-medium text-foreground">
						{formatCurrency(Number(entry.value))}
					</span>
				</p>
			))}
		</div>
	);
}

export default function MonthlyFlowChart() {
	const flow = getMonthlyFlow();

	return (
		<section className="rounded-xl border border-border bg-background p-5">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="text-sm font-semibold text-foreground">Flujo mensual</h2>
					<p className="mt-1 text-xs text-muted-foreground">
						Ingresos y egresos por mes
					</p>
				</div>
				<div className="flex items-center gap-4 text-[11px] text-muted-foreground">
					<span className="inline-flex items-center gap-2">
						<span className="size-2 rounded-sm" style={{ backgroundColor: INCOME_COLOR }} />
						Ingresos
					</span>
					<span className="inline-flex items-center gap-2">
						<span className="size-2 rounded-sm" style={{ backgroundColor: EXPENSE_COLOR }} />
						Egresos
					</span>
				</div>
			</div>

			<div className="mt-6 h-56 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={flow} barGap={4} margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
						<CartesianGrid vertical={false} stroke="var(--border)" />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
						/>
						<YAxis
							domain={[0, 50000]}
							ticks={tickValues}
							tickFormatter={formatTick}
							tickLine={false}
							axisLine={false}
							width={44}
							tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
						/>
						<Tooltip
							content={(props) => <FlowTooltip {...props} />}
							cursor={{ fill: "transparent", stroke: "none" }}
							wrapperStyle={{
								background: "transparent",
								border: "none",
								boxShadow: "none",
								padding: 0,
							}}
						/>
						<Bar
							dataKey="income"
							name="Ingresos"
							fill={INCOME_COLOR}
							radius={[2, 2, 0, 0]}
							maxBarSize={14}
						/>
						<Bar
							dataKey="expenses"
							name="Egresos"
							fill={EXPENSE_COLOR}
							radius={[2, 2, 0, 0]}
							maxBarSize={14}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</section>
	);
}
