import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Dumbbell, Play, Clock, Zap, ArrowLeft, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function WellnessExercises() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const exercises = [
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
      benefits: ["Reduce sofocos", "Calma la ansiedad", "Mejora la oxigenación"]
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
      benefits: ["Aumenta flexibilidad", "Reduce estrés", "Mejora el sueño"]
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
      benefits: ["Fortalece abdominales", "Mejora postura", "Previene dolor de espalda"]
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
      benefits: ["Mejora cardiovascular", "Reduce estrés", "Aumenta energía"]
    },
    {
      id: 5,
      title: "Pilates para la Menopausia",
      difficulty: "intermediate",
      duration: 25,
      description: "Ejercicios de pilates adaptados para fortalecer músculos y mejorar equilibrio",
      steps: [
        "Calienta con movimientos suaves de cuello y hombros",
        "Realiza 10 círculos de cadera en cada dirección",
        "Realiza 3 series de 10 rolls hacia adelante",
        "Realiza 3 series de 10 levantamientos de pierna",
        "Realiza 3 series de 10 extensiones de espalda",
        "Estira y relaja durante 3 minutos"
      ],
      benefits: ["Fortalece músculos", "Mejora equilibrio", "Aumenta densidad ósea"]
    },
    {
      id: 6,
      title: "Estiramientos Profundos",
      difficulty: "beginner",
      duration: 10,
      description: "Rutina de estiramientos para liberar tensión muscular y mejorar flexibilidad",
      steps: [
        "Estira los brazos hacia arriba durante 30 segundos",
        "Inclínate hacia adelante y toca los dedos de los pies (30 segundos)",
        "Estira los cuádriceps de cada pierna (30 segundos cada uno)",
        "Estira los glúteos en posición de paloma (30 segundos cada lado)",
        "Estira los hombros cruzando un brazo sobre el pecho (30 segundos cada uno)",
        "Termina con estiramientos de cuello suave (30 segundos)"
      ],
      benefits: ["Reduce tensión muscular", "Mejora flexibilidad", "Calma el cuerpo"]
    },
    {
      id: 7,
      title: "Ejercicios de Kegel",
      difficulty: "beginner",
      duration: 10,
      description: "Fortalecimiento del suelo pélvico para mejorar salud sexual y urinaria",
      steps: [
        "Identifica los músculos del suelo pélvico (detén el flujo de orina)",
        "Contrae estos músculos durante 3 segundos",
        "Relaja durante 3 segundos",
        "Repite 10 veces (esta es una serie)",
        "Realiza 3 series con descansos de 1 minuto entre ellas",
        "Practica 3 veces al día para mejores resultados"
      ],
      benefits: ["Mejora incontinencia", "Aumenta placer sexual", "Fortalece suelo pélvico"]
    },
    {
      id: 8,
      title: "Meditación Guiada",
      difficulty: "beginner",
      duration: 15,
      description: "Meditación para calmar la mente, reducir ansiedad y aumentar bienestar",
      steps: [
        "Siéntate cómodamente en un lugar tranquilo",
        "Cierra los ojos y toma 3 respiraciones profundas",
        "Enfócate en tu respiración natural",
        "Cuando surjan pensamientos, obsérvalos sin juzgar",
        "Deja que los pensamientos pasen como nubes",
        "Mantén esta práctica durante 15 minutos"
      ],
      benefits: ["Reduce ansiedad", "Mejora enfoque", "Aumenta bienestar"]
    }
  ];

  const difficulties = [
    { id: "all", label: "Todos" },
    { id: "beginner", label: "Principiante" },
    { id: "intermediate", label: "Intermedio" },
    { id: "advanced", label: "Avanzado" }
  ];

  const filteredExercises = exercises.filter(ex =>
    selectedDifficulty === "all" || ex.difficulty === selectedDifficulty
  );

  const toggleComplete = (id: number) => {
    setCompletedExercises(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    if (!completedExercises.includes(id)) {
      toast.success("¡Ejercicio completado!");
    }
  };

  const completionPercentage = Math.round((completedExercises.length / exercises.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-8 h-8 text-pink-600" />
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
          <p className="text-gray-600">
            8 rutinas de ejercicio diseñadas para aliviar síntomas menopáusicos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-green-200 bg-green-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedExercises.length} de {exercises.length} ejercicios completados
          </p>
        </Card>

        {/* Difficulty Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {difficulties.map(diff => (
            <Button
              key={diff.id}
              variant={selectedDifficulty === diff.id ? "default" : "outline"}
              className={selectedDifficulty === diff.id ? "bg-pink-500 hover:bg-pink-600" : ""}
              onClick={() => setSelectedDifficulty(diff.id)}
            >
              {diff.label}
            </Button>
          ))}
        </div>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredExercises.map(exercise => (
            <Card key={exercise.id} className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                </div>
                <button
                  onClick={() => toggleComplete(exercise.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <CheckCircle2
                    size={24}
                    className={completedExercises.includes(exercise.id) ? "fill-green-500 text-green-500" : "text-gray-300"}
                  />
                </button>
              </div>

              {/* Exercise Info */}
              <div className="flex gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {exercise.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {exercise.difficulty === "beginner" ? "Principiante" : exercise.difficulty === "intermediate" ? "Intermedio" : "Avanzado"}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Beneficios:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {exercise.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Steps */}
              {expandedExercise === exercise.id && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Pasos Detallados:</h4>
                  <ol className="space-y-3">
                    {exercise.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700">
                        <span className="font-bold text-pink-600 flex-shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                >
                  {expandedExercise === exercise.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar Pasos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Pasos
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => toggleComplete(exercise.id)}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay ejercicios en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}
