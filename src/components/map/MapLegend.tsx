import { WaterQuality } from '@/types';
import { Card } from '@/components/ui/card';
import { RelativeTime } from '@/components/ui/relative-time';

interface MapLegendProps {
  counts: Record<WaterQuality, number>;
  lastUpdated?: Date | string;
}

export function MapLegend({ counts, lastUpdated }: MapLegendProps) {
  return (
    <Card className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-xl max-w-[160px]">
      <div className="p-2.5 space-y-1.5">
        <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wide mb-1">
          Estado del Agua
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[11px] text-slate-700 leading-tight">
              Segura <span className="font-semibold">({counts.Buena})</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0" />
            <span className="text-[11px] text-slate-700 leading-tight">
              Precaución <span className="font-semibold">({counts.Moderada})</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
            <span className="text-[11px] text-slate-700 leading-tight">
              Peligro <span className="font-semibold">({counts.Peligrosa})</span>
            </span>
          </div>
        </div>

        {lastUpdated && (
          <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-200 leading-tight">
            <RelativeTime 
              date={lastUpdated}
              prefix="Última actualización: "
            />
          </div>
        )}
      </div>
    </Card>
  );
}