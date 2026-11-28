import type { Notification } from '../../domain/models/notification';
import type { NotificationRepository } from '../../domain/repositories/notification-repository';

const notifications: Notification[] = [
	{
		id: 'ntf-1',
		title: 'Venta registrada',
		description: 'VTA-0010 se creó correctamente.',
		time: 'Hace 5 min',
		read: false,
	},
	{
		id: 'ntf-2',
		title: 'Cuentas por cobrar',
		description: 'Tienes un saldo por revisar.',
		time: 'Hace 1 h',
		read: false,
	},
];

export const staticNotificationRepository: NotificationRepository = {
	getNotifications: () => notifications,
};
