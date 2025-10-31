"use client";

import { Station } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, Droplets, ThermometerSun, TestTube, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RelativeTime } from "@/components/ui/relative-time";
import Image from "next/image";

interface StationDetailsProps {
  station: Station;
  onViewStats?: (id: string) => void;
  compact?: boolean;
  /** Si es false, oculta el CTA (útil en /stats). Por defecto true para no romper otras secciones. */
  showCta?: boolean;
}

const qualityConfig = {
  Buena: {
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    label: "✓ Segura",
    emoji: "💧",
    message: "Puede tratarse para consumo",
  },
  Moderada: {
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    label: "⚠ Precaución",
    emoji: "⚠",
    message: "Úsala solo para riego",
  },
  Peligrosa: {
    color: "bg-red-500",
    textColor: "text-red-700",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    label: "⛔ Peligrosa",
    emoji: "🚫",
    message: "No la uses bajo ninguna circunstancia",
  },
} as const;

const trendConfig = {
  improving: { icon: TrendingUp, color: "text-emerald-600", label: "Mejorando" },
  stable: { icon: Minus, color: "text-slate-600", label: "Estable" },
  worsening: { icon: TrendingDown, color: "text-red-600", label: "Empeorando" },
} as const;

export function StationDetails({
  station,
  compact = false,
  showCta = true,
}: StationDetailsProps) {
  const config = qualityConfig[station.quality];
  const TrendIcon = trendConfig[station.trend].icon;

  // Mock readings para display (en prod vendrían de station.lastReading)
  const readings = {
    ph: 7.2,
    turbidity: 8.5,
    oxygen: 7.8,
    temperature: 22.5,
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Image Header */}
      {station.imageUrl && (
        <div className={cn("relative w-full overflow-hidden rounded-t-lg", compact ? "h-20" : "h-28")}>
        <Image
          src={station.imageUrl}
          alt={`Vista de ${station.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-center"
          // opcional:
          // priority={compact}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      )}

      {/* Header Content */}
      <div className={cn("px-3", station.imageUrl && "-mt-1")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className={cn("font-bold text-slate-900 truncate", compact ? "text-sm" : "text-base")}>
              {station.name}
            </h3>
            <div className={cn("mt-0.5 flex items-center gap-1.5", compact ? "text-xs" : "text-sm")}>
              <span className="text-slate-600">{config.emoji}</span>
              <span className={cn("font-medium", config.textColor)}>{config.message}</span>
            </div>
          </div>

          <Badge
            variant="secondary"
            className={cn(
              config.color,
              "shrink-0 text-white font-semibold",
              compact ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1"
            )}
          >
            {config.label}
          </Badge>
        </div>

        {!compact && station.description && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-600">{station.description}</p>
        )}
      </div>

      {/* Indicators Grid */}
      <div className={cn("grid grid-cols-2 gap-2 px-3", compact && "gap-1.5")}>
        <div className={cn("flex items-center gap-2 rounded-lg p-2 border", config.bgLight, config.borderColor)}>
          <TestTube className={cn(config.textColor, compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden />
          <div className="min-w-0 flex flex-col">
            <span className={cn("font-bold text-slate-900", compact ? "text-xs" : "text-sm")}>
              {readings.ph.toFixed(1)}
            </span>
            <span className={cn("leading-none text-slate-600", compact ? "text-[10px]" : "text-xs")}>pH</span>
          </div>
        </div>

        <div className={cn("flex items-center gap-2 rounded-lg p-2 border", config.bgLight, config.borderColor)}>
          <Droplets className={cn(config.textColor, compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden />
          <div className="min-w-0 flex flex-col">
            <span className={cn("font-bold text-slate-900", compact ? "text-xs" : "text-sm")}>
              {readings.turbidity.toFixed(1)}
            </span>
            <span className={cn("leading-none text-slate-600", compact ? "text-[10px]" : "text-xs")}>NTU</span>
          </div>
        </div>

        <div className={cn("flex items-center gap-2 rounded-lg p-2 border", config.bgLight, config.borderColor)}>
          <Activity className={cn(config.textColor, compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden />
          <div className="min-w-0 flex flex-col">
            <span className={cn("font-bold text-slate-900", compact ? "text-xs" : "text-sm")}>
              {readings.oxygen.toFixed(1)}
            </span>
            <span className={cn("leading-none text-slate-600", compact ? "text-[10px]" : "text-xs")}>O₂ mg/L</span>
          </div>
        </div>

        <div className={cn("flex items-center gap-2 rounded-lg p-2 border", config.bgLight, config.borderColor)}>
          <ThermometerSun className={cn(config.textColor, compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden />
          <div className="min-w-0 flex flex-col">
            <span className={cn("font-bold text-slate-900", compact ? "text-xs" : "text-sm")}>
              {readings.temperature.toFixed(1)}
            </span>
            <span className={cn("leading-none text-slate-600", compact ? "text-[10px]" : "text-xs")}>°C</span>
          </div>
        </div>
      </div>

      {/* Trend (solo no-compact) */}
      {!compact && (
        <div className="flex items-center gap-2 px-3">
          <TrendIcon className={cn("h-4 w-4", trendConfig[station.trend].color)} aria-hidden />
          <span className="text-xs text-slate-600">
            Tendencia: <span className="font-medium">{trendConfig[station.trend].label}</span>
          </span>
        </div>
      )}

      {/* CTA Button (se puede ocultar con showCta={false}) */}
      {showCta && (
        <div className="px-3 pb-2">
          <Button
            asChild
            variant="outline"
            size={compact ? "sm" : "default"}
            className="w-full border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 font-semibold"
          >
            <Link href={`/stats?station=${station.id}`}>Ver estadísticas completas</Link>
          </Button>
        </div>
      )}

      {/* Last updated */}
      <div className="px-3 pb-1">
        <p className="text-center text-[10px] text-slate-500">
          <RelativeTime date={station.lastUpdated} />
        </p>
      </div>
    </div>
  );
}
