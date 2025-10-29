"use client";

import { Button } from '@/components/ui/button';
import { Plus, Minus, Locate, RotateCcw } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { mapConfig } from '@/lib/mapHelpers';

export function MapControls() {
  const map = useMap();

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 13, { duration: 1.5 });
      },
      () => {
        alert('No se pudo obtener tu ubicación. Revisa permisos del navegador.');
      }
    );
  };

  const handleReset = () => {
    map.setView(mapConfig.center, mapConfig.zoom, { animate: true });
  };

  return (
    <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2" role="group" aria-label="Controles del mapa">
      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomIn}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-600"
        title="Acercar"
        aria-label="Acercar"
      >
        <Plus className="w-5 h-5 text-slate-700" aria-hidden />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomOut}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-600"
        title="Alejar"
        aria-label="Alejar"
      >
        <Minus className="w-5 h-5 text-slate-700" aria-hidden />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={handleLocate}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-600"
        title="Mi ubicación"
        aria-label="Ir a mi ubicación"
      >
        <Locate className="w-5 h-5 text-cyan-600" aria-hidden />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={handleReset}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-600"
        title="Restablecer vista"
        aria-label="Restablecer vista"
      >
        <RotateCcw className="w-5 h-5 text-slate-700" aria-hidden />
      </Button>
    </div>
  );
}
