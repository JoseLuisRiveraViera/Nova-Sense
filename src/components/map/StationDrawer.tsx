"use client";

import { Station } from '@/types';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StationDetails } from './StationDetails';
import { MapPin } from 'lucide-react';

interface StationDrawerProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StationDrawer({ station, open, onOpenChange }: StationDrawerProps) {
  if (!station) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="max-h-[85vh] flex flex-col"
        aria-label={`Detalles de ${station.name}`}
      >
        {/* Handle */}
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-300 mt-3" aria-hidden />

        {/* Header */}
        <DrawerHeader className="px-4 pt-3 pb-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" aria-hidden />
            </div>
            <DrawerTitle className="text-base font-bold text-slate-900">
              Información de la fuente
            </DrawerTitle>
          </div>
        </DrawerHeader>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="pb-4">
            <StationDetails station={station} compact={false} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}