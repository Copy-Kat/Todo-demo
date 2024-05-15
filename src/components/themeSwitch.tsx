"use client"

import React from "react";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const inter = Inter({ subsets: ["latin"] });

const ThemeSwitch = () => {
	const [mounted, setMounted] = React.useState(false);
    const [value, setValue] = React.useState("system");
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Select
			value={value}
			onValueChange={(value: string) => {
                setValue(value);
				setTheme(value);
			}}
		>
			<SelectTrigger className="rounded-md border border-input bg-background px-3 py-2 text-sm w-[100px]">
				<SelectValue/>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default ThemeSwitch;
