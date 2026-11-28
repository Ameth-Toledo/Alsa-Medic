"use client";

import type { ReactNode } from "react";
import { cn } from "@/core/lib/utils";

export interface FinancialCardProps {
	label: string;
	value: string;
	helper?: string;
	icon?: ReactNode;
	tone?: "default" | "positive" | "negative";
	emphasis?: boolean;
	className?: string;
}

const valueToneClasses: Record<NonNullable<FinancialCardProps["tone"]>, string> = {
	default: "text-foreground",
	positive: "text-emerald-500",
	negative: "text-rose-500",
};

export default function FinancialCard({
	label,
	value,
	helper,
	icon,
	tone = "default",
	emphasis = false,
	className,
}: FinancialCardProps) {
	return (
		<article
			className={cn(
				"min-w-0 rounded-xl border border-border bg-background p-5",
				className,
			)}
		>
			<div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
				{icon ? <span className="shrink-0">{icon}</span> : null}
				<span className="truncate">{label}</span>
			</div>
			<p
				className={cn(
					"mt-4 font-medium tracking-tight",
					emphasis ? "text-2xl" : "text-xl",
					valueToneClasses[tone],
				)}
			>
				{value}
			</p>
			{helper ? (
				<p className="mt-2 text-xs leading-5 text-muted-foreground">{helper}</p>
			) : null}
		</article>
	);
}
