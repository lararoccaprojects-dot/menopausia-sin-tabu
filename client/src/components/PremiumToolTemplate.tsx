import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  locked?: boolean;
}

interface PremiumToolTemplateProps {
  toolName: string;
  toolSubtitle: string;
  toolDescription: string;
  modules: Module[];
}

export function PremiumToolTemplate({
  toolName,
  toolSubtitle,
  toolDescription,
  modules,
}: PremiumToolTemplateProps) {
  const [, setLocation] = useLocation();
  const [completedModules, setCompletedModules] = useState<string[]>([]);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{toolName}</h1>
          <p className="text-lg text-pink-600 font-semibold mb-2">{toolSubtitle}</p>
          <p className="text-lg text-gray-600">{toolDescription}</p>
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
          {modules.map((module, idx) => {
            const isCompleted = completedModules.includes(module.id);
            const isLocked = module.locked && idx > 0 && !completedModules.includes(modules[idx - 1]?.id);

            return (
              <Card key={module.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
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
                        if (!isCompleted && !isLocked) {
                          setCompletedModules([...completedModules, module.id]);
                        }
                      }}
                      disabled={isLocked}
                    >
                      {isCompleted ? "✓ Completado" : isLocked ? "Bloqueado" : "Comenzar"}
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
