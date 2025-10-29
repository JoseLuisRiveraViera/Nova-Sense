"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import { WaterQuality, WaterTrend } from '@/types';
import { cn } from '@/lib/utils';

export interface FilterState {
  qualities: Set<WaterQuality>;
  trends: Set<WaterTrend>;
}

interface MapFiltersProps {
  onChange: (filters: FilterState) => void;
  onOpenChange?: (open: boolean) => void;
}

const qualityOptions: { value: WaterQuality; label: string; color: string }[] = [
  { value: 'Buena', label: '🟢 Segura', color: 'bg-emerald-500 hover:bg-emerald-600' },
  { value: 'Moderada', label: '🟡 Precaución', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { value: 'Peligrosa', label: '🔴 Peligro', color: 'bg-red-500 hover:bg-red-600' },
];

const trendOptions: { value: WaterTrend; label: string }[] = [
  { value: 'improving', label: '↗ Mejorando' },
  { value: 'stable', label: '→ Estable' },
  { value: 'worsening', label: '↘ Empeorando' },
];

export function MapFilters({ onChange, onOpenChange }: MapFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQualities, setSelectedQualities] = useState<Set<WaterQuality>>(
    new Set(['Buena', 'Moderada', 'Peligrosa'])
  );
  const [selectedTrends, setSelectedTrends] = useState<Set<WaterTrend>>(
    new Set(['improving', 'stable', 'worsening'])
  );

  useEffect(() => {
    onChange({
      qualities: selectedQualities,
      trends: selectedTrends,
    });
  }, [selectedQualities, selectedTrends, onChange]);

  // Notify parent when open state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const toggleQuality = (quality: WaterQuality) => {
    setSelectedQualities(prev => {
      const next = new Set(prev);
      if (next.has(quality)) {
        if (next.size > 1) next.delete(quality);
      } else {
        next.add(quality);
      }
      return next;
    });
  };

  const toggleTrend = (trend: WaterTrend) => {
    setSelectedTrends(prev => {
      const next = new Set(prev);
      if (next.has(trend)) {
        if (next.size > 1) next.delete(trend);
      } else {
        next.add(trend);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedQualities(new Set(['Buena', 'Moderada', 'Peligrosa']));
    setSelectedTrends(new Set(['improving', 'stable', 'worsening']));
  };

  const activeFiltersCount =
    (3 - selectedQualities.size) + (3 - selectedTrends.size);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-slate-200"
        aria-label="Filtros de mapa"
        aria-expanded={isOpen}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filtros
        {activeFiltersCount > 0 && (
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-cyan-600 text-white rounded-full font-bold">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <Card className="absolute top-full mt-2 left-0 w-64 p-3 shadow-xl border-2 border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900">Filtrar fuentes</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
                aria-label="Cerrar filtros"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quality Filters */}
            <div className="space-y-2 mb-3">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Estado del agua
              </p>
              <div className="flex flex-col gap-1.5">
                {qualityOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={selectedQualities.has(option.value) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleQuality(option.value)}
                    className={cn(
                      "justify-start text-xs h-8",
                      selectedQualities.has(option.value)
                        ? `${option.color} text-white border-0`
                        : 'bg-slate-50 hover:bg-slate-100'
                    )}
                    aria-pressed={selectedQualities.has(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Trend Filters */}
            <div className="space-y-2 mb-3">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Tendencia
              </p>
              <div className="flex flex-col gap-1.5">
                {trendOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={selectedTrends.has(option.value) ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => toggleTrend(option.value)}
                    className={cn(
                      "justify-start text-xs h-8",
                      selectedTrends.has(option.value)
                        ? 'bg-slate-200 hover:bg-slate-300'
                        : 'bg-slate-50 hover:bg-slate-100'
                    )}
                    aria-pressed={selectedTrends.has(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full text-xs border-cyan-600 text-cyan-700 hover:bg-cyan-50"
            >
              Restablecer filtros
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}