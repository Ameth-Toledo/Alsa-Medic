"use client";

import {
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	type TooltipContentProps,
} from "recharts";
import type { RevenueMixCategory } from "../../domain/models/revenue-mix-category";
import { getRevenueMix } from "../viewmodels/use-revenue-mix";

const MIX_COLORS: Record<RevenueMixCategory, string> = {
	Productos: "#2A78D6",
	Servicios: "#D5FF66",
};

function MixTooltip({ active, payload }: TooltipContentProps) {
	if (!active || !payload?.length) return null;

	const entry = payload[0];

	return (
		<div className="rounded-lg bg-background px-3 py-2 text-xs shadow-lg">
			<p className="font-medium text-foreground">{entry.name}</p>
			<p className="text-muted-foreground">
				<span className="font-medium text-foreground">{String(entry.value)}%</span>
			</p>
		</div>
	);
}

export default function RevenueMixChart() {
	const mix = getRevenueMix();

	return (
		<section className="rounded-xl border border-border bg-background p-5">
			<div>
				<h2 className="text-sm font-semibold text-foreground">
					Composición de ventas
				</h2>
				<p className="mt-1 text-xs text-muted-foreground">
					Productos y servicios
				</p>
			</div>

			<div className="relative mt-4 h-40 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={mix}
							dataKey="value"
							nameKey="category"
							innerRadius={48}
							outerRadius={68}
							paddingAngle={3}
							stroke="none"
							startAngle={90}
							endAngle={-270}
						>
							{mix.map((item) => (
								<Cell key={item.category} fill={MIX_COLORS[item.category]} />
							))}
						</Pie>
						<Tooltip
							content={(props) => <MixTooltip {...props} />}
							wrapperStyle={{
								background: "transparent",
								border: "none",
								boxShadow: "none",
								padding: 0,
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
				<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-[10px] text-muted-foreground">Total</span>
					<span className="text-sm font-semibold text-foreground">100%</span>
				</div>
			</div>

			<div className="mt-4 space-y-2">
				{mix.map((item) => (
					<div key={item.category} className="flex items-center justify-between text-xs">
						<span className="inline-flex items-center gap-2 text-muted-foreground">
							<span
								className="size-2 rounded-full"
								style={{ backgroundColor: MIX_COLORS[item.category] }}
							/>
							{item.category}
						</span>
						<span className="font-medium text-foreground">{item.value}%</span>
					</div>
				))}
			</div>
		</section>
	);
}
