import { GetNotificationsUseCase } from '../domain/use-cases/get-notifications';
import { notificationRepository } from './notification-repository';

export const getNotificationsUseCase = new GetNotificationsUseCase(
	notificationRepository,
);
