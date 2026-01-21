import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  description: string;
  fields: { label: string; placeholder: string; type: "text" | "textarea" }[];
}

export default function Upsell4SelfEsteemKit() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"affirmations" | "saying-no" | "templates">("affirmations");
  const [templateValues, setTemplateValues] = useState<{ [key: string]: string }>({});

  const affirmations = [
    { id: 1, text: "Soy digna de amor y respeto", category: "Amor Propio" },
    { id: 2, text: "Mi cuerpo es sabio y hermoso", category: "Aceptación" },
    { id: 3, text: "Merezco cuidarme a mí misma", category: "Autocuidado" },
    { id: 4, text: "Mis límites son saludables", category: "Límites" },
    { id: 5, text: "Soy fuerte y resiliente", category: "Fortaleza" }
  ];

  const templates: Template[] = [
    {
      id: "gratitude-diary",
      title: "Diario de Gratitud",
      description: "Registra 3 cosas por las que estés agradecida cada día",
      fields: [
        { label: "Fecha", placeholder: "DD/MM/YYYY", type: "text" },
        { label: "Cosa 1 por la que estoy agradecida", placeholder: "Ej: Mi salud, mi familia...", type: "textarea" },
        { label: "Cosa 2 por la que estoy agradecida", placeholder: "Ej: Un momento de paz...", type: "textarea" },
        { label: "Cosa 3 por la que estoy agradecida", placeholder: "Ej: Un logro hoy...", type: "textarea" },
        { label: "¿Cómo me siento?", placeholder: "Describe tu estado emocional", type: "textarea" }
      ]
    },
    {
      id: "self-esteem-goals",
      title: "Metas de Autoestima",
      description: "Define objetivos específicos para fortalecer tu autoestima",
      fields: [
        { label: "Mes/Período", placeholder: "Ej: Enero 2025", type: "text" },
        { label: "Meta 1: Amor Propio", placeholder: "Ej: Practicar 5 minutos de meditación diaria", type: "textarea" },
        { label: "Meta 2: Límites Saludables", placeholder: "Ej: Decir 'no' a una solicitud esta semana", type: "textarea" },
        { label: "Meta 3: Autocuidado", placeholder: "Ej: Dedicar 1 hora a algo que me gusta", type: "textarea" },
        { label: "¿Por qué estas metas son importantes?", placeholder: "Describe tu motivación", type: "textarea" }
      ]
    },
    {
      id: "achievements-log",
      title: "Registro de Logros",
      description: "Documenta tus logros, por pequeños que sean",
      fields: [
        { label: "Fecha", placeholder: "DD/MM/YYYY", type: "text" },
        { label: "Logro 1", placeholder: "Ej: Dije 'no' sin culpa", type: "textarea" },
        { label: "Logro 2", placeholder: "Ej: Completé una tarea difícil", type: "textarea" },
        { label: "Logro 3", placeholder: "Ej: Cuidé de mí misma", type: "textarea" },
        { label: "¿Cómo me siento con estos logros?", placeholder: "Reflexiona sobre tu progreso", type: "textarea" },
        { label: "¿Qué aprendí?", placeholder: "Lecciones de esta semana", type: "textarea" }
      ]
    },
    {
      id: "self-love-letter",
      title: "Carta de Amor Propio",
      description: "Escribe una carta a ti misma expresando amor y apoyo",
      fields: [
        { label: "Fecha", placeholder: "DD/MM/YYYY", type: "text" },
        { label: "Mi querida [Tu nombre]", placeholder: "Comienza tu carta", type: "textarea" },
        { label: "Lo que más admiro de ti", placeholder: "Tus cualidades, fortalezas...", type: "textarea" },
        { label: "Estoy orgullosa de ti porque", placeholder: "Tus logros recientes...", type: "textarea" },
        { label: "Quiero recordarte que", placeholder: "Mensajes de apoyo para ti misma", type: "textarea" },
        { label: "Con amor", placeholder: "Cierra tu carta", type: "textarea" }
      ]
    }
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

  const handleTemplateInputChange = (templateId: string, fieldIndex: number, value: string) => {
    const key = `${templateId}-field-${fieldIndex}`;
    setTemplateValues({ ...templateValues, [key]: value });
  };

  const downloadTemplate = (template: Template) => {
    const values = template.fields.map((field, idx) => {
      const key = `${template.id}-field-${idx}`;
      return `${field.label}:\n${templateValues[key] || ""}\n`;
    }).join("\n");

    const content = `${template.title}\n${"=".repeat(template.title.length)}\n\n${template.description}\n\n${values}`;
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `plantilla-${template.id}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Plantilla descargada");
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
          {activeTab === "saying-no" && (
            <>
              <div className="w-full bg-amber-100 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
            </>
          )}
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Ama tu vida</h3>
              <p className="text-gray-700 text-sm">
                5 afirmaciones diarias para cultivar amor propio + Plan de 4 semanas para aprender a decir 'no' sin culpa + Plantillas autorellenables para tu crecimiento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex gap-2 border-b border-amber-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("affirmations")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "affirmations"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-600"
            }`}
          >
            💕 Afirmaciones Diarias
          </button>
          <button
            onClick={() => setActiveTab("saying-no")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "saying-no"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-600"
            }`}
          >
            🛑 Plan: Decir No
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "templates"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-600"
            }`}
          >
            📝 Plantillas
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
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </>
        )}

        {activeTab === "templates" && (
          <>
            <div className="space-y-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-2 border-amber-200">
                  <CardHeader
                    className="cursor-pointer hover:bg-amber-50"
                    onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-amber-700">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      {expandedTemplate === template.id ? (
                        <ChevronUp className="w-5 h-5 text-amber-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedTemplate === template.id && (
                    <CardContent className="space-y-4">
                      {template.fields.map((field, idx) => (
                        <div key={idx} className="space-y-2">
                          <label className="text-sm font-semibold text-gray-900">{field.label}</label>
                          {field.type === "textarea" ? (
                            <textarea
                              placeholder={field.placeholder}
                              value={templateValues[`${template.id}-field-${idx}`] || ""}
                              onChange={(e) => handleTemplateInputChange(template.id, idx, e.target.value)}
                              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none resize-none"
                              rows={3}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder={field.placeholder}
                              value={templateValues[`${template.id}-field-${idx}`] || ""}
                              onChange={(e) => handleTemplateInputChange(template.id, idx, e.target.value)}
                              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                            />
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={() => downloadTemplate(template)}
                        className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Descargar Plantilla Completada
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
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
