import { GetAccountsReceivableUseCase } from "../domain/use-cases/get-accounts-receivable";
import { accountReceivableRepository } from "./account-receivable-repository";

export const getAccountsReceivableUseCase = new GetAccountsReceivableUseCase(
	accountReceivableRepository,
);
