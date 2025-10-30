"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface TrendPoint {
  timestamp: string; // ISO string
  value: number;
}

export interface StationTrendProps {
  data: TrendPoint[];
  label: string;
}

// Theming via shadcn/ui chart (usa --chart-2)
const chartConfig = {
  value: {
    label: "Valor",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function StationTrend({ data, label }: StationTrendProps) {
  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={fmtTime} minTickGap={32} />
          <YAxis />
          <ChartTooltip
            cursor
            content={<ChartTooltipContent nameKey="value" />}
            // Tooltip formatea la etiqueta de tiempo:
            labelFormatter={(l: string) => fmtTime(l)}
          />
          <Line
            type="monotone"
            dataKey="value"
            name={label}
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default StationTrend;
