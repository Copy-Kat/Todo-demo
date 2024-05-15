"use client"

import ThemeSwitch from "@/components/themeSwitch";

import { Menu } from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function TopNav() {
	return (
		<nav className="sticky z-20 top-0 flex w-full items-center justify-between bg-background bg-opacity-70 backdrop-blur-md px-5 py-4 text-xl font-semibold border-b border-border">
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent
					side={"left"}
					className="lg:w-[400px] w-[80%] flex flex-col items-center"
				>
					<SheetHeader>
						<SheetTitle>Navigation Menu</SheetTitle>
					</SheetHeader>
					<div className="w-[80%] text-center py-4 text-lg font-semibold">
						{" "}
						Dashboard
					</div>
					<div className="w-[80%] text-center py-4 text-lg font-semibold">
						{" "}
						Tasks
					</div>
					<div className="w-[80%] text-center py-4 text-lg font-semibold">
						{" "}
						Settings
					</div>
				</SheetContent>
			</Sheet>

			<div className="text-xl font-semibold">Todo App</div>
			<ThemeSwitch />
		</nav>
	);
}
