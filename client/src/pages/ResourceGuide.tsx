import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Download, Filter, Search, ArrowLeft, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function ResourceGuide() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  const resources = [
    {
      id: 1,
      title: "Guía Completa de Síntomas Menopáusicos",
      category: "hormonal",
      description: "Documentación detallada de los 34 síntomas principales con explicaciones científicas",
      shortContent: "Los cambios hormonales son la causa principal. El estrógeno y la progesterona disminuyen gradualmente, causando síntomas como sofocos, cambios de humor y sequedad vaginal...",
      fullContent: `# Guía Completa de Síntomas Menopáusicos

## Introducción
La menopausia es una etapa natural de la vida de toda mujer. Durante este período, el cuerpo experimenta cambios hormonales significativos que pueden afectar la salud física y emocional.

## Síntomas Principales

### Síntomas Hormonales
- **Sofocos**: Sensación súbita de calor intenso
- **Sudores nocturnos**: Transpiración excesiva durante la noche
- **Cambios menstruales**: Irregularidades en el ciclo
- **Sequedad vaginal**: Reducción de lubricación natural

### Síntomas Emocionales
- Cambios de humor
- Ansiedad
- Depresión
- Irritabilidad

### Síntomas Físicos
- Fatiga
- Dolores articulares
- Problemas de sueño
- Cambios de peso

## Recomendaciones
1. Consulta con tu ginecólogo regularmente
2. Mantén un registro de tus síntomas
3. Realiza ejercicio físico regular
4. Adopta una alimentación saludable
5. Busca apoyo emocional si es necesario`,
      downloadable: true
    },
    {
      id: 2,
      title: "Nutrición y Alimentación Consciente",
      category: "nutrition",
      description: "Plan de alimentación especializado para aliviar síntomas y mantener la salud ósea",
      shortContent: "Una alimentación equilibrada es fundamental. Se recomienda aumentar calcio, vitamina D, omega-3 y reducir cafeína y azúcares refinados...",
      fullContent: `# Nutrición y Alimentación Consciente

## Alimentos Recomendados

### Ricos en Calcio
- Lácteos (leche, yogur, queso)
- Brócoli y col rizada
- Almendras y semillas de sésamo
- Pescados con espinas (sardinas, salmón)

### Ricos en Vitamina D
- Pescados grasos (salmón, atún)
- Huevos
- Champiñones
- Productos fortificados

### Ricos en Omega-3
- Pescados azules
- Semillas de lino
- Nueces
- Aceite de oliva

## Alimentos a Evitar
- Cafeína (aumenta sofocos)
- Alcohol (afecta el sueño)
- Azúcares refinados
- Comidas muy picantes
- Grasas saturadas

## Plan de Comidas
Distribuye tus comidas en 5-6 pequeñas tomas al día para mantener estable el nivel de azúcar en sangre.`,
      downloadable: true
    },
    {
      id: 3,
      title: "Ejercicio Físico Recomendado",
      category: "exercise",
      description: "Rutinas de ejercicio efectivas diseñadas para mujeres menopáusicas",
      shortContent: "El ejercicio regular ayuda a mantener masa muscular, mejorar densidad ósea y reducir síntomas. Se recomiendan 150 minutos de actividad moderada por semana...",
      fullContent: `# Ejercicio Físico Recomendado

## Beneficios del Ejercicio
- Reduce sofocos y sudores nocturnos
- Mejora la calidad del sueño
- Aumenta densidad ósea
- Mantiene peso saludable
- Mejora el estado de ánimo

## Tipos de Ejercicio Recomendados

### Ejercicio Aeróbico
- Caminar (30 minutos, 5 días/semana)
- Natación
- Ciclismo
- Baile

### Ejercicio de Resistencia
- Pesas ligeras
- Bandas elásticas
- Pilates
- Yoga

### Ejercicio de Flexibilidad
- Estiramientos
- Yoga
- Tai Chi

## Recomendaciones
- Comienza lentamente si eres sedentaria
- Aumenta intensidad gradualmente
- Ejercítate en horas frescas del día
- Mantén hidratación constante
- Usa ropa cómoda y transpirable`,
      downloadable: true
    },
    {
      id: 4,
      title: "Salud Mental y Emocional",
      category: "mental",
      description: "Estrategias para manejar cambios emocionales y mantener la salud mental",
      shortContent: "Los cambios emocionales son comunes. La meditación, mindfulness, terapia y apoyo social son herramientas efectivas para mantener el bienestar...",
      fullContent: `# Salud Mental y Emocional

## Cambios Emocionales Comunes
- Cambios de humor
- Ansiedad
- Depresión
- Irritabilidad
- Baja autoestima

## Estrategias de Manejo

### Meditación y Mindfulness
- 10-15 minutos diarios
- Enfócate en la respiración
- Observa tus pensamientos sin juzgar

### Apoyo Social
- Conecta con amigos y familia
- Únete a grupos de apoyo
- Comparte tus experiencias
- Busca comprensión

### Terapia Profesional
- Considera terapia psicológica
- Habla con tu médico sobre opciones
- No dudes en buscar ayuda

### Autocuidado
- Dedica tiempo para ti
- Haz actividades que disfrutas
- Mantén rutinas saludables
- Duerme suficiente

## Recursos de Apoyo
- Líneas de atención psicológica
- Grupos de apoyo para mujeres
- Plataformas de bienestar mental
- Aplicaciones de meditación`,
      downloadable: true
    },
    {
      id: 5,
      title: "Sueño y Descanso",
      category: "sleep",
      description: "Técnicas para mejorar la calidad del sueño durante la menopausia",
      shortContent: "Los problemas de sueño afectan al 60% de mujeres menopáusicas. Mantener rutina regular, evitar cafeína y crear ambiente oscuro ayuda significativamente...",
      fullContent: `# Sueño y Descanso

## Problemas de Sueño Comunes
- Insomnio
- Despertares nocturnos
- Sudores nocturnos
- Sueño no reparador

## Técnicas para Mejorar el Sueño

### Higiene del Sueño
- Acuéstate a la misma hora cada noche
- Duerme 7-9 horas
- Evita pantallas 1 hora antes de dormir
- Crea ambiente oscuro y fresco (16-19°C)

### Cambios en la Dieta
- Evita cafeína después de las 2 PM
- Limita alcohol
- Evita comidas pesadas antes de dormir
- Toma té de manzanilla o valeriana

### Técnicas de Relajación
- Respiración profunda
- Relajación muscular progresiva
- Meditación
- Yoga restaurativo

### Ambiente Óptimo
- Habitación oscura
- Temperatura fresca
- Ruido blanco si es necesario
- Ropa de cama cómoda

## Cuándo Buscar Ayuda
Si el insomnio persiste más de 2 semanas, consulta con tu médico.`,
      downloadable: true
    },
    {
      id: 6,
      title: "Intimidad y Sexualidad Saludable",
      category: "intimacy",
      description: "Información sobre cambios en la sexualidad y soluciones disponibles",
      shortContent: "La sequedad vaginal y otros cambios pueden afectar la intimidad. Existen soluciones naturales (lubricantes, ejercicios) y médicas disponibles...",
      fullContent: `# Intimidad y Sexualidad Saludable

## Cambios Comunes
- Sequedad vaginal
- Disminución del deseo sexual
- Dolor durante las relaciones
- Cambios en la sensibilidad

## Soluciones Naturales

### Lubricantes
- Lubricantes a base de agua
- Lubricantes a base de silicona
- Aceites naturales (coco, almendra)

### Ejercicios de Kegel
- Fortalecen el suelo pélvico
- Mejoran la sensibilidad
- Aumentan el placer sexual
- 10-20 repeticiones, 3 veces al día

### Cambios en la Intimidad
- Aumenta el tiempo de preliminares
- Comunica con tu pareja
- Prueba nuevas posiciones
- Enfócate en la conexión emocional

## Soluciones Médicas
- Cremas vaginales con estrógeno
- Anillos vaginales
- Tablets vaginales
- Terapia hormonal

## Comunicación con la Pareja
- Habla abiertamente sobre cambios
- Expresa tus necesidades
- Busca soluciones juntos
- Considera terapia de pareja si es necesario`,
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

  const handleDownload = (title: string) => {
    toast.success(`Descargando: ${title}`);
    // En una implementación real, aquí se descargaría el PDF
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar la Guía de Recursos</h3>
              <p className="text-gray-700 leading-relaxed">
                La información clara y confiable es tu mejor aliada. Esta guía te proporciona información basada en evidencia, opciones de tratamiento con pros y contras, estrategias prácticas y recursos descargables.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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
              
              {/* Expandable Content */}
              {expandedResource === resource.id ? (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-gray-700 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {resource.fullContent}
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm mb-6 line-clamp-3">{resource.shortContent}</p>
              )}

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => setExpandedResource(expandedResource === resource.id ? null : resource.id)}
                >
                  {expandedResource === resource.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Leer Completo
                    </>
                  )}
                </Button>
                {resource.downloadable && (
                  <Button 
                    variant="outline" 
                    className="border-pink-500 text-pink-600 hover:bg-pink-50"
                    onClick={() => handleDownload(resource.title)}
                  >
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
