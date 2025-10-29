"use client";


import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
ChartConfig,
ChartContainer,
ChartTooltip,
ChartTooltipContent,
} from "@/components/ui/chart";


export interface RadarPoint { name: string; value: number }
export interface WqiRadarProps { data: RadarPoint[] }


// Theming vía shadcn/ui chart primitives
const chartConfig = {
value: {
label: "Valor",
color: "var(--chart-1)",
},
} satisfies ChartConfig;


export function WqiRadar({ data }: WqiRadarProps) {
return (
<ChartContainer config={chartConfig} className="w-full h-full">
<RadarChart data={data}>
<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
<PolarAngleAxis dataKey="name" />
<PolarGrid />
<Radar
dataKey="value"
fill="var(--color-value)"
fillOpacity={0.6}
dot={{ r: 4, fillOpacity: 1 }}
/>
</RadarChart>
</ChartContainer>
);
}


export default WqiRadar;