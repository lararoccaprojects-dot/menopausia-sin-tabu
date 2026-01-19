import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell3LongTermHealth() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  const phases = [
    {
      id: 1,
      title: "Evaluación Integral de Salud",
      description: "Análisis completo de tu estado de salud actual",
      duration: "30 min",
      content: [
        "Evaluación de síntomas actuales",
        "Historial de salud familiar",
        "Factores de riesgo personales",
        "Pruebas recomendadas",
        "Métricas de bienestar"
      ],
      milestones: [
        "Completar cuestionario de salud",
        "Revisar historial médico",
        "Identificar áreas de riesgo"
      ]
    },
    {
      id: 2,
      title: "Salud Cardiovascular",
      description: "Proteger tu corazón después de la menopausia",
      duration: "25 min",
      content: [
        "Riesgo cardiovascular aumentado post-menopausia",
        "Presión arterial y colesterol",
        "Ejercicio para la salud del corazón",
        "Nutrición cardioprotectora",
        "Suplementos recomendados"
      ],
      milestones: [
        "Medir presión arterial",
        "Hacer análisis de colesterol",
        "Crear plan de ejercicio cardiovascular"
      ]
    },
    {
      id: 3,
      title: "Salud Ósea y Prevención de Osteoporosis",
      description: "Mantener densidad ósea y prevenir fracturas",
      duration: "25 min",
      content: [
        "Pérdida de densidad ósea post-menopausia",
        "Factores de riesgo de osteoporosis",
        "Calcio y vitamina D",
        "Ejercicios de fortalecimiento",
        "Pruebas de densidad ósea"
      ],
      milestones: [
        "Hacer prueba de densidad ósea (DEXA)",
        "Aumentar ingesta de calcio",
        "Iniciar ejercicios de fortalecimiento"
      ]
    },
    {
      id: 4,
      title: "Prevención de Enfermedades Crónicas",
      description: "Reducir riesgo de diabetes, cáncer y otras enfermedades",
      duration: "30 min",
      content: [
        "Riesgo de diabetes tipo 2",
        "Prevención de ciertos cánceres",
        "Salud cognitiva y Alzheimer",
        "Estilos de vida preventivos",
        "Screening recomendado"
      ],
      milestones: [
        "Hacer prueba de glucosa",
        "Agendar screening de cáncer",
        "Crear plan de prevención"
      ]
    },
    {
      id: 5,
      title: "Nutrición Optimizada para Longevidad",
      description: "Plan nutricional para los próximos 20-30 años",
      duration: "25 min",
      content: [
        "Necesidades nutricionales post-menopausia",
        "Antioxidantes y antiinflamatorios",
        "Proteína y masa muscular",
        "Hidratación óptima",
        "Suplementos esenciales"
      ],
      milestones: [
        "Crear plan de nutrición personalizado",
        "Hacer lista de compras saludable",
        "Comenzar suplementación"
      ]
    },
    {
      id: 6,
      title: "Fitness y Movimiento",
      description: "Rutina de ejercicio para salud a largo plazo",
      duration: "25 min",
      content: [
        "Ejercicio aeróbico para el corazón",
        "Entrenamiento de resistencia",
        "Flexibilidad y equilibrio",
        "Prevención de caídas",
        "Rutina personalizada"
      ],
      milestones: [
        "Crear rutina de ejercicio semanal",
        "Establecer metas de actividad",
        "Encontrar actividades que disfrutes"
      ]
    },
    {
      id: 7,
      title: "Salud Mental y Cognitiva",
      description: "Mantener mente aguda y bienestar emocional",
      duration: "20 min",
      content: [
        "Estimulación cognitiva",
        "Prevención de depresión y ansiedad",
        "Sueño de calidad",
        "Manejo del estrés",
        "Conexión social"
      ],
      milestones: [
        "Establecer rutina de sueño",
        "Iniciar práctica de meditación",
        "Planificar actividades sociales"
      ]
    },
    {
      id: 8,
      title: "Visión a 20-30 Años",
      description: "Tu hoja de ruta hacia una vida plena",
      duration: "30 min",
      content: [
        "Definir metas de salud a largo plazo",
        "Crear plan de acción anual",
        "Sistema de seguimiento",
        "Ajustes según cambios",
        "Celebración de logros"
      ],
      milestones: [
        "Definir visión de futuro",
        "Crear plan de 5 años",
        "Establecer sistema de seguimiento"
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedPhases(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedPhases.length / phases.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-emerald-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <h1 className="text-3xl font-bold text-gray-900">Plan de Salud a Largo Plazo</h1>
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
            8 fases para mantener tu salud durante los próximos 20-30 años
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-emerald-200 bg-emerald-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-emerald-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedPhases.length} de {phases.length} fases completadas
          </p>
        </Card>

        {/* Phases Grid */}
        <div className="space-y-4">
          {phases.map(phase => (
            <Card key={phase.id} className="p-6 border-2 border-emerald-100 hover:border-emerald-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                </div>
                <button
                  onClick={() => toggleComplete(phase.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <CheckCircle2
                    size={24}
                    className={completedPhases.includes(phase.id) ? "fill-emerald-500 text-emerald-500" : "text-gray-300"}
                  />
                </button>
              </div>

              {/* Phase Info */}
              <div className="flex gap-4 mb-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {phase.duration}
                </span>
              </div>

              {/* Expandable Content */}
              {expandedPhase === phase.id && (
                <div className="mb-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contenido:</h4>
                  <ul className="space-y-2 mb-4">
                    {phase.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">Milestones:</h4>
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                >
                  {expandedPhase === phase.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar Fase
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Fase
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => toggleComplete(phase.id)}
                >
                  {completedPhases.includes(phase.id) ? "✓ Completado" : "Marcar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="p-6 mt-8 border-2 border-blue-200 bg-blue-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios de este plan</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Prevención proactiva:</strong> Reduce riesgo de enfermedades crónicas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Longevidad:</strong> Vive más años con mejor calidad de vida</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Energía y vitalidad:</strong> Mantén tu energía durante décadas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Independencia:</strong> Mantén tu autonomía y movilidad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Paz mental:</strong> Sabe que estás cuidando tu salud futura</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
