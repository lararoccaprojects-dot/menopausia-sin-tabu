import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Download, Filter, Search, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ResourceGuide() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const resources = [
    {
      id: 1,
      title: "Guía Completa de Síntomas Menopáusicos",
      category: "hormonal",
      description: "Documentación detallada de los 34 síntomas principales con explicaciones científicas",
      content: "Los cambios hormonales son la causa principal. El estrógeno y la progesterona disminuyen gradualmente, causando síntomas como sofocos, cambios de humor y sequedad vaginal...",
      downloadable: true
    },
    {
      id: 2,
      title: "Nutrición y Alimentación Consciente",
      category: "nutrition",
      description: "Plan de alimentación especializado para aliviar síntomas y mantener la salud ósea",
      content: "Una alimentación equilibrada es fundamental. Se recomienda aumentar calcio, vitamina D, omega-3 y reducir cafeína y azúcares refinados...",
      downloadable: true
    },
    {
      id: 3,
      title: "Ejercicio Físico Recomendado",
      category: "exercise",
      description: "Rutinas de ejercicio efectivas diseñadas para mujeres menopáusicas",
      content: "El ejercicio regular ayuda a mantener masa muscular, mejorar densidad ósea y reducir síntomas. Se recomiendan 150 minutos de actividad moderada por semana...",
      downloadable: true
    },
    {
      id: 4,
      title: "Salud Mental y Emocional",
      category: "mental",
      description: "Estrategias para manejar cambios emocionales y mantener la salud mental",
      content: "Los cambios emocionales son comunes. La meditación, mindfulness, terapia y apoyo social son herramientas efectivas para mantener el bienestar...",
      downloadable: true
    },
    {
      id: 5,
      title: "Sueño y Descanso",
      category: "sleep",
      description: "Técnicas para mejorar la calidad del sueño durante la menopausia",
      content: "Los problemas de sueño afectan al 60% de mujeres menopáusicas. Mantener rutina regular, evitar cafeína y crear ambiente oscuro ayuda significativamente...",
      downloadable: true
    },
    {
      id: 6,
      title: "Intimidad y Sexualidad Saludable",
      category: "intimacy",
      description: "Información sobre cambios en la sexualidad y soluciones disponibles",
      content: "La sequedad vaginal y otros cambios pueden afectar la intimidad. Existen soluciones naturales (lubricantes, ejercicios) y médicas disponibles...",
      downloadable: true
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "hormonal", label: "Síntomas" },
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

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

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
            Acceso a 6 guías completas y descargables sobre menopausia, nutrición, ejercicio y más
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
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{resource.title}</h3>
                <button
                  onClick={() => toggleFavorite(resource.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <Heart
                    size={24}
                    className={favorites.includes(resource.id) ? "fill-pink-500 text-pink-500" : "text-gray-300"}
                  />
                </button>
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

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-12 p-8 bg-pink-50 rounded-lg border-2 border-pink-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos ({favorites.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => favorites.includes(r.id)).map(resource => (
                <div key={resource.id} className="bg-white p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 capitalize">{resource.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
