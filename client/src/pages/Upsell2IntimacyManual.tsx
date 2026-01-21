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
      exercises: [
        {
          name: "Mapeo de Cambios",
          steps: [
            "Haz una lista: ¿Qué cambios has notado en tu deseo?",
            "Anota cambios físicos (sequedad, sensibilidad, energía)",
            "Identifica qué sigue siendo igual (emociones, conexión)",
            "Compara con hace 6 meses",
            "Reconoce que esto es normal y temporal"
          ]
        },
        {
          name: "Exploración Corporal",
          steps: [
            "Dedica 20 minutos a explorar tu cuerpo sin presión",
            "Nota qué sensaciones te agradan",
            "Identifica zonas sensibles (cuello, pecho, muslos)",
            "Sin objetivo de excitación, solo exploración",
            "Toma notas sobre lo que descubriste"
          ]
        },
        {
          name: "Conversación Interna",
          steps: [
            "Escribe una carta a tu cuerpo",
            "Agradécele por los cambios que está atravesando",
            "Expresa cualquier frustración o miedo",
            "Termina con aceptación y amor propio",
            "Lee la carta en momentos de duda"
          ]
        }
      ]
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
      exercises: [
        {
          name: "Práctica de Comunicación",
          steps: [
            "Escribe 3 cosas que necesitas comunicar",
            "Practica frente al espejo con tono amable",
            "Elige un momento tranquilo (no en la cama)",
            "Usa frases como: 'Me siento...' y 'Necesito...'",
            "Invita a tu pareja a compartir sus sentimientos también"
          ]
        },
        {
          name: "Escucha Activa",
          steps: [
            "Cuando tu pareja hable, escucha sin interrumpir",
            "Haz preguntas para entender mejor",
            "Repite lo que escuchaste para confirmar",
            "Valida sus sentimientos aunque sean diferentes",
            "Busquen soluciones juntos"
          ]
        },
        {
          name: "Ritual de Conexión",
          steps: [
            "Establece un momento semanal para hablar",
            "Crea un espacio cómodo (té, velas, sin distracciones)",
            "Comparte un sentimiento positivo y uno de desafío",
            "Escuchen mutuamente sin juzgar",
            "Terminen con un abrazo o gesto de cariño"
          ]
        }
      ]
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
      exercises: [
        {
          name: "Prueba de Lubricantes",
          steps: [
            "Investiga 3 lubricantes naturales (coco, almendra, rosa mosqueta)",
            "Prueba cada uno en pequeñas cantidades",
            "Anota cuál se siente mejor y más cómodo",
            "Busca marcas de calidad sin químicos",
            "Establece cuál usarás regularmente"
          ]
        },
        {
          name: "Masaje Sensual",
          steps: [
            "Dedica 15 minutos a masajear tu cuerpo",
            "Usa aceite natural (almendra, coco o rosa mosqueta)",
            "Masajea cuello, hombros, brazos, muslos",
            "Sé gentil y consciente de las sensaciones",
            "Aumenta la circulación y el flujo sanguíneo"
          ]
        },
        {
          name: "Ejercicios de Kegel Mejorados",
          steps: [
            "Contrae los músculos pélvicos por 3 segundos",
            "Relaja por 3 segundos",
            "Repite 10 veces, 3 veces al día",
            "Aumenta gradualmente a 5-10 segundos",
            "Mejora sensibilidad y placer"
          ]
        }
      ]
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
      exercises: [
        {
          name: "Noche de Conexión",
          steps: [
            "Planifica una noche especial sin presión de resultados",
            "Crea ambiente: velas, música, luz tenue",
            "Enfócate en besos, abrazos y caricias",
            "Comunica qué te gusta en cada momento",
            "Disfruta la conexión sin objetivos"
          ]
        },
        {
          name: "Exploración Mutua",
          steps: [
            "Acuerda con tu pareja explorar juntos",
            "Tómense tiempo para descubrir nuevas sensaciones",
            "Comuniquen qué les gusta y qué no",
            "Sin presión de penetración",
            "Enfócate en el placer mutuo"
          ]
        },
        {
          name: "Fantasía Compartida",
          steps: [
            "Escribe 3 fantasías que te gustaría explorar",
            "Comparte con tu pareja en un momento tranquilo",
            "Escucha sus fantasías también",
            "Juntos decidan qué podrían probar",
            "Creen nuevas experiencias juntos"
          ]
        }
      ]
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
    const chapter = chapters.find(c => c.title === title);
    if (!chapter) return;

    let content = `MANUAL DE INTIMIDAD SALUDABLE\n`;
    content += `Capítulo: ${title}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `DESCRIPCIÓN:\n${chapter.description}\n\n`;
    
    content += `PUNTOS CLAVE:\n`;
    chapter.keyPoints.forEach((point, idx) => {
      content += `${idx + 1}. ${point}\n`;
    });
    content += `\n`;

    content += `EJERCICIOS:\n`;
    chapter.exercises.forEach((exercise, exIdx) => {
      content += `\nEjercicio ${exIdx + 1}: ${exercise.name}\n`;
      content += `${'-'.repeat(40)}\n`;
      exercise.steps.forEach((step, stepIdx) => {
        content += `${stepIdx + 1}. ${step}\n`;
      });
    });

    content += `\n\nConsejo: Practica con paciencia y compasión. La intimidad es un viaje, no un destino.\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${title.replace(/\s+/g, '_')}_Ejercicios.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Descargado: ${title}`);
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
              <h3 className="text-lg font-bold text-gray-900">¿Por qué este programa?</h3>
              <p className="text-gray-700 text-sm">
                4 capítulos prácticos con 12 ejercicios diseñados para ayudarte a navegar los cambios en la intimidad durante la menopausia. Cada ejercicio es simple, toma 10-20 minutos y puedes hacerlo hoy mismo.
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
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  {/* Ejercicios */}
                  <div className="space-y-6">
                    {chapter.exercises.map((exercise, exIdx) => (
                      <div key={exIdx}>
                        <h4 className="font-bold text-gray-900 mb-3">
                          Ejercicio {exIdx + 1}: {exercise.name}
                        </h4>
                        <div className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <span className="font-bold text-rose-600 flex-shrink-0">
                                {idx + 1}.
                              </span>
                              <p className="text-sm text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Acciones */}
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
              💕 Consejo: La intimidad es conexión. Sé paciente contigo misma y con tu pareja.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
