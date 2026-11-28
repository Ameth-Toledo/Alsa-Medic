"use client";

import { Plus, X } from "lucide-react";
import { useId, useState } from "react";

export interface CategoryInputProps {
	label: string;
	items: string[];
	placeholder?: string;
	onChange: (items: string[]) => void;
}

export default function CategoryInput({
	label,
	items,
	placeholder,
	onChange,
}: CategoryInputProps) {
	const [value, setValue] = useState("");
	const inputId = useId();

	const add = () => {
		const next = value.trim();
		if (!next || items.some((item) => item.toLowerCase() === next.toLowerCase())) {
			setValue("");
			return;
		}
		onChange([...items, next]);
		setValue("");
	};

	return (
		<div className="space-y-2">
			<label htmlFor={inputId} className="block text-xs font-medium text-foreground">
				{label}
			</label>

			<div className="flex min-h-9 flex-wrap gap-2">
				{items.map((item) => (
					<span
						key={item}
						className="inline-flex items-center gap-1 rounded-full border border-border bg-background py-1 pl-2.5 pr-1 text-xs text-foreground"
					>
						{item}
						<button
							type="button"
							aria-label={`Quitar ${item}`}
							onClick={() => onChange(items.filter((current) => current !== item))}
							className="grid size-5 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
						>
							<X aria-hidden="true" className="size-3" />
						</button>
					</span>
				))}
			</div>

			<div className="flex gap-2">
				<input
					id={inputId}
					type="text"
					value={value}
					placeholder={placeholder}
					onChange={(event) => setValue(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							add();
						}
					}}
					className="min-h-10 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
				/>
				<button
					type="button"
					onClick={add}
					className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-xl border border-border px-3 text-xs font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
				>
					<Plus aria-hidden="true" className="size-3.5" />
					Agregar
				</button>
			</div>
		</div>
	);
}
