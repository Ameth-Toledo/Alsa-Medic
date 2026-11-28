import { GetSettingsUseCase } from '../domain/use-cases/get-settings';
import { SaveSettingsUseCase } from '../domain/use-cases/save-settings';
import { settingsRepository } from './settings-repository';

export const getSettingsUseCase = new GetSettingsUseCase(settingsRepository);
export const saveSettingsUseCase = new SaveSettingsUseCase(settingsRepository);
