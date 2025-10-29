import { Station, Reading } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplet, Thermometer, Wind, Activity, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { getBackgroundByQuality, getBorderColorByQuality, getEmojiByQuality, getMessageByQuality } from '@/lib/mapHelpers';

interface StationCardProps {
  station: Station;
  latestReading?: Reading;
  showDetailsButton?: boolean;
}

export function StationCard({ station, latestReading, showDetailsButton = false }: StationCardProps) {
  const bgGradient = getBackgroundByQuality(station.quality);
  const borderColor = getBorderColorByQuality(station.quality);
  const emoji = getEmojiByQuality(station.quality);
  const message = getMessageByQuality(station.quality);

  const getBadgeVariant = () => {
    switch (station.quality) {
      case 'Buena': return 'default';
      case 'Moderada': return 'secondary';
      case 'Peligrosa': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className={`w-[280px] rounded-2xl border ${borderColor} bg-gradient-to-br ${bgGradient} shadow-xl overflow-hidden`}>
      {station.imageUrl && (
        <div className="w-full h-16 overflow-hidden">
          <img src={station.imageUrl} alt={station.name} className="w-full h-full object-cover" />
        </div>
      )}

      <CardHeader className="pb-2 pt-2 px-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-bold text-slate-900 leading-tight">{station.name}</CardTitle>
          <Badge variant={getBadgeVariant()} className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full">
            {station.quality}
          </Badge>
        </div>
        <CardDescription className="text-[11px] font-medium text-slate-700 mt-1 leading-snug">
          {emoji} {message}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 px-3 pb-2">
        {station.description && (
          <p className="text-[11px] text-slate-700 bg-white/80 rounded-md p-2 leading-snug">
            {station.description}
          </p>
        )}

        {latestReading && (
          <div className="grid grid-cols-2 gap-1.5" role="list" aria-label="Parámetros de calidad">
            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-md" role="listitem">
              <Droplet className="w-3.5 h-3.5 text-blue-600" aria-hidden />
              <div>
                <div className="text-[10px] text-slate-600 leading-none">pH</div>
                <div className="text-[12px] font-semibold text-slate-900 leading-none mt-0.5">{latestReading.ph.toFixed(1)}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-md" role="listitem">
              <Wind className="w-3.5 h-3.5 text-slate-600" aria-hidden />
              <div>
                <div className="text-[10px] text-slate-600 leading-none">Turbidez (NTU)</div>
                <div className="text-[12px] font-semibold text-slate-900 leading-none mt-0.5">{latestReading.turbidity.toFixed(1)}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-md" role="listitem">
              <Activity className="w-3.5 h-3.5 text-cyan-600" aria-hidden />
              <div>
                <div className="text-[10px] text-slate-600 leading-none">Oxígeno (mg/L)</div>
                <div className="text-[12px] font-semibold text-slate-900 leading-none mt-0.5">{latestReading.oxygen.toFixed(1)}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-md" role="listitem">
              <Thermometer className="w-3.5 h-3.5 text-orange-600" aria-hidden />
              <div>
                <div className="text-[10px] text-slate-600 leading-none">Temp. (°C)</div>
                <div className="text-[12px] font-semibold text-slate-900 leading-none mt-0.5">{latestReading.temperature.toFixed(1)}</div>
              </div>
            </div>
          </div>
        )}

        {station.trend && (
          <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-md">
            {station.trend === 'improving' ? (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-green-600" aria-hidden />
                <span className="text-[11px] text-slate-700">Mejorando</span>
              </>
            ) : station.trend === 'worsening' ? (
              <>
                <TrendingDown className="w-3.5 h-3.5 text-red-600" aria-hidden />
                <span className="text-[11px] text-slate-700">Deteriorando</span>
              </>
            ) : (
              <span className="text-[11px] text-slate-700">Estable</span>
            )}
          </div>
        )}
      </CardContent>

      {showDetailsButton && (
        <CardFooter className="pt-0 pb-2 px-3">
          <a
            href={`/stats?station=${station.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 h-8 text-[12px] font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-md transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
          >
            <BarChart3 className="w-4 h-4" aria-hidden />
            Ver estadísticas
          </a>
        </CardFooter>
      )}

      <div className="px-3 pb-2">
        <div className="text-[10px] text-slate-500 text-center">
          {station.lastUpdated.toLocaleString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </Card>
  );
}
