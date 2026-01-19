import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, ArrowLeft, CheckCircle2, Unlock } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  content: string;
}

export default function EmotionalWellness() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const modules: Module[] = [
    {
      id: 1,
      title: "Entendiendo tus Emociones",
      description: "Aprende a identificar y comprender tus cambios emocionales durante la menopausia",
      lessons: 4,
      duration: "45 min",
      content: "Los cambios hormonales afectan directamente tu estado emocional. En este módulo aprenderás: 1) Cómo los cambios de estrógeno impactan tu cerebro, 2) Identificar patrones emocionales, 3) Técnicas de regulación emocional, 4) Cuándo buscar ayuda profesional."
    },
    {
      id: 2,
      title: "Manejo del Estrés y la Ansiedad",
      description: "Estrategias prácticas para reducir estrés y ansiedad en tu día a día",
      lessons: 5,
      duration: "60 min",
      content: "El estrés durante la menopausia puede ser abrumador. Aprenderás: 1) Técnicas de respiración avanzadas, 2) Meditación guiada, 3) Progresión muscular progresiva, 4) Gestión del tiempo, 5) Creación de rutinas de autocuidado."
    },
    {
      id: 3,
      title: "Autoestima y Aceptación",
      description: "Reconstruye tu confianza y aprende a aceptar los cambios de tu cuerpo",
      lessons: 4,
      duration: "50 min",
      content: "La menopausia trae cambios corporales. Este módulo te ayuda a: 1) Reencuadrar tu relación con tu cuerpo, 2) Prácticas de amor propio, 3) Afirmaciones poderosas, 4) Celebrar tu sabiduría y experiencia."
    },
    {
      id: 4,
      title: "Relaciones y Comunicación",
      description: "Mejora tus relaciones personales durante esta etapa de cambio",
      lessons: 5,
      duration: "55 min",
      content: "Las relaciones pueden verse afectadas. Aprenderás: 1) Comunicación asertiva, 2) Establecer límites saludables, 3) Hablar con tu pareja sobre la menopausia, 4) Apoyo familiar, 5) Construir una comunidad de apoyo."
    },
    {
      id: 5,
      title: "Resiliencia y Fortaleza",
      description: "Desarrolla herramientas para enfrentar desafíos con mayor fortaleza",
      lessons: 4,
      duration: "45 min",
      content: "La resiliencia es clave. Descubrirás: 1) Historias de mujeres resilientes, 2) Técnicas de reencuadre cognitivo, 3) Construcción de redes de apoyo, 4) Planes de acción para crisis emocionales."
    },
    {
      id: 6,
      title: "Propósito y Significado",
      description: "Redescubre tu propósito y crea una vida significativa en esta nueva etapa",
      lessons: 4,
      duration: "50 min",
      content: "La menopausia es una oportunidad. Explorarás: 1) Redefinir tu identidad, 2) Descubrir nuevas pasiones, 3) Contribución a la comunidad, 4) Crear una visión para los próximos 30 años."
    },
    {
      id: 7,
      title: "Mindfulness y Presencia",
      description: "Practica mindfulness para vivir más presente y consciente",
      lessons: 5,
      duration: "60 min",
      content: "La presencia es poder. Aprenderás: 1) Meditación mindfulness, 2) Conciencia corporal, 3) Alimentación consciente, 4) Movimiento consciente, 5) Integración en la vida diaria."
    },
    {
      id: 8,
      title: "Celebración y Transformación",
      description: "Celebra tu transformación y crea un plan para tu nuevo capítulo",
      lessons: 3,
      duration: "40 min",
      content: "Tu transformación es digna de celebración. En este módulo: 1) Reflexión sobre tu viaje, 2) Celebración de logros, 3) Creación de rituales de transición, 4) Visión para tu futuro radiante."
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedModules.length / modules.length) * 100);

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedModule(null)}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedModule.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 border-2 border-pink-200 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 mb-2">{selectedModule.description}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>📚 {selectedModule.lessons} lecciones</span>
                  <span>⏱️ {selectedModule.duration}</span>
                </div>
              </div>
              <Button
                onClick={() => toggleComplete(selectedModule.id)}
                className={`${
                  completedModules.includes(selectedModule.id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-pink-600 hover:bg-pink-700"
                } text-white`}
              >
                {completedModules.includes(selectedModule.id) ? "✓ Completado" : "Marcar como Completado"}
              </Button>
            </div>

            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contenido del Módulo</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedModule.content}</p>
            </div>

            <div className="mt-8 p-6 bg-pink-50 rounded-lg border border-pink-200">
              <h3 className="font-bold text-gray-900 mb-3">Ejercicio Práctico</h3>
              <p className="text-gray-700 mb-4">
                Tómate 10 minutos para reflexionar sobre lo que aprendiste. Escribe 3 acciones que puedas implementar hoy mismo.
              </p>
              <textarea
                placeholder="Mis 3 acciones de hoy..."
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
              />
              <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white w-full">
                Guardar Reflexión
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-600" />
              <h1 className="text-3xl font-bold text-gray-900">Bienestar Emocional</h1>
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
            8 módulos de aprendizaje para fortalecer tu salud emocional durante la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress */}
        <Card className="p-6 mb-8 border-2 border-pink-200 bg-pink-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-pink-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedModules.length} de {modules.length} módulos completados
          </p>
        </Card>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map(module => (
            <Card
              key={module.id}
              className={`p-6 border-2 transition-all cursor-pointer ${
                completedModules.includes(module.id)
                  ? "border-green-400 bg-green-50"
                  : "border-pink-100 hover:border-pink-400"
              }`}
              onClick={() => setSelectedModule(module)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
                {completedModules.includes(module.id) ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" />
                ) : (
                  <Unlock className="w-6 h-6 text-pink-600 flex-shrink-0 ml-2" />
                )}
              </div>

              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>📚 {module.lessons} lecciones</span>
                <span>⏱️ {module.duration}</span>
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                {completedModules.includes(module.id) ? "Ver Módulo" : "Comenzar Módulo"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
