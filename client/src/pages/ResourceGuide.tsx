import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Download, Filter, Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ResourceGuide() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resources = [
    {
      id: 1,
      title: "Cambios Hormonales en la Menopausia",
      category: "hormonal",
      description: "Guía completa sobre los cambios hormonales que experimenta el cuerpo durante la menopausia",
      content: "Los cambios hormonales son la causa principal de los síntomas menopáusicos. El estrógeno y la progesterona disminuyen gradualmente...",
      downloadable: true
    },
    {
      id: 2,
      title: "Nutrición y Alimentación Consciente",
      category: "nutrition",
      description: "Recomendaciones nutricionales para aliviar síntomas y mantener la salud ósea",
      content: "Una alimentación equilibrada es fundamental durante la menopausia. Se recomienda aumentar la ingesta de calcio, vitamina D...",
      downloadable: true
    },
    {
      id: 3,
      title: "Ejercicio Físico Recomendado",
      category: "exercise",
      description: "Tipos de ejercicio más efectivos para la menopausia y cómo implementarlos",
      content: "El ejercicio regular ayuda a mantener la masa muscular, mejorar la densidad ósea y reducir síntomas como los sofocos...",
      downloadable: true
    },
    {
      id: 4,
      title: "Salud Mental y Emocional",
      category: "mental",
      description: "Estrategias para manejar cambios emocionales y mantener la salud mental",
      content: "Los cambios emocionales durante la menopausia son comunes. La meditación, el mindfulness y la terapia pueden ser muy útiles...",
      downloadable: true
    },
    {
      id: 5,
      title: "Sueño y Descanso",
      category: "sleep",
      description: "Cómo mejorar la calidad del sueño durante la menopausia",
      content: "Los problemas de sueño son comunes durante la menopausia. Se recomienda mantener una rutina regular, evitar cafeína...",
      downloadable: true
    },
    {
      id: 6,
      title: "Intimidad y Sexualidad",
      category: "intimacy",
      description: "Información sobre cambios en la sexualidad y cómo mantener una vida íntima satisfactoria",
      content: "La sequedad vaginal y otros cambios pueden afectar la intimidad. Existen soluciones naturales y médicas disponibles...",
      downloadable: true
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "hormonal", label: "Hormonas" },
    { id: "nutrition", label: "Nutrición" },
    { id: "exercise", label: "Ejercicio" },
    { id: "mental", label: "Mental" },
    { id: "sleep", label: "Sueño" },
    { id: "intimacy", label: "Intimidad" }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-pink-600" />
              <h1 className="text-3xl font-bold text-gray-900">Guía de Recursos</h1>
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
            Acceso a información completa y confiable sobre menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-gray-600 self-center" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{resource.title}</h3>
                {resource.downloadable && (
                  <Download className="w-5 h-5 text-pink-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <p className="text-gray-700 text-sm mb-6 line-clamp-3">{resource.content}</p>
              <div className="flex gap-2">
                <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                  Leer Completo
                </Button>
                {resource.downloadable && (
                  <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron recursos con esos criterios</p>
          </div>
        )}
      </div>
    </div>
  );
}
