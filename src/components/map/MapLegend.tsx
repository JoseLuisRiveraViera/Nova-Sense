"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export function MapLegend() {
  return (
    <Card className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm shadow-xl border-2 border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-900">
          Estado del Agua
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-sm text-slate-900">Agua Segura</div>
            <div className="text-xs text-slate-600">Apta para consumo</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center shadow-md">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-sm text-slate-900">Precaución</div>
            <div className="text-xs text-slate-600">Solo para riego</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-md">
            <XCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-sm text-slate-900">No Usar</div>
            <div className="text-xs text-slate-600">Agua contaminada</div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-300">
            Actualización cada hora
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}