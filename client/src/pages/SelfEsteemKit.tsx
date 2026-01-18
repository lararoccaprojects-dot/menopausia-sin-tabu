import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, Lock, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function SelfEsteemKit() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedAffirmation, setSelectedAffirmation] = useState(0);
  const [savedAffirmations, setSavedAffirmations] = useState<number[]>([]);

  const affirmations = [
    "Soy hermosa en cada etapa de mi vida",
    "Mi cuerpo es sabio y fuerte",
    "Merezco amor y respeto",
    "Mis cambios me hacen más sabia",
    "Soy valiosa tal como soy",
    "Mi salud es mi prioridad",
    "Tengo el poder de crear mi vida",
    "Soy resiliente y capaz",
    "Mi belleza viene de adentro",
    "Merezco cuidarme y amarme",
    "Cada día es una oportunidad nueva",
    "Soy más que mis síntomas",
    "Mi voz importa y es escuchada",
    "Soy digna de felicidad",
    "Puedo lograr lo que me propongo",
    "Mi edad es mi fortaleza",
    "Soy un ejemplo de fuerza",
    "Merezco descanso y relajación",
    "Mi cuerpo es mi aliado",
    "Soy una mujer extraordinaria",
    "Tengo el derecho a sentirme bien",
    "Mi confianza crece cada día",
    "Soy dueña de mi destino",
    "Merezco lo mejor de la vida",
    "Soy inspiración para otras mujeres",
    "Mi potencial es ilimitado",
    "Soy fuerte, inteligente y bella",
    "Cada ciclo me acerca a mi mejor versión",
    "Merezco celebrar mis logros",
    "Soy una mujer completa y valiosa"
  ];

  const modules = [
    {
      id: 1,
      title: "Aceptación Corporal",
      description: "Aprende a amar y aceptar tu cuerpo en esta nueva etapa",
      content: "La aceptación corporal es fundamental durante la menopausia. Tu cuerpo está cambiando, pero eso no significa que sea menos hermoso o valioso..."
    },
    {
      id: 2,
      title: "Superando la Autocrítica",
      description: "Técnicas para silenciar la voz crítica interna",
      content: "La autocrítica puede ser destructiva. Aprender a reconocerla y reemplazarla con compasión es esencial para tu bienestar emocional..."
    },
    {
      id: 3,
      title: "Celebrando tus Logros",
      description: "Reconoce y celebra todo lo que has logrado",
      content: "A menudo nos enfocamos en lo que no hemos hecho. Es hora de reconocer todos tus logros, grandes y pequeños..."
    },
    {
      id: 4,
      title: "Estableciendo Límites Saludables",
      description: "Aprende a decir no sin culpa",
      content: "Los límites saludables son esenciales para tu bienestar. Tienes derecho a proteger tu tiempo, energía y emociones..."
    }
  ];

  const toggleSaveAffirmation = (index: number) => {
    setSavedAffirmations(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Kit de Autoestima Positiva</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/premium-pack")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
          <p className="text-gray-600">
            30 afirmaciones diarias + módulos de desarrollo personal
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Premium Badge */}
        <div className="mb-8 flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-3 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-semibold">Contenido Premium Desbloqueado</span>
        </div>

        {/* Daily Affirmation */}
        <Card className="p-8 mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-center text-sm font-semibold text-purple-600 mb-4">AFIRMACIÓN DEL DÍA</h2>
          <div className="text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-6 italic">
              "{affirmations[selectedAffirmation]}"
            </p>
            <div className="flex gap-2 justify-center mb-6">
              {affirmations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAffirmation(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === selectedAffirmation ? "bg-purple-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setSelectedAffirmation(Math.max(0, selectedAffirmation - 1))}
                disabled={selectedAffirmation === 0}
              >
                Anterior
              </Button>
              <Button
                onClick={() => toggleSaveAffirmation(selectedAffirmation)}
                className={`${
                  savedAffirmations.includes(selectedAffirmation)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-300 hover:bg-gray-400"
                } text-white`}
              >
                <Heart className="w-4 h-4 mr-2" />
                {savedAffirmations.includes(selectedAffirmation) ? "Guardada" : "Guardar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedAffirmation(Math.min(affirmations.length - 1, selectedAffirmation + 1))}
                disabled={selectedAffirmation === affirmations.length - 1}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Card>

        {/* Modules Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Módulos de Desarrollo Personal</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {modules.map(module => (
            <Card key={module.id} className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{module.content}</p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Acceder al Módulo
              </Button>
            </Card>
          ))}
        </div>

        {/* Saved Affirmations */}
        {savedAffirmations.length > 0 && (
          <Card className="p-8 border-2 border-green-200 bg-green-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Afirmaciones Guardadas ({savedAffirmations.length})</h3>
            <div className="space-y-3">
              {savedAffirmations.map(index => (
                <div key={index} className="flex gap-3 items-start">
                  <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 italic">"{affirmations[index]}"</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
              Descargar mis Afirmaciones
            </Button>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="p-8 mt-8 border-2 border-yellow-200 bg-yellow-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Consejos para Usar las Afirmaciones</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Repite tu afirmación diaria cada mañana al despertar</li>
            <li>✓ Escríbela en un lugar visible (espejo, nevera, escritorio)</li>
            <li>✓ Cree en lo que dices - la convicción es clave</li>
            <li>✓ Combina con visualización para mayor impacto</li>
            <li>✓ Repite varias veces durante el día, especialmente en momentos difíciles</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
