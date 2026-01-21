import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { UtensilsCrossed, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface Recipe {
  name: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredients: { item: string; amount: string }[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  benefits: string[];
}

export default function Upsell5NutritionWorkshop() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const recipes: Recipe[] = [
    {
      name: "Ensalada de Quinua con Verduras",
      servings: 2,
      prepTime: "15 min",
      cookTime: "15 min",
      ingredients: [
        { item: "Quinua", amount: "1 taza" },
        { item: "Tomate cherry", amount: "1 taza" },
        { item: "Pepino", amount: "1 mediano" },
        { item: "Aguacate", amount: "1/2" },
        { item: "Aceite de oliva", amount: "3 cucharadas" },
        { item: "Limón", amount: "1" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Cocina la quinua según las instrucciones del paquete",
        "Deja enfriar completamente",
        "Pica tomate, pepino y aguacate",
        "Mezcla todos los ingredientes",
        "Aliña con aceite de oliva y jugo de limón",
        "Sirve frío"
      ],
      nutrition: {
        calories: 320,
        protein: "12g",
        carbs: "35g",
        fat: "14g",
        fiber: "8g"
      },
      benefits: ["Alto en proteína", "Rica en fibra", "Antioxidantes", "Grasas saludables"]
    },
    {
      name: "Salmón al Horno con Hierbas",
      servings: 2,
      prepTime: "10 min",
      cookTime: "20 min",
      ingredients: [
        { item: "Filete de salmón", amount: "2 (200g c/u)" },
        { item: "Limón", amount: "1" },
        { item: "Ajo", amount: "2 dientes" },
        { item: "Romero fresco", amount: "2 ramas" },
        { item: "Aceite de oliva", amount: "2 cucharadas" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Precalienta el horno a 200°C",
        "Coloca el salmón en papel de aluminio",
        "Agrega ajo picado, romero y limón",
        "Rocía con aceite de oliva",
        "Sazóna con sal y pimienta",
        "Hornea 18-20 minutos",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 380,
        protein: "42g",
        carbs: "2g",
        fat: "22g",
        fiber: "0g"
      },
      benefits: ["Omega-3 abundante", "Proteína de calidad", "Antiinflamatorio", "Salud cardiovascular"]
    },
    {
      name: "Batido Verde Antiinflamatorio",
      servings: 1,
      prepTime: "5 min",
      cookTime: "0 min",
      ingredients: [
        { item: "Espinaca fresca", amount: "2 tazas" },
        { item: "Plátano", amount: "1" },
        { item: "Jengibre fresco", amount: "1 cucharada" },
        { item: "Cúrcuma", amount: "1/2 cucharadita" },
        { item: "Leche de almendra", amount: "1 taza" },
        { item: "Miel", amount: "1 cucharada" }
      ],
      instructions: [
        "Agrega espinaca y leche de almendra a la licuadora",
        "Añade plátano, jengibre y cúrcuma",
        "Licúa hasta obtener consistencia suave",
        "Endulza con miel al gusto",
        "Sirve inmediatamente"
      ],
      nutrition: {
        calories: 180,
        protein: "5g",
        carbs: "32g",
        fat: "4g",
        fiber: "5g"
      },
      benefits: ["Antiinflamatorio potente", "Antioxidantes", "Energía sostenida", "Digestión"]
    },
    {
      name: "Curry de Verduras",
      servings: 3,
      prepTime: "15 min",
      cookTime: "25 min",
      ingredients: [
        { item: "Brócoli", amount: "2 tazas" },
        { item: "Zanahoria", amount: "2 medianas" },
        { item: "Cebolla", amount: "1" },
        { item: "Leche de coco light", amount: "1 lata" },
        { item: "Curry en polvo", amount: "2 cucharadas" },
        { item: "Ajo", amount: "3 dientes" },
        { item: "Aceite de oliva", amount: "2 cucharadas" }
      ],
      instructions: [
        "Calienta aceite en una olla grande",
        "Sofríe cebolla y ajo hasta que aromaticcen",
        "Agrega curry en polvo, mezcla bien",
        "Añade brócoli y zanahoria picados",
        "Vierte leche de coco",
        "Cocina a fuego medio por 20 minutos",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 240,
        protein: "8g",
        carbs: "28g",
        fat: "12g",
        fiber: "6g"
      },
      benefits: ["Antiinflamatorio", "Bajo en calorías", "Vitaminas y minerales", "Saciante"]
    },
    {
      name: "Avena con Frutas y Frutos Secos",
      servings: 1,
      prepTime: "5 min",
      cookTime: "5 min",
      ingredients: [
        { item: "Avena integral", amount: "1/2 taza" },
        { item: "Leche de almendra", amount: "1 taza" },
        { item: "Arándanos", amount: "1/2 taza" },
        { item: "Almendras", amount: "1/4 taza" },
        { item: "Miel", amount: "1 cucharada" },
        { item: "Canela", amount: "1/4 cucharadita" }
      ],
      instructions: [
        "Calienta la leche de almendra",
        "Agrega la avena y canela",
        "Cocina por 5 minutos, revolviendo ocasionalmente",
        "Vierte en un tazón",
        "Añade arándanos y almendras",
        "Endulza con miel",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 320,
        protein: "10g",
        carbs: "42g",
        fat: "12g",
        fiber: "7g"
      },
      benefits: ["Fibra soluble", "Energía prolongada", "Antioxidantes", "Saciedad"]
    },
    {
      name: "Pollo a la Parrilla con Verduras",
      servings: 2,
      prepTime: "15 min",
      cookTime: "20 min",
      ingredients: [
        { item: "Pechuga de pollo", amount: "2 (150g c/u)" },
        { item: "Pimiento rojo", amount: "1" },
        { item: "Calabacín", amount: "1" },
        { item: "Cebolla", amount: "1/2" },
        { item: "Limón", amount: "1" },
        { item: "Aceite de oliva", amount: "2 cucharadas" },
        { item: "Hierbas italianas", amount: "1 cucharadita" }
      ],
      instructions: [
        "Marina el pollo con limón, aceite y hierbas",
        "Corta las verduras en trozos medianos",
        "Calienta la parrilla a fuego medio-alto",
        "Asa el pollo 10 minutos por lado",
        "Asa las verduras hasta que estén tiernas",
        "Sirve caliente con limón fresco"
      ],
      nutrition: {
        calories: 280,
        protein: "38g",
        carbs: "12g",
        fat: "8g",
        fiber: "3g"
      },
      benefits: ["Proteína magra", "Bajo en grasa", "Vitaminas y minerales", "Saciante"]
    },
    {
      name: "Té de Jengibre y Cúrcuma",
      servings: 1,
      prepTime: "5 min",
      cookTime: "5 min",
      ingredients: [
        { item: "Agua", amount: "1 taza" },
        { item: "Jengibre fresco", amount: "1 cucharada rallada" },
        { item: "Cúrcuma", amount: "1/2 cucharadita" },
        { item: "Miel", amount: "1 cucharada" },
        { item: "Limón", amount: "1/2" },
        { item: "Pimienta negra", amount: "pizca" }
      ],
      instructions: [
        "Calienta el agua hasta que hierva",
        "Agrega jengibre y cúrcuma",
        "Deja reposar 3-5 minutos",
        "Cuela el té",
        "Añade miel y jugo de limón",
        "Agrega una pizca de pimienta negra",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 45,
        protein: "0g",
        carbs: "12g",
        fat: "0g",
        fiber: "0g"
      },
      benefits: ["Antiinflamatorio potente", "Digestión", "Calor corporal", "Antioxidantes"]
    },
    {
      name: "Ensalada de Remolacha y Nueces",
      servings: 2,
      prepTime: "15 min",
      cookTime: "0 min",
      ingredients: [
        { item: "Remolacha cocida", amount: "2 medianas" },
        { item: "Espinaca fresca", amount: "2 tazas" },
        { item: "Nueces", amount: "1/2 taza" },
        { item: "Queso de cabra", amount: "100g" },
        { item: "Vinagre balsámico", amount: "3 cucharadas" },
        { item: "Aceite de oliva", amount: "2 cucharadas" }
      ],
      instructions: [
        "Corta la remolacha en cubos pequeños",
        "Coloca espinaca en un tazón grande",
        "Agrega remolacha y nueces",
        "Desmorona el queso de cabra",
        "Prepara vinagreta con vinagre y aceite",
        "Mezcla todo suavemente",
        "Sirve frío"
      ],
      nutrition: {
        calories: 380,
        protein: "14g",
        carbs: "28g",
        fat: "26g",
        fiber: "6g"
      },
      benefits: ["Hierro abundante", "Grasas saludables", "Antioxidantes", "Energía"]
    },
    {
      name: "Sopa de Verduras y Legumbres",
      servings: 3,
      prepTime: "15 min",
      cookTime: "30 min",
      ingredients: [
        { item: "Caldo de verduras", amount: "1 litro" },
        { item: "Lentejas rojas", amount: "1/2 taza" },
        { item: "Zanahoria", amount: "2" },
        { item: "Apio", amount: "2 tallos" },
        { item: "Cebolla", amount: "1" },
        { item: "Tomate", amount: "2" },
        { item: "Ajo", amount: "2 dientes" },
        { item: "Aceite de oliva", amount: "2 cucharadas" }
      ],
      instructions: [
        "Calienta aceite en una olla grande",
        "Sofríe cebolla, ajo, zanahoria y apio",
        "Agrega tomate picado",
        "Vierte el caldo",
        "Añade lentejas rojas",
        "Cocina a fuego medio por 25-30 minutos",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 220,
        protein: "14g",
        carbs: "32g",
        fat: "4g",
        fiber: "8g"
      },
      benefits: ["Proteína vegetal", "Fibra alta", "Minerales", "Saciante"]
    }
  ];

  const weeklyMenu = [
    {
      day: "Lunes",
      breakfast: "Avena con Frutas y Frutos Secos",
      lunch: "Ensalada de Quinua con Verduras",
      dinner: "Pollo a la Parrilla con Verduras",
      snack: "Té de Jengibre y Cúrcuma"
    },
    {
      day: "Martes",
      breakfast: "Batido Verde Antiinflamatorio",
      lunch: "Salmón al Horno con Hierbas",
      dinner: "Curry de Verduras",
      snack: "Almendras (1/4 taza)"
    },
    {
      day: "Miércoles",
      breakfast: "Avena con Frutas y Frutos Secos",
      lunch: "Sopa de Verduras y Legumbres",
      dinner: "Pollo a la Parrilla con Verduras",
      snack: "Té de Jengibre y Cúrcuma"
    },
    {
      day: "Jueves",
      breakfast: "Batido Verde Antiinflamatorio",
      lunch: "Ensalada de Remolacha y Nueces",
      dinner: "Salmón al Horno con Hierbas",
      snack: "Fruta fresca"
    },
    {
      day: "Viernes",
      breakfast: "Avena con Frutas y Frutos Secos",
      lunch: "Curry de Verduras",
      dinner: "Pollo a la Parrilla con Verduras",
      snack: "Té de Jengibre y Cúrcuma"
    },
    {
      day: "Sábado",
      breakfast: "Batido Verde Antiinflamatorio",
      lunch: "Ensalada de Quinua con Verduras",
      dinner: "Sopa de Verduras y Legumbres",
      snack: "Nueces (1/4 taza)"
    },
    {
      day: "Domingo",
      breakfast: "Avena con Frutas y Frutos Secos",
      lunch: "Salmón al Horno con Hierbas",
      dinner: "Ensalada de Remolacha y Nueces",
      snack: "Té de Jengibre y Cúrcuma"
    }
  ];

  const modules = [
    {
      id: 1,
      title: "Fundamentos de Nutrición Menopáusica",
      icon: "📋",
      description: "Entiende cómo cambian tus necesidades nutricionales",
      keyPoints: [
        "Cambios metabólicos post-menopausia",
        "Necesidades calóricas reducidas",
        "Macronutrientes esenciales",
        "Micronutrientes críticos"
      ]
    },
    {
      id: 2,
      title: "Alimentos Anti-Inflamatorios",
      icon: "🥗",
      description: "Reduce inflamación y síntomas menopáusicos",
      keyPoints: [
        "Omega-3: pescado, nueces, semillas",
        "Antioxidantes: frutas y verduras coloridas",
        "Especias antiinflamatorias",
        "Alimentos a evitar"
      ]
    },
    {
      id: 3,
      title: "Recetas Prácticas y Menú Semanal",
      icon: "🍳",
      description: "Planes de comida listos para implementar",
      keyPoints: [
        "9 recetas detalladas",
        "Menú semanal completo",
        "Información nutricional",
        "Listas de compras"
      ]
    }
  ];

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const toggleRecipe = (name: string) => {
    setExpandedRecipe(expandedRecipe === name ? null : name);
  };

  const toggleComplete = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(m => m !== id));
    } else {
      setCompletedModules([...completedModules, id]);
      toast.success("¡Módulo completado!");
    }
  };

  const downloadMenu = () => {
    let content = `MENÚ SEMANAL - TALLER DE ALIMENTACIÓN CONSCIENTE\n`;
    content += `${'='.repeat(60)}\n\n`;

    weeklyMenu.forEach((day) => {
      content += `${day.day}\n`;
      content += `${'-'.repeat(40)}\n`;
      content += `Desayuno: ${day.breakfast}\n`;
      content += `Almuerzo: ${day.lunch}\n`;
      content += `Cena: ${day.dinner}\n`;
      content += `Snack: ${day.snack}\n\n`;
    });

    content += `\nConsejo: Ajusta las porciones según tus necesidades calóricas personales.\n`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `Menu_Semanal_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Menú semanal descargado");
  };

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-12">
      {/* Header */}
      <div className="bg-white border-b border-green-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Taller de Alimentación Consciente</h1>
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
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% completado</p>
        </div>
      </div>

      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">¿Por qué este programa?</h3>
              <p className="text-gray-700 text-sm">
                3 módulos con 9 recetas detalladas, menú semanal completo, información nutricional y listas de compras. Cada receta está diseñada para apoyar tu bienestar durante la menopausia.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      <div className="container mx-auto px-4 space-y-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`border-2 transition-all ${
              completedModules.includes(module.id)
                ? "border-green-400 bg-green-50"
                : "border-green-200 hover:border-green-400"
            }`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-4xl">{module.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 font-bold text-sm">✓</span>
                          <span className="text-sm text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedModules.includes(module.id) && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {expandedModule === module.id ? (
                    <ChevronUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Contenido Expandido */}
            {expandedModule === module.id && (
              <div className="border-t border-green-200 px-6 py-6 bg-green-50">
                <div className="space-y-6">
                  {module.id === 3 && (
                    <>
                      {/* Menú Semanal */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gray-900">Menú Semanal Completo</h4>
                          <Button
                            onClick={downloadMenu}
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                            size="sm"
                          >
                            <Download className="w-4 h-4" />
                            Descargar Menú
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {weeklyMenu.map((day, idx) => (
                            <Card key={idx} className="border border-green-200">
                              <CardContent className="pt-4">
                                <h5 className="font-bold text-green-700 mb-2">{day.day}</h5>
                                <div className="space-y-1 text-sm">
                                  <p><span className="font-semibold">Desayuno:</span> {day.breakfast}</p>
                                  <p><span className="font-semibold">Almuerzo:</span> {day.lunch}</p>
                                  <p><span className="font-semibold">Cena:</span> {day.dinner}</p>
                                  <p><span className="font-semibold">Snack:</span> {day.snack}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Recetas Detalladas */}
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900">9 Recetas Detalladas</h4>
                        <div className="space-y-3">
                          {recipes.map((recipe, idx) => (
                            <Card
                              key={idx}
                              className="border border-green-200 cursor-pointer hover:border-green-400"
                              onClick={() => toggleRecipe(recipe.name)}
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h5 className="font-bold text-gray-900">{recipe.name}</h5>
                                    <p className="text-xs text-gray-600 mt-1">
                                      ⏱️ {recipe.prepTime} prep + {recipe.cookTime} cocción | 🍽️ {recipe.servings} porciones
                                    </p>
                                  </div>
                                  <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${expandedRecipe === recipe.name ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Contenido Expandido de Receta */}
                                {expandedRecipe === recipe.name && (
                                  <div className="mt-4 pt-4 border-t border-green-200 space-y-4">
                                    {/* Ingredientes */}
                                    <div>
                                      <h6 className="font-semibold text-gray-900 mb-2">Ingredientes:</h6>
                                      <ul className="space-y-1 text-sm">
                                        {recipe.ingredients.map((ing, i) => (
                                          <li key={i} className="text-gray-700">• {ing.amount} de {ing.item}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Instrucciones */}
                                    <div>
                                      <h6 className="font-semibold text-gray-900 mb-2">Instrucciones:</h6>
                                      <ol className="space-y-1 text-sm">
                                        {recipe.instructions.map((inst, i) => (
                                          <li key={i} className="text-gray-700">{i + 1}. {inst}</li>
                                        ))}
                                      </ol>
                                    </div>

                                    {/* Información Nutricional */}
                                    <div>
                                      <h6 className="font-semibold text-gray-900 mb-2">Información Nutricional (por porción):</h6>
                                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                                        <div className="bg-white p-2 rounded border border-green-200">
                                          <p className="text-gray-600">Calorías</p>
                                          <p className="font-bold text-green-700">{recipe.nutrition.calories}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-green-200">
                                          <p className="text-gray-600">Proteína</p>
                                          <p className="font-bold text-green-700">{recipe.nutrition.protein}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-green-200">
                                          <p className="text-gray-600">Carbos</p>
                                          <p className="font-bold text-green-700">{recipe.nutrition.carbs}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-green-200">
                                          <p className="text-gray-600">Grasas</p>
                                          <p className="font-bold text-green-700">{recipe.nutrition.fat}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-green-200">
                                          <p className="text-gray-600">Fibra</p>
                                          <p className="font-bold text-green-700">{recipe.nutrition.fiber}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Beneficios */}
                                    <div>
                                      <h6 className="font-semibold text-gray-900 mb-2">Beneficios:</h6>
                                      <div className="flex flex-wrap gap-2">
                                        {recipe.benefits.map((benefit, i) => (
                                          <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {benefit}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Botón de Completar */}
                  <div className="flex gap-3 pt-4 border-t border-green-200">
                    <Button
                      onClick={() => toggleComplete(module.id)}
                      className={`flex-1 ${
                        completedModules.includes(module.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {completedModules.includes(module.id)
                        ? "Completado"
                        : "Marcar como completado"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
