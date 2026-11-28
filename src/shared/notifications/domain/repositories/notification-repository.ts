import type { Notification } from '../models/notification';

export interface NotificationRepository {
	getNotifications(): Notification[];
}
