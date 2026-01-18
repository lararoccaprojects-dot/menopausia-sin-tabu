import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function LongTermHealthPlan() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedPhase, setSelectedPhase] = useState(1);

  const phases = [
    {
      id: 1,
      title: "Fase 1: Primeros 3 Meses",
      subtitle: "Estabilización y Ajuste",
      goals: [
        "Identificar y monitorear síntomas principales",
        "Establecer rutina de ejercicio",
        "Mejorar calidad del sueño",
        "Evaluar cambios emocionales"
      ],
      actions: [
        "Usar el simulador de síntomas diariamente",
        "Ejercicio 3-4 veces por semana",
        "Mantener diario de sueño",
        "Consulta inicial con ginecólogo"
      ]
    },
    {
      id: 2,
      title: "Fase 2: Meses 4-6",
      subtitle: "Optimización y Adaptación",
      goals: [
        "Optimizar tratamientos según resultados",
        "Aumentar intensidad de ejercicio",
        "Mejorar nutrición",
        "Fortalecer apoyo emocional"
      ],
      actions: [
        "Ajustar suplementos si es necesario",
        "Incorporar entrenamiento de fuerza",
        "Consulta con nutricionista",
        "Participar en grupo de apoyo"
      ]
    },
    {
      id: 3,
      title: "Fase 3: Meses 7-12",
      subtitle: "Consolidación de Hábitos",
      goals: [
        "Consolidar cambios positivos",
        "Prevenir complicaciones futuras",
        "Establecer estilo de vida sostenible",
        "Evaluación de progreso"
      ],
      actions: [
        "Evaluación integral de salud",
        "Densitometría ósea si es recomendado",
        "Revisión de medicamentos",
        "Planificación a largo plazo"
      ]
    },
    {
      id: 4,
      title: "Fase 4: Año 2 en adelante",
      subtitle: "Mantenimiento y Prevención",
      goals: [
        "Mantener hábitos saludables",
        "Prevención de enfermedades crónicas",
        "Monitoreo regular de salud",
        "Bienestar integral"
      ],
      actions: [
        "Chequeos anuales",
        "Mantener rutina de ejercicio",
        "Nutrición consciente",
        "Apoyo emocional continuo"
      ]
    }
  ];

  const currentPhase = phases.find(p => p.id === selectedPhase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Plan de Salud a Largo Plazo</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/premium-pack")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
          <p className="text-gray-600">
            Hoja de ruta personalizada para tu bienestar durante y después de la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Premium Badge */}
        <div className="mb-8 flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-semibold">Contenido Premium Desbloqueado</span>
        </div>

        {/* Phase Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selecciona una Fase</h2>
          <div className="grid md:grid-cols-4 gap-3">
            {phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPhase === phase.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <p className="font-bold text-gray-900">{phase.title.split(":")[0]}</p>
                <p className="text-sm text-gray-600">{phase.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Details */}
        {currentPhase && (
          <div className="space-y-6">
            {/* Phase Overview */}
            <Card className="p-8 border-2 border-blue-200 bg-blue-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPhase.title}</h2>
              <p className="text-lg text-gray-600">{currentPhase.subtitle}</p>
            </Card>

            {/* Goals Section */}
            <Card className="p-8 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Objetivos de esta Fase</h3>
              <div className="space-y-3">
                {currentPhase.goals.map((goal, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{goal}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions Section */}
            <Card className="p-8 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Recomendadas</h3>
              <div className="space-y-3">
                {currentPhase.actions.map((action, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{action}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-8 border-2 border-yellow-200 bg-yellow-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Línea de Tiempo</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-bold text-gray-900">Mes 1</p>
                    <p className="text-gray-600">Inicio y evaluación</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-bold text-gray-900">Mes 3</p>
                    <p className="text-gray-600">Primera evaluación de progreso</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-bold text-gray-900">Mes 6</p>
                    <p className="text-gray-600">Ajustes y optimización</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Descargar Plan Completo en PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
