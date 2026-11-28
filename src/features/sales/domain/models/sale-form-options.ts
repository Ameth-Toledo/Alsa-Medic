import type { SaleCatalogItem } from "./sale-catalog-item";
import type { SaleClient } from "./sale-client";
import type { SaleProject } from "./sale-project";

export interface SaleFormOptions {
	clients: SaleClient[];
	projects: SaleProject[];
	catalogItems: SaleCatalogItem[];
}
