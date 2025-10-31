// src/components/alerts/AlertCard.tsx
"use client";

import { Alert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info, MapPin, TrendingUp, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { RelativeTime } from "@/components/ui/relative-time";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  alert: Alert;
  onToggleAck: (id: string) => void;
}

const alertConfig = {
  critical: {
    icon: AlertCircle,
    badge: "⛔ Crítica",
    gradient: "from-red-500 to-rose-600",
    borderColor: "border-red-200",
    bgLight: "bg-red-50",
    textColor: "text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    badge: "⚠ Precaución",
    gradient: "from-yellow-500 to-orange-500",
    borderColor: "border-yellow-200",
    bgLight: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  info: {
    icon: Info,
    badge: "ℹ️ Información",
    gradient: "from-cyan-600 to-blue-600",
    borderColor: "border-cyan-200",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-700",
  },
} as const;

export function AlertCard({ alert, onToggleAck }: AlertCardProps) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <Card className={cn("overflow-hidden border-2", config.borderColor)}>
      {/* Header con gradiente */}
      <div className={cn("h-2 bg-gradient-to-r", config.gradient)} aria-hidden="true" />
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className={cn("rounded-full p-2 shrink-0", config.bgLight)}>
              <Icon className={cn("h-5 w-5", config.textColor)} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <Badge
                variant="secondary"
                className={cn(
                  "mb-2 bg-gradient-to-r text-white font-semibold",
                  config.gradient
                )}
              >
                {config.badge}
              </Badge>
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-600 shrink-0" aria-hidden="true" />
                <span className="truncate">{alert.stationName}</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-600">
          <RelativeTime date={alert.timestamp} prefix="Última actualización: " />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px] border-cyan-600 text-cyan-700 hover:bg-cyan-50"
          >
            <Link href={`/stats?station=${alert.stationId}`}>
              <TrendingUp className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Ver estadísticas
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px]"
          >
            <Link href="/rivers">
              <MapPin className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Ver mapa
            </Link>
          </Button>

          <Button
            variant={alert.acknowledged ? "ghost" : "secondary"}
            size="sm"
            onClick={() => onToggleAck(alert.id)}
            className="shrink-0"
          >
            {alert.acknowledged ? (
              <>
                <EyeOff className="h-4 w-4 mr-1.5" aria-hidden="true" />
                No vista
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Marcar vista
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}