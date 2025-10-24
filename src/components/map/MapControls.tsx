"use client"

import { Button } from '@/components/ui/button';
import { Plus, Minus, Locate, Layers } from 'lucide-react';
import { useMap } from 'react-leaflet';

export function MapControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.flyTo([position.coords.latitude, position.coords.longitude], 13, {
            duration: 1.5,
          });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
      {/* Zoom In */}
      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomIn}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200"
        title="Acercar"
      >
        <Plus className="w-5 h-5 text-slate-700" />
      </Button>

      {/* Zoom Out */}
      <Button
        size="icon"
        variant="secondary"
        onClick={handleZoomOut}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200"
        title="Alejar"
      >
        <Minus className="w-5 h-5 text-slate-700" />
      </Button>

      {/* Locate Me */}
      <Button
        size="icon"
        variant="secondary"
        onClick={handleLocate}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200"
        title="Mi ubicación"
      >
        <Locate className="w-5 h-5 text-cyan-600" />
      </Button>
    </div>
  );
}