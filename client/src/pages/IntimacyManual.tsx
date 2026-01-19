import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Chapter {
  id: number;
  title: string;
  description: string;
  content: string;
}

export default function IntimacyManual() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      title: "Cambios Corporales y Sexualidad",
      description: "Entiende cómo la menopausia afecta tu cuerpo y tu vida sexual",
      content: "Durante la menopausia, tu cuerpo experimenta cambios significativos que afectan tu sexualidad. Aprenderás: 1) Cambios en la lubricación vaginal y cómo manejarlos, 2) Cambios en la sensibilidad y el deseo, 3) Impacto de los sofocos en la intimidad, 4) Cómo comunicar estos cambios con tu pareja."
    },
    {
      id: 2,
      title: "Deseo Sexual y Menopausia",
      description: "Redescubre tu deseo sexual en esta nueva etapa",
      content: "El deseo sexual puede cambiar durante la menopausia. En este capítulo: 1) Entender los cambios hormonales y su impacto, 2) Técnicas para aumentar la libido, 3) Mindfulness sexual, 4) Exploración de nuevas formas de intimidad, 5) Aceptación de los cambios naturales."
    },
    {
      id: 3,
      title: "Lubricación y Comodidad",
      description: "Soluciones prácticas para la sequedad vaginal",
      content: "La sequedad vaginal es común pero manejable. Descubrirás: 1) Lubricantes naturales vs. comerciales, 2) Hidratantes vaginales, 3) Técnicas de estimulación prolongada, 4) Cuándo buscar ayuda médica, 5) Productos recomendados y seguros."
    },
    {
      id: 4,
      title: "Comunicación con tu Pareja",
      description: "Habla abiertamente sobre la menopausia y la intimidad",
      content: "La comunicación es clave para una vida sexual satisfactoria. Aprenderás: 1) Cómo iniciar conversaciones difíciles, 2) Expresar tus necesidades sin culpa, 3) Escuchar activamente, 4) Resolver conflictos relacionados con la intimidad, 5) Fortalecer la conexión emocional."
    },
    {
      id: 5,
      title: "Nuevas Formas de Intimidad",
      description: "Explora nuevas dimensiones de la intimidad sexual",
      content: "La menopausia es una oportunidad para reinventar tu vida sexual. Descubrirás: 1) Más allá del sexo tradicional, 2) Intimidad emocional y física, 3) Juego y exploración, 4) Fantasías y deseos, 5) Crear momentos especiales con tu pareja."
    },
    {
      id: 6,
      title: "Salud Sexual Integral",
      description: "Mantén una vida sexual saludable y satisfactoria",
      content: "La salud sexual es parte de tu bienestar general. En este capítulo: 1) Prevención de infecciones, 2) Ejercicios de Kegel para fortalecer el suelo pélvico, 3) Nutrición para la salud sexual, 4) Ejercicio y sexualidad, 5) Cuándo buscar ayuda profesional."
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedChapters.length / chapters.length) * 100);

  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        {/* Header */}
        <div className="bg-white border-b border-red-200 shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedChapter.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 border-2 border-red-200 mb-8">
            <div className="flex justify-between items-start mb-6">
              <p className="text-gray-600 text-lg">{selectedChapter.description}</p>
              <Button
                onClick={() => toggleComplete(selectedChapter.id)}
                className={`${
                  completedChapters.includes(selectedChapter.id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white flex-shrink-0 ml-4`}
              >
                {completedChapters.includes(selectedChapter.id) ? "✓ Completado" : "Marcar como Completado"}
              </Button>
            </div>

            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contenido del Capítulo</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedChapter.content}</p>
            </div>

            <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-bold text-gray-900 mb-3">Reflexión Personal</h3>
              <p className="text-gray-700 mb-4">
                ¿Cómo puedes aplicar lo aprendido en tu vida? Escribe tus pensamientos.
              </p>
              <textarea
                placeholder="Mis reflexiones..."
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
              />
              <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white w-full">
                Guardar Reflexión
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-red-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-900">Manual de Intimidad Saludable</h1>
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
            6 capítulos para mantener una vida sexual satisfactoria durante la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress */}
        <Card className="p-6 mb-8 border-2 border-red-200 bg-red-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-red-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedChapters.length} de {chapters.length} capítulos completados
          </p>
        </Card>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {chapters.map(chapter => (
            <Card
              key={chapter.id}
              className={`p-6 border-2 transition-all cursor-pointer ${
                completedChapters.includes(chapter.id)
                  ? "border-green-400 bg-green-50"
                  : "border-red-100 hover:border-red-400"
              }`}
              onClick={() => setSelectedChapter(chapter)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                </div>
                {completedChapters.includes(chapter.id) && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" />
                )}
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                {completedChapters.includes(chapter.id) ? "Ver Capítulo" : "Leer Capítulo"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
