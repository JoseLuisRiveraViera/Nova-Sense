"use client";

import { Station } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StationDetails } from './StationDetails';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StationPanelProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StationPanel({ station, open, onOpenChange }: StationPanelProps) {
  if (!station) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col"
        aria-label={`Detalles de ${station.name}`}
      >
        {/* Header */}
        <SheetHeader className="px-4 py-3 border-b border-slate-200 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" aria-hidden />
              </div>
              <SheetTitle className="text-base font-bold text-slate-900 truncate">
                Información de la fuente
              </SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onOpenChange(false)}
              aria-label="Cerrar panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="py-2">
            <StationDetails station={station} compact={false} />
          </div>
        </ScrollArea>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-slate-200 shrink-0">
          <p className="text-xs text-slate-500 text-center">
            Presiona <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono">Esc</kbd> para cerrar
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}