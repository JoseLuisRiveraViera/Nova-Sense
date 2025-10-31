"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { TooltipProps } from "recharts";
import {
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import { generateMockReadings } from "@/lib/mockData";

// ------- helpers de normalización -------
const clamp = (x: number, min = 0, max = 100) => Math.max(min, Math.min(max, x));
const normPh = (ph: number) => clamp(((ph - 6.5) / (8.5 - 6.5)) * 100);
const normTurbidity = (ntu: number) => clamp(((15 - ntu) / 15) * 100);
const normOxygen = (o2: number) => clamp(((o2 - 6) / (10 - 6)) * 100);
const normTemp = (t: number) => clamp(((t - 18) / (26 - 18)) * 100);

type Row = {
  month: string;  // "2025-01"
  label: string;  // "Ene 2025"
  ph: number;
  turbidity: number;
  oxygen: number;
  temperature: number;
  phRaw: number;
  turbidityRaw: number;
  oxygenRaw: number;
  temperatureRaw: number;
};

export interface MultiMetricMonthlyProps {
  stationId: string;
  months?: number; // default 12
}

// Configuración de colores para cada métrica
const chartConfig = {
  ph: { 
    label: "pH", 
    color: "#3b82f6" // blue-500
  },
  turbidity: { 
    label: "Turbidez", 
    color: "#f59e0b" // amber-500
  },
  oxygen: { 
    label: "Oxígeno", 
    color: "#10b981" // emerald-500
  },
  temperature: { 
    label: "Temperatura", 
    color: "#ef4444" // red-500
  },
} satisfies ChartConfig;

// Tooltip personalizado con cuadros de color
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const round = (n: number, d = 1) => (Number.isFinite(n) ? +n.toFixed(d) : n);

  return (
    <div className="rounded-lg border bg-background p-2 shadow-lg">
      <div className="mb-2 font-medium text-sm">{label}</div>
      <div className="space-y-1">
        {payload.map((entry) => {
          const row = entry.payload as Row;
          const dataKey = entry.dataKey as string;
          
          let displayValue = "";
          let metricLabel = "";
          
          if (dataKey === "ph") {
            metricLabel = "pH";
            displayValue = `${Math.round(entry.value || 0)}% (${round(row.phRaw)} pH)`;
          } else if (dataKey === "turbidity") {
            metricLabel = "Turbidez";
            displayValue = `${Math.round(entry.value || 0)}% (${round(row.turbidityRaw)} NTU)`;
          } else if (dataKey === "oxygen") {
            metricLabel = "Oxígeno";
            displayValue = `${Math.round(entry.value || 0)}% (${round(row.oxygenRaw)} mg/L)`;
          } else if (dataKey === "temperature") {
            metricLabel = "Temperatura";
            displayValue = `${Math.round(entry.value || 0)}% (${round(row.temperatureRaw)} °C)`;
          }

          return (
            <div key={dataKey} className="flex items-center gap-2 text-xs">
              <div 
                className="h-3 w-3 rounded-sm shrink-0" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{displayValue}</span>
              <span className="text-muted-foreground">{metricLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function MultiMetricMonthly({ stationId, months = 12 }: MultiMetricMonthlyProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Agregación mensual (últimos N meses)
  const data: Row[] = useMemo(() => {
    const hours = months * 30 * 24; // aprox
    const readings = generateMockReadings(stationId, hours);

    // agrupación YYYY-MM
    const buckets = new Map<
      string,
      { sumPh: number; sumNtu: number; sumO2: number; sumTemp: number; count: number }
    >();

    for (const r of readings) {
      const d = r.timestamp instanceof Date ? r.timestamp : new Date(r.timestamp);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const b = buckets.get(key) ?? { sumPh: 0, sumNtu: 0, sumO2: 0, sumTemp: 0, count: 0 };
      b.sumPh += r.ph;
      b.sumNtu += r.turbidity;
      b.sumO2 += r.oxygen;
      b.sumTemp += r.temperature;
      b.count += 1;
      buckets.set(key, b);
    }

    const orderedKeys = Array.from(buckets.keys()).sort(); // "YYYY-MM"
    const lastKeys = orderedKeys.slice(-months);
    const fmt = new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" });

    return lastKeys.map<Row>((key) => {
      const b = buckets.get(key)!;
      const [y, m] = key.split("-").map(Number);
      const label = fmt.format(new Date(y, m - 1, 1));
      const phAvg = b.sumPh / b.count;
      const ntuAvg = b.sumNtu / b.count;
      const o2Avg = b.sumO2 / b.count;
      const tAvg = b.sumTemp / b.count;

      return {
        month: key,
        label,
        ph: normPh(phAvg),
        turbidity: normTurbidity(ntuAvg),
        oxygen: normOxygen(o2Avg),
        temperature: normTemp(tAvg),
        phRaw: phAvg,
        turbidityRaw: ntuAvg,
        oxygenRaw: o2Avg,
        temperatureRaw: tAvg,
      };
    });
  }, [stationId, months]);

  // pequeño delay para skeleton
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(t);
  }, [stationId, months]);

  if (isLoading) {
    return <div className="h-[320px] w-full rounded-xl border bg-muted/20 animate-pulse" />;
  }

  if (!data.length) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center rounded-xl border text-sm text-muted-foreground">
        Aún no hay datos suficientes para este periodo.
      </div>
    );
  }

  const tickFormatter = (label: string) => label.split(" ")[0]; // "Ene"

  return (
    <ChartContainer config={chartConfig} className="h-[320px] w-full">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tickFormatter={tickFormatter} interval="preserveStartEnd" minTickGap={24} />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}`} />

        <Tooltip content={<CustomTooltip />} />

        {/* Líneas diferenciadas por patrón + color */}
        <Line
          type="monotone"
          dataKey="ph"
          stroke={chartConfig.ph.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="turbidity"
          stroke={chartConfig.turbidity.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          strokeDasharray="6 3"
        />
        <Line
          type="monotone"
          dataKey="oxygen"
          stroke={chartConfig.oxygen.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          strokeDasharray="2 2"
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke={chartConfig.temperature.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          strokeDasharray="8 2"
        />
      </LineChart>
    </ChartContainer>
  );
}

export default MultiMetricMonthly;