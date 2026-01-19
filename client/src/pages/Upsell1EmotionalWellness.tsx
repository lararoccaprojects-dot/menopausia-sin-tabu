import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Brain, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell1EmotionalWellness() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

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
        "Ejercicio 1: Mapeo emocional diario",
        "Ejercicio 2: Identificación de gatillos",
        "Ejercicio 3: Respuesta consciente vs reactiva"
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
        "Meditación de 5 minutos",
        "Respiración 4-7-8",
        "Escaneo corporal progresivo"
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
        "Relajación muscular progresiva",
        "Técnica del cuadrado de respiración",
        "Visualización guiada"
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
        "Carta de amor a ti misma",
        "Frases de autocompasión",
        "Ritual de aceptación corporal"
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
        "Mapa de apoyo personal",
        "Comunicación asertiva",
        "Planificación de conexiones sociales"
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
        "Análisis de desafíos pasados",
        "Reencuadre positivo",
        "Visión de futuro"
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
        "Escritura libre terapéutica",
        "Creación artística",
        "Proyecto creativo personal"
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
        "Clarificación de valores",
        "Visión de futuro detallada",
        "Plan de acción para el propósito"
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedModules(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
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
            8 módulos de aprendizaje para tu bienestar emocional durante la menopausia
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
                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contenido del Módulo:</h4>
                  <ul className="space-y-2 mb-4">
                    {module.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">Ejercicios Incluidos:</h4>
                  <ul className="space-y-2">
                    {module.exercises.map((exercise, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{exercise}</span>
                      </li>
                    ))}
                  </ul>
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
