"use client"

import ThemeSwitch from "@/components/themeSwitch";

export default function TopNav() {
	return (
		<nav className="sticky top-0 flex w-full items-center justify-between bg-background bg-opacity-70 backdrop-blur-md px-[10%] py-4 text-xl font-semibold border-b border-border">
			<a href="/">
				<div className="text-3xl">Todo</div>
			</a>
			<ThemeSwitch />
		</nav>
	);
}
