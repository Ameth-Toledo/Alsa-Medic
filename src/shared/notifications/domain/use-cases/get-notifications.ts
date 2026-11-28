import type { Notification } from '../models/notification';
import type { NotificationRepository } from '../repositories/notification-repository';

export class GetNotificationsUseCase {
	constructor(private readonly repository: NotificationRepository) {}

	execute(): Notification[] {
		return this.repository.getNotifications();
	}
}
