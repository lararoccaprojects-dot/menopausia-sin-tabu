import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell4SelfEsteemKit() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"affirmations" | "saying-no">("affirmations");

  const affirmations = [
    { id: 1, text: "Soy digna de amor y respeto", category: "Amor Propio" },
    { id: 2, text: "Mi cuerpo es sabio y hermoso", category: "Aceptación" },
    { id: 3, text: "Merezco cuidarme a mí misma", category: "Autocuidado" },
    { id: 4, text: "Mis límites son saludables", category: "Límites" },
    { id: 5, text: "Soy fuerte y resiliente", category: "Fortaleza" }
  ];

  const sayingNoWeeks = [
    {
      id: 1,
      week: "Semana 1",
      title: "Preparación Mental",
      duration: "7 días",
      tasks: [
        "Autoevaluación de patrones de 'sí'",
        "Identificar miedos subyacentes",
        "3 afirmaciones diarias"
      ],
      actionable: "Escribe: ¿Por qué me cuesta decir 'no'?"
    },
    {
      id: 2,
      week: "Semana 2",
      title: "Práctica en Espejo",
      duration: "7 días",
      tasks: [
        "Crear 5 frases personalizadas de 'no'",
        "Practicar en el espejo diariamente",
        "Visualización guiada"
      ],
      actionable: "Practica frente al espejo 10 minutos diarios"
    },
    {
      id: 3,
      week: "Semana 3",
      title: "Bajo Riesgo",
      duration: "7 días",
      tasks: [
        "Identificar 3 oportunidades de bajo riesgo",
        "Ejecutar tu primer 'no'",
        "Reflexionar sobre resultados"
      ],
      actionable: "Di 'no' a algo pequeño esta semana"
    },
    {
      id: 4,
      week: "Semana 4",
      title: "Consolidación",
      duration: "7 días",
      tasks: [
        "Un 'no' diario",
        "Observar patrones",
        "Celebrar logros"
      ],
      actionable: "Integra 'no' en tu rutina diaria"
    }
  ];

  const toggleWeek = (id: number) => {
    setExpandedWeek(expandedWeek === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    if (completedWeeks.includes(id)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== id));
    } else {
      setCompletedWeeks([...completedWeeks, id]);
      toast.success("¡Semana completada!");
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Descargando: ${title}`);
  };

  const progress = Math.round((completedWeeks.length / sayingNoWeeks.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-600" />
              <h1 className="text-3xl font-bold text-gray-900">Kit de Autoestima Positiva</h1>
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
          <div className="w-full bg-amber-100 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Ama tu vida</h3>
              <p className="text-gray-700 text-sm">
                5 afirmaciones diarias para cultivar amor propio + Plan de 4 semanas para aprender a decir 'no' sin culpa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex gap-2 border-b border-amber-200">
          <button
            onClick={() => setActiveTab("affirmations")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "affirmations"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-600"
            }`}
          >
            💕 Afirmaciones Diarias
          </button>
          <button
            onClick={() => setActiveTab("saying-no")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "saying-no"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-600"
            }`}
          >
            🛑 Plan: Decir No
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 space-y-4">
        {activeTab === "affirmations" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {affirmations.map((aff) => (
                <Card
                  key={aff.id}
                  className="border-2 border-amber-200 hover:border-amber-400 transition-all p-6"
                >
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900">{aff.text}</p>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded inline-block mt-2">
                        {aff.category}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-6 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
              <h3 className="font-bold text-gray-900 mb-3">Cómo usar estas afirmaciones:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Repite una cada mañana al despertar</li>
                <li>✓ Escríbela 3 veces en tu diario</li>
                <li>✓ Úsala como recordatorio en tu teléfono</li>
                <li>✓ Combina con meditación de 5 minutos</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === "saying-no" && (
          <>
            {sayingNoWeeks.map((week) => (
              <Card
                key={week.id}
                className={`border-2 transition-all ${
                  completedWeeks.includes(week.id)
                    ? "border-amber-400 bg-amber-50"
                    : "border-amber-200 hover:border-amber-400"
                }`}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleWeek(week.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-amber-600">{week.week}</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          {week.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{week.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {completedWeeks.includes(week.id) && (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      )}
                      {expandedWeek === week.id ? (
                        <ChevronUp className="w-5 h-5 text-amber-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </div>

                  {/* Tareas */}
                  <div className="mt-4 space-y-2">
                    {week.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold text-sm">•</span>
                        <span className="text-sm text-gray-700">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expandido */}
                {expandedWeek === week.id && (
                  <div className="border-t border-amber-200 px-6 py-6 bg-amber-50">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Tu acción esta semana:</h4>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border-l-4 border-amber-600">
                          {week.actionable}
                        </p>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-amber-200">
                        <Button
                          onClick={() => toggleComplete(week.id)}
                          className={`flex-1 ${
                            completedWeeks.includes(week.id)
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-amber-600 hover:bg-amber-700"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {completedWeeks.includes(week.id)
                            ? "Completado"
                            : "Marcar como completado"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDownload(week.title)}
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
          </>
        )}
      </div>

      {/* Consejo Final */}
      <div className="container mx-auto px-4 mt-12">
        <Card className="bg-gradient-to-r from-amber-600 to-amber-700 border-0 text-white">
          <CardContent className="pt-6">
            <p className="text-center text-lg font-semibold">
              ✨ Tu autoestima es tu superpoder. Cultívala cada día.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
