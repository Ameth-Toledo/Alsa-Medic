import { defaultSettings } from '../constants/default-settings';
import type { BusinessSettings } from '../../domain/models/business-settings';
import type { SettingsRepository } from '../../domain/repositories/settings-repository';

const STORAGE_KEY = 'alsa-medic-settings';

export const localStorageSettingsRepository: SettingsRepository = {
	getSettings() {
		if (typeof localStorage === 'undefined') return defaultSettings;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (!stored) return defaultSettings;
			return { ...defaultSettings, ...JSON.parse(stored) } as BusinessSettings;
		} catch {
			return defaultSettings;
		}
	},
	saveSettings(settings) {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	},
};
