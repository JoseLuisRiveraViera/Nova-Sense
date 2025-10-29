"use client";


import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


export interface TrendPoint { timestamp: string; value: number }
export interface StationTrendProps { data: TrendPoint[]; label: string }


export function StationTrend({ data, label }: StationTrendProps) {
const tsFormatter = (iso: string) => {
const d = new Date(iso);
return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
};


return (
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="timestamp" tickFormatter={tsFormatter} minTickGap={32} />
<YAxis />
<Tooltip labelFormatter={(l: string) => tsFormatter(l)} formatter={(v: number) => [v.toFixed(1), label]} />
<Line type="monotone" dataKey="value" stroke="#2563EB" dot={false} strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
);
}


export default StationTrend;