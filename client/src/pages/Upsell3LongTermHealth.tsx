import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface GoalTemplate {
  id: string;
  name: string;
  category: string;
  fields: { label: string; type: string; placeholder: string }[];
}

export default function Upsell3LongTermHealth() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [goalData, setGoalData] = useState<Record<string, string>>({});
  const [showTemplate, setShowTemplate] = useState<string | null>(null);

  const goalTemplates: GoalTemplate[] = [
    {
      id: "health-assessment",
      name: "Evaluación de Salud Integral",
      category: "Evaluación",
      fields: [
        { label: "Edad", type: "number", placeholder: "Ej: 52" },
        { label: "Peso (kg)", type: "number", placeholder: "Ej: 65" },
        { label: "Altura (cm)", type: "number", placeholder: "Ej: 165" },
        { label: "Condiciones médicas previas", type: "textarea", placeholder: "Ej: Diabetes, Hipertensión..." },
        { label: "Medicamentos actuales", type: "textarea", placeholder: "Ej: Metformina, Lisinopril..." },
        { label: "Alergias y sensibilidades", type: "textarea", placeholder: "Ej: Penicilina, Gluten..." },
        { label: "Factores de riesgo familiares", type: "textarea", placeholder: "Ej: Cáncer de mama, Alzheimer..." }
      ]
    },
    {
      id: "symptom-tracker",
      name: "Registro de Síntomas",
      category: "Síntomas",
      fields: [
        { label: "Síntoma 1", type: "text", placeholder: "Ej: Sofocos" },
        { label: "Severidad (1-10)", type: "number", placeholder: "1-10" },
        { label: "Síntoma 2", type: "text", placeholder: "Ej: Cambios de humor" },
        { label: "Severidad (1-10)", type: "number", placeholder: "1-10" },
        { label: "Síntoma 3", type: "text", placeholder: "Ej: Insomnio" },
        { label: "Severidad (1-10)", type: "number", placeholder: "1-10" },
        { label: "Fecha de inicio de síntomas", type: "date", placeholder: "" },
        { label: "Síntomas que más afectan tu vida", type: "textarea", placeholder: "Describe cuáles son los más impactantes..." }
      ]
    },
    {
      id: "health-goals",
      name: "Metas de Salud a 5 Años",
      category: "Objetivos",
      fields: [
        { label: "Meta 1", type: "text", placeholder: "Ej: Correr 5km sin cansarme" },
        { label: "Por qué es importante", type: "textarea", placeholder: "Describe la importancia..." },
        { label: "Meta 2", type: "text", placeholder: "Ej: Mantener peso saludable" },
        { label: "Por qué es importante", type: "textarea", placeholder: "Describe la importancia..." },
        { label: "Meta 3", type: "text", placeholder: "Ej: Mejorar calidad del sueño" },
        { label: "Por qué es importante", type: "textarea", placeholder: "Describe la importancia..." },
        { label: "Obstáculos potenciales", type: "textarea", placeholder: "Ej: Falta de tiempo, motivación..." },
        { label: "Plan de acción", type: "textarea", placeholder: "Pasos específicos para lograr tus metas..." }
      ]
    },
    {
      id: "prevention-plan",
      name: "Plan de Prevención Personalizado",
      category: "Prevención",
      fields: [
        { label: "Riesgos de salud identificados", type: "textarea", placeholder: "Ej: Osteoporosis, Enfermedades cardíacas..." },
        { label: "Screening recomendado", type: "textarea", placeholder: "Ej: Densitometría ósea, Mamografía..." },
        { label: "Acciones preventivas - Nutrición", type: "textarea", placeholder: "Ej: Aumentar calcio y vitamina D..." },
        { label: "Acciones preventivas - Ejercicio", type: "textarea", placeholder: "Ej: 150 min cardio + 2x fuerza/semana..." },
        { label: "Acciones preventivas - Estilo de vida", type: "textarea", placeholder: "Ej: Dormir 7-8 horas, reducir estrés..." },
        { label: "Seguimiento médico", type: "text", placeholder: "Ej: Revisión anual con ginecólogo" }
      ]
    }
  ];

  const phases = [
    {
      id: 1,
      title: "Evaluación Integral (Año 1)",
      icon: "🔍",
      description: "Entiende tu salud actual",
      keyPoints: [
        "Historial médico completo",
        "Factores de riesgo personales",
        "Baseline de salud actual"
      ],
      objectives: [
        { timeframe: "5 años", goal: "Conocer tu estado de salud completo y establecer baseline" },
        { timeframe: "10 años", goal: "Mantener o mejorar los indicadores de salud inicial" },
        { timeframe: "20 años", goal: "Prevenir enfermedades crónicas identificadas en evaluación" },
        { timeframe: "30 años", goal: "Envejecer activamente con independencia y vitalidad" }
      ]
    },
    {
      id: 2,
      title: "Prevención de Enfermedades (Años 1-5)",
      icon: "🛡️",
      description: "Reduce riesgos de salud futura",
      keyPoints: [
        "Osteoporosis: calcio y vitamina D",
        "Enfermedades cardíacas: ejercicio y dieta",
        "Diabetes: control de peso y glucosa"
      ],
      objectives: [
        { timeframe: "5 años", goal: "Densidad ósea normal (T-score > -1), presión arterial < 130/80" },
        { timeframe: "10 años", goal: "Colesterol total < 200, sin diagnóstico de diabetes" },
        { timeframe: "20 años", goal: "Mantener independencia funcional, sin caídas graves" },
        { timeframe: "30 años", goal: "Calidad de vida óptima, sin limitaciones por enfermedades prevenibles" }
      ]
    },
    {
      id: 3,
      title: "Nutrición Optimizada (Años 5-15)",
      icon: "🥗",
      description: "Alimentación para longevidad",
      keyPoints: [
        "Dieta mediterránea recomendada",
        "Suplementos esenciales",
        "Hidratación y energía"
      ],
      objectives: [
        { timeframe: "5 años", goal: "Adoptar dieta mediterránea, IMC entre 18.5-24.9" },
        { timeframe: "10 años", goal: "Mantener peso saludable, energía consistente sin fatiga" },
        { timeframe: "20 años", goal: "Nutrición óptima para prevención de Alzheimer y cáncer" },
        { timeframe: "30 años", goal: "Longevidad saludable con nutrientes para envejecimiento activo" }
      ]
    },
    {
      id: 4,
      title: "Envejecimiento Activo (Años 15-30)",
      icon: "🏃",
      description: "Mantén vitalidad y fuerza",
      keyPoints: [
        "Ejercicio regular y variado",
        "Flexibilidad y equilibrio",
        "Conexión social y mental"
      ],
      objectives: [
        { timeframe: "5 años", goal: "150 min cardio/semana, 2x fuerza, flexibilidad mejorada" },
        { timeframe: "10 años", goal: "Fuerza muscular mantenida, equilibrio excelente, sin caídas" },
        { timeframe: "20 años", goal: "Cognición aguda, conexión social fuerte, vitalidad constante" },
        { timeframe: "30 años", goal: "Envejecimiento exitoso con independencia, propósito y alegría" }
      ]
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
      toast.success("¡Fase completada! Excelente progreso");
    }
  };

  const handleTemplateChange = (field: string, value: string) => {
    setGoalData({ ...goalData, [field]: value });
  };

  const downloadTemplate = (template: GoalTemplate) => {
    let content = `PLAN DE SALUD A LARGO PLAZO\n`;
    content += `${template.name}\n`;
    content += `${'='.repeat(60)}\n\n`;
    content += `Fecha de creación: ${new Date().toLocaleDateString('es-ES')}\n`;
    content += `Usuario: ${user?.name || 'Usuario'}\n\n`;

    template.fields.forEach((field) => {
      const value = goalData[field.label] || "[Completar]";
      content += `${field.label}:\n${value}\n\n`;
    });

    content += `\nConsejo: Revisa este plan cada 3 meses y ajusta según sea necesario.\n`;
    content += `Recuerda: La consistencia es más importante que la perfección.\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${template.name.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Descargado: ${template.name}`);
  };

  const progress = Math.round((completedPhases.length / phases.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
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
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">¿Por qué este programa?</h3>
              <p className="text-gray-700 text-sm">
                4 fases estratégicas con plantillas interactivas descargables para planificar tu salud de los próximos 20-30 años. Cada plantilla es personalizable y te ayuda a establecer objetivos claros, medibles y alcanzables.
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
                ? "border-blue-400 bg-blue-50"
                : "border-blue-200 hover:border-blue-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-4xl">{phase.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold text-sm">✓</span>
                          <span className="text-sm text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                    {phase.objectives && (
                      <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-600">
                        <p className="font-semibold text-gray-900 mb-3 text-sm">Objetivos a Conseguir:</p>
                        <div className="space-y-2">
                          {phase.objectives.map((obj, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-semibold text-blue-600">{obj.timeframe}:</span>
                              <span className="text-gray-700 ml-2">{obj.goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedPhases.includes(phase.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedPhase === phase.id ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedPhase === phase.id && (
              <div className="border-t border-blue-200 px-6 py-6 bg-blue-50">
                <div className="space-y-6">
                  {/* Plantillas */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">Plantillas Interactivas para esta Fase:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {goalTemplates
                        .filter((t) => {
                          if (phase.id === 1) return t.id === "health-assessment" || t.id === "symptom-tracker";
                          if (phase.id === 2) return t.id === "prevention-plan";
                          if (phase.id === 3) return t.id === "health-goals";
                          return false;
                        })
                        .map((template) => (
                          <Button
                            key={template.id}
                            variant="outline"
                            className="justify-start h-auto py-3 text-left"
                            onClick={() => setShowTemplate(showTemplate === template.id ? null : template.id)}
                          >
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold">{template.name}</span>
                              <span className="text-xs text-gray-600">{template.fields.length} campos</span>
                            </div>
                          </Button>
                        ))}
                    </div>
                  </div>

                  {/* Formulario de Plantilla */}
                  {showTemplate && (
                    <div className="border border-blue-300 rounded-lg p-4 bg-white space-y-4">
                      {goalTemplates
                        .filter((t) => t.id === showTemplate)
                        .map((template) => (
                          <div key={template.id} className="space-y-4">
                            <h5 className="font-bold text-gray-900">{template.name}</h5>
                            {template.fields.map((field, idx) => (
                              <div key={idx}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  {field.label}
                                </label>
                                {field.type === "textarea" ? (
                                  <textarea
                                    placeholder={field.placeholder}
                                    value={goalData[field.label] || ""}
                                    onChange={(e) => handleTemplateChange(field.label, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                ) : (
                                  <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={goalData[field.label] || ""}
                                    onChange={(e) => handleTemplateChange(field.label, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                )}
                              </div>
                            ))}
                            <Button
                              onClick={() => {
                                downloadTemplate(template);
                                setShowTemplate(null);
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Descargar Plantilla Completada
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-3 pt-4 border-t border-blue-200">
                    <Button
                      onClick={() => toggleComplete(phase.id)}
                      className={`flex-1 ${
                        completedPhases.includes(phase.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedPhases.includes(phase.id)
                        ? "Completada"
                        : "Marcar como completada"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
