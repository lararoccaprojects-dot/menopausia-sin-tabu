import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Brain, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download, BookOpen } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell1EmotionalWellness() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [weeklyEmotions, setWeeklyEmotions] = useState<Record<string, number>>({});

  const modules = [
    {
      id: 1,
      title: "Entendiendo tus emociones",
      description: "Aprende a identificar y nombrar tus emociones durante la menopausia",
      duration: "15 min",
      content: [
        "Las emociones son respuestas naturales a cambios hormonales",
        "Identificar patrones emocionales te ayuda a manejarlos mejor",
        "La aceptación es el primer paso hacia el cambio",
        "Ejercicio: Diario emocional de 7 días"
      ],
      exercises: [
        {
          id: "ex1-1",
          name: "Mapeo Emocional Diario",
          duration: "10 min",
          instructions: [
            "Siéntate en un lugar tranquilo sin distracciones",
            "Cierra los ojos y respira profundamente 3 veces",
            "Pregúntate: ¿Qué emociones siento en este momento?",
            "Identifica la emoción principal (alegría, tristeza, miedo, ira, sorpresa)",
            "Localiza dónde la sientes en tu cuerpo (pecho, estómago, garganta)",
            "Califica su intensidad del 1-10",
            "Escribe en tu diario: emoción, ubicación, intensidad, desencadenante posible",
            "Repite esto 2-3 veces al día durante 7 días"
          ],
          benefits: "Aumenta conciencia emocional, reduce reactividad, mejora autocontrol"
        },
        {
          id: "ex1-2",
          name: "Identificación de Gatillos",
          duration: "15 min",
          instructions: [
            "Revisa tu diario emocional de los últimos 3 días",
            "Para cada emoción intensa, pregúntate: ¿Qué pasó antes?",
            "Identifica patrones: ¿Qué situaciones, personas o pensamientos desencadenan emociones?",
            "Crea una lista de tus 5 principales gatillos emocionales",
            "Para cada gatillo, anota: situación, emoción resultante, intensidad",
            "Reflexiona: ¿Hay patrones? ¿Qué tienen en común?",
            "Guarda esta lista para referencia futura"
          ],
          benefits: "Identifica patrones, previene reacciones automáticas, aumenta control"
        },
        {
          id: "ex1-3",
          name: "Respuesta Consciente vs Reactiva",
          duration: "20 min",
          instructions: [
            "Entiende la diferencia: Reacción = automática, Respuesta = consciente",
            "Cuando sientas una emoción fuerte, PAUSA por 10 segundos",
            "Respira profundamente: inhala 4 segundos, exhala 4 segundos",
            "Pregúntate: ¿Es esta emoción real o amplificada por hormonas?",
            "Elige tu respuesta: ¿Qué haría mi versión más sabia?",
            "Actúa desde la sabiduría, no desde la reacción",
            "Después, reflexiona: ¿Cómo fue diferente esta respuesta consciente?"
          ],
          benefits: "Reduce conflictos, mejora relaciones, aumenta autoestima"
        }
      ]
    },
    {
      id: 2,
      title: "Técnicas de mindfulness",
      description: "Práctica de meditación y presencia consciente",
      duration: "20 min",
      content: [
        "Mindfulness reduce ansiedad y estrés en un 40%",
        "La práctica regular mejora la regulación emocional",
        "Comienza con 5 minutos diarios",
        "Técnicas: Respiración, escaneo corporal, meditación"
      ],
      exercises: [
        {
          id: "ex2-1",
          name: "Meditación de Respiración 5-5-5",
          duration: "5 min",
          instructions: [
            "Siéntate cómodamente con la espalda recta",
            "Cierra los ojos suavemente",
            "Inhala contando hasta 5 (nariz)",
            "Mantén el aire contando hasta 5",
            "Exhala contando hasta 5 (boca)",
            "Pausa 1 segundo",
            "Repite 10 ciclos (5 minutos totales)",
            "Si tu mente se distrae, simplemente regresa al conteo"
          ],
          benefits: "Calma el sistema nervioso, reduce ansiedad, mejora concentración"
        },
        {
          id: "ex2-2",
          name: "Escaneo Corporal Progresivo",
          duration: "15 min",
          instructions: [
            "Acuéstate o siéntate cómodamente",
            "Cierra los ojos",
            "Comienza por los dedos de los pies",
            "Nota cualquier sensación: tensión, calor, frío, hormigueo",
            "Respira hacia esa área, imagina que se relaja",
            "Mueve lentamente hacia arriba: pies, pantorrillas, muslos",
            "Continúa: abdomen, pecho, espalda, brazos, cuello, cabeza",
            "Al final, siente todo tu cuerpo relajado y presente"
          ],
          benefits: "Reduce tensión muscular, aumenta conciencia corporal, promueve relajación"
        },
        {
          id: "ex2-3",
          name: "Meditación de Presencia Consciente",
          duration: "10 min",
          instructions: [
            "Siéntate en un lugar tranquilo",
            "Observa tus pensamientos sin juzgarlos",
            "Imagina que los pensamientos son nubes pasando por el cielo",
            "No intentes cambiarlos, solo observa",
            "Cuando te distraigas, regresa suavemente a la observación",
            "Practica durante 10 minutos",
            "Al final, abre los ojos lentamente"
          ],
          benefits: "Reduce rumiación mental, aumenta claridad, mejora paz interior"
        }
      ]
    },
    {
      id: 3,
      title: "Manejo del estrés y ansiedad",
      description: "Herramientas prácticas para calmar la mente y el cuerpo",
      duration: "25 min",
      content: [
        "El estrés amplifica los síntomas menopáusicos",
        "Técnicas de relajación muscular progresiva",
        "Gestión del tiempo y prioridades",
        "Creación de espacios seguros"
      ],
      exercises: [
        {
          id: "ex3-1",
          name: "Relajación Muscular Progresiva",
          duration: "20 min",
          instructions: [
            "Acuéstate o siéntate cómodamente",
            "Tensa los músculos de los pies durante 5 segundos",
            "Relaja completamente y nota la diferencia",
            "Repite con: pantorrillas, muslos, glúteos, abdomen, pecho",
            "Continúa con: manos, brazos, hombros, cuello, cara",
            "Al final, todo tu cuerpo está profundamente relajado",
            "Permanece así 2-3 minutos antes de moverte"
          ],
          benefits: "Libera tensión acumulada, promueve relajación profunda, reduce ansiedad"
        },
        {
          id: "ex3-2",
          name: "Técnica del Cuadrado de Respiración",
          duration: "5 min",
          instructions: [
            "Usa esta técnica cuando sientas pánico o ansiedad aguda",
            "Inhala contando hasta 4",
            "Mantén contando hasta 4",
            "Exhala contando hasta 4",
            "Pausa contando hasta 4",
            "Repite 5 ciclos (5 minutos totales)",
            "Sentirás calma inmediata"
          ],
          benefits: "Manejo de crisis de ansiedad, estabilización emocional rápida"
        },
        {
          id: "ex3-3",
          name: "Visualización Guiada",
          duration: "15 min",
          instructions: [
            "Siéntate cómodamente en un lugar tranquilo",
            "Cierra los ojos",
            "Imagina un lugar donde te sientes completamente segura y tranquila",
            "Visualiza cada detalle: colores, texturas, sonidos, aromas",
            "Imagina que estás allí ahora, completamente segura",
            "Permanece en este lugar durante 10 minutos",
            "Cuando estés lista, abre los ojos lentamente"
          ],
          benefits: "Reduce ansiedad, promueve relajación, aumenta sensación de seguridad"
        }
      ]
    },
    {
      id: 4,
      title: "Autocompasión y autoaceptación",
      description: "Desarrolla una relación amorosa contigo misma",
      duration: "20 min",
      content: [
        "La autocompasión reduce la depresión y ansiedad",
        "Aprende a hablarte con amabilidad",
        "Aceptar los cambios corporales",
        "Cultivar el amor propio incondicional"
      ],
      exercises: [
        {
          id: "ex4-1",
          name: "Carta de Amor a Ti Misma",
          duration: "25 min",
          instructions: [
            "Siéntate con papel y bolígrafo",
            "Escribe una carta a ti misma como si fuera tu mejor amiga",
            "Reconoce tus luchas y desafíos actuales",
            "Expresa compasión por lo que estás pasando",
            "Recuerda tus fortalezas y logros pasados",
            "Ofrécete palabras de aliento y apoyo",
            "Termina con un compromiso de amarte a ti misma",
            "Lee esta carta cuando necesites recordar tu valor"
          ],
          benefits: "Aumenta autoestima, reduce autocrítica, cultiva amor propio"
        },
        {
          id: "ex4-2",
          name: "Frases de Autocompasión",
          duration: "5 min",
          instructions: [
            "Cuando cometas un error, en lugar de criticarte, di:",
            "'Esto es parte de ser humana'",
            "'Muchas mujeres pasan por esto'",
            "'Merezco compasión, especialmente de mí misma'",
            "Repite estas frases lentamente",
            "Coloca la mano en tu corazón mientras las dices",
            "Siente la compasión hacia ti misma"
          ],
          benefits: "Reduce vergüenza, aumenta autoaceptación, mejora resiliencia"
        },
        {
          id: "ex4-3",
          name: "Ritual de Aceptación Corporal",
          duration: "10 min",
          instructions: [
            "Párate frente a un espejo",
            "Observa tu cuerpo sin juzgarlo",
            "Agradece a cada parte por lo que hace por ti",
            "Coloca las manos en tu corazón",
            "Di: 'Acepto mi cuerpo tal como es hoy'",
            "Repite 3 veces con sinceridad",
            "Termina con un acto de cuidado (crema, masaje, etc.)"
          ],
          benefits: "Reduce odio corporal, aumenta aceptación, mejora relación con el cuerpo"
        }
      ]
    },
    {
      id: 5,
      title: "Conexión social y apoyo",
      description: "Importancia de las relaciones y cómo pedir ayuda",
      duration: "15 min",
      content: [
        "Las relaciones son fundamentales para la salud emocional",
        "Cómo comunicar lo que necesitas",
        "Construir una red de apoyo",
        "Encontrar comunidad de mujeres menopáusicas"
      ],
      exercises: [
        {
          id: "ex5-1",
          name: "Mapa de Apoyo Personal",
          duration: "20 min",
          instructions: [
            "Dibuja un círculo en el centro de una hoja (TÚ)",
            "Alrededor, dibuja círculos para cada persona de apoyo",
            "Escribe su nombre y cómo te apoyan",
            "Categoriza: familia, amigos, profesionales, comunidad",
            "Identifica brechas: ¿Dónde necesitas más apoyo?",
            "Planifica cómo fortalecer tu red",
            "Guarda este mapa y actualízalo regularmente"
          ],
          benefits: "Visualiza tu red de apoyo, identifica recursos, planifica conexiones"
        },
        {
          id: "ex5-2",
          name: "Comunicación Asertiva",
          duration: "15 min",
          instructions: [
            "Aprende la fórmula: 'Yo siento... porque... necesito...'",
            "Ejemplo: 'Yo siento ansiedad porque no tengo apoyo, necesito que me escuches'",
            "Practica diciendo tus necesidades sin culpa",
            "Sé específica: ¿Qué necesitas exactamente?",
            "Expresa gratitud por el apoyo recibido",
            "Practica con una persona de confianza"
          ],
          benefits: "Mejora comunicación, aumenta conexión, reduce resentimiento"
        },
        {
          id: "ex5-3",
          name: "Planificación de Conexiones Sociales",
          duration: "10 min",
          instructions: [
            "Planifica una conexión social esta semana",
            "Puede ser: llamada, café, video chat, grupo de apoyo",
            "Elige a alguien que te haga sentir bien",
            "Agenda un tiempo específico",
            "Prepárate para compartir cómo te sientes",
            "Después, reflexiona sobre cómo te sentiste"
          ],
          benefits: "Aumenta conexión, reduce aislamiento, mejora bienestar emocional"
        }
      ]
    },
    {
      id: 6,
      title: "Resiliencia y adaptación",
      description: "Fortalece tu capacidad de adaptación a cambios",
      duration: "25 min",
      content: [
        "La resiliencia se puede desarrollar",
        "Reencuadre de perspectivas",
        "Aprendizaje de adversidades",
        "Construcción de una vida significativa"
      ],
      exercises: [
        {
          id: "ex6-1",
          name: "Análisis de Desafíos Pasados",
          duration: "20 min",
          instructions: [
            "Piensa en un desafío que superaste en el pasado",
            "¿Cómo te sentiste al principio?",
            "¿Qué hiciste para superarlo?",
            "¿Qué aprendiste de esa experiencia?",
            "¿Cómo eres más fuerte ahora?",
            "Escribe esta historia de resiliencia",
            "Recuerda esta historia cuando enfrentes nuevos desafíos"
          ],
          benefits: "Reconoce fortaleza pasada, aumenta confianza, inspira resiliencia"
        },
        {
          id: "ex6-2",
          name: "Reencuadre Positivo",
          duration: "15 min",
          instructions: [
            "Toma un desafío actual que enfrentes",
            "Pregúntate: ¿Cuál es la oportunidad aquí?",
            "¿Qué puedo aprender de esto?",
            "¿Cómo podría esto hacerme más fuerte?",
            "Reencuadra el desafío como una oportunidad de crecimiento",
            "Escribe 3 formas en que este desafío te está ayudando a crecer"
          ],
          benefits: "Cambia perspectiva, aumenta esperanza, mejora resiliencia emocional"
        },
        {
          id: "ex6-3",
          name: "Visión de Futuro",
          duration: "25 min",
          instructions: [
            "Imagina tu vida en 2 años, completamente transformada",
            "¿Cómo te sientes? ¿Qué has logrado?",
            "¿Cuáles son tus relaciones? ¿Tu salud?",
            "¿Cuál es tu propósito y significado?",
            "Escribe una descripción detallada de esta vida futura",
            "Identifica 3 pasos que puedes tomar hoy para acercarte a esta visión"
          ],
          benefits: "Crea esperanza, aumenta motivación, guía acciones presentes"
        }
      ]
    },
    {
      id: 7,
      title: "Creatividad y expresión",
      description: "Usa la creatividad como herramienta de sanación",
      duration: "30 min",
      content: [
        "La expresión creativa libera emociones",
        "Arte, música, escritura como terapia",
        "Redescubrir pasiones y talentos",
        "Crear un proyecto significativo"
      ],
      exercises: [
        {
          id: "ex7-1",
          name: "Escritura Libre Terapéutica",
          duration: "20 min",
          instructions: [
            "Siéntate con papel y bolígrafo",
            "Escribe sin filtro durante 20 minutos",
            "No pienses, solo escribe lo que surge",
            "No importa la gramática, ortografía o coherencia",
            "Si te bloqueas, escribe 'no sé qué escribir' hasta que fluya",
            "Cuando termines, puedes leer o destruir lo escrito",
            "Lo importante es la liberación emocional"
          ],
          benefits: "Libera emociones reprimidas, clarifica pensamientos, promueve sanación"
        },
        {
          id: "ex7-2",
          name: "Creación Artística",
          duration: "30 min",
          instructions: [
            "Reúne materiales: papel, colores, revistas, pegamento, etc.",
            "Sin plan previo, comienza a crear",
            "Expresa tus emociones a través del arte",
            "No necesita ser 'bonito' o 'correcto'",
            "Permite que tus manos guíen el proceso",
            "Cuando termines, reflexiona: ¿Qué representa esto?"
          ],
          benefits: "Expresa emociones no verbales, aumenta creatividad, promueve sanación"
        },
        {
          id: "ex7-3",
          name: "Proyecto Creativo Personal",
          duration: "Progresivo",
          instructions: [
            "Identifica una pasión o talento que tenías antes",
            "Planifica un proyecto creativo pequeño",
            "Puede ser: pintura, escritura, música, artesanía, etc.",
            "Dedica 30 minutos por semana a este proyecto",
            "Permite que evolucione sin presión de perfección",
            "Celebra el proceso, no solo el resultado"
          ],
          benefits: "Redescubre pasiones, aumenta alegría, crea significado"
        }
      ]
    },
    {
      id: 8,
      title: "Propósito y significado",
      description: "Descubre tu propósito en esta nueva etapa",
      duration: "20 min",
      content: [
        "La menopausia es una oportunidad de reinvención",
        "Definir valores y prioridades",
        "Crear una visión para los próximos 20 años",
        "Legado y contribución"
      ],
      exercises: [
        {
          id: "ex8-1",
          name: "Clarificación de Valores",
          duration: "20 min",
          instructions: [
            "Lista 10 cosas que son importantes para ti",
            "Pueden ser: familia, salud, creatividad, aprendizaje, servicio, etc.",
            "Ordénalas de mayor a menor importancia",
            "Tus top 5 son tus valores principales",
            "Pregúntate: ¿Mi vida actual refleja estos valores?",
            "¿Qué cambios necesito hacer para alinearme con mis valores?"
          ],
          benefits: "Clarifica prioridades, alinea vida con valores, aumenta satisfacción"
        },
        {
          id: "ex8-2",
          name: "Visión de Futuro Detallada",
          duration: "30 min",
          instructions: [
            "Imagina tu vida en 20 años",
            "¿Dónde vives? ¿Con quién?",
            "¿Qué haces? ¿Cuál es tu trabajo o contribución?",
            "¿Cómo es tu salud? ¿Tus relaciones?",
            "¿Qué legado dejas?",
            "Escribe una descripción detallada en presente",
            "Ejemplo: 'Vivo en..., disfruto de..., contribuyo a...'"
          ],
          benefits: "Crea dirección clara, aumenta motivación, guía decisiones"
        },
        {
          id: "ex8-3",
          name: "Plan de Acción para el Propósito",
          duration: "25 min",
          instructions: [
            "De tu visión futura, identifica 3 objetivos principales",
            "Para cada objetivo, crea un plan de 12 meses",
            "Divide en trimestres: ¿Qué lograrás cada 3 meses?",
            "Identifica acciones específicas que puedes tomar hoy",
            "Comparte tu plan con alguien de confianza",
            "Revisa y ajusta cada mes"
          ],
          benefits: "Convierte visión en acción, aumenta responsabilidad, acelera progreso"
        }
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedModules(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const updateWeeklyEmotion = (day: string, value: number) => {
    setWeeklyEmotions(prev => ({
      ...prev,
      [day]: value
    }));
  };

  const completionPercentage = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
          <p className="text-gray-600">
            8 módulos completos con ejercicios detallados, meditaciones guiadas y recursos descargables
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-purple-200 bg-purple-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-purple-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedModules.length} de {modules.length} módulos completados
          </p>
        </Card>

        {/* Weekly Emotion Tracker */}
        <Card className="p-6 mb-8 border-2 border-pink-200 bg-pink-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-pink-600" />
            Tabla de Seguimiento de Emociones Semanal
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="text-center">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">{day}</label>
                <select
                  value={weeklyEmotions[day] || 0}
                  onChange={(e) => updateWeeklyEmotion(day, parseInt(e.target.value))}
                  className="w-full p-2 border border-pink-300 rounded text-sm"
                >
                  <option value="0">-</option>
                  <option value="1">😢</option>
                  <option value="2">😕</option>
                  <option value="3">😐</option>
                  <option value="4">🙂</option>
                  <option value="5">😊</option>
                </select>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">Registra tu estado emocional diario para ver patrones y progreso</p>
        </Card>

        {/* Modules Grid */}
        <div className="space-y-4">
          {modules.map(module => (
            <Card key={module.id} className="p-6 border-2 border-purple-100 hover:border-purple-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
                <button
                  onClick={() => toggleComplete(module.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <CheckCircle2
                    size={24}
                    className={completedModules.includes(module.id) ? "fill-purple-500 text-purple-500" : "text-gray-300"}
                  />
                </button>
              </div>

              {/* Module Info */}
              <div className="flex gap-4 mb-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {module.duration}
                </span>
              </div>

              {/* Expandable Content */}
              {expandedModule === module.id && (
                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Contenido del Módulo:</h4>
                    <ul className="space-y-2 mb-4">
                      {module.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ejercicios Incluidos:</h4>
                    <div className="space-y-3">
                      {module.exercises.map((exercise) => (
                        <div key={exercise.id} className="bg-white p-3 rounded border border-purple-200">
                          <button
                            onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                            className="w-full text-left flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-green-600">✓</span>
                              <div>
                                <span className="font-semibold text-gray-900">{exercise.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({exercise.duration})</span>
                              </div>
                            </div>
                            {expandedExercise === exercise.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          {expandedExercise === exercise.id && (
                            <div className="mt-3 pt-3 border-t border-purple-200 space-y-2">
                              <div>
                                <h5 className="font-semibold text-sm text-gray-900 mb-2">Instrucciones Paso a Paso:</h5>
                                <ol className="space-y-2">
                                  {exercise.instructions.map((instruction, idx) => (
                                    <li key={idx} className="flex gap-2 text-xs text-gray-700">
                                      <span className="font-bold text-purple-600 flex-shrink-0">{idx + 1}.</span>
                                      <span>{instruction}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                              <div>
                                <h5 className="font-semibold text-sm text-gray-900 mb-1">Beneficios:</h5>
                                <p className="text-xs text-gray-700">{exercise.benefits}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                >
                  {expandedModule === module.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar Contenido
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Contenido
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                  onClick={() => toggleComplete(module.id)}
                >
                  {completedModules.includes(module.id) ? "✓ Completado" : "Marcar"}
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="p-6 mt-8 border-2 border-green-200 bg-green-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios de este programa</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Regulación emocional:</strong> Aprende a manejar cambios de humor y emociones intensas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Reducción de ansiedad:</strong> Técnicas comprobadas para calmar la mente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Autoestima renovada:</strong> Reconecta con tu valor y propósito</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Relaciones mejoradas:</strong> Comunica mejor y construye conexiones significativas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Resiliencia fortalecida:</strong> Desarrolla capacidad de adaptación ante cambios</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
