import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { UtensilsCrossed, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell5NutritionWorkshop() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "Fundamentos de Nutrición Menopáusica",
      description: "Entender qué necesita tu cuerpo durante esta etapa",
      duration: "25 min",
      content: [
        "Cambios metabólicos post-menopausia",
        "Necesidades calóricas reducidas",
        "Macronutrientes esenciales",
        "Micronutrientes críticos (calcio, vitamina D, hierro)",
        "Fitoestrógenos naturales"
      ],
      recipes: []
    },
    {
      id: 2,
      title: "Alimentos que Alivian Síntomas",
      description: "Qué comer para reducir sofocos, cambios de humor y más",
      duration: "30 min",
      content: [
        "Alimentos ricos en fitoestrógenos (soja, linaza, trébol rojo)",
        "Antiinflamatorios naturales (cúrcuma, jengibre, omega-3)",
        "Alimentos para mejorar el sueño",
        "Alimentos para estabilizar el humor",
        "Alimentos que evitar (cafeína, alcohol, picantes)"
      ],
      recipes: [
        { name: "Batido de Soja y Linaza", ingredients: "Leche de soja, linaza molida, plátano, almendras", prep: "5 min" },
        { name: "Salmón con Cúrcuma", ingredients: "Salmón, cúrcuma, jengibre, limón, aceite de oliva", prep: "20 min" },
        { name: "Té de Trébol Rojo", ingredients: "Flores de trébol rojo, agua caliente, miel", prep: "10 min" }
      ]
    },
    {
      id: 3,
      title: "Plan de Comidas Semanal",
      description: "Estructura de comidas balanceadas para toda la semana",
      duration: "35 min",
      content: [
        "Distribución de macronutrientes",
        "Tamaño de porciones recomendadas",
        "Opciones de desayuno saludable",
        "Almuerzos nutritivos y saciantes",
        "Cenas ligeras pero completas",
        "Snacks saludables"
      ],
      recipes: [
        { name: "Desayuno: Avena con Bayas", ingredients: "Avena, arándanos, almendras, miel", prep: "10 min" },
        { name: "Almuerzo: Ensalada de Quinoa", ingredients: "Quinoa, vegetales, pollo, vinagre balsámico", prep: "15 min" },
        { name: "Cena: Vegetales al Horno", ingredients: "Brócoli, zanahorias, calabaza, aceite de oliva", prep: "25 min" }
      ]
    },
    {
      id: 4,
      title: "Suplementos y Bebidas Saludables",
      description: "Complementos nutricionales seguros y efectivos",
      duration: "20 min",
      content: [
        "Suplementos esenciales (calcio, vitamina D, magnesio)",
        "Omega-3 y sus beneficios",
        "Probióticos para la salud digestiva",
        "Bebidas saludables (tés, jugos, infusiones)",
        "Hidratación óptima",
        "Qué evitar en suplementos"
      ],
      recipes: [
        { name: "Agua de Jengibre y Limón", ingredients: "Jengibre fresco, limón, agua, miel", prep: "5 min" },
        { name: "Té de Manzanilla y Lavanda", ingredients: "Manzanilla, lavanda, agua caliente", prep: "10 min" },
        { name: "Smoothie de Proteína", ingredients: "Proteína en polvo, yogur, frutas, almendras", prep: "5 min" }
      ]
    },
    {
      id: 5,
      title: "Recetas Especiales y Menú Completo",
      description: "Recetas deliciosas y fáciles para toda la semana",
      duration: "40 min",
      content: [
        "20 recetas menopáusicas aprobadas",
        "Opciones vegetarianas y veganas",
        "Recetas rápidas (menos de 30 min)",
        "Comidas para compartir",
        "Postres saludables",
        "Guía de compras por categoría"
      ],
      recipes: [
        { name: "Pollo con Verduras Asadas", ingredients: "Pechuga de pollo, brócoli, zanahorias, ajo", prep: "30 min" },
        { name: "Lentejas Rojas Especiadas", ingredients: "Lentejas rojas, cebolla, tomate, especias", prep: "25 min" },
        { name: "Fruta Asada con Canela", ingredients: "Manzanas, peras, canela, nueces", prep: "20 min" }
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
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50">
      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Taller de Alimentación Consciente</h3>
              <p className="text-gray-700 leading-relaxed">
                La comida es medicina. Este taller te enseña a nutrir tu cuerpo durante la menopausia con 5 módulos especializados, 15+ recetas deliciosas y un generador de lista de compras personalizado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-lime-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-lime-600" />
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
          <p className="text-gray-600">
            5 módulos con recetas y plan de comidas para nutrición óptima
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-lime-200 bg-lime-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-lime-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-lime-500 h-3 rounded-full transition-all duration-300"
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
            <Card key={module.id} className="p-6 border-2 border-lime-100 hover:border-lime-400 transition-colors">
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
                    className={completedModules.includes(module.id) ? "fill-lime-500 text-lime-500" : "text-gray-300"}
                  />
                </button>
              </div>

              {/* Module Info */}
              <div className="flex gap-4 mb-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {module.duration}
                </span>
                <span className="flex items-center gap-1">
                  🍳 {module.recipes.length} recetas
                </span>
              </div>

              {/* Expandable Content */}
              {expandedModule === module.id && (
                <div className="mb-4 p-4 bg-lime-50 rounded-lg border border-lime-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contenido del Módulo:</h4>
                  <ul className="space-y-2 mb-6">
                    {module.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-lime-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {module.recipes.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mb-3">Recetas Incluidas:</h4>
                      <div className="space-y-3">
                        {module.recipes.map((recipe, idx) => (
                          <div key={idx} className="p-3 bg-white rounded border border-lime-200">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-gray-800">{recipe.name}</h5>
                              <span className="text-xs text-gray-600">{recipe.prep}</span>
                            </div>
                            <p className="text-sm text-gray-600">{recipe.ingredients}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-lime-500 hover:bg-lime-600 text-white"
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                >
                  {expandedModule === module.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar Módulo
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Módulo
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-lime-500 text-lime-600 hover:bg-lime-50"
                  onClick={() => toggleComplete(module.id)}
                >
                  {completedModules.includes(module.id) ? "✓ Completado" : "Marcar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Shopping List Section */}
        <Card className="p-6 mt-8 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Lista de Compras Generadora</h3>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
          </div>
          <p className="text-gray-700 mb-4">
            Genera automáticamente tu lista de compras basada en las recetas que selecciones. Organizada por categoría para facilitar tu compra en el supermercado.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">🥬 Vegetales</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Brócoli</li>
                <li>• Zanahorias</li>
                <li>• Espinacas</li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">🍗 Proteínas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pechuga de pollo</li>
                <li>• Salmón</li>
                <li>• Huevos</li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">🌾 Granos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quinoa</li>
                <li>• Avena</li>
                <li>• Arroz integral</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Benefits Section */}
        <Card className="p-6 mt-8 border-2 border-green-200 bg-green-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios de este taller</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Alivio de síntomas:</strong> Alimentos que reducen sofocos y cambios de humor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Recetas deliciosas:</strong> 20+ recetas fáciles y sabrosas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Salud ósea:</strong> Nutrientes para prevenir osteoporosis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Peso saludable:</strong> Mantén peso óptimo con nutrición consciente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Energía renovada:</strong> Alimentos que aumentan tu vitalidad</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
