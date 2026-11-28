import { X } from 'lucide-react';
import { getNotificationsForReact } from '../viewmodels/use-notifications-react';

interface NotificationsPanelProps {
	open: boolean;
	onClose: () => void;
}

export default function NotificationsPanel({
	open,
	onClose,
}: NotificationsPanelProps) {
	const notifications = getNotificationsForReact();

	return (
		<>
			<div
				aria-hidden="true"
				onClick={onClose}
				className={`fixed inset-0 z-[55] bg-black/40 transition-opacity duration-300 ${
					open ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			/>

			<aside
				id="notifications-panel"
				aria-label="Notificaciones"
				aria-hidden={!open}
				inert={!open}
				className={`fixed inset-y-0 right-0 z-[60] flex w-[min(360px,100vw)] flex-col border-l border-border bg-background shadow-xl transition-transform duration-300 ease-out ${
					open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
				}`}
			>
				<div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
					<h2 className="text-sm font-semibold text-foreground">
						Notificaciones
					</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar notificaciones"
						className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<X aria-hidden="true" className="size-4" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					{notifications.length === 0 ? (
						<p className="text-xs text-muted-foreground">
							No tienes notificaciones nuevas.
						</p>
					) : (
						<ul className="space-y-3">
							{notifications.map((notification) => (
								<li
									key={notification.id}
									className="rounded-lg border border-border p-3"
								>
									<div className="flex items-start justify-between gap-3">
										<p className="text-xs font-medium text-foreground">
											{notification.title}
										</p>
										{!notification.read && (
											<span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#2A78D6]" />
										)}
									</div>
									<p className="mt-1 text-xs text-muted-foreground">
										{notification.description}
									</p>
									<p className="mt-2 text-[10px] text-muted-foreground">
										{notification.time}
									</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</aside>
		</>
	);
}
