import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import "@/styles/globals.css";
import TopNav from '../components/topNav';

const inter = Inter({ subsets: ["latin"] });

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
				<body className={`${inter.className} bg-background`}>
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
