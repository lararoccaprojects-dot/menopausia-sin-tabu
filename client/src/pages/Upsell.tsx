import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Upsell() {
  const [progress, setProgress] = useState(0);

  // Simular progreso de carga
  const startLoading = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-lg text-gray-900">Pack Premium</span>
          </div>
          <a href="/" className="text-gray-600 hover:text-pink-500 transition">← Volver</a>
        </div>
      </nav>

      {/* Headline */}
      <section className="py-12 bg-gradient-to-br from-pink-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Resolviste los síntomas?<br />
            <span className="text-pink-500">Ahora viene lo importante</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            El 70% de las mujeres que comprenden y manejan su menopausia enfrentan un nuevo desafío: la adaptación emocional y física a una nueva etapa de vida.
          </p>
        </div>
      </section>

      {/* Loading Bar */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-900">Cargando tu plan personalizado...</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-500 to-green-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                onAnimationEnd={startLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-l-red-500 p-6 rounded-r-lg">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Advertencia importante</h3>
                <p className="text-red-800 mb-3">
                  Si no abordas estos 4 problemas ahora, pueden afectar significativamente tu calidad de vida:
                </p>
                <ul className="space-y-2 text-red-800">
                  <li>❌ <strong>Dificultades emocionales</strong> que pueden llevar a depresión o ansiedad</li>
                  <li>❌ <strong>Problemas en la intimidad</strong> que afectan tus relaciones</li>
                  <li>❌ <strong>Confusión sobre tu salud</strong> a largo plazo</li>
                  <li>❌ <strong>Baja autoestima</strong> y problemas de imagen corporal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Tools Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Tu Pack Premium incluye
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "El Mapa de Bienestar Emocional",
                desc: "Guía paso a paso con ejercicios de mindfulness y técnicas de relajación",
                icon: "🧘"
              },
              {
                title: "El Manual de Intimidad Saludable",
                desc: "Workbook con estrategias para mantener o mejorar la intimidad en relaciones",
                icon: "💕"
              },
              {
                title: "El Plan de Salud a Largo Plazo",
                desc: "Hoja de ruta para mantener la salud física después de la menopausia",
                icon: "🏃"
              },
              {
                title: "El Kit de Autoestima Positiva",
                desc: "Plan de acción con ejercicios de autoconfianza y afirmaciones",
                icon: "✨"
              },
              {
                title: "El Taller de Alimentación Consciente",
                desc: "Guía de nutrición adecuada durante y después de la menopausia",
                icon: "🥗"
              },
              {
                title: "El Compendio de Terapias Alternativas",
                desc: "Checklist de terapias alternativas seguras y efectivas",
                icon: "🌿"
              }
            ].map((tool, i) => (
              <Card key={i} className="p-6 border-pink-200 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
                <div className="mt-4 pt-4 border-t border-pink-200">
                  <Button variant="outline" className="w-full text-pink-500 border-pink-500 hover:bg-pink-50">
                    Ver herramienta - $9.99
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why You Need This */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Por qué necesitas esto
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: "Salud emocional garantizada",
                desc: "Las herramientas de bienestar emocional previenen depresión y ansiedad"
              },
              {
                title: "Relaciones más fuertes",
                desc: "Aprende a mantener la intimidad y conexión en esta etapa"
              },
              {
                title: "Longevidad y vitalidad",
                desc: "Un plan claro para los próximos 20-30 años de tu vida"
              },
              {
                title: "Confianza renovada",
                desc: "Recupera tu autoestima y amor propio"
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 border-green-200 bg-green-50">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Inversión en tu bienestar
          </h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border-2 border-pink-500 shadow-lg">
            <div className="text-5xl font-bold text-pink-500 mb-4">$39.99</div>
            <p className="text-gray-600 mb-6">Acceso de por vida a todas las herramientas premium</p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-lg w-full mb-4">
              Obtener Pack Premium - $39.99
            </Button>
            <p className="text-sm text-gray-500">Garantía de 7 días • Acceso inmediato</p>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Garantía de 7 días</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Si en 7 días no sientes que el Pack Premium te ayuda a mejorar tu bienestar emocional y físico, devolvemos tu dinero 100%.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Menopausia Sin Tabú. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
