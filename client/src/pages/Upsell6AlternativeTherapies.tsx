import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Leaf, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell6AlternativeTherapies() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedTherapy, setExpandedTherapy] = useState<number | null>(null);
  const [favoriteTherapies, setFavoriteTherapies] = useState<number[]>([]);
  const [completedTherapies, setCompletedTherapies] = useState<number[]>([]);

  const therapies = [
    {
      id: 1,
      name: "Acupuntura",
      effectiveness: "Alto",
      time: "30-45 min",
      cost: "$$$",
      description: "Estimulación de puntos específicos para equilibrar energía",
      benefits: ["Reduce sofocos", "Mejora sueño", "Alivia dolor"],
      howTo: [
        "Buscar acupuntor certificado",
        "Sesiones semanales inicialmente",
        "Típicamente 8-12 sesiones para resultados",
        "Combinar con otras terapias"
      ],
      safety: "Muy segura cuando se realiza por profesional certificado"
    },
    {
      id: 2,
      name: "Homeopatía",
      effectiveness: "Moderado",
      time: "Varía",
      cost: "$",
      description: "Remedios naturales diluidos para estimular autocuración",
      benefits: ["Síntomas generales", "Cambios de humor", "Ansiedad"],
      howTo: [
        "Consultar homeópata calificado",
        "Tomar remedios según prescripción",
        "Mantener consistencia",
        "Dar tiempo para resultados (4-6 semanas)"
      ],
      safety: "Segura, sin efectos secundarios"
    },
    {
      id: 3,
      name: "Herbolaria Medicinal",
      effectiveness: "Alto",
      time: "Diario",
      cost: "$",
      description: "Plantas medicinales específicas para síntomas menopáusicos",
      benefits: ["Salvia para sofocos", "Trébol rojo para síntomas", "Valeriana para sueño"],
      howTo: [
        "Investigar hierbas específicas",
        "Comprar de fuentes confiables",
        "Seguir dosis recomendadas",
        "Consultar con herbolario"
      ],
      safety: "Generalmente segura, pero verificar interacciones con medicamentos"
    },
    {
      id: 4,
      name: "Masaje Terapéutico",
      effectiveness: "Moderado-Alto",
      time: "60 min",
      cost: "$$",
      description: "Manipulación de tejidos para relajación y circulación",
      benefits: ["Reduce tensión", "Mejora circulación", "Relaja músculos"],
      howTo: [
        "Buscar masajista profesional",
        "Sesiones mensuales o según necesidad",
        "Comunicar áreas de tensión",
        "Combinar con ejercicio"
      ],
      safety: "Muy seguro, beneficioso para la mayoría"
    },
    {
      id: 5,
      name: "Aromaterapia",
      effectiveness: "Moderado",
      time: "15-30 min",
      cost: "$",
      description: "Uso de aceites esenciales para bienestar emocional y físico",
      benefits: ["Reduce estrés", "Mejora sueño", "Aumenta energía"],
      howTo: [
        "Usar difusor de aceites",
        "Aplicar en piel (diluido)",
        "Inhalación directa",
        "Aceites recomendados: lavanda, rosa, menta"
      ],
      safety: "Segura si se usa correctamente, evitar ingesta"
    },
    {
      id: 6,
      name: "Reflexología",
      effectiveness: "Moderado",
      time: "45-60 min",
      cost: "$$",
      description: "Presión en puntos de pies para equilibrar cuerpo",
      benefits: ["Relaja sistema nervioso", "Mejora circulación", "Alivia dolor"],
      howTo: [
        "Buscar reflexólogo certificado",
        "Sesiones semanales o quincenales",
        "Comunicar síntomas",
        "Mantener consistencia"
      ],
      safety: "Muy segura, sin efectos secundarios"
    },
    {
      id: 7,
      name: "Yoga y Pilates",
      effectiveness: "Alto",
      time: "45-60 min",
      cost: "$-$$",
      description: "Movimiento consciente para flexibilidad y fortaleza",
      benefits: ["Fortalece músculos", "Mejora balance", "Reduce estrés"],
      howTo: [
        "Clases presenciales u online",
        "3-4 veces por semana",
        "Estilos suaves (Hatha, Yin)",
        "Adaptado para menopausia"
      ],
      safety: "Muy seguro, adaptable a cualquier nivel"
    },
    {
      id: 8,
      name: "Meditación y Mindfulness",
      effectiveness: "Alto",
      time: "10-30 min",
      cost: "Gratis-$",
      description: "Práctica mental para calmar mente y cuerpo",
      benefits: ["Reduce ansiedad", "Mejora sueño", "Aumenta bienestar"],
      howTo: [
        "Aplicaciones: Calm, Headspace, Insight Timer",
        "Práctica diaria",
        "Comenzar con 5-10 minutos",
        "Aumentar gradualmente"
      ],
      safety: "Completamente segura, beneficiosa para todos"
    },
    {
      id: 9,
      name: "Terapia de Luz",
      effectiveness: "Moderado",
      time: "20-30 min",
      cost: "$$",
      description: "Exposición a luz específica para regular ritmo circadiano",
      benefits: ["Mejora sueño", "Aumenta energía", "Reduce depresión"],
      howTo: [
        "Caja de luz 10,000 lux",
        "Uso matutino",
        "20-30 minutos diarios",
        "Especialmente útil en invierno"
      ],
      safety: "Segura, evitar si tienes sensibilidad ocular"
    },
    {
      id: 10,
      name: "Baños de Hielo y Calor",
      effectiveness: "Moderado",
      time: "15-20 min",
      cost: "$",
      description: "Alternancia de temperaturas para circulación y recuperación",
      benefits: ["Reduce inflamación", "Mejora circulación", "Aumenta energía"],
      howTo: [
        "Comenzar con agua tibia",
        "Alternar con agua fría",
        "Terminar con agua fría",
        "2-3 veces por semana"
      ],
      safety: "Segura para la mayoría, evitar si tienes problemas cardíacos"
    },
    {
      id: 11,
      name: "Terapia de Sonido",
      effectiveness: "Moderado",
      time: "30-60 min",
      cost: "$$",
      description: "Vibración de sonido para sanación y relajación",
      benefits: ["Profunda relajación", "Reduce estrés", "Mejora sueño"],
      howTo: [
        "Sesiones con cuencos tibetanos",
        "Gongs",
        "Música binaural",
        "Sesiones mensuales"
      ],
      safety: "Muy segura, relajante y beneficiosa"
    },
    {
      id: 12,
      name: "Energía y Reiki",
      effectiveness: "Moderado",
      time: "45-60 min",
      cost: "$$",
      description: "Canalización de energía para equilibrio y sanación",
      benefits: ["Profunda relajación", "Equilibrio emocional", "Bienestar general"],
      howTo: [
        "Buscar practicante certificado",
        "Sesiones mensuales",
        "Estar abierto a la experiencia",
        "Combinar con otras terapias"
      ],
      safety: "Muy segura, complementaria"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavoriteTherapies(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedTherapies(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedTherapies.length / therapies.length) * 100);

  const getEffectivenessColor = (effectiveness: string) => {
    switch(effectiveness) {
      case "Alto": return "bg-green-100 text-green-700";
      case "Moderado-Alto": return "bg-lime-100 text-lime-700";
      case "Moderado": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-teal-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-teal-600" />
              <h1 className="text-3xl font-bold text-gray-900">Compendio de Terapias Alternativas</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
          <p className="text-gray-600">
            12 terapias naturales documentadas para complementar tu bienestar
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-teal-200 bg-teal-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso de Exploración</h2>
            <span className="text-2xl font-bold text-teal-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-teal-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedTherapies.length} de {therapies.length} terapias exploradas
          </p>
        </Card>

        {/* Therapies Grid */}
        <div className="space-y-4">
          {therapies.map(therapy => (
            <Card key={therapy.id} className="p-6 border-2 border-teal-100 hover:border-teal-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{therapy.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{therapy.description}</p>
                </div>
                <div className="flex gap-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => toggleFavorite(therapy.id)}
                    className="p-1"
                  >
                    <Star
                      size={20}
                      className={favoriteTherapies.includes(therapy.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  </button>
                  <button
                    onClick={() => toggleComplete(therapy.id)}
                  >
                    <CheckCircle2
                      size={20}
                      className={completedTherapies.includes(therapy.id) ? "fill-teal-500 text-teal-500" : "text-gray-300"}
                    />
                  </button>
                </div>
              </div>

              {/* Therapy Info */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full ${getEffectivenessColor(therapy.effectiveness)}`}>
                  Efectividad: {therapy.effectiveness}
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  ⏱️ {therapy.time}
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  💰 {therapy.cost}
                </span>
              </div>

              {/* Expandable Content */}
              {expandedTherapy === therapy.id && (
                <div className="mb-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Beneficios:</h4>
                  <ul className="space-y-1 mb-4">
                    {therapy.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-teal-600 mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">Cómo Hacer:</h4>
                  <ol className="space-y-2 mb-4">
                    {therapy.howTo.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="font-bold text-teal-600 flex-shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <h4 className="font-semibold text-gray-900 mb-2">Seguridad:</h4>
                  <p className="text-sm text-gray-700 bg-white p-2 rounded border border-teal-200">
                    {therapy.safety}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => setExpandedTherapy(expandedTherapy === therapy.id ? null : therapy.id)}
                >
                  {expandedTherapy === therapy.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-600 hover:bg-teal-50"
                  onClick={() => toggleComplete(therapy.id)}
                >
                  {completedTherapies.includes(therapy.id) ? "✓ Explorado" : "Marcar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Recommendations Section */}
        <Card className="p-6 mt-8 border-2 border-purple-200 bg-purple-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recomendaciones Personalizadas</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">Para Sofocos:</h4>
              <p className="text-sm text-gray-700">Acupuntura, Herbolaria (Salvia), Meditación</p>
            </div>
            <div className="p-4 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">Para Sueño:</h4>
              <p className="text-sm text-gray-700">Aromaterapia, Meditación, Terapia de Luz, Herbolaria (Valeriana)</p>
            </div>
            <div className="p-4 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">Para Estrés y Ansiedad:</h4>
              <p className="text-sm text-gray-700">Yoga, Meditación, Masaje, Reiki, Terapia de Sonido</p>
            </div>
            <div className="p-4 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">Para Dolor y Tensión:</h4>
              <p className="text-sm text-gray-700">Masaje, Acupuntura, Pilates, Baños de Hielo/Calor</p>
            </div>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-6 mt-8 border-2 border-red-200 bg-red-50">
          <h3 className="text-lg font-bold text-red-900 mb-2">Nota Importante</h3>
          <p className="text-sm text-red-800">
            Estas terapias alternativas son complementarias y no reemplazan el consejo médico profesional. Siempre consulta con tu médico antes de iniciar cualquier nueva terapia, especialmente si estás tomando medicamentos.
          </p>
        </Card>
      </div>
    </div>
  );
}
