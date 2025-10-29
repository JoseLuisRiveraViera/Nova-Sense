"use client";


import { Station } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export interface StationSelectProps {
stations: Station[];
value?: string;
onChange: (id: string) => void;
}


export function StationSelect({ stations, value, onChange }: StationSelectProps) {
return (
<div className="w-full md:w-72">
<Select value={value} onValueChange={onChange}>
<SelectTrigger aria-label="Selecciona estación">
<SelectValue placeholder="Selecciona estación" />
</SelectTrigger>
<SelectContent>
{stations.map((s) => (
<SelectItem key={s.id} value={s.id}>
{s.name}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
);
}


export default StationSelect;