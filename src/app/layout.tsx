import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";

import "@/styles/globals.css";
import TopNav from '../components/topNav';

import ThemeSwitch from "@/components/themeSwitch";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Basic todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
			<html lang="en" suppressHydrationWarning>
				<head />
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased",
						fontSans.variable
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<TopNav />
						{children}
					</ThemeProvider>
				</body>
			</html>
		);
}
