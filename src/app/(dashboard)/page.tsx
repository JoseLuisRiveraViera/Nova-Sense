import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  MapPin,
  Droplets,
  Info
} from "lucide-react";
import { generateMockStations, generateMockAlerts } from "@/lib/mockData";

export default function DashboardOverview() {
  const stations = generateMockStations();
  const alerts = generateMockAlerts();

  // Categorize stations for citizens
  const safeWater = stations.filter(s => s.quality === "Buena");
  const cautiousWater = stations.filter(s => s.quality === "Moderada");
  const dangerousWater = stations.filter(s => s.quality === "Peligrosa");
  
  const criticalAlerts = alerts.filter(a => a.type === "critical" && !a.acknowledged);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          ¿Es segura el agua cerca de ti?
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Consulta en tiempo real el estado de ríos, lagunas y cascadas en Nayarit
        </p>
        <Link href="/rivers">
          <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg h-14 px-8">
            <MapPin className="w-5 h-5 mr-2" />
            Ver Mapa Interactivo
          </Button>
        </Link>
      </div>

      {/* Critical Alert Banner */}
      {criticalAlerts.length > 0 && (
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
                <p className="text-red-800 text-lg mb-4">
                  <strong>{criticalAlerts[0].stationName}</strong>: {criticalAlerts[0].message}
                </p>
                <p className="text-red-700 font-semibold">
                  🚫 No uses esta agua para consumo humano ni para riego
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Cards - Citizen Friendly */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Safe Water */}
        <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl text-green-900">
                Agua Segura
              </CardTitle>
            </div>
            <p className="text-green-700 font-medium">
              ✅ Apta para consumo y actividades recreativas
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-4xl font-bold text-green-900 mb-4">
              {safeWater.length} fuentes
            </p>
            <div className="space-y-2">
              {safeWater.slice(0, 3).map((station) => (
                <div key={station.id} className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-green-600" />
                  <span className="text-green-800">{station.name}</span>
                </div>
              ))}
              {safeWater.length > 3 && (
                <Link href="/rivers" className="text-sm text-green-700 hover:text-green-900 font-medium flex items-center gap-1">
                  Ver todas <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Caution Water */}
        <Card className="border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl text-yellow-900">
                Usar con Precaución
              </CardTitle>
            </div>
            <p className="text-yellow-700 font-medium">
              ⚠️ Solo para riego, no para consumo humano
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-4xl font-bold text-yellow-900 mb-4">
              {cautiousWater.length} fuentes
            </p>
            <div className="space-y-2">
              {cautiousWater.map((station) => (
                <div key={station.id} className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-800">{station.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dangerous Water */}
        <Card className="border-2 border-red-500 bg-gradient-to-br from-red-50 to-rose-50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl text-red-900">
                No Usar
              </CardTitle>
            </div>
            <p className="text-red-700 font-medium">
              🚫 Agua contaminada - Peligro para la salud
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-4xl font-bold text-red-900 mb-4">
              {dangerousWater.length} fuente{dangerousWater.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-2">
              {dangerousWater.map((station) => (
                <div key={station.id} className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-red-600" />
                  <span className="text-red-800 font-semibold">{station.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Section */}
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-cyan-600" />
            <CardTitle className="text-2xl">¿Qué medimos en el agua?</CardTitle>
          </div>
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

      {/* CTA to other sections */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/rivers">
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

        <Link href="/alerts">
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

        <Link href="/stats">
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
  );
}