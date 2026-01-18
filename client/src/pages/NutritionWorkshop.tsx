import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Apple, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function NutritionWorkshop() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "Nutrientes Esenciales en la Menopausia",
      description: "Vitaminas y minerales clave para esta etapa",
      lessons: [
        { name: "Calcio y Vitamina D para huesos fuertes", recipes: 3 },
        { name: "Fitoestrógenos naturales", recipes: 4 },
        { name: "Antioxidantes y antiinflamatorios", recipes: 5 },
        { name: "Proteína de calidad", recipes: 3 }
      ]
    },
    {
      id: 2,
      title: "Alimentos que Alivian Síntomas",
      description: "Qué comer para reducir sofocos y cambios de humor",
      lessons: [
        { name: "Alimentos para reducir sofocos", recipes: 6 },
        { name: "Alimentos que mejoran el sueño", recipes: 5 },
        { name: "Alimentos para estabilizar emociones", recipes: 4 },
        { name: "Alimentos que aumentan energía", recipes: 5 }
      ]
    },
    {
      id: 3,
      title: "Recetas Saludables y Deliciosas",
      description: "Más de 50 recetas adaptadas para la menopausia",
      lessons: [
        { name: "Desayunos nutritivos", recipes: 8 },
        { name: "Almuerzos balanceados", recipes: 10 },
        { name: "Cenas ligeras", recipes: 8 },
        { name: "Snacks saludables", recipes: 7 }
      ]
    },
    {
      id: 4,
      title: "Planificación de Comidas",
      description: "Cómo planificar tu semana de forma saludable",
      lessons: [
        { name: "Menú semanal balanceado", recipes: 0 },
        { name: "Compra inteligente", recipes: 0 },
        { name: "Preparación de comidas", recipes: 0 },
        { name: "Comer fuera de casa", recipes: 0 }
      ]
    },
    {
      id: 5,
      title: "Alimentos a Evitar",
      description: "Qué limitar durante la menopausia",
      lessons: [
        { name: "Alimentos que empeoran síntomas", recipes: 0 },
        { name: "Bebidas a limitar", recipes: 0 },
        { name: "Grasas y azúcares", recipes: 0 },
        { name: "Alternativas saludables", recipes: 6 }
      ]
    }
  ];

  const toggleLesson = (id: number) => {
    setCompletedLessons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Apple className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Taller de Alimentación Consciente</h1>
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
            5 módulos + 50+ recetas saludables para la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Premium Badge */}
        <div className="mb-8 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-semibold">Contenido Premium Desbloqueado</span>
        </div>

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
            {completedLessons.length} de {totalLessons} lecciones completadas
          </p>
        </Card>

        {/* Modules */}
        <div className="space-y-6">
          {modules.map(module => (
            <Card key={module.id} className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>

              <div className="space-y-2 mb-4">
                {module.lessons.map((lesson, i) => {
                  const lessonId = module.id * 100 + i;
                  return (
                    <div
                      key={i}
                      onClick={() => toggleLesson(lessonId)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        completedLessons.includes(lessonId)
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {completedLessons.includes(lessonId) && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{lesson.name}</p>
                            {lesson.recipes > 0 && (
                              <p className="text-sm text-gray-600">{lesson.recipes} recetas incluidas</p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                          Acceder
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Recipe Collection */}
        <Card className="p-8 mt-8 border-2 border-yellow-200 bg-yellow-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Colección de Recetas</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">50+</p>
              <p className="text-gray-600">Recetas saludables</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">Fácil</p>
              <p className="text-gray-600">Todas las recetas son simples</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">PDF</p>
              <p className="text-gray-600">Descargables para imprimir</p>
            </div>
          </div>
          <Button className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white">
            Descargar Libro de Recetas Completo
          </Button>
        </Card>

        {/* Nutrition Tips */}
        <Card className="p-8 mt-8 border-2 border-blue-200 bg-blue-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Consejos de Nutrición</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Come pequeñas porciones frecuentes para mantener estable el azúcar en sangre</li>
            <li>✓ Bebe mucha agua - al menos 8 vasos diarios</li>
            <li>✓ Aumenta la fibra gradualmente para evitar molestias digestivas</li>
            <li>✓ Incluye proteína en cada comida para mantener la masa muscular</li>
            <li>✓ Limita la cafeína y el alcohol que pueden empeorar los sofocos</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
