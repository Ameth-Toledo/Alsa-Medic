import type { SaleFormOptions } from "../../domain/models/sale-form-options";

export const seedSaleFormOptions: SaleFormOptions = {
	clients: [
		{ id: "cli-1", name: "Dr. Alex de la Cruz Guillen" },
		{ id: "cli-2", name: "Clínica San Rafael" },
		{ id: "cli-3", name: "Hospital General" },
	],
	projects: [
		{ id: "pro-1", name: "Proyecto Alpha" },
		{ id: "pro-2", name: "Proyecto Beta" },
	],
	catalogItems: [
		{
			id: "cat-1",
			description:
				"Equipo ligador de varices esofágicas y rectales con 9 bandas y cable disparador de 1.4 mm. No estéril. Desechable. Pieza. Marca: LGMD",
			type: "Producto",
			price: 0,
		},
		{ id: "cat-2", description: "Consulta médica", type: "Servicio", price: 1500 },
		{ id: "cat-3", description: "Jeringa 10 ml", type: "Producto", price: 25 },
		{ id: "cat-4", description: "Aplicación", type: "Servicio", price: 500 },
	],
};
