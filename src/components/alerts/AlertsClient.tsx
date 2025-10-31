// src/components/alerts/AlertsClient.tsx
"use client";

import { useState, useMemo } from "react";
import { Alert } from "@/types";
import { AlertsToolbar } from "./AlertsToolbar";
import { AlertCard } from "./AlertCard";
import { AlertsTable } from "./AlertsTable";
import { EmptyState } from "./EmptyState";

type AlertType = "all" | "critical" | "warning" | "info";
type ViewMode = "cards" | "table";

interface AlertsClientProps {
  initialAlerts: Alert[];
}

export function AlertsClient({ initialAlerts }: AlertsClientProps) {
  // Estado local
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [type, setType] = useState<AlertType>("all");
  const [showUnseenOnly, setShowUnseenOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [search, setSearch] = useState("");

  // Toggle acknowledged
  const handleToggleAck = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: !alert.acknowledged } : alert
      )
    );
  };

  // Filtrar y ordenar alertas
  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Filtro por tipo
    if (type !== "all") {
      filtered = filtered.filter((alert) => alert.type === type);
    }

    // Filtro por no vistas
    if (showUnseenOnly) {
      filtered = filtered.filter((alert) => !alert.acknowledged);
    }

    // Filtro por búsqueda (stationName o message)
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (alert) =>
          alert.stationName.toLowerCase().includes(searchLower) ||
          alert.message.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por timestamp desc (más recientes primero)
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    });

    return filtered;
  }, [alerts, type, showUnseenOnly, search]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <AlertsToolbar
        type={type}
        onTypeChange={setType}
        showUnseenOnly={showUnseenOnly}
        onToggleUnseen={setShowUnseenOnly}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        search={search}
        onSearchChange={setSearch}
      />

      {/* Lista de alertas o estado vacío */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          title="No hay alertas"
          description="No se encontraron alertas con los filtros aplicados. Intenta cambiar los filtros o buscar algo diferente."
        />
      ) : viewMode === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onToggleAck={handleToggleAck} />
          ))}
        </div>
      ) : (
        <AlertsTable alerts={filteredAlerts} onToggleAck={handleToggleAck} />
      )}

      {/* Contador de resultados */}
      {filteredAlerts.length > 0 && (
        <p className="text-sm text-slate-600 text-center">
          Mostrando {filteredAlerts.length} de {alerts.length} alerta{alerts.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}