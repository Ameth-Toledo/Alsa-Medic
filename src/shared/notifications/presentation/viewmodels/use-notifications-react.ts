import { getNotificationsUseCase } from '../../di/notification-use-cases';

export function getNotificationsForReact() {
	return getNotificationsUseCase.execute();
}
