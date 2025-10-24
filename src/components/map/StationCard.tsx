import { Station, Reading } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Droplet, Thermometer, Wind, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  getBackgroundByQuality, 
  getBorderColorByQuality, 
  getEmojiByQuality,
  getMessageByQuality 
} from '@/lib/mapHelpers';

interface StationCardProps {
  station: Station;
  latestReading?: Reading; // Opcional: última lectura de parámetros
  onViewDetails?: () => void;
}

export function StationCard({ station, latestReading, onViewDetails }: StationCardProps) {
  const bgGradient = getBackgroundByQuality(station.quality);
  const borderColor = getBorderColorByQuality(station.quality);
  const emoji = getEmojiByQuality(station.quality);
  const message = getMessageByQuality(station.quality);

  const getBadgeVariant = () => {
    switch (station.quality) {
      case 'Buena':
        return 'default';
      case 'Moderada':
        return 'secondary';
      case 'Peligrosa':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className={`w-80 border-2 ${borderColor} bg-gradient-to-br ${bgGradient} shadow-xl`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold text-slate-900">
            {station.name}
          </CardTitle>
          <Badge variant={getBadgeVariant()} className="flex-shrink-0">
            {station.quality}
          </Badge>
        </div>
        <CardDescription className="text-base font-medium text-slate-700">
          {emoji} {message}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Mostrar parámetros solo si tenemos latestReading */}
        {latestReading && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
              <Droplet className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs text-slate-600">pH</div>
                <div className="font-semibold text-slate-900">{latestReading.ph.toFixed(1)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
              <Wind className="w-4 h-4 text-slate-600" />
              <div>
                <div className="text-xs text-slate-600">Turbidez</div>
                <div className="font-semibold text-slate-900">{latestReading.turbidity.toFixed(1)} NTU</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
              <Activity className="w-4 h-4 text-cyan-600" />
              <div>
                <div className="text-xs text-slate-600">Oxígeno</div>
                <div className="font-semibold text-slate-900">{latestReading.oxygen.toFixed(1)} mg/L</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
              <Thermometer className="w-4 h-4 text-orange-600" />
              <div>
                <div className="text-xs text-slate-600">Temperatura</div>
                <div className="font-semibold text-slate-900">{latestReading.temperature.toFixed(1)}°C</div>
              </div>
            </div>
          </div>
        )}

        {/* Descripción si no hay lectura */}
        {!latestReading && (
          <div className="p-3 bg-white/80 rounded-lg">
            <p className="text-sm text-slate-700">{station.description}</p>
          </div>
        )}

        {/* Tendencia (si existe) */}
        {station.trend && (
          <div className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
            {station.trend === 'improving' ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">Mejorando</span>
              </>
            ) : station.trend === 'worsening' ? (
              <>
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-slate-700">Deteriorando</span>
              </>
            ) : (
              <span className="text-sm text-slate-700">Estable</span>
            )}
          </div>
        )}

        {/* Última actualización */}
        <div className="text-xs text-slate-600 text-center pt-1">
          Actualizado: {station.lastUpdated.toLocaleString('es-MX', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </CardContent>

      {onViewDetails && (
        <CardFooter>
          <Button 
            onClick={onViewDetails}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            Ver Detalles Completos
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}