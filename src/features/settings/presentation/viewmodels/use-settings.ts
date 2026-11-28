import {
	getSettingsUseCase,
	saveSettingsUseCase,
} from '../../di/settings-use-cases';
import type { BusinessSettings } from '../../domain/models/business-settings';
import type { ThemeMode } from '../../domain/models/theme-mode';

export function getSettings(): BusinessSettings {
	return getSettingsUseCase.execute();
}

export function applyTheme(theme: ThemeMode) {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('theme', theme);
	}
}

export function saveSettings(settings: BusinessSettings) {
	saveSettingsUseCase.execute(settings);
	applyTheme(settings.theme);
}
