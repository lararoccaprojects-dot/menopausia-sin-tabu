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
      icon: "🌬️"
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
      icon: "🧘"
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
      icon: "💪"
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
      icon: "🚶"
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
      icon: "🤸"
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
      icon: "🧗"
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
      icon: "🎯"
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
      icon: "🧠"
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
    content += `- Si sientes dolor, detente e intenta otra vez después\n`;
    content += `- Mantén la consistencia para mejores resultados\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Descargando: " + title);
  };

  const progress = Math.round((completedExercises.length / exercises.length) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-8 h-8 text-blue-600" />
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
              <h3 className="text-lg font-bold text-gray-900">¿Por qué estos ejercicios?</h3>
              <p className="text-gray-700 text-sm">
                8 ejercicios diseñados específicamente para mujeres menopáusicas. Cada uno es descargable con instrucciones detalladas paso a paso, beneficios y consejos prácticos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <Button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              variant={selectedDifficulty === diff.value ? "default" : "outline"}
              className={selectedDifficulty === diff.value ? "bg-blue-600 hover:bg-blue-700" : ""}
              size="sm"
            >
              {diff.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Ejercicios */}
      <div className="container mx-auto px-4 space-y-4">
        {filteredExercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`border-2 transition-all ${
              completedExercises.includes(exercise.id)
                ? "border-blue-400 bg-blue-50"
                : "border-blue-200 hover:border-blue-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleExercise(exercise.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-4xl">{exercise.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                      {completedExercises.includes(exercise.id) && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyLabel(exercise.difficulty)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {exercise.duration} min
                      </span>
                    </div>
                  </div>
                </div>
                {expandedExercise === exercise.id ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </div>

              {/* Contenido Expandido */}
              {expandedExercise === exercise.id && (
                <div className="border-t border-blue-200 mt-6 pt-6 space-y-6">
                  {/* Pasos */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Instrucciones Paso a Paso:</h4>
                    <ol className="space-y-2">
                      {exercise.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="font-bold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Beneficios */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Beneficios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.benefits.map((benefit, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex gap-3 pt-4 border-t border-blue-200">
                    <Button
                      onClick={() => downloadExercise(exercise.title, exercise)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Instrucciones
                    </Button>
                    <Button
                      onClick={() => toggleComplete(exercise.id)}
                      variant={completedExercises.includes(exercise.id) ? "default" : "outline"}
                      className={completedExercises.includes(exercise.id) ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedExercises.includes(exercise.id) ? "Completado" : "Marcar como completado"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
