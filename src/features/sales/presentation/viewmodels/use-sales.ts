"use client";

import { useEffect, useState } from "react";
import { createSaleUseCase, getSalesUseCase } from "../../di/sale-use-cases";
import type { CreateSaleInput } from "../../domain/models/create-sale-input";
import type { Sale } from "../../domain/models/sale";

export function useSales() {
	const [sales, setSales] = useState<Sale[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [revision, setRevision] = useState(0);

	useEffect(() => {
		try {
			setSales(getSalesUseCase.execute());
			setError(null);
		} catch {
			setError("No se pudieron cargar las ventas.");
		} finally {
			setIsLoading(false);
		}
	}, [revision]);

	const createSale = (input: CreateSaleInput) => {
		const sale = createSaleUseCase.execute(input);
		setRevision((value) => value + 1);
		return sale;
	};

	const retry = () => setRevision((value) => value + 1);

	return { sales, isLoading, error, createSale, retry };
}
