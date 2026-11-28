"use client";

import { Bell, Moon, PanelLeft, Settings, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { getNavigationItemsForReact } from "@/shared/navigation/presentation/viewmodels/use-navigation-react";
import NotificationsPanel from "@/shared/notifications/presentation/components/notifications-panel";
import {
	AnimatedSidebar,
	AnimatedSidebarClose,
	AnimatedSidebarContent,
	AnimatedSidebarFooter,
	AnimatedSidebarGroup,
	AnimatedSidebarGroupContent,
	AnimatedSidebarGroupLabel,
	AnimatedSidebarHeader,
	AnimatedSidebarInset,
	AnimatedSidebarMenu,
	AnimatedSidebarMenuButton,
	AnimatedSidebarMenuItem,
	AnimatedSidebarProvider,
	AnimatedSidebarRail,
	AnimatedSidebarTrigger,
} from "./animated-sidebar";

const navigation = getNavigationItemsForReact();

export interface DashboardShellProps {
	activeHref?: string;
	headerLabel?: string;
	children?: ReactNode;
}

export default function DashboardShell({
	activeHref = "/dashboard",
	headerLabel,
	children,
}: DashboardShellProps) {
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const activeLabel =
		headerLabel ??
		navigation.find((item) => item.href === activeHref)?.label ??
		"Dashboard";

	useEffect(() => {
		setTheme(
			document.documentElement.classList.contains("dark") ? "dark" : "light",
		);
	}, []);

	useEffect(() => {
		if (!notificationsOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setNotificationsOpen(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [notificationsOpen]);

	const toggleTheme = () => {
		const next = theme === "dark" ? "light" : "dark";
		document.documentElement.classList.toggle("dark", next === "dark");
		localStorage.setItem("theme", next);
		setTheme(next);
	};

	return (
		<AnimatedSidebarProvider className="min-h-svh bg-background">
			<AnimatedSidebar
				ariaLabel="Navegación principal"
				collapsible="icon"
				className="min-h-0"
				panelClassName="h-svh border-foreground/[0.08]"
			>
				<AnimatedSidebarHeader className="p-3 pb-2">
					<div className="flex min-h-11 items-center gap-3 overflow-hidden px-2">
						<img
							src="/assets/logo.png"
							alt=""
							className="size-7 shrink-0 rounded-lg object-contain"
						/>
						<span className="truncate text-sm font-semibold text-foreground group-data-[state=collapsed]/sidebar:hidden">
							Alsa Medic
						</span>
						<AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-muted md:hidden">
							<X aria-hidden="true" className="size-4" />
						</AnimatedSidebarClose>
					</div>
				</AnimatedSidebarHeader>

				<AnimatedSidebarContent className="px-2 pt-1">
					<AnimatedSidebarGroup>
						<AnimatedSidebarGroupLabel>Menú</AnimatedSidebarGroupLabel>
						<AnimatedSidebarGroupContent>
							<AnimatedSidebarMenu>
								{navigation.map(({ href, label, Icon }) => (
									<AnimatedSidebarMenuItem key={label}>
										<AnimatedSidebarMenuButton
											href={href}
											isActive={activeHref === href}
											icon={<Icon className="size-4" />}
										>
											{label}
										</AnimatedSidebarMenuButton>
									</AnimatedSidebarMenuItem>
								))}
							</AnimatedSidebarMenu>
						</AnimatedSidebarGroupContent>
					</AnimatedSidebarGroup>
				</AnimatedSidebarContent>

				<AnimatedSidebarFooter className="gap-3 border-none p-3">
					<button
						type="button"
						className="flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
					>
						<span
							className="grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-black"
							style={{ backgroundColor: "#D5FF66" }}
						>
							AM
						</span>
						<span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
							<span className="block truncate text-sm font-medium text-foreground">
								Administrador
							</span>
							<span className="block truncate text-xs text-muted-foreground">
								admin@alsamedic.com
							</span>
						</span>
					</button>
				</AnimatedSidebarFooter>

				<AnimatedSidebarRail />
			</AnimatedSidebar>

			<AnimatedSidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-3 border-border border-b px-4">
					<AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
						<PanelLeft aria-hidden="true" className="size-4" />
					</AnimatedSidebarTrigger>
					<div className="h-5 w-px bg-border" />
					<p className="text-sm font-medium text-foreground">{activeLabel}</p>
					<div className="ml-auto flex items-center gap-1">
						<button
							type="button"
							onClick={() => setNotificationsOpen((open) => !open)}
							aria-label="Notificaciones"
							aria-expanded={notificationsOpen}
							aria-controls="notifications-panel"
							title="Notificaciones"
							className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
						>
							<Bell aria-hidden="true" className="size-4" />
						</button>
						<a
							href="/configuracion"
							aria-label="Configuración"
							title="Configuración"
							className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
						>
							<Settings aria-hidden="true" className="size-4" />
						</a>
						<button
							type="button"
							onClick={toggleTheme}
							aria-label={
								theme === "dark"
									? "Activar modo claro"
									: "Activar modo oscuro"
							}
							title={
								theme === "dark"
									? "Activar modo claro"
									: "Activar modo oscuro"
							}
							className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
						>
							{theme === "dark" ? (
								<Sun aria-hidden="true" className="size-4" />
							) : (
								<Moon aria-hidden="true" className="size-4" />
							)}
						</button>
					</div>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
			</AnimatedSidebarInset>

			<NotificationsPanel
				open={notificationsOpen}
				onClose={() => setNotificationsOpen(false)}
			/>
		</AnimatedSidebarProvider>
	);
}
