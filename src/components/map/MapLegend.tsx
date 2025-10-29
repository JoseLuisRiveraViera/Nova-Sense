"use client";

import { Card } from '@/components/ui/card';
import { WaterQuality } from '@/types';

interface MapLegendProps {
  counts: Record<WaterQuality, number>;
}

const legendItems: { quality: WaterQuality; label: string; color: string }[] = [
  { quality: 'Buena', label: 'Segura', color: 'bg-emerald-500' },
  { quality: 'Moderada', label: 'Precaución', color: 'bg-yellow-500' },
  { quality: 'Peligrosa', label: 'Peligro', color: 'bg-red-500' },
];

export function MapLegend({ counts }: MapLegendProps) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm p-3 shadow-lg border-2 border-slate-200">
      <h3 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">
        Leyenda
      </h3>
      <div className="space-y-1.5">
        {legendItems.map(item => (
          <div key={item.quality} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${item.color} shrink-0`}
                aria-hidden="true"
              />
              <span className="text-xs text-slate-700 font-medium">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {counts[item.quality]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}