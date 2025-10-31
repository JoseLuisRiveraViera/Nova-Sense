// src/components/alerts/AlertsTable.tsx
"use client";

import { Alert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, AlertTriangle, Info, TrendingUp, MapPin, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { RelativeTime } from "@/components/ui/relative-time";
import { cn } from "@/lib/utils";

interface AlertsTableProps {
  alerts: Alert[];
  onToggleAck: (id: string) => void;
}

const alertConfig = {
  critical: {
    icon: AlertCircle,
    badge: "⛔ Crítica",
    gradient: "from-red-500 to-rose-600",
    textColor: "text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    badge: "⚠ Precaución",
    gradient: "from-yellow-500 to-orange-500",
    textColor: "text-yellow-700",
  },
  info: {
    icon: Info,
    badge: "ℹ️ Info",
    gradient: "from-cyan-600 to-blue-600",
    textColor: "text-cyan-700",
  },
} as const;

export function AlertsTable({ alerts, onToggleAck }: AlertsTableProps) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold">Tipo</TableHead>
            <TableHead className="font-semibold">Estación</TableHead>
            <TableHead className="font-semibold">Mensaje</TableHead>
            <TableHead className="font-semibold">Hace</TableHead>
            <TableHead className="font-semibold text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <TableRow key={alert.id} className={alert.acknowledged ? "opacity-60" : ""}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4 shrink-0", config.textColor)} aria-hidden="true" />
                    <Badge
                      variant="secondary"
                      className={cn(
                        "bg-gradient-to-r text-white font-semibold text-xs",
                        config.gradient
                      )}
                    >
                      {config.badge}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{alert.stationName}</TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm text-slate-700 line-clamp-2">{alert.message}</p>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  <RelativeTime date={alert.timestamp} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Ver estadísticas"
                    >
                      <Link href={`/stats?station=${alert.stationId}`}>
                        <TrendingUp className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Ver estadísticas</span>
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Ver en mapa"
                    >
                      <Link href="/rivers">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Ver en mapa</span>
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleAck(alert.id)}
                      className="h-8 w-8 p-0"
                      title={alert.acknowledged ? "Marcar como no vista" : "Marcar como vista"}
                    >
                      {alert.acknowledged ? (
                        <>
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">Marcar como no vista</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">Marcar como vista</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}