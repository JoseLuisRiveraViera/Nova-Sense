"use client";

import { useState, useEffect } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { generateMockStations } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Droplets, AlertTriangle, RefreshCw } from 'lucide-react';
import type { Station } from '@/types';

export default function RiversPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Function to update stations
  const updateStations = () => {
    const newStations = generateMockStations();
    setStations(newStations);
    setLastUpdate(new Date());
  };

  // Initial load
  useEffect(() => {
    updateStations();
  }, []);

  // Auto-refresh every hour (3600000 ms = 1 hour)
  useEffect(() => {
    const interval = setInterval(() => {
      updateStations();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const safeCount = stations.filter(s => s.quality === 'Buena').length;
  const cautionCount = stations.filter(s => s.quality === 'Moderada').length;
  const dangerCount = stations.filter(s => s.quality === 'Peligrosa').length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4">
        {/* Header */}
        <div className="px-4 lg:px-6 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Mapa de Fuentes de Agua
                </h1>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <span>Explora el estado del agua en tiempo real en Nayarit</span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <RefreshCw className="w-3 h-3" aria-hidden />
                    <span className="text-xs">
                      Actualizado: {lastUpdate.toLocaleTimeString('es-MX', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 px-4 lg:px-6" aria-label="Resumen por estado">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{safeCount}</div>
                <div className="text-xs text-green-700 font-medium">Seguras</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">{cautionCount}</div>
                <div className="text-xs text-yellow-700 font-medium">Precaución</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{dangerCount}</div>
                <div className="text-xs text-red-700 font-medium">Peligrosas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div className="flex-1 px-4 lg:px-6 pb-4">
          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            {stations.length > 0 && <InteractiveMap stations={stations} />}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 px-4 lg:px-6 pb-6">
          <div className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <div className="p-4">
              <div className="flex items-center gap-2 text-lg mb-2">
                <Droplets className="w-5 h-5 text-cyan-600" aria-hidden />
                <span className="font-semibold">Cómo usar el mapa</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>🧭 <strong>Haz clic en los marcadores</strong> para ver detalles.</li>
                <li>🔍 <strong>Usa los controles</strong> (derecha) para navegar.</li>
                <li>📍 <strong>Encuentra tu ubicación</strong> con el botón de geolocalización.</li>
                <li>🎯 <strong>Filtra fuentes</strong> por estado del agua.</li>
                <li>🖱️ <strong>Usa la rueda del mouse</strong> para hacer zoom.</li>
                <li>🔄 <strong>Actualización automática</strong> cada hora.</li>
              </ul>
            </div>
          </div>

          <div className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg">
            <div className="p-4">
              <div className="flex items-center gap-2 text-lg mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" aria-hidden />
                <span className="font-semibold">Recomendaciones importantes</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✅ <strong>Agua verde:</strong> Segura al hervirla.</li>
                <li>⚠️ <strong>Agua amarilla:</strong> Úsala solo para riego.</li>
                <li>🚫 <strong>Agua roja:</strong> No la uses.</li>
                <li>🕒 <strong>Datos en tiempo real:</strong> actualizados cada hora.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}