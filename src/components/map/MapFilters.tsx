"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X } from 'lucide-react';
import { Station, WaterTrend } from '@/types';

interface MapFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  qualities: Set<Station['quality']>;
  trends: Set<WaterTrend>;
}

export function MapFilters({ onFilterChange }: MapFiltersProps) {
  // Control de apertura para overlay visual
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    qualities: new Set(['Buena', 'Moderada', 'Peligrosa']),
    trends: new Set(['improving', 'stable', 'worsening']),
  });

  const handleQualityToggle = (quality: Station['quality']) => {
    const newQualities = new Set(filters.qualities);
    if (newQualities.has(quality)) newQualities.delete(quality);
    else newQualities.add(quality);
    const newFilters = { ...filters, qualities: newQualities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTrendToggle = (trend: Station['trend']) => {
    if (!trend) return;
    const newTrends = new Set(filters.trends);
    if (newTrends.has(trend)) newTrends.delete(trend);
    else newTrends.add(trend);
    const newFilters = { ...filters, trends: newTrends };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      qualities: new Set(['Buena', 'Moderada', 'Peligrosa']),
      trends: new Set(['improving', 'stable', 'worsening']),
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFiltersCount =
    (3 - filters.qualities.size) + (3 - filters.trends.size);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Overlay fuerte + blur + desaturación, y cierra al click */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[3000] bg-slate-950/80 backdrop-blur-lg backdrop-saturate-50 transition-opacity"
        />
      )}

      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200"
        >
          <Filter className="w-4 h-4 mr-2 text-slate-700" />
          Filtrar
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* Panel con estética glassy + redondeado + sombra y secciones sticky */}
      <SheetContent
        side="right"
        className="z-[3100] w-[400px] sm:w-[440px] p-0 border-0 rounded-l-2xl shadow-2xl
                   bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
      >
          <SheetHeader
    className="relative sticky top-0 z-10 px-6 py-5 border-b
              bg-gradient-to-b from-white/95 to-white/80
              dark:from-slate-900/95 dark:to-slate-900/80
              backdrop-blur-md flex items-start justify-between"
  >
      <div>
    <SheetTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
      Filtrar Fuentes de Agua
    </SheetTitle>
    <SheetDescription className="text-slate-600 dark:text-slate-400">
      Personaliza qué fuentes quieres ver en el mapa
    </SheetDescription>
  </div>

  <button
    onClick={() => setOpen(false)}
    aria-label="Cerrar panel de filtros"
    className="absolute top-3 right-3 inline-flex items-center justify-center
              h-8 w-8 rounded-md text-slate-500 hover:text-slate-700
              hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
  >
    <X className="h-4 w-4" />
  </button>

  </SheetHeader>


        {/* Contenido: dejo tu JSX tal cual, solo agrego padding y separadores suaves */}
        <div className="px-6 pt-6 pb-4 space-y-6">
          {/* Calidad del Agua */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base text-slate-900">
              Calidad del Agua
            </h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="buena"
                checked={filters.qualities.has('Buena')}
                onCheckedChange={() => handleQualityToggle('Buena')}
              />
              <label
                htmlFor="buena"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Agua Segura
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="moderada"
                checked={filters.qualities.has('Moderada')}
                onCheckedChange={() => handleQualityToggle('Moderada')}
              />
              <label
                htmlFor="moderada"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Usar con Precaución
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="peligrosa"
                checked={filters.qualities.has('Peligrosa')}
                onCheckedChange={() => handleQualityToggle('Peligrosa')}
              />
              <label
                htmlFor="peligrosa"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                No Usar
              </label>
            </div>
          </div>

          {/* Separador suave */}
          <div className="border-t border-slate-200/70" />

          {/* Tendencia */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base text-slate-900">
              Tendencia
            </h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="improving"
                checked={filters.trends.has('improving')}
                onCheckedChange={() => handleTrendToggle('improving')}
              />
              <label
                htmlFor="improving"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                📈 Mejorando
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="stable"
                checked={filters.trends.has('stable')}
                onCheckedChange={() => handleTrendToggle('stable')}
              />
              <label
                htmlFor="stable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                ➡️ Estable
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="worsening"
                checked={filters.trends.has('worsening')}
                onCheckedChange={() => handleTrendToggle('worsening')}
              />
              <label
                htmlFor="worsening"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                📉 Deteriorando
              </label>
            </div>
          </div>
        </div>

        {/* Footer fijo hasta abajo, sin importar la altura del contenido */}
        <div
          className="absolute bottom-0 left-0 w-full px-6 py-4 border-t
                    bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-bl-2xl"
        >
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Limpiar Filtros
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}
