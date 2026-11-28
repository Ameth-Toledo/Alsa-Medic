import type { BusinessSettings } from '../models/business-settings';

export interface SettingsRepository {
	getSettings(): BusinessSettings;
	saveSettings(settings: BusinessSettings): void;
}
