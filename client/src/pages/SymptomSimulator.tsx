import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Heart, AlertCircle, TrendingUp, CheckCircle2, Lightbulb, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface SymptomWithUserData {
  id: number;
  name: string;
  symptomId: number;
  symptomName: string;
  symptomCategory: string;
  severity: number;
  frequency: string;
  notes?: string;
  recordedAt: Date;
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  actions: string[];
  icon: string;
}

export default function SymptomSimulator() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("hormonal");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<number, { severity: number; frequency: "diaria" | "varias_veces_semana" | "semanal" | "ocasional" }>>(
    {}
  );
  const [expandedSymptom, setExpandedSymptom] = useState<number | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Fetch all available symptoms
  const { data: allSymptoms, isLoading: symptomsLoading } = trpc.symptoms.getAll.useQuery();

  // Fetch user's symptoms
  const { data: userSymptoms, refetch: refetchUserSymptoms } = trpc.symptoms.getUserSymptoms.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Mutations
  const addSymptomMutation = trpc.symptoms.addSymptom.useMutation({
    onSuccess: () => {
      toast.success("Síntoma agregado");
      refetchUserSymptoms();
      setSelectedSymptoms({});
    },
    onError: () => {
      toast.error("Error al agregar síntoma");
    },
  });

  const updateSymptomMutation = trpc.symptoms.updateSymptom.useMutation({
    onSuccess: () => {
      toast.success("Síntoma actualizado");
      refetchUserSymptoms();
      setSelectedSymptoms({});
    },
    onError: () => {
      toast.error("Error al actualizar síntoma");
    },
  });

  const deleteSymptomMutation = trpc.symptoms.deleteSymptom.useMutation({
    onSuccess: () => {
      toast.success("Síntoma eliminado");
      refetchUserSymptoms();
    },
    onError: () => {
      toast.error("Error al eliminar síntoma");
    },
  });

  const { data: report } = trpc.symptoms.generateReport.useQuery(undefined, {
    enabled: isAuthenticated && (userSymptoms?.length ?? 0) > 0,
  });

  const categories = ["hormonal", "emocional", "fisico", "sexual"];
  const categoryLabels: Record<string, string> = {
    hormonal: "Síntomas Hormonales",
    emocional: "Síntomas Emocionales",
    fisico: "Síntomas Físicos",
    sexual: "Síntomas Sexuales",
  };

  const categoryColors: Record<string, string> = {
    hormonal: "bg-pink-100 text-pink-700",
    emocional: "bg-purple-100 text-purple-700",
    fisico: "bg-blue-100 text-blue-700",
    sexual: "bg-rose-100 text-rose-700",
  };

  // Recomendaciones personalizadas según síntomas guardados
  const getPersonalizedRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Usar síntomas guardados del usuario
    const userSymptomNames = userSymptoms?.map(s => s.symptomName.toLowerCase()) || [];

    // Recomendaciones para sofocos
    if (userSymptomNames.some(s => s.includes('sofoco') || s.includes('calor'))) {
      recommendations.push({
        category: 'Sofocos',
        title: '🌡️ Manejo de Sofocos',
        description: 'Los sofocos son uno de los síntomas más comunes. Aquí hay estrategias efectivas:',
        actions: [
          'Practica respiración profunda 4-7-8 cuando sientas un sofoco',
          'Usa ropa en capas para ajustar rápidamente',
          'Evita cafeína, alcohol y comidas picantes',
          'Mantén tu habitación fresca (16-19°C)',
          'Prueba el ejercicio regular, especialmente yoga'
        ],
        icon: '🌡️'
      });
    }

    // Recomendaciones para cambios de humor
    if (userSymptomNames.some(s => s.includes('humor') || s.includes('ánimo'))) {
      recommendations.push({
        category: 'Emocional',
        title: '🧠 Salud Emocional',
        description: 'Los cambios de humor son normales durante la menopausia. Estas estrategias pueden ayudar:',
        actions: [
          'Practica meditación diaria (10-15 minutos)',
          'Mantén un diario emocional para identificar patrones',
          'Busca apoyo en amigos, familia o grupos de apoyo',
          'Considera terapia psicológica si es necesario',
          'Realiza actividades que disfrutes regularmente'
        ],
        icon: '🧠'
      });
    }

    // Recomendaciones para problemas de sueño
    if (userSymptomNames.some(s => s.includes('sueño') || s.includes('insomnio'))) {
      recommendations.push({
        category: 'Sueño',
        title: '😴 Mejora del Sueño',
        description: 'Un buen descanso es crucial. Intenta estas prácticas:',
        actions: [
          'Establece una rutina nocturna consistente',
          'Evita pantallas 1 hora antes de dormir',
          'Prueba técnicas de relajación o meditación',
          'Limita cafeína después de las 14:00',
          'Mantén la habitación oscura y fresca'
        ],
        icon: '😴'
      });
    }

    // Recomendaciones para sequedad vaginal
    if (userSymptomNames.some(s => s.includes('sequedad') || s.includes('vaginal'))) {
      recommendations.push({
        category: 'Intimidad',
        title: '💕 Salud Íntima',
        description: 'La sequedad vaginal es tratable. Aquí hay soluciones:',
        actions: [
          'Usa lubricantes naturales o hidratantes vaginales',
          'Aumenta el tiempo de estimulación',
          'Comunica abiertamente con tu pareja',
          'Considera consultar con tu ginecólogo',
          'Realiza ejercicios de Kegel regularmente'
        ],
        icon: '💕'
      });
    }

    // Recomendaciones para fatiga
    if (userSymptomNames.some(s => s.includes('fatiga') || s.includes('cansancio'))) {
      recommendations.push({
        category: 'Energía',
        title: '⚡ Aumento de Energía',
        description: 'La fatiga es común pero manejable. Prueba esto:',
        actions: [
          'Realiza ejercicio moderado 30 minutos diarios',
          'Asegura 7-9 horas de sueño',
          'Aumenta ingesta de hierro y vitamina B12',
          'Toma descansos regulares durante el día',
          'Consulta con tu médico si persiste'
        ],
        icon: '⚡'
      });
    }

    // Recomendaciones para cambios en libido
    if (userSymptomNames.some(s => s.includes('libido') || s.includes('deseo') || s.includes('sexual'))) {
      recommendations.push({
        category: 'Libido',
        title: '💑 Revitaliza tu Vida Sexual',
        description: 'Los cambios en el deseo sexual son normales. Aquí hay formas de reconectar:',
        actions: [
          'Comunica abiertamente con tu pareja sobre tus sentimientos',
          'Aumenta el tiempo de intimidad sin presión',
          'Prueba técnicas de mindfulness durante la intimidad',
          'Considera lubricantes para mayor comodidad',
          'Realiza ejercicios de Kegel para aumentar sensibilidad',
          'Consulta con un especialista si es necesario'
        ],
        icon: '💑'
      });
    }

    // Recomendación general si no hay síntomas específicos
    if (recommendations.length === 0 && (userSymptoms?.length ?? 0) > 0) {
      recommendations.push({
        category: 'General',
        title: '✨ Bienestar General',
        description: 'Para mantener tu bienestar durante la menopausia:',
        actions: [
          'Mantén una alimentación equilibrada y nutritiva',
          'Realiza ejercicio regular (cardio, fuerza, flexibilidad)',
          'Practica técnicas de relajación y mindfulness',
          'Busca apoyo social y emocional',
          'Realiza revisiones médicas regulares'
        ],
        icon: '✨'
      });
    }

    return recommendations;
  };

  const filteredSymptoms = allSymptoms?.filter((s) => s.category === selectedCategory) || [];

  const handleAddSymptom = (symptomId: number) => {
    const severity = selectedSymptoms[symptomId]?.severity || 5;
    const frequency = selectedSymptoms[symptomId]?.frequency || "ocasional";

    addSymptomMutation.mutate({
      symptomId,
      severity,
      frequency,
    });
  };

  const handleUpdateSymptom = (userSymptomId: number, symptomId: number) => {
    const severity = selectedSymptoms[symptomId]?.severity || 5;
    const frequency = selectedSymptoms[symptomId]?.frequency || "ocasional";

    updateSymptomMutation.mutate({
      userSymptomId,
      severity,
      frequency,
    });
  };

  const handleDeleteSymptom = (userSymptomId: number) => {
    deleteSymptomMutation.mutate({
      userSymptomId,
    });
  };

  const toggleSymptomExpand = (symptomId: number) => {
    setExpandedSymptom(expandedSymptom === symptomId ? null : symptomId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Inicia sesión para acceder</CardTitle>
            <CardDescription>Necesitas estar autenticada para usar el simulador de síntomas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-pink-500 hover:bg-pink-600">Iniciar Sesión</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-900">Simulador de Síntomas</h1>
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

        {/* Valor Inicial */}
        <Card className="mb-8 border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-white">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">¿Por qué usar el Simulador de Síntomas?</h3>
              <p className="text-gray-700 leading-relaxed">
                La menopausia afecta a cada mujer de manera diferente. Este simulador te ayuda a identificar exactamente qué síntomas experimentas, su intensidad y frecuencia, y recibe recomendaciones personalizadas.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Entender tu cuerpo y descubrir patrones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Recibir recomendaciones personalizadas según tus síntomas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Tomar decisiones informadas sobre tratamientos</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Selecciona una Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className={selectedCategory === cat ? "bg-pink-500 hover:bg-pink-600" : ""}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {categoryLabels[cat]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Symptoms Grid */}
            <Card>
              <CardHeader>
                <CardTitle>{categoryLabels[selectedCategory]}</CardTitle>
                <CardDescription>Haz clic en un síntoma para expandir y agregar detalles</CardDescription>
              </CardHeader>
              <CardContent>
                {symptomsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                  </div>
                ) : filteredSymptoms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay síntomas en esta categoría
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSymptoms.map((symptom) => {
                      const userSymptom = userSymptoms?.find((us) => us.symptomId === symptom.id);
                      const isExpanded = expandedSymptom === symptom.id;
                      const severity = selectedSymptoms[symptom.id]?.severity || userSymptom?.severity || 5;
                      const frequency = (selectedSymptoms[symptom.id]?.frequency || userSymptom?.frequency || "ocasional") as "diaria" | "varias_veces_semana" | "semanal" | "ocasional";

                      return (
                        <div key={symptom.id} className={`border-2 rounded-lg transition cursor-pointer ${isExpanded ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
                          <div 
                            className="p-4 flex items-start justify-between"
                            onClick={() => toggleSymptomExpand(symptom.id)}
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{symptom.name}</h4>
                              {symptom.description && (
                                <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                              )}
                              {userSymptom && (
                                <div className="mt-2 flex gap-2">
                                  <Badge className="bg-green-100 text-green-800">Registrado</Badge>
                                  <Badge className="bg-blue-100 text-blue-800">Intensidad: {userSymptom.severity}/10</Badge>
                                  <Badge className="bg-purple-100 text-purple-800">{userSymptom.frequency}</Badge>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {userSymptom && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                          </div>

                          {/* Contenido Expandido */}
                          {isExpanded && (
                            <div className="border-t border-pink-200 p-4 space-y-4 bg-white">
                              {/* Severity Slider */}
                              <div>
                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                  Intensidad: {severity}/10
                                </label>
                                <Slider
                                  value={[severity]}
                                  onValueChange={(value) => {
                                    setSelectedSymptoms({
                                      ...selectedSymptoms,
                                      [symptom.id]: {
                                        severity: value[0],
                                        frequency: (selectedSymptoms[symptom.id]?.frequency || "ocasional") as "diaria" | "varias_veces_semana" | "semanal" | "ocasional",
                                      },
                                    });
                                  }}
                                  min={1}
                                  max={10}
                                  step={1}
                                  className="mt-2"
                                />
                              </div>

                              {/* Frequency Selector */}
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-3 block">
                                  Frecuencia
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {["diaria", "varias_veces_semana", "semanal", "ocasional"].map((freq) => (
                                    <Button
                                      key={freq}
                                      size="sm"
                                      variant={frequency === freq ? "default" : "outline"}
                                      className={frequency === freq ? "bg-pink-500 hover:bg-pink-600" : ""}
                                      onClick={() => {
                                        setSelectedSymptoms({
                                          ...selectedSymptoms,
                                          [symptom.id]: {
                                            severity,
                                            frequency: freq as "diaria" | "varias_veces_semana" | "semanal" | "ocasional",
                                          },
                                        });
                                      }}
                                    >
                                      {freq === "diaria" ? "Diaria" : freq === "varias_veces_semana" ? "Varias veces/semana" : freq === "semanal" ? "Semanal" : "Ocasional"}
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                {userSymptom ? (
                                  <>
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                                      onClick={() => handleUpdateSymptom(userSymptom.id, symptom.id)}
                                    >
                                      Actualizar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteSymptom(userSymptom.id)}
                                    >
                                      Eliminar
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-pink-500 hover:bg-pink-600"
                                    onClick={() => handleAddSymptom(symptom.id)}
                                  >
                                    Agregar Síntoma
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Recomendaciones Personalizadas */}
          <div className="space-y-6">
            {/* Button to show/hide recommendations */}
            {(userSymptoms?.length ?? 0) > 0 && (
              <Button
                onClick={() => setShowRecommendations(!showRecommendations)}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showRecommendations ? "Ocultar" : "Ver"} Recomendaciones ({recommendations.length})
              </Button>
            )}

            {showRecommendations && recommendations.length > 0 && (
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Recomendaciones Personalizadas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg border border-green-200 space-y-3">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <span>{rec.icon}</span>
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-700">{rec.description}</p>
                      <ul className="space-y-2">
                        {rec.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="flex gap-2 text-sm text-gray-700">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Resumen de Síntomas */}
            {userSymptoms && userSymptoms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tu Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Síntomas registrados</p>
                    <p className="text-3xl font-bold text-pink-600">{userSymptoms.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Síntomas por categoría</p>
                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const count = userSymptoms.filter(s => s.symptomCategory === cat).length;
                        return count > 0 ? (
                          <div key={cat} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{categoryLabels[cat]}</span>
                            <Badge className={categoryColors[cat]}>{count}</Badge>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">Intensidad promedio: {userSymptoms.length > 0 ? (userSymptoms.reduce((sum, s) => sum + s.severity, 0) / userSymptoms.length).toFixed(1) : 0}/10</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {(!userSymptoms || userSymptoms.length === 0) && (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="pt-6 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Aún no has registrado síntomas</p>
                  <p className="text-sm text-gray-500 mt-1">Selecciona síntomas para obtener recomendaciones personalizadas</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
