import { staticNotificationRepository } from '../data/repositories/static-notification-repository';
import type { NotificationRepository } from '../domain/repositories/notification-repository';

export const notificationRepository: NotificationRepository = staticNotificationRepository;
