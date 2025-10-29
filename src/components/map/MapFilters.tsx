"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    qualities: new Set(['Buena', 'Moderada', 'Peligrosa']),
    trends: new Set(['improving', 'stable', 'worsening']),
  });

  const handleQualityToggle = (quality: Station['quality']) => {
    const qualities = new Set(filters.qualities);
    qualities.has(quality) ? qualities.delete(quality) : qualities.add(quality);
    const next = { ...filters, qualities };
    setFilters(next);
    onFilterChange(next);
  };

  const handleTrendToggle = (trend: Station['trend']) => {
    if (!trend) return;
    const trends = new Set(filters.trends);
    trends.has(trend) ? trends.delete(trend) : trends.add(trend);
    const next = { ...filters, trends };
    setFilters(next);
    onFilterChange(next);
  };

  const handleReset = () => {
    const next: FilterState = {
      qualities: new Set(['Buena', 'Moderada', 'Peligrosa']),
      trends: new Set(['improving', 'stable', 'worsening']),
    };
    setFilters(next);
    onFilterChange(next);
  };

  const activeFiltersCount = (3 - filters.qualities.size) + (3 - filters.trends.size);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-sm transition-opacity"
          aria-hidden
        />
      )}

      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-600"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="filters-panel"
        >
          <Filter className="w-4 h-4 mr-2 text-slate-700" aria-hidden />
          Filtrar
          {activeFiltersCount > 0 && <Badge variant="destructive" className="ml-2">{activeFiltersCount}</Badge>}
        </Button>
      </SheetTrigger>

      <SheetContent
        id="filters-panel"
        side="right"
        className="z-[3100] w-[400px] sm:w-[440px] p-0 border-0 rounded-l-2xl shadow-2xl bg-white/95 backdrop-blur-md"
        aria-label="Panel de filtros"
      >
        <SheetHeader className="sticky top-0 z-10 px-6 py-5 border-b bg-white/90 backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-bold text-slate-900">Filtrar Fuentes de Agua</SheetTitle>
              <SheetDescription className="text-slate-600">Elige qué fuentes quieres ver en el mapa</SheetDescription>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar panel de filtros"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-200/60"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </SheetHeader>

        <div className="px-6 pt-6 pb-20 space-y-6">
          {/* Calidad del Agua */}
          <section aria-labelledby="calidad-title">
            <h3 id="calidad-title" className="font-semibold text-base text-slate-900">Calidad del Agua</h3>

            <div className="mt-3 space-y-3">
              <label htmlFor="buena" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="buena" checked={filters.qualities.has('Buena')} onCheckedChange={() => handleQualityToggle('Buena')} />
                <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden />
                Agua segura
              </label>

              <label htmlFor="moderada" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="moderada" checked={filters.qualities.has('Moderada')} onCheckedChange={() => handleQualityToggle('Moderada')} />
                <span className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden />
                Usar con precaución
              </label>

              <label htmlFor="peligrosa" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="peligrosa" checked={filters.qualities.has('Peligrosa')} onCheckedChange={() => handleQualityToggle('Peligrosa')} />
                <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden />
                No usar
              </label>
            </div>
          </section>

          <div className="border-t border-slate-200/70" />

          {/* Tendencia */}
          <section aria-labelledby="tendencia-title">
            <h3 id="tendencia-title" className="font-semibold text-base text-slate-900">Tendencia</h3>

            <div className="mt-3 space-y-3">
              <label htmlFor="improving" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="improving" checked={filters.trends.has('improving')} onCheckedChange={() => handleTrendToggle('improving')} />
                📈 Mejorando
              </label>

              <label htmlFor="stable" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="stable" checked={filters.trends.has('stable')} onCheckedChange={() => handleTrendToggle('stable')} />
                ➡️ Estable
              </label>

              <label htmlFor="worsening" className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox id="worsening" checked={filters.trends.has('worsening')} onCheckedChange={() => handleTrendToggle('worsening')} />
                📉 Deteriorando
              </label>
            </div>
          </section>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-6 py-4 border-t bg-white/95 backdrop-blur-md rounded-bl-2xl">
          <Button variant="outline" onClick={handleReset} className="w-full">
            <X className="w-4 h-4 mr-2" aria-hidden /> Limpiar filtros
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
