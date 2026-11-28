import type { AccountReceivable } from "../../domain/models/account-receivable";
import type { AccountReceivableRepository } from "../../domain/repositories/account-receivable-repository";

const accountsReceivable: AccountReceivable[] = [
	{ cliente: "Dr. Alex de la Cruz Guillen", saldo: 0 },
];

export const staticAccountReceivableRepository: AccountReceivableRepository = {
	getAccountsReceivable: () => accountsReceivable,
};
