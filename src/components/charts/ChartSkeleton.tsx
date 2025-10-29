"use client";


import { Skeleton } from "@/components/ui/skeleton";


export function ChartSkeleton() {
return (
<div className="w-full h-full flex items-center justify-center">
<div className="w-full h-full">
<Skeleton className="w-full h-full rounded-xl" />
</div>
</div>
);
}


export default ChartSkeleton;