import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell2IntimacyManual() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const chapters = [
    {
      id: 1,
      title: "Entendiendo los cambios en la intimidad",
      description: "Cómo la menopausia afecta la sexualidad y las relaciones",
      duration: "20 min",
      content: [
        "Cambios hormonales y su impacto en el deseo sexual",
        "Sequedad vaginal: causas y soluciones",
        "Cambios en la respuesta sexual",
        "Mitos sobre la sexualidad en la menopausia"
      ],
      assessment: [
        "¿Cómo ha cambiado tu deseo sexual?",
        "¿Qué cambios físicos has notado?",
        "¿Cómo afecta esto a tu relación?"
      ]
    },
    {
      id: 2,
      title: "Comunicación con tu pareja",
      description: "Cómo hablar abiertamente sobre intimidad y necesidades",
      duration: "25 min",
      content: [
        "Crear un espacio seguro para hablar",
        "Expresar necesidades sin culpa",
        "Escucha activa y empatía",
        "Resolver conflictos con compasión"
      ],
      assessment: [
        "¿Qué necesitas comunicar a tu pareja?",
        "¿Cuáles son tus miedos?",
        "¿Cómo puedes ser más vulnerable?"
      ]
    },
    {
      id: 3,
      title: "Soluciones naturales y médicas",
      description: "Opciones para mejorar la sequedad vaginal y el deseo",
      duration: "20 min",
      content: [
        "Lubricantes naturales y comerciales",
        "Hidratantes vaginales",
        "Terapia hormonal: opciones y consideraciones",
        "Suplementos y alimentos que ayudan"
      ],
      assessment: [
        "¿Qué soluciones te interesan?",
        "¿Has consultado con un médico?",
        "¿Cuál es tu preferencia: natural o médica?"
      ]
    },
    {
      id: 4,
      title: "Reavivar la pasión",
      description: "Estrategias para mantener o recuperar la conexión sexual",
      duration: "30 min",
      content: [
        "Crear rituals de intimidad",
        "Exploración sensual sin presión",
        "Fantasías y juegos seguros",
        "Redescubrir el placer"
      ],
      assessment: [
        "¿Qué te excitaba antes?",
        "¿Qué nuevas cosas quieres explorar?",
        "¿Cómo puedes crear más conexión?"
      ]
    },
    {
      id: 5,
      title: "Autoplacer y autosexualidad",
      description: "Conocer tu cuerpo y disfrutar de la sexualidad sola",
      duration: "25 min",
      content: [
        "La masturbación como parte de la salud sexual",
        "Exploración sin culpa",
        "Conocer tus zonas de placer",
        "Orgasmos y variedad"
      ],
      assessment: [
        "¿Cómo es tu relación con tu cuerpo?",
        "¿Qué te impide disfrutar?",
        "¿Qué necesitas para sentirte segura?"
      ]
    },
    {
      id: 6,
      title: "Intimidad más allá del sexo",
      description: "Conexión emocional, física y espiritual",
      duration: "20 min",
      content: [
        "Afecto y contacto físico",
        "Intimidad emocional profunda",
        "Conexión espiritual",
        "Intimidad sin penetración"
      ],
      assessment: [
        "¿Qué formas de intimidad valoras?",
        "¿Cómo puedes aumentar la conexión?",
        "¿Qué necesitas de tu pareja?"
      ]
    }
  ];

  const toggleComplete = (id: number) => {
    setCompletedChapters(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedChapters.length / chapters.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Manual de Intimidad Saludable</h3>
              <p className="text-gray-700 leading-relaxed">
                La intimidad durante la menopausia puede cambiar, pero no tiene que desaparecer. Este manual aborda 6 capítulos sobre comunicación con tu pareja, soluciones naturales para sequedad vaginal, reavivar la pasión y disfrutar plenamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <p className="text-gray-600">
            6 capítulos especializados para mantener una vida sexual plena durante la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-rose-200 bg-rose-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-rose-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-rose-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedChapters.length} de {chapters.length} capítulos completados
          </p>
        </Card>

        {/* Chapters Grid */}
        <div className="space-y-4">
          {chapters.map(chapter => (
            <Card key={chapter.id} className="p-6 border-2 border-rose-100 hover:border-rose-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{chapter.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                </div>
                <button
                  onClick={() => toggleComplete(chapter.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <CheckCircle2
                    size={24}
                    className={completedChapters.includes(chapter.id) ? "fill-rose-500 text-rose-500" : "text-gray-300"}
                  />
                </button>
              </div>

              {/* Chapter Info */}
              <div className="flex gap-4 mb-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {chapter.duration}
                </span>
              </div>

              {/* Expandable Content */}
              {expandedChapter === chapter.id && (
                <div className="mb-4 p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contenido del Capítulo:</h4>
                  <ul className="space-y-2 mb-4">
                    {chapter.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 mb-3">Preguntas de Autoevaluación:</h4>
                  <ul className="space-y-2">
                    {chapter.assessment.map((question, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-1">?</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                >
                  {expandedChapter === chapter.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Cerrar Capítulo
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver Capítulo
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-rose-500 text-rose-600 hover:bg-rose-50"
                  onClick={() => toggleComplete(chapter.id)}
                >
                  {completedChapters.includes(chapter.id) ? "✓ Completado" : "Marcar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="p-6 mt-8 border-2 border-green-200 bg-green-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Lo que lograrás con este manual</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Confianza renovada:</strong> Comprende y acepta los cambios en tu sexualidad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Comunicación mejorada:</strong> Habla abiertamente con tu pareja sin vergüenza</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Soluciones prácticas:</strong> Conoce opciones naturales y médicas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Conexión fortalecida:</strong> Reavivar la pasión y la intimidad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Placer redescubierto:</strong> Disfrutar de la sexualidad sin culpa</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
