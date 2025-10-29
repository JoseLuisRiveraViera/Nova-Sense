"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import { Station } from "@/types";
import { generateMockStations, generateMockReadings } from "@/lib/mockData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StationDetails } from "@/components/map/StationDetails";
import { RelativeTime } from "@/components/ui/relative-time";
import { StationSelect } from "@/components/charts/StationSelect";
import { MetricCard } from "@/components/charts/MetricCard";

// Declara el skeleton ANTES de usarlo en otros dynamic()
const ChartSkeleton = dynamic(
  () => import("@/components/charts/ChartSkeleton").then((m) => m.ChartSkeleton),
  { ssr: false }
);

// Charts (CSR only)
const WqiRadar = dynamic(
  () => import("@/components/charts/WqiRadar").then((m) => m.WqiRadar),
  { ssr: false, loading: () => <div className="h-64"><ChartSkeleton /></div> }
);

const StationTrend = dynamic(
  () => import("@/components/charts/StationTrend").then((m) => m.StationTrend),
  { ssr: false, loading: () => <div className="h-64"><ChartSkeleton /></div> }
);

export default function StatsPage() {
  const router = useRouter();
  const search = useSearchParams();

  // Estaciones mock (una sola vez)
  const stations = useMemo(() => generateMockStations(), []);

  // Estado inicial: query ?station o primera estación
  const [selectedId, setSelectedId] = useState<string>(() => {
    return search.get("station") ?? stations[0]?.id ?? "";
  });
  const [isLoading, setIsLoading] = useState(true);

  // Sincroniza URL → estado si cambia la query externamente
  useEffect(() => {
    const effectiveId = (search.get("station") ?? stations[0]?.id) || "";
    if (effectiveId && effectiveId !== selectedId) setSelectedId(effectiveId);
  }, [search, stations, selectedId]);

  // Cambio en el selector → empuja a la URL
  const handleSelect = (id: string) => {
    setSelectedId(id);
    const params = new URLSearchParams(search.toString());
    params.set("station", id);
    router.push(`/stats?${params.toString()}`);
  };

  // Simula carga breve para mostrar skeleton
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, [selectedId]);

  // ---- Datos derivados ----
  const station: Station | undefined = useMemo(() => {
    return stations.find((s) => s.id === selectedId) ?? stations[0];
  }, [selectedId, stations]);

  const last24 = useMemo(() => generateMockReadings(selectedId, 24), [selectedId]);
  const latest = last24[last24.length - 1] ?? station?.lastReading;

  // Radar (pH, turbidez, oxígeno, temperatura)
  const radarData = useMemo(
    () => [
      { name: "pH", value: latest?.ph ?? 7 },
      { name: "Turbidez", value: latest?.turbidity ?? 5 },
      { name: "Oxígeno", value: latest?.oxygen ?? 8 },
      { name: "Temperatura", value: latest?.temperature ?? 22 },
    ],
    [latest]
  );

  // Line (24h) – timestamp es Date en mock → convertir a string
  const trendData = useMemo(
    () => last24.map((r) => ({ timestamp: r.timestamp.toISOString(), value: r.temperature })),
    [last24]
  );

  if (!station) return <div className="p-6">No hay estaciones disponibles.</div>;

  // ---- UI ----
  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Encabezado */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Estadísticas de calidad del agua
            </h1>
            <p className="text-sm text-slate-600">
              Selecciona una estación para ver su estado actual y su tendencia de 24 horas.
            </p>
          </div>
          <StationSelect stations={stations} value={selectedId} onChange={handleSelect} />
        </div>

        <StationDetails station={station} compact />
        <p className="text-xs text-slate-500">
          <RelativeTime date={station.lastUpdated} prefix="Última actualización: " />
        </p>
      </div>

      <Separator />

      {/* Métricas actuales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="pH" value={latest?.ph?.toFixed(1) ?? "-"} help="Ideal 6.5–8.5" />
        <MetricCard label="Turbidez (NTU)" value={latest?.turbidity?.toFixed(1) ?? "-"} help="Menor es mejor" />
        <MetricCard label="Oxígeno (mg/L)" value={latest?.oxygen?.toFixed(1) ?? "-"} help=">= 5 recomendado" />
        <MetricCard label="Temp. (°C)" value={latest?.temperature?.toFixed(1) ?? "-"} help="20–24 confortable" />
      </div>

      {/* Radar actual */}
      <Card>
        <CardHeader>
          <CardTitle>Estado actual (radar)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {isLoading ? <ChartSkeleton /> : <WqiRadar data={radarData} />}
        </CardContent>
      </Card>

      {/* Tendencia 24h */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia 24h — Temperatura</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <StationTrend data={trendData} label="Temperatura (°C)" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
