"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NovaSenseSidebar } from "@/components/ui/novasense-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NovaSenseSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white transition-[width,height] ease-linear">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-base font-medium text-slate-900">
                Monitoreo de Calidad del Agua
              </h1>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:block">
                <p className="text-sm text-slate-600">
                  Información actualizada cada hora
                </p>
              </div>
              <Link href="/presentation">
                <Button variant="outline" size="sm">
                  Acerca de
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 bg-slate-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}