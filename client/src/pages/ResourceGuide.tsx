import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Download, Filter, Search, ArrowLeft, Heart, ChevronDown, ChevronUp, Zap, Apple, Brain } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface Resource {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  shortContent: string;
  fullContent: string;
  downloadable: boolean;
  icon: string;
  color: string;
  bgColor: string;
}

export default function ResourceGuide() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  const resources: Resource[] = [
    {
      id: 1,
      title: "Guía Completa de Síntomas Menopáusicos",
      category: "hormonal",
      categoryLabel: "Síntomas",
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
      downloadable: true,
      icon: "🌡️",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 2,
      title: "Nutrición y Alimentación Consciente",
      category: "nutrition",
      categoryLabel: "Nutrición",
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
      downloadable: true,
      icon: "🥗",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Ejercicio Físico Recomendado",
      category: "exercise",
      categoryLabel: "Ejercicio",
      description: "Rutinas de ejercicio efectivas diseñadas para mujeres menopáusicas",
      shortContent: "El ejercicio regular es crucial. Se recomienda combinar cardio, fortalecimiento y flexibilidad para mantener la salud ósea y cardiovascular...",
      fullContent: `# Ejercicio Físico Recomendado

## Tipos de Ejercicio

### Ejercicio Cardiovascular
- Caminar: 30 minutos, 5 días a la semana
- Natación: Excelente para articulaciones
- Ciclismo: Bajo impacto, muy efectivo

### Fortalecimiento Muscular
- Pesas ligeras: 2-3 veces a la semana
- Ejercicios con peso corporal
- Bandas elásticas

### Flexibilidad y Equilibrio
- Yoga: Reduce estrés y mejora flexibilidad
- Pilates: Fortalece core
- Tai Chi: Mejora equilibrio

## Beneficios del Ejercicio
- Reduce sofocos
- Mejora el sueño
- Fortalece huesos
- Mejora el estado de ánimo
- Mantiene peso saludable`,
      downloadable: true,
      icon: "💪",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      title: "Salud Mental y Emocional",
      category: "mental",
      categoryLabel: "Mental",
      description: "Estrategias para manejar cambios emocionales y estrés durante la menopausia",
      shortContent: "Los cambios emocionales son normales. Técnicas de mindfulness, meditación y apoyo psicológico pueden ayudarte a navegar esta etapa...",
      fullContent: `# Salud Mental y Emocional

## Técnicas de Manejo del Estrés

### Mindfulness y Meditación
- Dedica 10-15 minutos diarios
- Enfócate en la respiración
- Observa tus pensamientos sin juzgar

### Técnicas de Relajación
- Respiración profunda
- Relajación muscular progresiva
- Visualización guiada

## Apoyo Emocional
- Habla con amigas o familiares
- Considera terapia psicológica
- Únete a grupos de apoyo
- Mantén un diario emocional

## Actividades que Ayudan
- Pasar tiempo en la naturaleza
- Actividades creativas
- Tiempo con seres queridos
- Hobbies y pasatiempos`,
      downloadable: true,
      icon: "🧠",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 5,
      title: "Sueño y Descanso",
      category: "sleep",
      categoryLabel: "Sueño",
      description: "Soluciones para mejorar la calidad del sueño durante la menopausia",
      shortContent: "Los problemas de sueño son comunes. Establece una rutina nocturna consistente, mantén la habitación fresca y evita estimulantes antes de dormir...",
      fullContent: `# Sueño y Descanso

## Higiene del Sueño

### Rutina Nocturna
- Acuéstate y levántate a la misma hora
- Evita pantallas 1 hora antes de dormir
- Crea un ambiente relajante
- Temperatura fresca (16-19°C)

### Alimentos y Bebidas
- Evita cafeína después de las 14:00
- Limita alcohol
- Evita cenas pesadas
- Infusiones relajantes: manzanilla, valeriana

### Técnicas para Dormir
- Relajación muscular progresiva
- Respiración 4-7-8
- Meditación para dormir
- Lectura relajante

## Cuándo Buscar Ayuda
Si los problemas persisten después de 2 semanas, consulta a un especialista.`,
      downloadable: true,
      icon: "😴",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      id: 6,
      title: "Intimidad y Sexualidad Saludable",
      category: "intimacy",
      categoryLabel: "Intimidad",
      description: "Información sobre cambios en la sexualidad y cómo mantener una vida íntima satisfactoria",
      shortContent: "Los cambios en la sexualidad son normales. La comunicación, el tiempo y la paciencia son clave para mantener una relación íntima satisfactoria...",
      fullContent: `# Intimidad y Sexualidad Saludable

## Cambios Comunes
- Disminución del deseo sexual
- Sequedad vaginal
- Cambios en la respuesta sexual
- Dolor durante las relaciones

## Soluciones Prácticas

### Para la Sequedad Vaginal
- Lubricantes naturales
- Hidratantes vaginales
- Mayor tiempo de estimulación
- Consulta con ginecólogo

### Para Mejorar la Intimidad
- Comunicación abierta con la pareja
- Más tiempo para la intimidad
- Exploración de nuevas formas
- Ejercicios de Kegel

## Salud Sexual
- Mantén relaciones seguras
- Realiza revisiones regulares
- Habla con tu médico sobre cambios
- Busca apoyo profesional si es necesario`,
      downloadable: true,
      icon: "💕",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  const categories = [
    { value: "all", label: "Todos" },
    { value: "hormonal", label: "Síntomas" },
    { value: "nutrition", label: "Nutrición" },
    { value: "exercise", label: "Ejercicio" },
    { value: "mental", label: "Mental" },
    { value: "sleep", label: "Sueño" },
    { value: "intimacy", label: "Intimidad" }
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
      toast.success("Agregado a favoritos");
    }
  };

  const handleDownload = (title: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Descargando: " + title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
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

          {/* Búsqueda y Filtros */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              />
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className={selectedCategory === cat.value ? "bg-pink-600 hover:bg-pink-700" : ""}
                  size="sm"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-white">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">¿Por qué esta guía?</h3>
              <p className="text-gray-700 text-sm">
                6 guías completas, visualmente atractivas e interactivas. Cada una contiene información detallada, descargable y organizada por categorías para que encuentres exactamente lo que necesitas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Recursos */}
      <div className="container mx-auto px-4">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className={`border-2 transition-all hover:shadow-lg cursor-pointer ${
                  expandedResource === resource.id
                    ? `border-pink-400 ${resource.bgColor}`
                    : `border-pink-200 hover:border-pink-400`
                }`}
              >
                <div
                  className="p-6 space-y-4"
                  onClick={() => setExpandedResource(expandedResource === resource.id ? null : resource.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-4xl">{resource.icon}</span>
                      <div className="flex-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${resource.bgColor} ${resource.color} mb-2`}>
                          {resource.categoryLabel}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{resource.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(resource.id);
                      }}
                      className="flex-shrink-0"
                    >
                      <Heart
                        className={`w-6 h-6 transition-all ${
                          favorites.includes(resource.id)
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-400 hover:text-pink-500"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-gray-600">{resource.description}</p>

                  {/* Preview */}
                  <p className="text-sm text-gray-700 line-clamp-2">{resource.shortContent}</p>

                  {/* Botones */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedResource(expandedResource === resource.id ? null : resource.id);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50"
                    >
                      {expandedResource === resource.id ? "Ver menos" : "Leer completo"}
                    </Button>
                    {resource.downloadable && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(resource.title, resource.fullContent);
                        }}
                        size="sm"
                        className="bg-pink-600 hover:bg-pink-700"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Contenido Expandido */}
                  {expandedResource === resource.id && (
                    <div className="mt-4 pt-4 border-t border-pink-200 space-y-3">
                      <div className="prose prose-sm max-w-none text-gray-700 text-sm">
                        {resource.fullContent.split('\n').map((line, idx) => {
                          if (line.startsWith('# ')) {
                            return <h3 key={idx} className="font-bold text-gray-900 mt-3 mb-2">{line.replace('# ', '')}</h3>;
                          }
                          if (line.startsWith('## ')) {
                            return <h4 key={idx} className="font-semibold text-gray-800 mt-2 mb-1">{line.replace('## ', '')}</h4>;
                          }
                          if (line.startsWith('### ')) {
                            return <h5 key={idx} className="font-semibold text-gray-700 mt-2 mb-1">{line.replace('### ', '')}</h5>;
                          }
                          if (line.startsWith('- ')) {
                            return <li key={idx} className="ml-4 text-gray-700">{line.replace('- ', '')}</li>;
                          }
                          if (line.trim()) {
                            return <p key={idx} className="text-gray-700">{line}</p>;
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron recursos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
