import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Dumbbell, Play, Clock, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function WellnessExercises() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const exercises = [
    {
      id: 1,
      title: "Respiración Profunda para Sofocos",
      difficulty: "beginner",
      duration: 5,
      description: "Técnica de respiración para controlar los sofocos",
      instructions: "Inhala profundamente por la nariz durante 4 segundos, mantén durante 4 segundos, exhala durante 4 segundos...",
      benefits: ["Reduce sofocos", "Calma la ansiedad", "Mejora la oxigenación"]
    },
    {
      id: 2,
      title: "Yoga Restaurativo",
      difficulty: "beginner",
      duration: 15,
      description: "Secuencia suave de yoga para relajación y flexibilidad",
      instructions: "Realiza las posturas de forma lenta y consciente, manteniendo cada una por 1-2 minutos...",
      benefits: ["Aumenta flexibilidad", "Reduce estrés", "Mejora el sueño"]
    },
    {
      id: 3,
      title: "Fortalecimiento de Core",
      difficulty: "intermediate",
      duration: 20,
      description: "Ejercicios para fortalecer el core y mejorar la postura",
      instructions: "Realiza 3 series de 10 repeticiones de cada ejercicio con descansos de 30 segundos...",
      benefits: ["Fortalece abdominales", "Mejora postura", "Previene dolor de espalda"]
    },
    {
      id: 4,
      title: "Caminata Consciente",
      difficulty: "beginner",
      duration: 30,
      description: "Caminata meditativa para conectar con tu cuerpo",
      instructions: "Camina a paso lento, enfocándote en cada paso y en tu respiración...",
      benefits: ["Mejora cardiovascular", "Reduce estrés", "Aumenta energía"]
    },
    {
      id: 5,
      title: "Pilates para la Menopausia",
      difficulty: "intermediate",
      duration: 25,
      description: "Ejercicios de pilates adaptados para síntomas menopáusicos",
      instructions: "Realiza los movimientos de forma controlada, enfocándote en la estabilidad...",
      benefits: ["Fortalece músculos", "Mejora equilibrio", "Aumenta densidad ósea"]
    },
    {
      id: 6,
      title: "Estiramientos Profundos",
      difficulty: "beginner",
      duration: 10,
      description: "Rutina de estiramientos para liberar tensión",
      instructions: "Mantén cada estiramiento por 30 segundos sin rebotar...",
      benefits: ["Reduce tensión muscular", "Mejora flexibilidad", "Calma el cuerpo"]
    },
    {
      id: 7,
      title: "HIIT Adaptado",
      difficulty: "advanced",
      duration: 20,
      description: "Entrenamiento de alta intensidad adaptado para la menopausia",
      instructions: "Alterna 30 segundos de ejercicio intenso con 30 segundos de descanso...",
      benefits: ["Acelera metabolismo", "Mejora resistencia", "Aumenta energía"]
    },
    {
      id: 8,
      title: "Meditación Guiada",
      difficulty: "beginner",
      duration: 15,
      description: "Meditación para calmar la mente y reducir ansiedad",
      instructions: "Siéntate cómodamente y sigue las instrucciones de la meditación guiada...",
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
            Rutinas de ejercicio diseñadas para aliviar síntomas menopáusicos
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
        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map(diff => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedDifficulty === diff.id
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredExercises.map(exercise => (
            <Card
              key={exercise.id}
              className={`p-6 border-2 transition-all cursor-pointer ${
                completedExercises.includes(exercise.id)
                  ? "border-green-400 bg-green-50"
                  : "border-pink-100 hover:border-pink-400"
              }`}
              onClick={() => toggleComplete(exercise.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {exercise.difficulty === "beginner" ? "Principiante" :
                     exercise.difficulty === "intermediate" ? "Intermedio" : "Avanzado"}
                  </p>
                </div>
                {completedExercises.includes(exercise.id) && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
              </div>

              <p className="text-gray-600 mb-4">{exercise.description}</p>

              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {exercise.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {exercise.benefits.length} beneficios
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Beneficios:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {exercise.benefits.map((benefit, i) => (
                    <li key={i}>✓ {benefit}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Comenzar Ejercicio
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
