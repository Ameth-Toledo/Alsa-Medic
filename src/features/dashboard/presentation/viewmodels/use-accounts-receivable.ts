import { getAccountsReceivableUseCase } from "../../di/account-receivable-use-cases";

export function getAccountsReceivable() {
	return getAccountsReceivableUseCase.execute();
}
