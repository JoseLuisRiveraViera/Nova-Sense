import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export interface MetricCardProps { label: string; value: string | number; help?: string }


export function MetricCard({ label, value, help }: MetricCardProps) {
return (
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-sm text-slate-600">{label}</CardTitle>
</CardHeader>
<CardContent>
<div className="text-2xl font-bold text-slate-900">{value}</div>
{help && <p className="text-xs text-slate-500 mt-1">{help}</p>}
</CardContent>
</Card>
);
}


export default MetricCard;