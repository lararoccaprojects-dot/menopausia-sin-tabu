import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useState } from "react";

export default function EmotionalWellness() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>Necesitas estar autenticada para acceder a esta herramienta</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-pink-500 hover:bg-pink-600" onClick={() => setLocation("/dashboard")}>
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const modules = [
    {
      id: "module-1",
      title: "Entendiendo tus Emociones",
      description: "Aprende cómo la menopausia afecta tus emociones y por qué",
      duration: "20 min",
      locked: false,
    },
    {
      id: "module-2",
      title: "Técnicas de Regulación Emocional",
      description: "5 técnicas prácticas para manejar emociones intensas",
      duration: "25 min",
      locked: false,
    },
    {
      id: "module-3",
      title: "Mindfulness para la Menopausia",
      description: "Meditaciones guiadas especializadas",
      duration: "15 min",
      locked: false,
    },
    {
      id: "module-4",
      title: "Gestión del Estrés y la Ansiedad",
      description: "Estrategias comprobadas para reducir ansiedad",
      duration: "30 min",
      locked: false,
    },
    {
      id: "module-5",
      title: "Comunicación Emocional",
      description: "Cómo expresar tus sentimientos efectivamente",
      duration: "25 min",
      locked: false,
    },
    {
      id: "module-6",
      title: "Construyendo Resiliencia",
      description: "Fortalece tu capacidad de adaptación",
      duration: "20 min",
      locked: false,
    },
    {
      id: "module-7",
      title: "Diario Emocional Interactivo",
      description: "Herramienta para registrar y analizar tus emociones",
      duration: "Acceso ilimitado",
      locked: false,
    },
    {
      id: "module-8",
      title: "Comunidad Privada de Apoyo",
      description: "Conecta con otras mujeres en tu mismo camino",
      duration: "Acceso ilimitado",
      locked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setLocation("/premium-pack")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Pack Premium
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">El Mapa de Bienestar Emocional</h1>
          <p className="text-lg text-gray-600">Guía paso a paso para entender y regular tus emociones durante la menopausia</p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-pink-500 h-4 rounded-full transition-all"
                style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedModules.length} de {modules.length} módulos completados
            </p>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid gap-4 mb-8">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);

            return (
              <Card key={module.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {module.locked && <Lock className="w-5 h-5 text-gray-400" />}
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">⏱️ {module.duration}</span>
                    <Button
                      className={isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-pink-500 hover:bg-pink-600"}
                      onClick={() => {
                        if (!isCompleted) {
                          setCompletedModules([...completedModules, module.id]);
                        }
                      }}
                      disabled={module.locked}
                    >
                      {isCompleted ? "✓ Completado" : "Comenzar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-pink-100 to-red-100 border-pink-300">
          <CardHeader>
            <CardTitle>¿Necesitas ayuda?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Si tienes preguntas sobre cualquier módulo, puedes acceder a nuestra comunidad privada o contactar con nuestro equipo de apoyo.
            </p>
            <Button className="bg-pink-500 hover:bg-pink-600">
              Contactar Soporte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
