import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Heart, BookOpen, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell4SelfEsteemKit() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'affirmations' | 'saying-no'>('affirmations');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [favoriteAffirmations, setFavoriteAffirmations] = useState<number[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<Record<number, Record<string, boolean>>>({});

  const affirmations = [
    { id: 1, day: 1, text: "Soy valiosa tal como soy, con todos mis cambios", category: "Valor Personal" },
    { id: 2, day: 2, text: "Mi cuerpo es sabio y me guía hacia lo que necesito", category: "Aceptación Corporal" },
    { id: 3, day: 3, text: "Merezco amor, respeto y cuidado de mí misma", category: "Amor Propio" },
    { id: 4, day: 4, text: "Mis experiencias me han hecho más fuerte y sabia", category: "Fortaleza" },
    { id: 5, day: 5, text: "Elijo enfocarse en lo que puedo controlar", category: "Empoderamiento" },
    { id: 6, day: 6, text: "Soy hermosa en cada etapa de mi vida", category: "Belleza" },
    { id: 7, day: 7, text: "Tengo derecho a establecer límites saludables", category: "Límites" },
    { id: 8, day: 8, text: "Mi voz importa y merece ser escuchada", category: "Voz Propia" },
    { id: 9, day: 9, text: "Soy capaz de crear la vida que deseo", category: "Capacidad" },
    { id: 10, day: 10, text: "Elijo la compasión conmigo misma en lugar de la crítica", category: "Autocompasión" },
    { id: 11, day: 11, text: "Mi menopausia es una transición, no un final", category: "Perspectiva" },
    { id: 12, day: 12, text: "Soy suficiente, exactamente como soy ahora", category: "Suficiencia" },
    { id: 13, day: 13, text: "Merezco disfrutar de la vida plenamente", category: "Disfrute" },
    { id: 14, day: 14, text: "Soy resiliente y puedo manejar los desafíos", category: "Resiliencia" },
    { id: 15, day: 15, text: "Mi valor no depende de mi apariencia o edad", category: "Valor Intrínseco" },
    { id: 16, day: 16, text: "Elijo invertir en mi bienestar y felicidad", category: "Prioridades" },
    { id: 17, day: 17, text: "Soy digna de la mejor versión de mí misma", category: "Dignidad" },
    { id: 18, day: 18, text: "Mis sentimientos son válidos y merecen atención", category: "Validación" },
    { id: 19, day: 19, text: "Soy una obra maestra en progreso", category: "Crecimiento" },
    { id: 20, day: 20, text: "Elijo la gratitud por lo que mi cuerpo ha hecho", category: "Gratitud" },
    { id: 21, day: 21, text: "Tengo el poder de cambiar mi narrativa", category: "Empoderamiento" },
    { id: 22, day: 22, text: "Soy fuerte, inteligente y capaz", category: "Fortaleza" },
    { id: 23, day: 23, text: "Merezco relaciones que me valoren y respeten", category: "Relaciones" },
    { id: 24, day: 24, text: "Mi edad es una ventaja, no una desventaja", category: "Edad" },
    { id: 25, day: 25, text: "Soy libre para ser auténtica y verdadera", category: "Autenticidad" },
    { id: 26, day: 26, text: "Elijo el amor propio sobre la perfección", category: "Amor Propio" },
    { id: 27, day: 27, text: "Soy una inspiración para otras mujeres", category: "Inspiración" },
    { id: 28, day: 28, text: "Mi futuro es brillante y lleno de posibilidades", category: "Futuro" },
    { id: 29, day: 29, text: "Soy merecedora de éxito y felicidad", category: "Merecimiento" },
    { id: 30, day: 30, text: "Amo y acepto todas las partes de mí misma", category: "Aceptación Total" }
  ];

  const sayingNoWeeks = [
    {
      week: 1,
      title: "Preparación Mental",
      description: "Autoevaluación de patrones de 'sí' e identificación de miedos",
      objectives: [
        "Autoevaluación de patrones de 'sí'",
        "Identificación de miedos subyacentes",
        "Educación sobre la culpa",
        "Afirmaciones diarias"
      ],
      dailyTasks: [
        "Lunes: Completa autoevaluación",
        "Martes: Identifica tus miedos",
        "Miércoles: Lee sobre la culpa",
        "Jueves: Practica afirmaciones",
        "Viernes: Reflexiona sobre patrones",
        "Sábado: Prepárate mentalmente",
        "Domingo: Planifica la próxima semana"
      ]
    },
    {
      week: 2,
      title: "Práctica en Espejo",
      description: "Creación de frases personalizadas y práctica diaria",
      objectives: [
        "Creación de 10 frases personalizadas de 'no'",
        "Práctica diaria en el espejo",
        "Visualización guiada",
        "Preparación emocional"
      ],
      dailyTasks: [
        "Lunes: Crea 3 frases de 'no'",
        "Martes: Crea 3 frases más",
        "Miércoles: Crea 4 frases finales",
        "Jueves: Practica en el espejo",
        "Viernes: Visualización guiada",
        "Sábado: Práctica con confianza",
        "Domingo: Reflexiona sobre progreso"
      ]
    },
    {
      week: 3,
      title: "Bajo Riesgo",
      description: "Primeros 'noes' en situaciones de bajo riesgo",
      objectives: [
        "Identificación de 5 oportunidades de bajo riesgo",
        "Primeros 'noes' en la vida real",
        "Celebración de logros",
        "Reflexión sobre resultados"
      ],
      dailyTasks: [
        "Lunes: Identifica 5 oportunidades",
        "Martes: Ejecuta primer 'no'",
        "Miércoles: Ejecuta segundo 'no'",
        "Jueves: Ejecuta tercer 'no'",
        "Viernes: Ejecuta cuarto 'no'",
        "Sábado: Ejecuta quinto 'no'",
        "Domingo: Celebra y reflexiona"
      ]
    },
    {
      week: 4,
      title: "Riesgo Medio",
      description: "Situaciones con personas importantes",
      objectives: [
        "Situaciones con personas importantes",
        "Manejo de reacciones difíciles",
        "Fortalecimiento de límites",
        "Integración en relaciones"
      ],
      dailyTasks: [
        "Lunes: Planifica situación 1",
        "Martes: Ejecuta situación 1",
        "Miércoles: Planifica situación 2",
        "Jueves: Ejecuta situación 2",
        "Viernes: Maneja reacciones",
        "Sábado: Fortalece límites",
        "Domingo: Reflexiona sobre relaciones"
      ]
    },
    {
      week: 5,
      title: "Alto Riesgo",
      description: "Situaciones críticas con personas clave",
      objectives: [
        "Situaciones críticas (jefe, pareja, padres)",
        "Análisis profundo y estrategia",
        "Ensayo completo",
        "Ejecución del 'no' más importante"
      ],
      dailyTasks: [
        "Lunes: Análisis profundo",
        "Martes: Estrategia y preparación",
        "Miércoles: Ensayo mental",
        "Jueves: Ensayo en voz alta",
        "Viernes: Preparación final",
        "Sábado: Ejecución del 'no'",
        "Domingo: Reflexión y celebración"
      ]
    },
    {
      week: 6,
      title: "Automatización",
      description: "Un 'no' diario integrado en rutina",
      objectives: [
        "Un 'no' diario",
        "Observación de patrones",
        "Integración en rutina",
        "Naturalización del proceso"
      ],
      dailyTasks: [
        "Lunes-Domingo: Un 'no' diario",
        "Cada día: Registra tu 'no'",
        "Cada día: Nota cómo te sientes",
        "Cada día: Observa patrones",
        "Cada día: Celebra pequeñas victorias"
      ]
    },
    {
      week: 7,
      title: "Manejo de Manipulación",
      description: "Identificación de manipuladores y respuestas",
      objectives: [
        "Identificación de manipuladores",
        "Respuestas a tácticas (culpa, minimización, amenazas)",
        "Práctica de firmeza",
        "Protección de límites"
      ],
      dailyTasks: [
        "Lunes: Identifica manipuladores",
        "Martes: Aprende tácticas de manipulación",
        "Miércoles: Crea respuestas",
        "Jueves: Practica firmeza",
        "Viernes: Enfrenta manipulación",
        "Sábado: Protege tus límites",
        "Domingo: Reflexiona sobre fortaleza"
      ]
    },
    {
      week: 8,
      title: "Consolidación",
      description: "Evaluación y plan de mantenimiento",
      objectives: [
        "Evaluación de 8 semanas",
        "Comparación antes/después",
        "Sistema de mantenimiento",
        "Celebración de transformación"
      ],
      dailyTasks: [
        "Lunes: Evaluación completa",
        "Martes: Comparación antes/después",
        "Miércoles: Identifica cambios",
        "Jueves: Crea sistema de mantenimiento",
        "Viernes: Planifica futuro",
        "Sábado: Celebra transformación",
        "Domingo: Compromiso de continuidad"
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedDays(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleWeekComplete = (week: number) => {
    setCompletedWeeks(prev =>
      prev.includes(week) ? prev.filter(x => x !== week) : [...prev, week]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavoriteAffirmations(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    toast.success("Afirmación agregada a favoritos");
  };

  const toggleDailyTask = (week: number, day: string) => {
    setWeeklyProgress(prev => ({
      ...prev,
      [week]: {
        ...(prev[week] || {}),
        [day]: !(prev[week]?.[day] || false)
      }
    }));
  };

  const affirmationCompletion = Math.round((completedDays.length / 30) * 100);
  const sayingNoCompletion = Math.round((completedWeeks.length / 8) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-600" />
              <h1 className="text-3xl font-bold text-gray-900">Kit de Autoestima Positiva</h1>
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
            30 afirmaciones diarias + Plan de 8 semanas "Práctica de Decir No"
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('affirmations')}
            className={`flex-1 ${activeTab === 'affirmations' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <Heart className="w-4 h-4 mr-2" />
            30 Afirmaciones Diarias
          </Button>
          <Button
            onClick={() => setActiveTab('saying-no')}
            className={`flex-1 ${activeTab === 'saying-no' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Plan "Práctica de Decir No"
          </Button>
        </div>

        {/* Affirmations Tab */}
        {activeTab === 'affirmations' && (
          <>
            <Card className="p-6 mb-8 border-2 border-amber-200 bg-amber-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
                <span className="text-2xl font-bold text-amber-600">{affirmationCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${affirmationCompletion}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedDays.length} de 30 afirmaciones completadas
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {affirmations.map(affirmation => (
                <Card key={affirmation.id} className="p-4 border-2 border-amber-100 hover:border-amber-400 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">Día {affirmation.day}</h3>
                      <p className="text-xs text-amber-600 font-medium">{affirmation.category}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(affirmation.id)}
                      className="ml-2 flex-shrink-0"
                    >
                      <Heart
                        size={18}
                        className={favoriteAffirmations.includes(affirmation.id) ? "fill-red-500 text-red-500" : "text-gray-300"}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 italic">"{affirmation.text}"</p>
                  <Button
                    onClick={() => toggleComplete(affirmation.id)}
                    className={`w-full text-sm ${completedDays.includes(affirmation.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} text-white`}
                  >
                    {completedDays.includes(affirmation.id) ? '✓ Completado' : 'Marcar'}
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Saying No Tab */}
        {activeTab === 'saying-no' && (
          <>
            <Card className="p-6 mb-8 border-2 border-amber-200 bg-amber-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Progreso del Plan</h2>
                <span className="text-2xl font-bold text-amber-600">{sayingNoCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sayingNoCompletion}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedWeeks.length} de 8 semanas completadas
              </p>
            </Card>

            <div className="space-y-4">
              {sayingNoWeeks.map((weekPlan) => (
                <Card key={weekPlan.week} className="p-6 border-2 border-amber-100 hover:border-amber-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">Semana {weekPlan.week}: {weekPlan.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{weekPlan.description}</p>
                    </div>
                    <button
                      onClick={() => toggleWeekComplete(weekPlan.week)}
                      className="ml-2 flex-shrink-0"
                    >
                      <CheckCircle2
                        size={24}
                        className={completedWeeks.includes(weekPlan.week) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                      />
                    </button>
                  </div>

                  {expandedWeek === weekPlan.week && (
                    <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Objetivos de la Semana:</h4>
                        <ul className="space-y-2">
                          {weekPlan.objectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-amber-600 mt-1">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Tareas Diarias:</h4>
                        <div className="space-y-2">
                          {weekPlan.dailyTasks.map((task, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={weeklyProgress[weekPlan.week]?.[task] || false}
                                onChange={() => toggleDailyTask(weekPlan.week, task)}
                                className="w-4 h-4 text-amber-600 rounded"
                              />
                              <span className="text-sm text-gray-700">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => setExpandedWeek(expandedWeek === weekPlan.week ? null : weekPlan.week)}
                    >
                      {expandedWeek === weekPlan.week ? (
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
                      className="border-amber-500 text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Summary Section */}
        <Card className="p-6 mt-8 border-2 border-green-200 bg-green-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios de este programa</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Autoestima fortalecida:</strong> 30 afirmaciones diarias para transformar tu relación contigo misma</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Límites saludables:</strong> Plan progresivo de 8 semanas para aprender a decir "no" sin culpa</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Empoderamiento:</strong> Recupera tu poder y autoridad personal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Relaciones mejoradas:</strong> Comunica tus necesidades con claridad y compasión</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Paz mental:</strong> Reduce ansiedad y culpa, aumenta tranquilidad interior</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
