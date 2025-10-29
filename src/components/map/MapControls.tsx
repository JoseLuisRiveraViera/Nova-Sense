"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Navigation, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocate?: () => void;
  onReset?: () => void;
  onFullscreen?: () => void;
  className?: string;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onReset,
  onFullscreen,
  className
}: MapControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFullscreenClick = () => {
    if (!document.fullscreenElement) {
      const mapContainer = document.getElementById('rivers-map')?.parentElement;
      mapContainer?.requestFullscreen();
      onFullscreen?.();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} role="group" aria-label="Controles del mapa">
      {/* Zoom Controls */}
      <div className="flex flex-col gap-1 bg-white rounded-lg shadow-lg border-2 border-slate-200 p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="h-9 w-9 hover:bg-cyan-50 hover:text-cyan-700"
          aria-label="Acercar mapa"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <div className="h-px bg-slate-200 mx-1" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="h-9 w-9 hover:bg-cyan-50 hover:text-cyan-700"
          aria-label="Alejar mapa"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Location & Reset */}
      <div className="flex flex-col gap-1 bg-white rounded-lg shadow-lg border-2 border-slate-200 p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLocate}
          className="h-9 w-9 hover:bg-cyan-50 hover:text-cyan-700"
          aria-label="Encontrar mi ubicación"
        >
          <Navigation className="h-4 w-4" />
        </Button>
        
        <div className="h-px bg-slate-200 mx-1" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="h-9 w-9 hover:bg-cyan-50 hover:text-cyan-700"
          aria-label="Restablecer vista"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Fullscreen */}
      {onFullscreen && (
        <div className="bg-white rounded-lg shadow-lg border-2 border-slate-200 p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreenClick}
            className={cn(
              "h-9 w-9 transition-colors",
              isFullscreen
                ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                : "hover:bg-cyan-50 hover:text-cyan-700"
            )}
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}