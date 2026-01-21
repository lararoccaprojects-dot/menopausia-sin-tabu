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
      icon: "🔍",
      description: "Entiende tu salud actual",
      keyPoints: [
        "Historial médico completo",
        "Factores de riesgo personales",
        "Baseline de salud actual"
      ],
      exercises: [
        {
          name: "Evaluación de Salud Actual",
          steps: [
            "Anota tu edad, peso, altura",
            "Lista condiciones médicas previas",
            "Registra medicamentos actuales",
            "Documenta alergias y sensibilidades",
            "Identifica factores de riesgo familiares"
          ]
        },
        {
          name: "Análisis de Síntomas",
          steps: [
            "Registra síntomas actuales de menopausia",
            "Anota severidad (1-10) de cada uno",
            "Identifica cuáles afectan más tu vida",
            "Documenta cuándo comenzaron",
            "Crea baseline para comparar progreso"
          ]
        },
        {
          name: "Metas de Salud",
          steps: [
            "Define 3 metas de salud para los próximos 5 años",
            "Sé específica (ej: 'Correr 5km sin cansarme')",
            "Escribe por qué cada meta es importante",
            "Identifica obstáculos potenciales",
            "Crea plan de acción para cada meta"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Prevención de Enfermedades",
      icon: "🛡️",
      description: "Reduce riesgos de salud futura",
      keyPoints: [
        "Osteoporosis: calcio y vitamina D",
        "Enfermedades cardíacas: ejercicio y dieta",
        "Diabetes: control de peso y glucosa"
      ],
      exercises: [
        {
          name: "Evaluación de Riesgos",
          steps: [
            "Investiga factores de riesgo para tu edad",
            "Revisa historial familiar",
            "Identifica riesgos modificables",
            "Consulta con tu médico sobre screening",
            "Crea plan de prevención personalizado"
          ]
        },
        {
          name: "Plan de Nutrición Preventiva",
          steps: [
            "Aumenta alimentos ricos en calcio (lácteos, verduras)",
            "Incluye grasas saludables (aguacate, pescado)",
            "Reduce azúcares refinados",
            "Aumenta fibra (frutas, verduras, granos)",
            "Planifica comidas para la semana"
          ]
        },
        {
          name: "Rutina de Ejercicio Preventivo",
          steps: [
            "150 minutos de ejercicio moderado por semana",
            "2 días de entrenamiento de fuerza",
            "Ejercicios de equilibrio para prevenir caídas",
            "Camina después de cada comida",
            "Mantén registro de actividad"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Envejecimiento Activo",
      icon: "🏃",
      description: "Mantén vitalidad y energía",
      keyPoints: [
        "Movimiento regular previene declive",
        "Conexión social es medicina",
        "Aprendizaje continuo mantiene mente joven"
      ],
      exercises: [
        {
          name: "Actividades Sociales",
          steps: [
            "Planifica reuniones semanales con amigas",
            "Únete a grupo de interés (yoga, lectura, arte)",
            "Participa en actividades comunitarias",
            "Mantén conexiones significativas",
            "Crea círculo de apoyo de mujeres"
          ]
        },
        {
          name: "Desafíos Mentales",
          steps: [
            "Aprende algo nuevo cada mes",
            "Toma clase online, lee, o aprende idioma",
            "Resuelve crucigramas o sudokus",
            "Practica meditación o mindfulness",
            "Mantén diario de reflexión"
          ]
        },
        {
          name: "Mantenimiento de Energía",
          steps: [
            "Duerme 7-8 horas consistentemente",
            "Mantén horarios regulares de comida",
            "Bebe 8 vasos de agua diaria",
            "Toma descansos durante el día",
            "Practica técnicas de manejo de estrés"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Seguimiento Médico",
      icon: "👨‍⚕️",
      description: "Mantén vigilancia de tu salud",
      keyPoints: [
        "Chequeos regulares según edad",
        "Screening de cáncer recomendado",
        "Monitoreo de presión y colesterol"
      ],
      exercises: [
        {
          name: "Calendario de Chequeos",
          steps: [
            "Crea calendario de chequeos médicos anuales",
            "Mamografía: cada 1-2 años",
            "Papanicolau: cada 3-5 años",
            "Colonoscopia: cada 10 años (a partir de 50)",
            "Presión y colesterol: anualmente"
          ]
        },
        {
          name: "Registro Médico Personal",
          steps: [
            "Crea archivo con todos los resultados",
            "Documenta diagnósticos y tratamientos",
            "Anota medicamentos y efectos secundarios",
            "Guarda referencias de especialistas",
            "Comparte con médicos nuevos"
          ]
        },
        {
          name: "Conversaciones con Médicos",
          steps: [
            "Prepara lista de preguntas antes de cita",
            "Documenta síntomas y cambios",
            "Pregunta sobre opciones de tratamiento",
            "Entiende riesgos y beneficios",
            "Toma decisiones informadas"
          ]
        }
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
      toast.success("¡Fase completada!");
    }
  };

  const handleDownload = (title: string) => {
    const phase = phases.find(p => p.title === title);
    if (!phase) return;

    let content = `PLAN DE SALUD A LARGO PLAZO\n`;
    content += `Fase: ${title}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `DESCRIPCIÓN:\n${phase.description}\n\n`;
    
    content += `PUNTOS CLAVE:\n`;
    phase.keyPoints.forEach((point, idx) => {
      content += `${idx + 1}. ${point}\n`;
    });
    content += `\n`;

    content += `EJERCICIOS:\n`;
    phase.exercises.forEach((exercise, exIdx) => {
      content += `\nEjercicio ${exIdx + 1}: ${exercise.name}\n`;
      content += `${'-'.repeat(40)}\n`;
      exercise.steps.forEach((step, stepIdx) => {
        content += `${stepIdx + 1}. ${step}\n`;
      });
    });

    content += `\n\nConsejo: La salud a largo plazo es una inversión en ti misma. Pequeños pasos consistentes = grandes cambios.\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}_Ejercicios.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Descargado: ${title}`);
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
              <h3 className="text-lg font-bold text-gray-900">¿Por qué este programa?</h3>
              <p className="text-gray-700 text-sm">
                4 fases prácticas con 12 ejercicios diseñados para construir una salud sólida para los próximos 20-30 años. Cada ejercicio toma 15-30 minutos y puedes hacerlo hoy mismo.
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
                    <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
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
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {phase.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold text-sm">✓</span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedPhase === phase.id && (
              <div className="border-t border-teal-200 px-6 py-6 bg-teal-50">
                <div className="space-y-6">
                  {/* Ejercicios */}
                  <div className="space-y-6">
                    {phase.exercises.map((exercise, exIdx) => (
                      <div key={exIdx}>
                        <h4 className="font-bold text-gray-900 mb-3">
                          Ejercicio {exIdx + 1}: {exercise.name}
                        </h4>
                        <div className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <span className="font-bold text-teal-600 flex-shrink-0">
                                {idx + 1}.
                              </span>
                              <p className="text-sm text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Acciones */}
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
              🌱 Consejo: Tu salud futura comienza hoy. Cada decisión cuenta.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
