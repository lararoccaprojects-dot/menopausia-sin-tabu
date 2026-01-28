import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Dumbbell, Download, Clock, Zap, ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface Exercise {
  id: number;
  title: string;
  difficulty: string;
  duration: number;
  description: string;
  steps: string[];
  benefits: string[];
  icon: string;
  image: string;
}

export default function WellnessExercises() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Respiración Profunda para Sofocos",
      difficulty: "beginner",
      duration: 5,
      description: "Técnica de respiración para controlar los sofocos y la ansiedad",
      steps: [
        "Siéntate en una posición cómoda con la espalda recta",
        "Inhala profundamente por la nariz durante 4 segundos",
        "Mantén la respiración durante 4 segundos",
        "Exhala lentamente por la boca durante 6 segundos",
        "Repite este ciclo 10 veces",
        "Descansa y respira normalmente"
      ],
      benefits: ["Reduce sofocos", "Calma la ansiedad", "Mejora la oxigenación"],
      icon: "🌬️",
      image: "/exercises/breathing.jpg"
    },
    {
      id: 2,
      title: "Yoga Restaurativo",
      difficulty: "beginner",
      duration: 15,
      description: "Secuencia suave de yoga para relajación, flexibilidad y equilibrio",
      steps: [
        "Comienza en posición de loto o sentada cómodamente",
        "Realiza la postura del gato-vaca (5 repeticiones)",
        "Pasa a la postura del niño (1-2 minutos)",
        "Realiza la postura de la paloma (1 minuto cada lado)",
        "Termina en postura de cadáver (5 minutos)",
        "Respira profundamente durante toda la secuencia"
      ],
      benefits: ["Aumenta flexibilidad", "Reduce estrés", "Mejora el sueño"],
      icon: "🧘",
      image: "/exercises/yoga-restorative.webp"
    },
    {
      id: 3,
      title: "Fortalecimiento de Core",
      difficulty: "intermediate",
      duration: 20,
      description: "Ejercicios para fortalecer el core, mejorar postura y prevenir dolor de espalda",
      steps: [
        "Calienta con 5 minutos de movimiento suave",
        "Realiza 3 series de 10 planchas (30 segundos cada una)",
        "Realiza 3 series de 10 abdominales cruzados",
        "Realiza 3 series de 10 elevaciones de pelvis",
        "Descansa 30 segundos entre series",
        "Estira el core durante 2 minutos"
      ],
      benefits: ["Fortalece abdominales", "Mejora postura", "Previene dolor de espalda"],
      icon: "💪",
      image: "/exercises/core.jpg"
    },
    {
      id: 4,
      title: "Caminata Consciente",
      difficulty: "beginner",
      duration: 30,
      description: "Caminata meditativa para conectar con tu cuerpo y reducir estrés",
      steps: [
        "Elige un lugar tranquilo para caminar",
        "Comienza caminando a paso moderado",
        "Enfócate en cada paso y en tu respiración",
        "Observa tu entorno sin juzgar",
        "Si tu mente se distrae, trae la atención al presente",
        "Camina durante 30 minutos sin interrupciones"
      ],
      benefits: ["Mejora cardiovascular", "Reduce estrés", "Aumenta energía"],
      icon: "🚶",
      image: "/exercises/walking.jpg"
    },
    {
      id: 5,
      title: "Pilates para la Menopausia",
      difficulty: "intermediate",
      duration: 25,
      description: "Rutina de pilates diseñada específicamente para fortalecer y tonificar",
      steps: [
        "Calienta con 5 minutos de movimiento suave",
        "Realiza 10 círculos de cadera en cada dirección",
        "Haz 15 flexiones de cadera",
        "Realiza 10 extensiones de pierna en cada lado",
        "Haz 15 abdominales modificados",
        "Termina con estiramientos de 5 minutos"
      ],
      benefits: ["Fortalece músculos", "Mejora flexibilidad", "Aumenta densidad ósea"],
      icon: "🤸",
      image: "/exercises/pilates.jpg"
    },
    {
      id: 6,
      title: "Estiramientos Profundos",
      difficulty: "beginner",
      duration: 10,
      description: "Rutina de estiramientos para mejorar flexibilidad y reducir tensión",
      steps: [
        "Estira cuello: inclina hacia cada lado (30 segundos)",
        "Estira hombros: lleva brazo cruzado (30 segundos cada lado)",
        "Estira espalda: toca los dedos de los pies (1 minuto)",
        "Estira caderas: postura de mariposa (1 minuto)",
        "Estira piernas: estocada baja (30 segundos cada lado)",
        "Termina con respiración profunda"
      ],
      benefits: ["Aumenta flexibilidad", "Reduce tensión muscular", "Mejora circulación"],
      icon: "🧗",
      image: "/exercises/stretching.jpg"
    },
    {
      id: 7,
      title: "Ejercicios de Kegel",
      difficulty: "beginner",
      duration: 10,
      description: "Fortalecimiento del suelo pélvico para mejorar control y salud",
      steps: [
        "Identifica los músculos del suelo pélvico (detén la orina a mitad de camino)",
        "Contrae estos músculos durante 3 segundos",
        "Relaja durante 3 segundos",
        "Repite 10 veces (1 serie)",
        "Realiza 3 series con descanso entre ellas",
        "Practica 3 veces al día"
      ],
      benefits: ["Fortalece suelo pélvico", "Mejora control", "Aumenta sensibilidad"],
      icon: "🎯",
      image: "/exercises/kegel.jpg"
    },
    {
      id: 8,
      title: "Meditación Guiada",
      difficulty: "beginner",
      duration: 15,
      description: "Meditación para calmar la mente, reducir ansiedad y mejorar bienestar",
      steps: [
        "Busca un lugar tranquilo y cómodo",
        "Siéntate con la espalda recta",
        "Cierra los ojos suavemente",
        "Enfócate en tu respiración natural",
        "Si tu mente se distrae, trae la atención al presente",
        "Continúa durante 15 minutos"
      ],
      benefits: ["Reduce ansiedad", "Mejora concentración", "Aumenta bienestar"],
      icon: "🧠",
      image: "/exercises/meditation.jpg"
    },
    {
      id: 9,
      title: "Entrenamiento de Fuerza Avanzado",
      difficulty: "advanced",
      duration: 40,
      description: "Rutina de fuerza completa con pesas para fortalecer todo el cuerpo y aumentar densidad ósea",
      steps: [
        "Calienta con 5 minutos de cardio ligero",
        "Sentadillas con pesas: 4 series de 8-10 repeticiones",
        "Peso muerto: 4 series de 8-10 repeticiones",
        "Press de pecho: 3 series de 10-12 repeticiones",
        "Filas con pesas: 3 series de 10-12 repeticiones",
        "Flexiones de brazos con mancuernas: 3 series de 10 repeticiones",
        "Descanso de 60-90 segundos entre series",
        "Estiramiento completo de 5 minutos"
      ],
      benefits: ["Aumenta masa muscular", "Fortalece huesos", "Mejora metabolismo", "Aumenta confianza"],
      icon: "🏋️",
      image: "/exercises/strength.jpg"
    },
    {
      id: 10,
      title: "HIIT (Entrenamiento Intervalado de Alta Intensidad)",
      difficulty: "advanced",
      duration: 30,
      description: "Ejercicios de alta intensidad alternados con descanso para máxima quema de calorías",
      steps: [
        "Calienta durante 2 minutos con movimientos suaves",
        "Burpees: 30 segundos intenso, 30 segundos descanso",
        "Saltos de cuerda: 30 segundos intenso, 30 segundos descanso",
        "Mountain climbers: 30 segundos intenso, 30 segundos descanso",
        "Sentadillas explosivas: 30 segundos intenso, 30 segundos descanso",
        "Repite toda la secuencia 3 veces",
        "Enfriamiento con caminata lenta y estiramientos",
        "Respiración profunda final"
      ],
      benefits: ["Quema calorías rápidamente", "Mejora cardiovascular", "Aumenta metabolismo", "Ahorra tiempo"],
      icon: "⚡",
      image: "/exercises/hiit.jpg"
    },
    {
      id: 11,
      title: "Yoga Dinámico Avanzado",
      difficulty: "advanced",
      duration: 45,
      description: "Secuencia de yoga más desafiante que combina fuerza, flexibilidad y equilibrio",
      steps: [
        "Calentamiento con saludos al sol (5 minutos)",
        "Postura del guerrero III: 5 repeticiones cada lado",
        "Postura de la rueda: 3 repeticiones de 20-30 segundos",
        "Postura del escorpión: 3 repeticiones de 20-30 segundos",
        "Postura del pino: 5 intentos con apoyo en pared",
        "Postura del pavo real: 3 repeticiones de 15-20 segundos",
        "Transiciones fluidas entre posturas",
        "Meditación final de 5 minutos en postura de cadáver"
      ],
      benefits: ["Aumenta fuerza y flexibilidad", "Mejora equilibrio", "Desarrolla confianza", "Profunda relajación"],
      icon: "🧘",
      image: "/exercises/yoga-advanced.jpg"
    }
  ];

  const difficulties = [
    { value: "all", label: "Todos" },
    { value: "beginner", label: "Principiante" },
    { value: "intermediate", label: "Intermedio" },
    { value: "advanced", label: "Avanzado" }
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    return matchesDifficulty;
  });

  const toggleExercise = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(e => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
      toast.success("¡Ejercicio completado!");
    }
  };

  const downloadExercise = (title: string, exercise: Exercise) => {
    let content = `EJERCICIO: ${title}\n`;
    content += `${'='.repeat(60)}\n\n`;
    content += `Dificultad: ${exercise.difficulty === 'beginner' ? 'Principiante' : exercise.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}\n`;
    content += `Duración: ${exercise.duration} minutos\n`;
    content += `Descripción: ${exercise.description}\n\n`;
    
    content += `INSTRUCCIONES PASO A PASO:\n`;
    content += `${'-'.repeat(60)}\n`;
    exercise.steps.forEach((step, idx) => {
      content += `${idx + 1}. ${step}\n`;
    });

    content += `\nBENEFICIOS:\n`;
    content += `${'-'.repeat(60)}\n`;
    exercise.benefits.forEach(benefit => {
      content += `✓ ${benefit}\n`;
    });

    content += `\nCONSEJOS:\n`;
    content += `${'-'.repeat(60)}\n`;
    content += `- Realiza este ejercicio ${exercise.difficulty === 'beginner' ? '3-5 veces a la semana' : '2-3 veces a la semana'}\n`;
    content += `- Escucha a tu cuerpo y ajusta según sea necesario\n`;
    content += `- Mantente hidratada durante el ejercicio\n`;
    content += `- Si tienes dolor, detente inmediatamente\n`;
    content += `- Consulta con tu médico antes de comenzar un nuevo programa de ejercicio\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Ejercicio descargado");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900">Ejercicios de Bienestar</h1>
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

        {/* Descripción */}
        <Card className="mb-8 border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-white">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              Descubre una colección de ejercicios especialmente diseñados para apoyar tu bienestar durante la menopausia. Desde técnicas de respiración hasta entrenamientos avanzados, cada ejercicio incluye instrucciones paso a paso, beneficios específicos y fotos de referencia.
            </p>
          </CardContent>
        </Card>

        {/* Filtro de Dificultad */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {difficulties.map((diff) => (
                <Button
                  key={diff.value}
                  variant={selectedDifficulty === diff.value ? "default" : "outline"}
                  className={selectedDifficulty === diff.value ? "bg-pink-500 hover:bg-pink-600" : ""}
                  onClick={() => setSelectedDifficulty(diff.value)}
                >
                  {diff.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ejercicios Grid */}
        <div className="space-y-4">
          {filteredExercises.map((exercise) => {
            const isExpanded = expandedExercise === exercise.id;
            const isCompleted = completedExercises.includes(exercise.id);

            return (
              <Card
                key={exercise.id}
                className={`cursor-pointer transition-all ${
                  isExpanded ? 'border-2 border-pink-400' : 'border border-gray-200 hover:border-pink-300'
                } ${isCompleted ? 'bg-green-50' : ''}`}
                onClick={() => toggleExercise(exercise.id)}
              >
                <CardContent className="p-0">
                  {/* Header del Ejercicio */}
                  <div className="p-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{exercise.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                          {getDifficultyLabel(exercise.difficulty)}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          <Clock className="w-3 h-3" />
                          {exercise.duration} min
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Completado
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-pink-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Contenido Expandido */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 space-y-6 bg-white">
                      {/* Imagen del Ejercicio */}
                      <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={exercise.image}
                          alt={exercise.title}
                          className="w-full h-auto max-h-96 object-contain rounded-lg"
                        />
                      </div>

                      {/* Pasos */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          Instrucciones Paso a Paso
                        </h4>
                        <ol className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-700">
                              <span className="font-bold text-pink-500 flex-shrink-0">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Beneficios */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          Beneficios
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {exercise.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="text-green-500 font-bold">✓</span>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botones de Acción */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(exercise.id);
                          }}
                          className={`flex-1 ${
                            isCompleted
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-pink-500 hover:bg-pink-600'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {isCompleted ? 'Marcar como Incompleto' : 'Marcar como Completado'}
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadExercise(exercise.title, exercise);
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Resumen */}
        {completedExercises.length > 0 && (
          <Card className="mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-gray-900">¡Buen trabajo!</p>
                  <p className="text-sm text-gray-600">
                    Has completado {completedExercises.length} de {exercises.length} ejercicios
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
