"use client"

import dynamic from 'next/dynamic';
import { Station } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const LeafletMap = dynamic(() => import('./LeafletMap').then(mod => ({ default: mod.LeafletMap })), {
  ssr: false,
  loading: () => <MapSkeleton />
});

interface InteractiveMapProps {
  stations: Station[];
}

function MapSkeleton() {
  return (
    <div className="relative w-full h-full bg-slate-100 rounded-xl border-2 border-slate-200 overflow-hidden">
      {/* Skeleton principal */}
      <Skeleton className="w-full h-full" />
      
      {/* Skeleton de controles */}
      <div className="absolute top-6 right-6 space-y-2">
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-md" />
      </div>
      
      {/* Skeleton de leyenda */}
      <div className="absolute bottom-6 left-6">
        <Skeleton className="w-48 h-40 rounded-lg" />
      </div>
      
      {/* Skeleton de filtros */}
      <div className="absolute top-6 left-6">
        <Skeleton className="w-24 h-10 rounded-md" />
      </div>
      
      {/* Loading message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-lg shadow-xl border-2 border-cyan-200">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-slate-900">
              Cargando mapa de fuentes de agua...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractiveMap({ stations }: InteractiveMapProps) {
  return <LeafletMap stations={stations} />;
}