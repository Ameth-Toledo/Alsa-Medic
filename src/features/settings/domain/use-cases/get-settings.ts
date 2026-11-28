import type { BusinessSettings } from '../models/business-settings';
import type { SettingsRepository } from '../repositories/settings-repository';

export class GetSettingsUseCase {
	constructor(private readonly repository: SettingsRepository) {}

	execute(): BusinessSettings {
		return this.repository.getSettings();
	}
}
