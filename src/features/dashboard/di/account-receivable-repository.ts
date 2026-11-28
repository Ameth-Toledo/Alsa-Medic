import { staticAccountReceivableRepository } from "../data/repositories/static-account-receivable-repository";
import type { AccountReceivableRepository } from "../domain/repositories/account-receivable-repository";

export const accountReceivableRepository: AccountReceivableRepository =
	staticAccountReceivableRepository;
