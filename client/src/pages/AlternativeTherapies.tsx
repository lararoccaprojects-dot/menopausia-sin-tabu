import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Leaf, Lock, ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AlternativeTherapies() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedTherapy, setSelectedTherapy] = useState(0);
  const [savedTherapies, setSavedTherapies] = useState<number[]>([]);

  const therapies = [
    {
      id: 1,
      name: "Acupuntura",
      effectiveness: 4.5,
      description: "Técnica milenaria china que estimula puntos específicos del cuerpo",
      benefits: ["Reduce sofocos", "Mejora el sueño", "Alivia dolores", "Reduce ansiedad"],
      howItWorks: "La acupuntura funciona estimulando puntos específicos que regulan el flujo de energía (chi) en el cuerpo...",
      frequency: "1-2 veces por semana",
      cost: "$50-100 por sesión"
    },
    {
      id: 2,
      name: "Yoga",
      effectiveness: 4.2,
      description: "Práctica de ejercicio y meditación que mejora flexibilidad y bienestar",
      benefits: ["Aumenta flexibilidad", "Reduce estrés", "Mejora postura", "Aumenta energía"],
      howItWorks: "El yoga combina posturas físicas, respiración consciente y meditación para equilibrar cuerpo y mente...",
      frequency: "3-4 veces por semana",
      cost: "$10-20 por clase"
    },
    {
      id: 3,
      name: "Aromaterapia",
      effectiveness: 3.8,
      description: "Uso de aceites esenciales para mejorar bienestar físico y emocional",
      benefits: ["Reduce sofocos", "Mejora el sueño", "Calma ansiedad", "Mejora el humor"],
      howItWorks: "Los aceites esenciales como lavanda, salvia y menta tienen propiedades terapéuticas cuando se inhalan o aplican...",
      frequency: "Diariamente",
      cost: "$15-40 por botella"
    },
    {
      id: 4,
      name: "Meditación",
      effectiveness: 4.0,
      description: "Práctica de enfoque mental para reducir estrés y ansiedad",
      benefits: ["Reduce ansiedad", "Mejora enfoque", "Aumenta bienestar", "Mejora el sueño"],
      howItWorks: "La meditación entrena la mente para enfocarse en el presente, reduciendo pensamientos ansiosos...",
      frequency: "Diariamente (15-20 min)",
      cost: "Gratuita"
    },
    {
      id: 5,
      name: "Herbolaria",
      effectiveness: 4.1,
      description: "Uso de plantas medicinales para aliviar síntomas menopáusicos",
      benefits: ["Reduce sofocos", "Mejora el sueño", "Estabiliza emociones", "Aumenta energía"],
      howItWorks: "Plantas como salvia, trébol rojo y cohosh negro contienen fitoestrógenos que imitan el estrógeno natural...",
      frequency: "Según recomendación",
      cost: "$10-30 por mes"
    },
    {
      id: 6,
      name: "Masaje Terapéutico",
      effectiveness: 4.0,
      description: "Técnica de manipulación muscular para relajación y alivio del dolor",
      benefits: ["Reduce tensión muscular", "Mejora circulación", "Alivia dolores", "Reduce estrés"],
      howItWorks: "El masaje libera tensión muscular, mejora la circulación y estimula la liberación de endorfinas...",
      frequency: "1-2 veces por semana",
      cost: "$60-100 por sesión"
    },
    {
      id: 7,
      name: "Homeopatía",
      effectiveness: 3.5,
      description: "Sistema de medicina alternativa basado en sustancias altamente diluidas",
      benefits: ["Reduce sofocos", "Mejora el sueño", "Estabiliza emociones", "Segura"],
      howItWorks: "La homeopatía utiliza sustancias naturales diluidas que estimulan el sistema inmunológico del cuerpo...",
      frequency: "Según prescripción",
      cost: "$10-20 por remedio"
    },
    {
      id: 8,
      name: "Reflexología",
      effectiveness: 3.7,
      description: "Técnica que estimula puntos en pies y manos para mejorar la salud",
      benefits: ["Reduce sofocos", "Mejora circulación", "Alivia dolores", "Relaja el cuerpo"],
      howItWorks: "La reflexología se basa en la idea de que puntos específicos en pies y manos corresponden a órganos del cuerpo...",
      frequency: "1-2 veces por semana",
      cost: "$50-80 por sesión"
    },
    {
      id: 9,
      name: "Reiki",
      effectiveness: 3.6,
      description: "Técnica japonesa de curación energética",
      benefits: ["Reduce estrés", "Mejora el sueño", "Aumenta bienestar", "Calma ansiedad"],
      howItWorks: "El Reiki canaliza energía universal a través de las manos del practicante para promover curación...",
      frequency: "1-2 veces por mes",
      cost: "$60-100 por sesión"
    },
    {
      id: 10,
      name: "Tai Chi",
      effectiveness: 4.0,
      description: "Arte marcial chino suave que mejora equilibrio y flexibilidad",
      benefits: ["Mejora equilibrio", "Aumenta flexibilidad", "Reduce estrés", "Aumenta energía"],
      howItWorks: "El Tai Chi combina movimientos lentos y controlados con respiración profunda para mejorar el bienestar...",
      frequency: "3-4 veces por semana",
      cost: "$15-25 por clase"
    },
    {
      id: 11,
      name: "Cristaloterapia",
      effectiveness: 3.2,
      description: "Uso de cristales y gemas para mejorar bienestar energético",
      benefits: ["Calma ansiedad", "Aumenta energía", "Mejora el sueño", "Equilibra emociones"],
      howItWorks: "Se cree que los cristales tienen propiedades energéticas que pueden influir en nuestro bienestar...",
      frequency: "Diariamente",
      cost: "$10-50 por cristal"
    },
    {
      id: 12,
      name: "Naturopatía",
      effectiveness: 3.9,
      description: "Sistema de medicina que utiliza remedios naturales",
      benefits: ["Reduce síntomas", "Mejora digestión", "Aumenta energía", "Previene enfermedades"],
      howItWorks: "La naturopatía se enfoca en estimular los mecanismos de curación natural del cuerpo...",
      frequency: "Según plan",
      cost: "$100-150 por consulta"
    }
  ];

  const currentTherapy = therapies[selectedTherapy];

  const toggleSaveTherapy = (index: number) => {
    setSavedTherapies(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Compendio de Terapias Alternativas</h1>
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
            12 terapias alternativas documentadas para la menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Premium Badge */}
        <div className="mb-8 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          <Lock className="w-5 h-5" />
          <span className="font-semibold">Contenido Premium Desbloqueado</span>
        </div>

        {/* Therapy Detail */}
        <Card className="p-8 mb-8 border-2 border-green-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{currentTherapy.name}</h2>
              <p className="text-gray-600 mt-2">{currentTherapy.description}</p>
            </div>
            <button
              onClick={() => toggleSaveTherapy(selectedTherapy)}
              className={`p-3 rounded-lg transition-all ${
                savedTherapies.includes(selectedTherapy)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ★
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Efectividad</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(currentTherapy.effectiveness)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">{currentTherapy.effectiveness}/5</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Costo Aproximado</p>
              <p className="text-lg font-bold text-green-600">{currentTherapy.cost}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Frecuencia Recomendada</p>
              <p className="text-gray-700">{currentTherapy.frequency}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Beneficios Principales</p>
              <ul className="space-y-1">
                {currentTherapy.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-700">✓ {benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">¿Cómo Funciona?</p>
            <p className="text-gray-700">{currentTherapy.howItWorks}</p>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Obtener Más Información
          </Button>
        </Card>

        {/* Therapies Grid */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Todas las Terapias</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {therapies.map((therapy, i) => (
            <button
              key={therapy.id}
              onClick={() => setSelectedTherapy(i)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedTherapy === i
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <p className="font-bold text-gray-900">{therapy.name}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${
                      j < Math.floor(therapy.effectiveness)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Saved Therapies */}
        {savedTherapies.length > 0 && (
          <Card className="p-8 mt-8 border-2 border-blue-200 bg-blue-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Terapias Favoritas ({savedTherapies.length})</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {savedTherapies.map(index => (
                <div key={index} className="flex gap-2 items-start">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-semibold">{therapies[index].name}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Descargar Guía de Terapias Favoritas
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
