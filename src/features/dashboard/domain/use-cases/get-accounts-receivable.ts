import type { AccountReceivable } from "../models/account-receivable";
import type { AccountReceivableRepository } from "../repositories/account-receivable-repository";

export class GetAccountsReceivableUseCase {
	constructor(private readonly repository: AccountReceivableRepository) {}

	execute(): AccountReceivable[] {
		return this.repository.getAccountsReceivable();
	}
}
