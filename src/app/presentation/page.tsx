import Link from "next/link";
import { ArrowRight, Droplets, LineChart, Zap, MapPin, Bell, Users, Heart, Globe, Shield, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header/Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              NovaSense
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Acceder al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">
                <Heart className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-700">
                  Acceso Libre • Impacto Social
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Agua limpia es{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  salud para todos
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Empoderamos a las comunidades de Nayarit con información en tiempo real 
                sobre la calidad del agua. Porque el derecho a saber es el primer paso 
                para proteger la salud pública y el medio ambiente.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg h-12 px-8">
                    Ver Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#impact">
                  <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                    Conocer el Impacto
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-slate-900">14+</div>
                  <div className="text-sm text-slate-600">Fuentes en Nayarit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">Monitoreo Continuo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Gratuito y Abierto</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-medium">Río Huicicila</span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">Apta para consumo</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                      <span className="font-medium">Río San Pedro</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-700">Solo para riego</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="font-medium">Río Mololoa</span>
                    </div>
                    <span className="text-sm font-semibold text-red-700">No usar</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-slate-600 text-center">
                      Información actualizada cada hora para tu seguridad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Impacto Real en la Sociedad</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              NovaSense transforma datos en acción, protegiendo la salud de miles 
              de personas y preservando el recurso más valioso: el agua
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-cyan-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Prevención de Enfermedades</h3>
                <p className="text-slate-600">
                  Las alertas tempranas evitan que comunidades consuman agua contaminada, 
                  previniendo enfermedades gastrointestinales y otras afecciones relacionadas
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-cyan-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Empoderamiento Ciudadano</h3>
                <p className="text-slate-600">
                  Cualquier persona puede conocer el estado del agua en su región. 
                  Información transparente para tomar decisiones informadas sobre su salud
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-cyan-200 bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Protección Ambiental</h3>
                <p className="text-slate-600">
                  Detectamos contaminación antes de que cause daños irreversibles, 
                  permitiendo acciones rápidas para proteger ecosistemas acuáticos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-2 hover:border-cyan-300 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Respuesta Inmediata a Crisis</h3>
                    <p className="text-slate-600">
                      Cuando se detectan niveles críticos de contaminación, las autoridades 
                      y comunidades reciben alertas instantáneas, permitiendo evacuaciones 
                      o restricciones de uso antes de que haya víctimas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-cyan-300 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Equidad en el Acceso a Información</h3>
                    <p className="text-slate-600">
                      Sin importar su ubicación o recursos económicos, todas las personas 
                      tienen derecho a saber si el agua cerca de su hogar es segura. 
                      NovaSense democratiza este conocimiento vital
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-cyan-300 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Datos para Políticas Públicas</h3>
                    <p className="text-slate-600">
                      Autoridades estatales y municipales pueden tomar decisiones basadas 
                      en evidencia científica, priorizando inversiones en saneamiento 
                      donde más se necesitan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-cyan-300 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Educación Ambiental Activa</h3>
                    <p className="text-slate-600">
                      Escuelas, universidades y organizaciones pueden usar datos reales 
                      para enseñar sobre cuidado del agua, creando conciencia desde 
                      evidencia tangible
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Tecnología al Servicio de la Sociedad</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Un ecosistema integrado que transforma datos en acción para proteger la salud pública
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 border-cyan-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-3">
                  <Waves className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Sensores IoT</h3>
                <p className="text-sm text-slate-600">
                  <strong>Los ojos:</strong> Red de dispositivos que miden pH, turbidez, oxígeno y temperatura 24/7
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">watsonx.ai</h3>
                <p className="text-sm text-slate-600">
                  <strong>El cerebro:</strong> IA que analiza patrones, predice tendencias y detecta anomalías en tiempo real
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Watson Orchestrate</h3>
                <p className="text-sm text-slate-600">
                  <strong>El coordinador:</strong> Automatiza alertas y coordina respuestas cuando se detecta contaminación crítica
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">IBM Cloudant</h3>
                <p className="text-sm text-slate-600">
                  <strong>La memoria:</strong> Almacena datos históricos inmutables para auditorías y análisis de largo plazo
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Flow Diagram */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200">
            <h3 className="text-2xl font-bold text-center mb-8">Flujo Automatizado de Protección</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  1
                </div>
                <p className="font-semibold mb-1">Sensores detectan</p>
                <p className="text-sm text-slate-600">Medición continua de parámetros</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-cyan-500 hidden md:block" />
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  2
                </div>
                <p className="font-semibold mb-1">IA analiza</p>
                <p className="text-sm text-slate-600">watsonx.ai evalúa riesgos</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-cyan-500 hidden md:block" />
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  3
                </div>
                <p className="font-semibold mb-1">Orchestrate actúa</p>
                <p className="text-sm text-slate-600">Automatiza alertas y respuestas</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-cyan-500 hidden md:block" />
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  4
                </div>
                <p className="font-semibold mb-1">Comunidad protegida</p>
                <p className="text-sm text-slate-600">Información en tiempo real</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
                ODS 9: Industria, Innovación e Infraestructura
              </div>
              <h2 className="text-4xl font-bold mb-6">
                De Nayarit al Mundo
              </h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  NovaSense inicia en Nayarit, pero nuestra visión es mucho más grande. 
                  <strong className="text-slate-900"> Este modelo puede replicarse en cualquier región de México y el mundo</strong> 
                  donde las comunidades necesiten proteger sus fuentes de agua.
                </p>
                <p>
                  Cada río monitoreado es una comunidad más segura. Cada alerta temprana 
                  es una crisis evitada. Cada dato compartido es un paso hacia un futuro 
                  donde <strong className="text-slate-900">el acceso a agua limpia sea un derecho garantizado</strong>, 
                  no un privilegio.
                </p>
                <p className="text-cyan-700 font-semibold">
                  Hoy Nayarit. Mañana, todo México. El futuro, el planeta.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-none">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold mb-1">Fase 1</div>
                  <p className="text-sm text-cyan-50">
                    14 fuentes en Nayarit monitoreadas activamente
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-none">
                <CardContent className="p-6">
                  <Globe className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold mb-1">Fase 2</div>
                  <p className="text-sm text-purple-50">
                    Expansión a estados vecinos y cuencas prioritarias
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-none">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold mb-1">Fase 3</div>
                  <p className="text-sm text-green-50">
                    Colaboración con ONGs y gobiernos estatales
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-none">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold mb-1">Visión</div>
                  <p className="text-sm text-orange-50">
                    Red nacional de monitoreo de agua accesible para todos
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 border-none">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">
                El Agua es Vida. La Información es Poder.
              </h2>
              <p className="text-xl mb-8 text-cyan-50">
                Conoce ahora mismo el estado de las fuentes de agua en tu región
              </p>
              <Link href="/">
                <Button size="lg" variant="secondary" className="text-lg h-12 px-8">
                  Explorar Dashboard Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-cyan-100 mt-6">
                100% gratuito • Sin registro • Información en tiempo real
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">NovaSense</span>
              </div>
              <p className="text-sm mb-4">
                Sistema de monitoreo inteligente de calidad del agua. 
                Iniciativa de impacto social desarrollada para el IBM TechXchange Hackathon 2025.
              </p>
              <p className="text-xs text-slate-400">
                Contribuyendo al ODS 9: Industria, Innovación e Infraestructura • 
                Comenzando en Nayarit, expandiéndose al mundo
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Proyecto</h3>
              <ul className="space-y-2 text-sm">
                <li>IBM TechXchange 2025</li>
                <li>Acceso Libre</li>
                <li>Código Abierto</li>
                <li>Impacto Social</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>Tepic, Nayarit, México</li>
                <li>info@novasense.org</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>© 2025 NovaSense • Agua limpia para todos • Tecnología para el bien común</p>
          </div>
        </div>
      </footer>
    </div>
  );
}