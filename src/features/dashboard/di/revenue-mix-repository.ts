import { staticRevenueMixRepository } from "../data/repositories/static-revenue-mix-repository";
import type { RevenueMixRepository } from "../domain/repositories/revenue-mix-repository";

export const revenueMixRepository: RevenueMixRepository = staticRevenueMixRepository;
