"use client"

import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Droplets, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMockStations, generateMockAlerts } from "@/lib/mockData";

export default function DashboardOverview() {
  const stations = generateMockStations();
  const alerts = generateMockAlerts();

  const safeWater = stations.filter(s => s.quality === "Buena");
  const cautiousWater = stations.filter(s => s.quality === "Moderada");
  const dangerousWater = stations.filter(s => s.quality === "Peligrosa");
  const criticalAlerts = alerts.filter(a => a.type === "critical" && !a.acknowledged);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          {/* Hero Section */}
          <div className="px-4 lg:px-6 text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              ¿Es segura el agua cerca de ti?
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Consulta en tiempo real el estado de ríos, lagunas y cascadas en Nayarit
            </p>
            <Link href="/rivers">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                <MapPin className="w-5 h-5 mr-2" />
                Ver Mapa Interactivo
              </Button>
            </Link>
          </div>

          {/* Critical Alert Banner */}
          {criticalAlerts.length > 0 && (
            <div className="px-4 lg:px-6">
              <Card className="border-2 border-red-500 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-900 mb-2">
                        ⚠️ Alerta Importante
                      </h3>
                      <p className="text-red-800 text-lg mb-2">
                        <strong>{criticalAlerts[0].stationName}</strong>: {criticalAlerts[0].message}
                      </p>
                      <p className="text-red-700 font-semibold">
                        🚫 No uses esta agua para consumo humano ni para riego
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Section Cards - Water Quality */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            
            {/* Total Sources */}
            <Card className="@container/card bg-gradient-to-t from-cyan-50 to-card">
              <CardHeader>
                <CardDescription>Total de Fuentes</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
                  <Droplets className="w-8 h-8 text-cyan-600" />
                  {stations.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-300">
                    Monitoreando
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="font-medium text-cyan-900">
                  Sistema operando 24/7
                </div>
                <div className="text-slate-600">
                  Actualización cada hora
                </div>
              </CardFooter>
            </Card>

            {/* Safe Water */}
            <Card className="@container/card bg-gradient-to-t from-green-50 to-card border-2 border-green-200">
              <CardHeader>
                <CardDescription>Agua Segura</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-700">
                  {safeWater.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    <CheckCircle2 className="w-4 h-4" />
                    {Math.round((safeWater.length / stations.length) * 100)}%
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="flex gap-2 font-medium text-green-900">
                  ✅ Apta para consumo
                </div>
                <div className="text-slate-600">
                  {safeWater.map(s => s.name).join(", ")}
                </div>
              </CardFooter>
            </Card>

            {/* Caution Water */}
            <Card className="@container/card bg-gradient-to-t from-yellow-50 to-card border-2 border-yellow-200">
              <CardHeader>
                <CardDescription>Usar con Precaución</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-yellow-700">
                  {cautiousWater.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    <AlertTriangle className="w-4 h-4" />
                    Atención
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="flex gap-2 font-medium text-yellow-900">
                  ⚠️ Solo para riego
                </div>
                <div className="text-slate-600">
                  No para consumo humano
                </div>
              </CardFooter>
            </Card>

            {/* Dangerous Water */}
            <Card className="@container/card bg-gradient-to-t from-red-50 to-card border-2 border-red-200">
              <CardHeader>
                <CardDescription>No Usar</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-red-700">
                  {dangerousWater.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                    <XCircle className="w-4 h-4" />
                    Peligro
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="flex gap-2 font-medium text-red-900">
                  🚫 Agua contaminada
                </div>
                <div className="text-slate-600">
                  {criticalAlerts.length} alertas activas
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Educational Section */}
          <div className="px-4 lg:px-6">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-cyan-600" />
                  ¿Qué medimos en el agua?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900">💧 pH (Acidez)</h3>
                    <p className="text-slate-700">
                      Mide si el agua es ácida o alcalina. El agua segura debe estar entre 6.5 y 8.5.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900">🌫️ Turbidez (Claridad)</h3>
                    <p className="text-slate-700">
                      Indica qué tan transparente está el agua. Valores bajos significan agua más limpia.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900">🫧 Oxígeno Disuelto</h3>
                    <p className="text-slate-700">
                      Necesario para la vida acuática. Niveles altos indican un ecosistema saludable.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900">🌡️ Temperatura</h3>
                    <p className="text-slate-700">
                      Afecta la calidad del agua. Cambios bruscos pueden indicar contaminación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-3 gap-4 px-4 lg:px-6">
            <Link href="/rivers" className="block">
              <Card className="border-2 hover:border-cyan-400 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-cyan-600" />
                  <h3 className="font-bold text-lg mb-2">Explorar Mapa</h3>
                  <p className="text-sm text-slate-600">
                    Encuentra las fuentes de agua más cercanas a ti
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/alerts" className="block">
              <Card className="border-2 hover:border-cyan-400 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
                  <h3 className="font-bold text-lg mb-2">Ver Alertas</h3>
                  <p className="text-sm text-slate-600">
                    Consulta avisos importantes sobre calidad del agua
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/stats" className="block">
              <Card className="border-2 hover:border-cyan-400 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <Droplets className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold text-lg mb-2">Ver Estadísticas</h3>
                  <p className="text-sm text-slate-600">
                    Analiza tendencias y datos históricos
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Info Footer */}
          <div className="px-4 lg:px-6">
            <Card className="bg-slate-100 border-slate-300">
              <CardContent className="p-6 text-center">
                <p className="text-slate-700">
                  📊 Datos actualizados cada hora • 🔄 Sistema monitoreando 24/7 • ✅ Información verificada
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Este es un servicio público y gratuito para proteger la salud de las comunidades de Nayarit
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}