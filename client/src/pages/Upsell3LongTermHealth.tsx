import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell3LongTermHealth() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  const phases = [
    {
      id: 1,
      title: "Evaluación Integral",
      icon: "📋",
      description: "Conoce tu estado de salud actual",
      duration: "1 semana",
      keyPoints: [
        "Revisa tu historial médico",
        "Identifica factores de riesgo familiares",
        "Documenta síntomas actuales"
      ],
      actionable: "Haz una cita con tu ginecólogo para análisis de sangre completo"
    },
    {
      id: 2,
      title: "Prevención Ósea",
      icon: "🦴",
      description: "Protege tu salud ósea después de la menopausia",
      duration: "Continuo",
      keyPoints: [
        "Calcio: 1000-1200 mg/día",
        "Vitamina D: 800-1000 UI/día",
        "Ejercicio de resistencia 3x/semana"
      ],
      actionable: "Comienza suplementos de calcio + vitamina D esta semana"
    },
    {
      id: 3,
      title: "Salud Cardiovascular",
      icon: "❤️",
      description: "Reduce riesgo de enfermedades del corazón",
      duration: "Continuo",
      keyPoints: [
        "Camina 30 min/día, 5 días/semana",
        "Reduce sodio y grasas saturadas",
        "Controla presión arterial mensualmente"
      ],
      actionable: "Compra un monitor de presión arterial y mide hoy"
    },
    {
      id: 4,
      title: "Prevención de Cáncer",
      icon: "🛡️",
      description: "Exámenes y hábitos preventivos",
      duration: "Anual",
      keyPoints: [
        "Mamografía anual (si es recomendado)",
        "Papanicolau cada 3-5 años",
        "Evita tabaco y alcohol excesivo"
      ],
      actionable: "Agenda tus exámenes preventivos para este año"
    }
  ];

  const togglePhase = (id: number) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedPhases.includes(id)) {
      setCompletedPhases(completedPhases.filter(p => p !== id));
    } else {
      setCompletedPhases([...completedPhases, id]);
      toast.success("¡Fase completada!");
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Descargando: ${title}`);
  };

  const progress = Math.round((completedPhases.length / phases.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-teal-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-teal-600" />
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
          <div className="w-full bg-teal-100 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Tu salud a largo plazo</h3>
              <p className="text-gray-700 text-sm">
                4 áreas clave para vivir saludable los próximos 20-30 años. Cada fase tiene acciones concretas que puedes comenzar hoy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fases */}
      <div className="container mx-auto px-4 space-y-4">
        {phases.map((phase) => (
          <Card
            key={phase.id}
            className={`border-2 transition-all ${
              completedPhases.includes(phase.id)
                ? "border-teal-400 bg-teal-50"
                : "border-teal-200 hover:border-teal-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl">{phase.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedPhases.includes(phase.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedPhase === phase.id ? (
                    <ChevronUp className="w-5 h-5 text-teal-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-teal-600" />
                  )}
                </div>
              </div>

              {/* Puntos Clave */}
              <div className="mt-4 space-y-2">
                {phase.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold text-sm">•</span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedPhase === phase.id && (
              <div className="border-t border-teal-200 px-6 py-6 bg-teal-50">
                <div className="space-y-6">
                  {/* Acción Recomendada */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Acción inmediata:</h4>
                    <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border-l-4 border-teal-600">
                      {phase.actionable}
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-4 border-t border-teal-200">
                    <Button
                      onClick={() => toggleComplete(phase.id)}
                      className={`flex-1 ${
                        completedPhases.includes(phase.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-teal-600 hover:bg-teal-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedPhases.includes(phase.id)
                        ? "Completado"
                        : "Marcar como completado"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(phase.title)}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Consejo Final */}
      <div className="container mx-auto px-4 mt-12">
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-semibold">
              🌱 La menopausia es el inicio de una nueva fase. Invierte en tu salud ahora.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
