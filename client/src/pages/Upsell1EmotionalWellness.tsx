import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Brain, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell1EmotionalWellness() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "Regulación Emocional",
      description: "Maneja cambios de humor con técnicas prácticas",
      icon: "🧠",
      keyPoints: [
        "Identifica tus emociones en 10 segundos",
        "Respira 5-5-5 para calmar el sistema nervioso",
        "Pregúntate: ¿Es real o amplificada por hormonas?"
      ],
      exercises: [
        {
          name: "Técnica PAUSA",
          steps: [
            "P - Pausa: Detente por 10 segundos",
            "A - Acepta: Reconoce la emoción sin juzgar",
            "U - Unta: Respira profundamente (inhala 5, exhala 5)",
            "S - Sabe: Pregúntate qué necesitas realmente",
            "A - Actúa: Elige tu respuesta consciente"
          ]
        },
        {
          name: "Mapeo Emocional Diario",
          steps: [
            "Crea una tabla con horas del día (mañana, tarde, noche)",
            "Registra tu emoción principal en cada momento",
            "Anota qué la causó (situación, pensamiento, síntoma físico)",
            "Identifica patrones después de 7 días",
            "Usa los patrones para anticipar y manejar emociones"
          ]
        },
        {
          name: "Diálogo Compasivo",
          steps: [
            "Escribe un monólogo interno negativo que tengas",
            "Ahora reescríbelo como si fuera tu mejor amiga hablándote",
            "Usa lenguaje amable, comprensivo y realista",
            "Lee ambas versiones en voz alta",
            "Practica responder a pensamientos negativos con compasión"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Mindfulness Rápido",
      description: "Meditaciones de 5-10 minutos para el estrés",
      icon: "🧘",
      keyPoints: [
        "5 minutos de meditación = 40% menos ansiedad",
        "Practica 3 veces por semana mínimo",
        "Ideal: mañana, tarde y noche"
      ],
      exercises: [
        {
          name: "Meditación 5-5-5",
          steps: [
            "Siéntate cómodamente, espalda recta",
            "Inhala contando hasta 5",
            "Mantén el aire contando hasta 5",
            "Exhala contando hasta 5",
            "Repite 10 ciclos (5 minutos total)"
          ]
        },
        {
          name: "Escaneo Corporal",
          steps: [
            "Acuéstate o siéntate cómodamente",
            "Cierra los ojos y enfoca en tu cabeza",
            "Lentamente mueve tu atención hacia abajo (cuello, hombros, pecho)",
            "Nota cualquier tensión sin juzgar",
            "Termina en los pies. Abre los ojos lentamente"
          ]
        },
        {
          name: "Mindfulness del Presente",
          steps: [
            "Elige un objeto (taza de té, flor, vela)",
            "Observa sus colores, texturas, detalles por 5 minutos",
            "Cuando tu mente se distraiga, vuelve al objeto",
            "No juzgues tus distracciones, solo regresa",
            "Termina con gratitud por el momento presente"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Autocompasión",
      description: "Cultiva amor propio durante esta transición",
      icon: "💝",
      keyPoints: [
        "Habla contigo como con tu mejor amiga",
        "Reconoce que esto es temporal",
        "Tu valor no disminuye con los síntomas"
      ],
      exercises: [
        {
          name: "Carta de Amor a Ti Misma",
          steps: [
            "Escribe una carta como si fueras tu mejor amiga",
            "Reconoce lo que estás viviendo",
            "Recuerda tus fortalezas y logros",
            "Expresa lo que necesitas ahora",
            "Guarda la carta para leerla en momentos difíciles"
          ]
        },
        {
          name: "Práctica de Gratitud Corporal",
          steps: [
            "Siéntate tranquilamente por 5 minutos",
            "Agradece a cada parte de tu cuerpo por lo que hace",
            "Empieza: 'Gracias corazón por latir, pulmones por respirar'",
            "Incluye partes que sientes que 'fallan' en la menopausia",
            "Termina con: 'Soy digna de amor tal como soy'"
          ]
        },
        {
          name: "Ritual de Aceptación",
          steps: [
            "Elige un síntoma que te molesta",
            "Escribe: 'Acepto que [síntoma] es parte de mi viaje'",
            "Luego escribe: 'Y aún así soy fuerte, capaz y valiosa'",
            "Lee ambas frases en voz alta 3 veces",
            "Repite cuando el síntoma aparezca"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Resiliencia",
      description: "Construye fortaleza emocional",
      icon: "💪",
      keyPoints: [
        "La menopausia es temporal, tú eres permanente",
        "Cada desafío te hace más fuerte",
        "Conecta con otras mujeres en tu situación"
      ],
      exercises: [
        {
          name: "Diario de Logros",
          steps: [
            "Cada noche, escribe 3 cosas que hiciste bien",
            "Pueden ser pequeñas: 'Respiré profundamente', 'Fui amable'",
            "Revisa tu diario cuando te sientas desanimada",
            "Celebra tu progreso, no la perfección"
          ]
        },
        {
          name: "Conexión con Otras Mujeres",
          steps: [
            "Busca un grupo de apoyo (presencial u online)",
            "Comparte tu experiencia sin miedo al juicio",
            "Escucha las historias de otras mujeres",
            "Reconoce que no estás sola en esto",
            "Planifica encuentros regulares (semanal o mensual)"
          ]
        },
        {
          name: "Celebración de Hitos",
          steps: [
            "Cada semana, identifica un hito (grande o pequeño)",
            "Crea un ritual para celebrarlo (baile, música, regalo)",
            "Toma una foto o escribe sobre el momento",
            "Comparte con alguien que te apoye",
            "Guarda estas celebraciones para momentos difíciles"
          ]
        }
      ]
    }
  ];

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(m => m !== id));
    } else {
      setCompletedModules([...completedModules, id]);
      toast.success("¡Módulo completado! Excelente trabajo");
    }
  };

  const handleDownload = (title: string) => {
    const module = modules.find(m => m.title === title);
    if (!module) return;

    let content = `MAPA DE BIENESTAR EMOCIONAL\n`;
    content += `Módulo: ${title}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `DESCRIPCIÓN:\n${module.description}\n\n`;
    
    content += `PUNTOS CLAVE:\n`;
    module.keyPoints.forEach((point, idx) => {
      content += `${idx + 1}. ${point}\n`;
    });
    content += `\n`;

    content += `EJERCICIOS:\n`;
    module.exercises.forEach((exercise, exIdx) => {
      content += `\nEjercicio ${exIdx + 1}: ${exercise.name}\n`;
      content += `${'-'.repeat(40)}\n`;
      exercise.steps.forEach((step, stepIdx) => {
        content += `${stepIdx + 1}. ${step}\n`;
      });
    });

    content += `\n\nConsejo: Practica un ejercicio cada día. Consistencia > Perfección.\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}_Ejercicios.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Descargado: ${title}`);
  };

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-purple-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Mapa de Bienestar Emocional</h1>
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
          <div className="w-full bg-purple-100 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">¿Por qué este programa?</h3>
              <p className="text-gray-700 text-sm">
                4 módulos prácticos con 12 ejercicios diseñados para ayudarte a navegar los cambios emocionales de la menopausia. Cada ejercicio es simple, toma 5-10 minutos y puedes hacerlo hoy mismo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      <div className="container mx-auto px-4 space-y-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`border-2 transition-all ${
              completedModules.includes(module.id)
                ? "border-purple-400 bg-purple-50"
                : "border-purple-200 hover:border-purple-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedModules.includes(module.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedModule === module.id ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>

              {/* Puntos Clave */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {module.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold text-sm">✓</span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedModule === module.id && (
              <div className="border-t border-purple-200 px-6 py-6 bg-purple-50">
                <div className="space-y-6">
                  {/* Ejercicios */}
                  <div className="space-y-6">
                    {module.exercises.map((exercise, exIdx) => (
                      <div key={exIdx}>
                        <h4 className="font-bold text-gray-900 mb-3">
                          Ejercicio {exIdx + 1}: {exercise.name}
                        </h4>
                        <div className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <span className="font-bold text-purple-600 flex-shrink-0">
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
                  <div className="flex gap-3 pt-4 border-t border-purple-200">
                    <Button
                      onClick={() => toggleComplete(module.id)}
                      className={`flex-1 ${
                        completedModules.includes(module.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedModules.includes(module.id)
                        ? "Completado"
                        : "Marcar como completado"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(module.title)}
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
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-semibold">
              💡 Consejo: Practica un ejercicio cada día. Consistencia &gt; Perfección.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
