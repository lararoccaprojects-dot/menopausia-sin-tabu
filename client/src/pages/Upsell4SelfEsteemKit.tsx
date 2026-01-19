import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Upsell4SelfEsteemKit() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [favoriteAffirmations, setFavoriteAffirmations] = useState<number[]>([]);

  const affirmations = [
    { id: 1, day: 1, text: "Soy valiosa tal como soy, con todos mis cambios", category: "Valor Personal" },
    { id: 2, day: 2, text: "Mi cuerpo es sabio y me guía hacia lo que necesito", category: "Aceptación Corporal" },
    { id: 3, day: 3, text: "Merezco amor, respeto y cuidado de mí misma", category: "Amor Propio" },
    { id: 4, day: 4, text: "Mis experiencias me han hecho más fuerte y sabia", category: "Fortaleza" },
    { id: 5, day: 5, text: "Elijo enfocarse en lo que puedo controlar", category: "Empoderamiento" },
    { id: 6, day: 6, text: "Soy hermosa en cada etapa de mi vida", category: "Belleza" },
    { id: 7, day: 7, text: "Tengo derecho a establecer límites saludables", category: "Límites" },
    { id: 8, day: 8, text: "Mi voz importa y merece ser escuchada", category: "Voz Propia" },
    { id: 9, day: 9, text: "Soy capaz de crear la vida que deseo", category: "Capacidad" },
    { id: 10, day: 10, text: "Elijo la compasión conmigo misma en lugar de la crítica", category: "Autocompasión" },
    { id: 11, day: 11, text: "Mi menopausia es una transición, no un final", category: "Perspectiva" },
    { id: 12, day: 12, text: "Soy suficiente, exactamente como soy ahora", category: "Suficiencia" },
    { id: 13, day: 13, text: "Merezco disfrutar de la vida plenamente", category: "Disfrute" },
    { id: 14, day: 14, text: "Soy resiliente y puedo manejar los desafíos", category: "Resiliencia" },
    { id: 15, day: 15, text: "Mi valor no depende de mi apariencia o edad", category: "Valor Intrínseco" },
    { id: 16, day: 16, text: "Elijo invertir en mi bienestar y felicidad", category: "Prioridades" },
    { id: 17, day: 17, text: "Soy digna de la mejor versión de mí misma", category: "Dignidad" },
    { id: 18, day: 18, text: "Mis sentimientos son válidos y merecen atención", category: "Validación" },
    { id: 19, day: 19, text: "Soy una obra maestra en progreso", category: "Crecimiento" },
    { id: 20, day: 20, text: "Elijo la gratitud por lo que mi cuerpo ha hecho", category: "Gratitud" },
    { id: 21, day: 21, text: "Tengo el poder de cambiar mi narrativa", category: "Empoderamiento" },
    { id: 22, day: 22, text: "Soy fuerte, inteligente y capaz", category: "Fortaleza" },
    { id: 23, day: 23, text: "Merezco relaciones que me valoren y respeten", category: "Relaciones" },
    { id: 24, day: 24, text: "Mi edad es una ventaja, no una desventaja", category: "Edad" },
    { id: 25, day: 25, text: "Soy libre para ser auténtica y verdadera", category: "Autenticidad" },
    { id: 26, day: 26, text: "Elijo el amor propio sobre la perfección", category: "Amor Propio" },
    { id: 27, day: 27, text: "Soy una inspiración para otras mujeres", category: "Inspiración" },
    { id: 28, day: 28, text: "Mi futuro es brillante y lleno de posibilidades", category: "Futuro" },
    { id: 29, day: 29, text: "Soy merecedora de éxito y felicidad", category: "Merecimiento" },
    { id: 30, day: 30, text: "Amo y acepto todas las partes de mí misma", category: "Aceptación Total" }
  ];

  const exercises = [
    { day: 1, title: "Espejo de Amor", description: "Mira al espejo y repite tu afirmación 3 veces con convicción" },
    { day: 2, title: "Diario de Gratitud", description: "Escribe 3 cosas que agradeces de tu cuerpo" },
    { day: 3, title: "Acto de Bondad", description: "Haz algo amable por ti misma hoy" },
    { day: 4, title: "Reflexión", description: "Piensa en un desafío que superaste" },
    { day: 5, title: "Afirmación en Movimiento", description: "Camina mientras repites tu afirmación" },
    { day: 6, title: "Foto de Poder", description: "Toma una foto donde te sientas hermosa" },
    { day: 7, title: "Límite Saludable", description: "Establece un límite que necesites" },
    { day: 8, title: "Expresión Creativa", description: "Escribe, dibuja o canta tu verdad" },
    { day: 9, title: "Visualización", description: "Visualiza la vida que deseas crear" },
    { day: 10, title: "Autocuidado", description: "Dedica 30 minutos a ti misma sin culpa" }
  ];

  const toggleComplete = (id: number) => {
    setCompletedDays(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavoriteAffirmations(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    toast.success("Afirmación agregada a favoritos");
  };

  const completionPercentage = Math.round((completedDays.length / 30) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
          <p className="text-gray-600">
            30 afirmaciones diarias con ejercicios para fortalecer tu autoestima
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Section */}
        <Card className="p-6 mb-8 border-2 border-amber-200 bg-amber-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tu Progreso</h2>
            <span className="text-2xl font-bold text-amber-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-amber-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedDays.length} de 30 días completados
          </p>
        </Card>

        {/* Affirmations Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {affirmations.map(affirmation => (
            <Card key={affirmation.id} className="p-4 border-2 border-amber-100 hover:border-amber-400 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      Día {affirmation.day}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {affirmation.category}
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold">{affirmation.text}</p>
                </div>
                <div className="flex gap-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => toggleFavorite(affirmation.id)}
                    className="p-1"
                  >
                    <Heart
                      size={20}
                      className={favoriteAffirmations.includes(affirmation.id) ? "fill-red-500 text-red-500" : "text-gray-300"}
                    />
                  </button>
                  <button
                    onClick={() => toggleComplete(affirmation.id)}
                  >
                    <CheckCircle2
                      size={20}
                      className={completedDays.includes(affirmation.id) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                    />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Exercises Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ejercicios Diarios</h2>
          <div className="space-y-4">
            {exercises.map((exercise, idx) => (
              <Card key={idx} className="p-4 border-2 border-green-100 bg-green-50">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-green-600">{exercise.day}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="p-6 border-2 border-purple-200 bg-purple-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Consejos para Maximizar Resultados</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Repetición:</strong> Repite cada afirmación al menos 3 veces al día</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Convicción:</strong> Siéntela, no solo la digas. Cree en cada palabra</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Consistencia:</strong> Haz esto todos los días, especialmente en momentos difíciles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Personalización:</strong> Adapta las afirmaciones a tu situación personal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-lg">✓</span>
              <span className="text-gray-700"><strong>Ambiente:</strong> Crea un espacio tranquilo y positivo para practicar</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
