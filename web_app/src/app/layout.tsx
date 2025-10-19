import type { Metadata } from "next";
import ViewportWrapper from "@/components/ViewportWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset,
         SidebarProvider,
 } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {  ScrollArea } from "@/components/ui/scroll-area";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeatherEnergyNode",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ViewportWrapper>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col ">
            <SiteHeader />
            <header className="bg-muted/50 p-4">
              <Breadcrumbs />
            </header>
            <div className="flex-1 overflow-y-auto">
              <ScrollArea className="h-full scrollbar-thin scrollbar-track-hidden scrollbar-thumb-muted scrollbar-thumb-rounded-full hover:scrollbar-thumb-muted-transparent">
                <main className="bg-muted/50 flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
                </main>
              </ScrollArea>
            </div>
          </SidebarInset>
        </SidebarProvider>
        </ViewportWrapper>
      </body>
    </html>
  );
}
