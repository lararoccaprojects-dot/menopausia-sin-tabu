import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { UtensilsCrossed, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell5NutritionWorkshop() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "Fundamentos de Nutrición Menopáusica",
      icon: "📋",
      description: "Entiende cómo cambian tus necesidades nutricionales",
      duration: "2 semanas",
      keyPoints: [
        "Cambios metabólicos post-menopausia",
        "Necesidades calóricas reducidas",
        "Macronutrientes esenciales",
        "Micronutrientes críticos"
      ],
      recipes: ["Ensalada de Quinua con Verduras", "Salmón al Horno con Hierbas"],
      actionable: "Calcula tus necesidades calóricas personalizadas"
    },
    {
      id: 2,
      title: "Alimentos Anti-Inflamatorios",
      icon: "🥗",
      description: "Reduce inflamación y síntomas menopáusicos",
      duration: "2 semanas",
      keyPoints: [
        "Omega-3: pescado, nueces, semillas",
        "Antioxidantes: frutas y verduras coloridas",
        "Especias antiinflamatorias",
        "Alimentos a evitar"
      ],
      recipes: ["Batido Verde Antiinflamatorio", "Curry de Verduras"],
      actionable: "Incorpora 3 alimentos antiinflamatorios esta semana"
    },
    {
      id: 3,
      title: "Recetas Prácticas y Menú Semanal",
      icon: "🍳",
      description: "Planes de comida listos para implementar",
      duration: "2 semanas",
      keyPoints: [
        "Desayunos nutritivos y rápidos",
        "Almuerzos balanceados",
        "Cenas ligeras",
        "Snacks saludables"
      ],
      recipes: ["Avena con Frutas", "Pollo a la Parrilla con Verduras", "Té de Jengibre"],
      actionable: "Planifica tu menú para la próxima semana"
    }
  ];

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(m => m !== id));
    } else {
      setCompletedModules([...completedModules, id]);
      toast.success("¡Módulo completado!");
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Descargando: ${title}`);
  };

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-green-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Taller de Alimentación Consciente</h1>
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
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Alimentación consciente</h3>
              <p className="text-gray-700 text-sm">
                3 módulos prácticos con recetas reales que puedes preparar hoy. Aprende a comer de forma que reduzca síntomas y aumente tu energía.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      <div className="container mx-auto px-4 space-y-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`border-2 transition-all ${
              completedModules.includes(module.id)
                ? "border-green-400 bg-green-50"
                : "border-green-200 hover:border-green-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {module.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedModules.includes(module.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedModule === module.id ? (
                    <ChevronUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>

              {/* Puntos Clave */}
              <div className="mt-4 space-y-2">
                {module.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-sm">•</span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedModule === module.id && (
              <div className="border-t border-green-200 px-6 py-6 bg-green-50">
                <div className="space-y-6">
                  {/* Recetas */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Recetas incluidas:</h4>
                    <div className="space-y-2">
                      {module.recipes.map((recipe, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 text-sm">🍽️</span>
                          <span className="text-sm text-gray-700">{recipe}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acción Recomendada */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Acción para esta semana:</h4>
                    <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border-l-4 border-green-600">
                      {module.actionable}
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-4 border-t border-green-200">
                    <Button
                      onClick={() => toggleComplete(module.id)}
                      className={`flex-1 ${
                        completedModules.includes(module.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedModules.includes(module.id)
                        ? "Completado"
                        : "Marcar como completado"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(module.title)}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Consejo Final */}
      <div className="container mx-auto px-4 mt-12">
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-semibold">
              🥗 La alimentación es medicina. Elige alimentos que te amen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
