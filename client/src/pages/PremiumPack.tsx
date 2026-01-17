import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { BookOpen, Heart, Zap, Users, Target, Leaf, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function PremiumPack() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedUpsell, setSelectedUpsell] = useState<string | null>(null);

  const premiumTools = [
    {
      id: "emotional-wellness",
      name: "El Mapa de Bienestar Emocional",
      subtitle: "Guía paso a paso",
      description: "Entiende tus emociones y aprende técnicas de regulación emocional específicas para la menopausia",
      icon: Heart,
      price: "$19.99",
      features: [
        "8 módulos de aprendizaje",
        "Ejercicios de mindfulness",
        "Diario emocional interactivo",
        "Acceso a comunidad privada",
      ],
      color: "bg-red-100 text-red-700",
      href: "/premium/emotional-wellness",
    },
    {
      id: "intimacy-manual",
      name: "El Manual de Intimidad Saludable",
      subtitle: "Workbook interactivo",
      description: "Recupera tu confianza y disfruta de una vida íntima plena durante la menopausia",
      icon: Zap,
      price: "$19.99",
      features: [
        "6 capítulos especializados",
        "Ejercicios prácticos",
        "Guía de conversación con pareja",
        "Acceso a sesiones en vivo",
      ],
      color: "bg-orange-100 text-orange-700",
      href: "/premium/intimacy-manual",
    },
    {
      id: "long-term-health",
      name: "El Plan de Salud a Largo Plazo",
      subtitle: "Hoja de ruta personalizada",
      description: "Diseña tu estrategia de salud para los próximos 10 años con un plan adaptado a ti",
      icon: Target,
      price: "$19.99",
      features: [
        "Evaluación de salud integral",
        "Plan personalizado",
        "Seguimiento mensual",
        "Actualizaciones trimestrales",
      ],
      color: "bg-blue-100 text-blue-700",
      href: "/premium/long-term-health",
    },
    {
      id: "self-esteem-kit",
      name: "El Kit de Autoestima Positiva",
      subtitle: "Plan de acción",
      description: "Reconstruye tu autoestima y confianza en ti misma durante esta etapa de transformación",
      icon: Users,
      price: "$19.99",
      features: [
        "30 afirmaciones diarias",
        "Desafíos de autoaceptación",
        "Galería de inspiración",
        "Comunidad de apoyo",
      ],
      color: "bg-purple-100 text-purple-700",
      href: "/premium/self-esteem-kit",
    },
    {
      id: "nutrition-workshop",
      name: "El Taller de Alimentación Consciente",
      subtitle: "Guía de nutrición",
      description: "Aprende qué comer durante la menopausia para sentirte mejor y tener más energía",
      icon: Leaf,
      price: "$19.99",
      features: [
        "5 módulos de nutrición",
        "Recetas especializadas",
        "Plan de comidas semanal",
        "Consultas con nutricionista",
      ],
      color: "bg-green-100 text-green-700",
      href: "/premium/nutrition-workshop",
    },
    {
      id: "alternative-therapies",
      name: "El Compendio de Terapias Alternativas",
      subtitle: "Checklist de opciones",
      description: "Descubre terapias alternativas comprobadas que pueden complementar tu tratamiento",
      icon: BookOpen,
      price: "$19.99",
      features: [
        "12 terapias documentadas",
        "Guía de aplicación",
        "Directorio de profesionales",
        "Recursos descargables",
      ],
      color: "bg-indigo-100 text-indigo-700",
      href: "/premium/alternative-therapies",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>Necesitas estar autenticada para acceder al Pack Premium</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-pink-500 hover:bg-pink-600" onClick={() => setLocation("/")}>
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pack Premium Completo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acceso a 6 herramientas especializadas diseñadas para transformar tu experiencia de menopausia
          </p>
          <div className="mt-6 inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
            Valor total: $119.94 → Precio especial: $49.99
          </div>
        </div>

        {/* Premium Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {premiumTools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedUpsell === tool.id;

            return (
              <Card
                key={tool.id}
                className={`hover:shadow-lg transition cursor-pointer ${isSelected ? "ring-2 ring-pink-500" : ""}`}
                onClick={() => setSelectedUpsell(tool.id)}
              >
                <CardHeader>
                  <div className={`p-3 rounded-lg w-fit ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="mt-4">{tool.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-pink-600">{tool.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">{tool.price}</span>
                    <Button
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(tool.href);
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tu vida?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Obtén acceso a todas las 6 herramientas premium por solo $49.99. Incluye garantía de 7 días.
          </p>
          <Button
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 font-bold"
            onClick={() => {
              // TODO: Conectar con Hotmart
              window.location.href = "https://hotmart.com/checkout/premium-pack";
            }}
          >
            Comprar Pack Completo Ahora
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo comprar solo una herramienta?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sí, cada herramienta está disponible individualmente por $19.99, o todas juntas por $49.99.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay garantía de satisfacción?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sí, ofrecemos garantía de 7 días. Si no estás satisfecha, te devolvemos tu dinero sin preguntas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuándo tendré acceso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acceso inmediato después de la compra. Recibirás un email con tus credenciales de acceso.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay actualizaciones incluidas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sí, todas las actualizaciones y nuevos contenidos están incluidos sin costo adicional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
