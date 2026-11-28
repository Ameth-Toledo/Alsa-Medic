import type { AccountReceivable } from "../models/account-receivable";

export interface AccountReceivableRepository {
	getAccountsReceivable(): AccountReceivable[];
}
