import type { BusinessSettings } from '../models/business-settings';
import type { SettingsRepository } from '../repositories/settings-repository';

export class SaveSettingsUseCase {
	constructor(private readonly repository: SettingsRepository) {}

	execute(settings: BusinessSettings): void {
		this.repository.saveSettings(settings);
	}
}
