import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function IntimacyManual() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "Entendiendo los Cambios Físicos",
      description: "Cómo los cambios hormonales afectan la intimidad",
      lessons: [
        "Sequedad vaginal: causas y soluciones",
        "Cambios en la libido",
        "Dolor durante la intimidad"
      ]
    },
    {
      id: 2,
      title: "Comunicación con tu Pareja",
      description: "Cómo hablar abiertamente sobre los cambios",
      lessons: [
        "Expresar tus necesidades",
        "Escuchar activamente",
        "Resolver conflictos"
      ]
    },
    {
      id: 3,
      title: "Soluciones Naturales",
      description: "Remedios naturales para mejorar la intimidad",
      lessons: [
        "Lubricantes naturales",
        "Hierbas y suplementos",
        "Técnicas de relajación"
      ]
    },
    {
      id: 4,
      title: "Intimidad sin Penetración",
      description: "Otras formas de conectar con tu pareja",
      lessons: [
        "Masajes sensibles",
        "Juegos previos extendidos",
        "Conexión emocional"
      ]
    },
    {
      id: 5,
      title: "Autoplacer y Autoconocimiento",
      description: "Reconectar contigo misma",
      lessons: [
        "Exploración segura",
        "Aceptación corporal",
        "Confianza en ti misma"
      ]
    },
    {
      id: 6,
      title: "Cuándo Buscar Ayuda Profesional",
      description: "Recursos médicos y terapéuticos",
      lessons: [
        "Terapia de pareja",
        "Consulta ginecológica",
        "Terapia sexual"
      ]
    }
  ];

  const toggleModule = (id: number) => {
    setCompletedModules(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-900">Manual de Intimidad Saludable</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/premium-pack")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
          <p className="text-gray-600">
            Guía completa para mantener una vida íntima satisfactoria durante la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Premium Badge */}
        <div className="mb-8 flex items-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-semibold">Contenido Premium Desbloqueado</span>
        </div>

        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-red-200 bg-red-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-red-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
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
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
                {completedModules.includes(module.id) && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Lecciones:</p>
                <ul className="space-y-1">
                  {module.lessons.map((lesson, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      • {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                {completedModules.includes(module.id) ? "Revisar Módulo" : "Comenzar Módulo"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Important Note */}
        <Card className="p-6 mt-12 border-2 border-yellow-200 bg-yellow-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Nota Importante</h3>
          <p className="text-gray-700">
            Este contenido es educativo y no reemplaza la consulta con un profesional de la salud. 
            Si experimentas dolor durante la intimidad o tienes preocupaciones específicas, 
            consulta con tu ginecólogo o terapeuta sexual.
          </p>
        </Card>
      </div>
    </div>
  );
}
