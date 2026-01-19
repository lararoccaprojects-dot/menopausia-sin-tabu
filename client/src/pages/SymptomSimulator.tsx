import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Heart, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
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

export default function SymptomSimulator() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("hormonal");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<number, { severity: number; frequency: "diaria" | "varias_veces_semana" | "semanal" | "ocasional" }>>(
    {}
  );
  const [showReport, setShowReport] = useState(false);

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
    },
    onError: () => {
      toast.error("Error al agregar síntoma");
    },
  });

  const updateSymptomMutation = trpc.symptoms.updateSymptom.useMutation({
    onSuccess: () => {
      toast.success("Síntoma actualizado");
      refetchUserSymptoms();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-gray-900">Simulador de Síntomas</h1>
          </div>
          <p className="text-lg text-gray-600">
            Registra y monitorea tus síntomas de menopausia. Entiende patrones y recibe recomendaciones personalizadas.
          </p>
        </div>

        {/* Valor Inicial */}
        <Card className="mb-8 border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-white">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Simulador de Síntomas</h3>
              <p className="text-gray-700 leading-relaxed">
                La menopausia afecta a cada mujer de manera diferente. Este simulador te ayuda a identificar exactamente qué síntomas experimentas, su intensidad y frecuencia.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Entender tu cuerpo y descubrir patrones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Tomar decisiones informadas sobre tratamientos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Comunicar con tu médico de forma clara</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span className="text-gray-700">Recibir recomendaciones personalizadas</span>
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
                <CardDescription>Selecciona los síntomas que experimentas</CardDescription>
              </CardHeader>
              <CardContent>
                {symptomsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredSymptoms.map((symptom) => {
                      const userSymptom = userSymptoms?.find((us) => us.symptomId === symptom.id);
                      const isSelected = !!userSymptom || selectedSymptoms[symptom.id];
                      const severity = selectedSymptoms[symptom.id]?.severity || userSymptom?.severity || 5;
                      const frequency = (selectedSymptoms[symptom.id]?.frequency || userSymptom?.frequency || "ocasional") as "diaria" | "varias_veces_semana" | "semanal" | "ocasional";

                      return (
                        <div key={symptom.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-300 transition">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{symptom.name}</h4>
                              {symptom.description && (
                                <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                              )}
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                          </div>

                          {isSelected && (
                            <div className="space-y-4">
                              {/* Severity Slider */}
                              <div>
                                <label className="text-sm font-medium text-gray-700">
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
                                  className="w-full"
                                />
                              </div>

                              {/* Frequency Selector */}
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  Frecuencia
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {(["diaria", "varias_veces_semana", "semanal", "ocasional"] as const).map((freq) => (
                                    <Button
                                      key={freq}
                                      size="sm"
                                      variant={frequency === freq ? "default" : "outline"}
                                      className={frequency === freq ? "bg-pink-500 hover:bg-pink-600" : ""}
                                      onClick={() => {
                                        setSelectedSymptoms({
                                          ...selectedSymptoms,
                                          [symptom.id]: {
                                            severity: selectedSymptoms[symptom.id]?.severity || 5,
                                            frequency: freq,
                                          },
                                        });
                                      }}
                                    >
                                      {freq.replace(/_/g, " ")}
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
                                      className="bg-blue-500 hover:bg-blue-600"
                                      onClick={() => handleUpdateSymptom(userSymptom.id, symptom.id)}
                                      disabled={updateSymptomMutation.isPending}
                                    >
                                      {updateSymptomMutation.isPending ? "Actualizando..." : "Actualizar"}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteSymptom(userSymptom.id)}
                                      disabled={deleteSymptomMutation.isPending}
                                    >
                                      {deleteSymptomMutation.isPending ? "Eliminando..." : "Eliminar"}
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() => handleAddSymptom(symptom.id)}
                                    disabled={addSymptomMutation.isPending}
                                  >
                                    {addSymptomMutation.isPending ? "Agregando..." : "Agregar"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          {!isSelected && (
                            <Button
                              size="sm"
                              className="w-full bg-pink-500 hover:bg-pink-600"
                              onClick={() => {
                                setSelectedSymptoms({
                                  ...selectedSymptoms,
                                  [symptom.id]: {
                                    severity: 5,
                                    frequency: "ocasional",
                                  },
                                });
                              }}
                            >
                              Seleccionar
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Summary & Report */}
          <div className="space-y-6">
            {/* Summary Card */}
            {userSymptoms && userSymptoms.length > 0 && (
              <Card className="bg-gradient-to-br from-pink-50 to-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-500" />
                    Resumen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Total de Síntomas</p>
                    <p className="text-3xl font-bold text-gray-900">{userSymptoms.length}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Intensidad Promedio</p>
                    <p className="text-3xl font-bold text-pink-500">
                      {Math.round(userSymptoms.reduce((sum, s) => sum + s.severity, 0) / userSymptoms.length)}/10
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Por Categoría</p>
                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const count = userSymptoms.filter((s) => s.symptomCategory === cat).length;
                        return count > 0 ? (
                          <div key={cat} className="flex justify-between items-center">
                            <Badge className={categoryColors[cat]}>{categoryLabels[cat]}</Badge>
                            <span className="font-semibold text-gray-900">{count}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => setShowReport(!showReport)}
                  >
                    {showReport ? "Ocultar Reporte" : "Ver Reporte Completo"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Report Card */}
            {showReport && report && (
              <Card className="border-2 border-green-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600" />
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report && typeof report === "object" && "recommendations" in report && report.recommendations && JSON.parse(report.recommendations as string).map((rec: string, i: number) => (
                      <div key={i} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!userSymptoms || userSymptoms.length === 0 && (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="py-8 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Selecciona síntomas para comenzar a monitorear tu salud
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
