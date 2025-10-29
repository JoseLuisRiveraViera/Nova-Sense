"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { WaterQuality } from '@/types';

export interface MapLegendProps {
  counts?: Record<WaterQuality, number>;
}

export function MapLegend({ counts }: MapLegendProps) {
  return (
    <Card className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm shadow-xl border-2 border-slate-200"
          role="region" aria-label="Leyenda de estados del agua">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-900">Estado del agua</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md" aria-hidden>
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium text-sm text-slate-900">Agua segura</div>
              <div className="text-xs text-slate-600">Apta para consumo</div>
            </div>
            {counts && <Badge variant="outline" className="ml-1">{counts.Buena}</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center shadow-md" aria-hidden>
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium text-sm text-slate-900">Precaución</div>
              <div className="text-xs text-slate-600">Solo para riego</div>
            </div>
            {counts && <Badge variant="outline" className="ml-1">{counts.Moderada}</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-md" aria-hidden>
            <XCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium text-sm text-slate-900">No usar</div>
              <div className="text-xs text-slate-600">Agua contaminada</div>
            </div>
            {counts && <Badge variant="outline" className="ml-1">{counts.Peligrosa}</Badge>}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-300">
            Datos simulados
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
