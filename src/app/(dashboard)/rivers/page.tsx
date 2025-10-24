import { InteractiveMap } from '@/components/map/InteractiveMap';
import { generateMockStations } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Droplets, AlertTriangle } from 'lucide-react';

export default function RiversPage() {
  const stations = generateMockStations();
  
  const safeCount = stations.filter(s => s.quality === 'Buena').length;
  const cautionCount = stations.filter(s => s.quality === 'Moderada').length;
  const dangerCount = stations.filter(s => s.quality === 'Peligrosa').length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4">
        {/* Header Section */}
        <div className="px-4 lg:px-6 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Mapa de Fuentes de Agua
                </h1>
                <p className="text-slate-600">
                  Explora el estado del agua en tiempo real en Nayarit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 px-4 lg:px-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{safeCount}</div>
                <div className="text-xs text-green-600 font-medium">Seguras</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">{cautionCount}</div>
                <div className="text-xs text-yellow-600 font-medium">Precaución</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{dangerCount}</div>
                <div className="text-xs text-red-600 font-medium">Peligrosas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="flex-1 px-4 lg:px-6 pb-4">
          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            <InteractiveMap stations={stations} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 px-4 lg:px-6 pb-6">
          <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="w-5 h-5 text-cyan-600" />
                Cómo usar el mapa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>🗺️ <strong>Haz clic en los marcadores</strong> para ver detalles de cada fuente</p>
              <p>🔍 <strong>Usa los controles</strong> en la esquina superior derecha para navegar</p>
              <p>📍 <strong>Encuentra tu ubicación</strong> con el botón de geolocalización</p>
              <p>🎯 <strong>Filtra fuentes</strong> según tu necesidad con el botón "Filtrar"</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Recomendaciones importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>✅ <strong>Agua verde:</strong> Segura para consumo humano después de hervir</p>
              <p>⚠️ <strong>Agua amarilla:</strong> Solo usar para riego, no consumir</p>
              <p>🚫 <strong>Agua roja:</strong> No usar bajo ninguna circunstancia</p>
              <p>🔄 <strong>Los datos se actualizan cada hora</strong> automáticamente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}