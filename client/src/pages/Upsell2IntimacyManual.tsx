import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell2IntimacyManual() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const chapters = [
    {
      id: 1,
      title: "Cambios en la Intimidad",
      icon: "💭",
      description: "Entiende qué está pasando en tu cuerpo",
      keyPoints: [
        "Cambios hormonales = cambios en deseo sexual",
        "Sequedad vaginal tiene soluciones simples",
        "Tu sexualidad evoluciona, no desaparece"
      ],
      actionable: "Haz una lista: ¿Qué cambios has notado? ¿Qué sigue siendo igual?"
    },
    {
      id: 2,
      title: "Comunicación Efectiva",
      icon: "💬",
      description: "Habla con tu pareja sin vergüenza",
      keyPoints: [
        "Elige un momento tranquilo para hablar",
        "Usa 'Yo siento' en lugar de 'Tú haces'",
        "Escucha sin defenderte"
      ],
      actionable: "Escribe 3 cosas que necesitas comunicar. Practica frente al espejo."
    },
    {
      id: 3,
      title: "Soluciones Naturales",
      icon: "🌿",
      description: "Opciones prácticas para sequedad y dolor",
      keyPoints: [
        "Lubricantes naturales: coco, almendra, rosa mosqueta",
        "Hidratantes vaginales para uso regular",
        "Masajes y estimulación para aumentar flujo"
      ],
      actionable: "Prueba un lubricante natural esta semana. Nota los cambios."
    },
    {
      id: 4,
      title: "Reavivar la Pasión",
      icon: "🔥",
      description: "Redescubre el placer y la conexión",
      keyPoints: [
        "Intimidad ≠ solo penetración",
        "Explora nuevas formas de conexión",
        "Prioriza el placer sobre el rendimiento"
      ],
      actionable: "Planifica una noche especial. Enfócate en conexión, no en resultados."
    }
  ];

  const toggleChapter = (id: number) => {
    setExpandedChapter(expandedChapter === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedChapters.includes(id)) {
      setCompletedChapters(completedChapters.filter(c => c !== id));
    } else {
      setCompletedChapters([...completedChapters, id]);
      toast.success("¡Capítulo completado!");
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Descargando: ${title}`);
  };

  const progress = Math.round((completedChapters.length / chapters.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-rose-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-600" />
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
          <div className="w-full bg-rose-100 rounded-full h-2">
            <div
              className="bg-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Tu intimidad importa</h3>
              <p className="text-gray-700 text-sm">
                4 capítulos prácticos para navegar los cambios en tu vida sexual durante la menopausia. Incluye soluciones reales, conversaciones difíciles y formas de reavivar la pasión.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capítulos */}
      <div className="container mx-auto px-4 space-y-4">
        {chapters.map((chapter) => (
          <Card
            key={chapter.id}
            className={`border-2 transition-all ${
              completedChapters.includes(chapter.id)
                ? "border-rose-400 bg-rose-50"
                : "border-rose-200 hover:border-rose-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleChapter(chapter.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl">{chapter.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                    <p className="text-sm text-gray-600">{chapter.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedChapters.includes(chapter.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedChapter === chapter.id ? (
                    <ChevronUp className="w-5 h-5 text-rose-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-rose-600" />
                  )}
                </div>
              </div>

              {/* Puntos Clave */}
              <div className="mt-4 space-y-2">
                {chapter.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold text-sm">✓</span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedChapter === chapter.id && (
              <div className="border-t border-rose-200 px-6 py-6 bg-rose-50">
                <div className="space-y-6">
                  {/* Acción Recomendada */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Acción para esta semana:</h4>
                    <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border-l-4 border-rose-600">
                      {chapter.actionable}
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-4 border-t border-rose-200">
                    <Button
                      onClick={() => toggleComplete(chapter.id)}
                      className={`flex-1 ${
                        completedChapters.includes(chapter.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-rose-600 hover:bg-rose-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedChapters.includes(chapter.id)
                        ? "Completado"
                        : "Marcar como completado"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(chapter.title)}
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
        <Card className="bg-gradient-to-r from-rose-600 to-rose-700 border-0 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-semibold">
              💕 Recuerda: Tu intimidad es importante. Mereces placer y conexión.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
