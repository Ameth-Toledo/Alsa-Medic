import type { Sale } from "../../domain/models/sale";

export const seedSales: Sale[] = [
	{
		folio: "VTA-0010",
		quotationFolio: "COT-001-05",
		date: "2026-10-14",
		client: "Dr. Alex de la Cruz Guillen",
		concepts: [
			{
				description: "Consulta médica",
				type: "Servicio",
				quantity: 1,
				unitPrice: 1500,
			},
		],
		total: 1500,
		paid: 0,
	},
	{
		folio: "VTA-0009",
		quotationFolio: "COT-001-04",
		date: "2026-10-10",
		client: "Clínica San Rafael",
		project: "Proyecto Alpha",
		concepts: [
			{
				description: "Equipo ligador de varices",
				type: "Producto",
				quantity: 1,
				unitPrice: 2400,
			},
		],
		total: 2400,
		paid: 2400,
	},
	{
		folio: "VTA-0008",
		date: "2026-10-02",
		client: "Hospital General",
		concepts: [
			{
				description: "Jeringa 10 ml",
				type: "Producto",
				quantity: 12,
				unitPrice: 25,
			},
			{
				description: "Aplicación",
				type: "Servicio",
				quantity: 3,
				unitPrice: 500,
			},
		],
		notes: "Entrega parcial",
		total: 1800,
		paid: 600,
	},
];
