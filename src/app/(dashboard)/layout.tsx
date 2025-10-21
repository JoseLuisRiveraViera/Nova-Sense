// src/app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Droplets, 
  LayoutDashboard, 
  MapPin, 
  Bell, 
  LineChart, 
  MessageSquare,
  Menu,
  X,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Inicio",
    href: "/",
    icon: LayoutDashboard,
    description: "Estado general del agua"
  },
  {
    name: "Ver Mapa",
    href: "/rivers",
    icon: MapPin,
    description: "Fuentes cercanas a ti"
  },
  {
    name: "Alertas",
    href: "/alerts",
    icon: Bell,
    description: "Avisos importantes"
  },
  {
    name: "Estadísticas",
    href: "/stats",
    icon: LineChart,
    description: "Datos y tendencias"
  },
  {
    name: "Consultar IA",
    href: "/chat",
    icon: MessageSquare,
    description: "Pregunta sobre el agua"
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              NovaSense
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Info Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-900">
                Sistema Activo
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Monitoreando 14 fuentes en tiempo real
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="h-full px-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-green-700">
                  Todos los sensores operando
                </span>
              </div>

              {/* Landing page link */}
              <Link href="/presentation">
                <Button variant="outline" size="sm">
                  Sobre NovaSense
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}