// src/app/(dashboard)/alerts/page.tsx
import { generateMockAlerts } from "@/lib/mockData";
import { AlertsClient } from "@/components/alerts/AlertsClient";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Alertas | NovaSense",
  description: "Monitorea las alertas de calidad del agua en tiempo real.",
};

export default function AlertsPage() {
  // Fase 1: Usar mock data (en Fase 2 será una llamada a API)
  const alerts = generateMockAlerts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg bg-gradient-to-r from-red-500 to-rose-600 p-2.5">
            <AlertTriangle className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Alertas</h1>
        </div>
        <p className="text-slate-600 text-lg">
          Monitorea avisos importantes sobre la calidad del agua en las estaciones de Nayarit.
        </p>
      </div>

      {/* Cliente CSR con filtros y listado */}
      <AlertsClient initialAlerts={alerts} />
    </div>
  );
}