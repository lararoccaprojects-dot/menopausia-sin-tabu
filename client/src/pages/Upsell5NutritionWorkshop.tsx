import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { UtensilsCrossed, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Download, Flame } from "lucide-react";
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

interface AntiInflammatoryFood {
  name: string;
  category: string;
  benefits: string[];
  howToUse: string;
  antiInflammatoryScore: number; // 1-10
}

export default function Upsell5NutritionWorkshop() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [expandedFood, setExpandedFood] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"fundamentos" | "alimentos" | "recetas">("fundamentos");

  const antiInflammatoryFoods: AntiInflammatoryFood[] = [
    {
      name: "Cúrcuma",
      category: "Especias",
      benefits: ["Reduce inflamación sistémica", "Alivia dolores articulares", "Mejora digestión"],
      howToUse: "Agrega a curries, sopas, té dorado. 1/2 cucharadita diaria es efectiva",
      antiInflammatoryScore: 10
    },
    {
      name: "Jengibre",
      category: "Raíces",
      benefits: ["Reduce inflamación", "Alivia náuseas", "Mejora circulación"],
      howToUse: "Té fresco, rallado en comidas, o en batidos. 1-2 cm diarios",
      antiInflammatoryScore: 9
    },
    {
      name: "Salmón",
      category: "Pescado",
      benefits: ["Alto en Omega-3", "Reduce inflamación", "Mejora salud cardiovascular"],
      howToUse: "2-3 porciones semanales. Cocina al horno o a la parrilla",
      antiInflammatoryScore: 9
    },
    {
      name: "Arándanos",
      category: "Frutas",
      benefits: ["Antioxidantes poderosos", "Reduce inflamación", "Mejora memoria"],
      howToUse: "Frescos o congelados. 1 taza diaria en desayuno o snack",
      antiInflammatoryScore: 8
    },
    {
      name: "Espinaca",
      category: "Verduras Verdes",
      benefits: ["Vitamina K", "Antioxidantes", "Reduce inflamación"],
      howToUse: "Cruda en ensaladas o cocida en sopas. Diariamente",
      antiInflammatoryScore: 8
    },
    {
      name: "Aceite de Oliva Extra Virgen",
      category: "Aceites",
      benefits: ["Polifenoles antiinflamatorios", "Protege corazón", "Mejora absorción de nutrientes"],
      howToUse: "2-3 cucharadas diarias en ensaladas o cocina a baja temperatura",
      antiInflammatoryScore: 9
    },
    {
      name: "Nueces",
      category: "Frutos Secos",
      benefits: ["Omega-3 vegetal", "Reduce inflamación", "Mejora salud cerebral"],
      howToUse: "Puñado diario (30g). Como snack o en ensaladas",
      antiInflammatoryScore: 8
    },
    {
      name: "Brócoli",
      category: "Crucíferas",
      benefits: ["Sulforafano antiinflamatorio", "Detoxificación", "Prevención de cáncer"],
      howToUse: "Al vapor o ligeramente salteado. 3-4 veces por semana",
      antiInflammatoryScore: 8
    },
    {
      name: "Té Verde",
      category: "Bebidas",
      benefits: ["EGCG antioxidante", "Reduce inflamación", "Mejora metabolismo"],
      howToUse: "2-3 tazas diarias. Mejor sin hervir agua a más de 80°C",
      antiInflammatoryScore: 8
    },
    {
      name: "Ajo",
      category: "Bulbos",
      benefits: ["Alicina antiinflamatoria", "Mejora inmunidad", "Antibacteriano"],
      howToUse: "1-2 dientes diarios crudos o cocidos. Mejor crudo para máximo beneficio",
      antiInflammatoryScore: 8
    },
    {
      name: "Aguacate",
      category: "Frutas",
      benefits: ["Grasas saludables", "Reduce inflamación", "Mejora absorción de vitaminas"],
      howToUse: "1/2 aguacate diario en ensaladas o tostadas",
      antiInflammatoryScore: 8
    },
    {
      name: "Cacao Puro",
      category: "Bebidas",
      benefits: ["Polifenoles", "Mejora circulación", "Antioxidantes poderosos"],
      howToUse: "1-2 cucharadas diarias en bebidas calientes. Sin azúcar añadido",
      antiInflammatoryScore: 8
    }
  ];

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
        "Pica todas las verduras en cubos pequeños",
        "Mezcla la quinua con las verduras",
        "Prepara vinagreta con aceite de oliva, limón, sal y pimienta",
        "Vierte sobre la ensalada y mezcla bien",
        "Sirve frío o a temperatura ambiente"
      ],
      nutrition: {
        calories: 380,
        protein: "12g",
        carbs: "45g",
        fat: "18g",
        fiber: "8g"
      },
      benefits: ["Proteína completa", "Antioxidantes", "Fibra digestiva", "Grasas saludables"]
    },
    {
      name: "Salmón al Horno con Hierbas",
      servings: 2,
      prepTime: "10 min",
      cookTime: "20 min",
      ingredients: [
        { item: "Filete de salmón", amount: "2 (150g c/u)" },
        { item: "Limón", amount: "1" },
        { item: "Ajo", amount: "2 dientes" },
        { item: "Romero fresco", amount: "2 ramas" },
        { item: "Aceite de oliva", amount: "2 cucharadas" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Precalienta horno a 200°C",
        "Coloca salmón en papel de horno",
        "Pica ajo y distribuye sobre el salmón",
        "Coloca romero fresco encima",
        "Rocía con aceite de oliva",
        "Exprime limón sobre el salmón",
        "Hornea por 18-20 minutos hasta que esté cocido",
        "Sirve con verduras al vapor"
      ],
      nutrition: {
        calories: 420,
        protein: "42g",
        carbs: "2g",
        fat: "26g",
        fiber: "0g"
      },
      benefits: ["Omega-3 EPA/DHA", "Proteína de calidad", "Selenio", "Vitamina D"]
    },
    {
      name: "Té Dorado Antiinflamatorio",
      servings: 1,
      prepTime: "5 min",
      cookTime: "5 min",
      ingredients: [
        { item: "Leche (vaca, almendra o coco)", amount: "1 taza" },
        { item: "Cúrcuma", amount: "1/2 cucharadita" },
        { item: "Jengibre fresco", amount: "1/4 cucharadita" },
        { item: "Canela", amount: "1/4 cucharadita" },
        { item: "Pimienta negra", amount: "pizca" },
        { item: "Miel", amount: "1 cucharadita" }
      ],
      instructions: [
        "Calienta la leche a fuego medio",
        "Agrega cúrcuma, jengibre, canela y pimienta",
        "Revuelve constantemente por 3-4 minutos",
        "No dejes que hierva",
        "Vierte en una taza",
        "Endulza con miel al gusto",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 120,
        protein: "4g",
        carbs: "12g",
        fat: "5g",
        fiber: "0g"
      },
      benefits: ["Antiinflamatorio potente", "Mejora sueño", "Calma digestión", "Antioxidantes"]
    },
    {
      name: "Batido Verde Antioxidante",
      servings: 1,
      prepTime: "5 min",
      cookTime: "0 min",
      ingredients: [
        { item: "Espinaca fresca", amount: "2 tazas" },
        { item: "Plátano", amount: "1" },
        { item: "Arándanos", amount: "1 taza" },
        { item: "Leche de almendra", amount: "1 taza" },
        { item: "Semillas de chía", amount: "1 cucharada" },
        { item: "Miel", amount: "1 cucharadita" }
      ],
      instructions: [
        "Coloca espinaca en la licuadora",
        "Agrega plátano cortado",
        "Añade arándanos",
        "Vierte leche de almendra",
        "Agrega semillas de chía",
        "Licúa hasta obtener consistencia homogénea",
        "Endulza con miel si es necesario",
        "Sirve inmediatamente"
      ],
      nutrition: {
        calories: 250,
        protein: "8g",
        carbs: "45g",
        fat: "6g",
        fiber: "9g"
      },
      benefits: ["Antioxidantes poderosos", "Fibra digestiva", "Omega-3", "Vitaminas completas"]
    },
    {
      name: "Sopa de Brócoli y Jengibre",
      servings: 4,
      prepTime: "15 min",
      cookTime: "20 min",
      ingredients: [
        { item: "Brócoli", amount: "1 cabeza grande" },
        { item: "Jengibre fresco", amount: "2 cm" },
        { item: "Cebolla", amount: "1 mediana" },
        { item: "Ajo", amount: "2 dientes" },
        { item: "Caldo vegetal", amount: "4 tazas" },
        { item: "Leche de coco", amount: "1/2 taza" },
        { item: "Aceite de oliva", amount: "2 cucharadas" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Calienta aceite en una olla grande",
        "Sofríe cebolla y ajo hasta que estén fragantes",
        "Agrega jengibre rallado",
        "Añade brócoli cortado en floretes",
        "Vierte caldo vegetal",
        "Hierve por 15 minutos hasta que el brócoli esté tierno",
        "Licúa la sopa hasta obtener consistencia cremosa",
        "Agrega leche de coco",
        "Sazona con sal y pimienta",
        "Sirve caliente"
      ],
      nutrition: {
        calories: 180,
        protein: "8g",
        carbs: "18g",
        fat: "9g",
        fiber: "4g"
      },
      benefits: ["Sulforafano antiinflamatorio", "Vitamina C", "Fibra", "Bajo en calorías"]
    },
    {
      name: "Nueces con Miel y Canela",
      servings: 4,
      prepTime: "5 min",
      cookTime: "10 min",
      ingredients: [
        { item: "Nueces crudas", amount: "2 tazas" },
        { item: "Miel pura", amount: "3 cucharadas" },
        { item: "Canela", amount: "1 cucharadita" },
        { item: "Sal marina", amount: "pizca" }
      ],
      instructions: [
        "Precalienta horno a 160°C",
        "Mezcla nueces con miel en un tazón",
        "Espolvorea canela y sal",
        "Distribuye en bandeja de horno",
        "Hornea por 8-10 minutos, revolviendo a mitad del tiempo",
        "Deja enfriar completamente",
        "Guarda en recipiente hermético",
        "Consume como snack o en ensaladas"
      ],
      nutrition: {
        calories: 320,
        protein: "8g",
        carbs: "20g",
        fat: "25g",
        fiber: "4g"
      },
      benefits: ["Omega-3 vegetal", "Antioxidantes", "Energía sostenida", "Salud cerebral"]
    },
    {
      name: "Ensalada de Espinaca con Salmón",
      servings: 2,
      prepTime: "15 min",
      cookTime: "0 min",
      ingredients: [
        { item: "Espinaca fresca", amount: "3 tazas" },
        { item: "Salmón ahumado", amount: "150g" },
        { item: "Aguacate", amount: "1" },
        { item: "Tomate cherry", amount: "1 taza" },
        { item: "Cebolla roja", amount: "1/4" },
        { item: "Aceite de oliva", amount: "3 cucharadas" },
        { item: "Limón", amount: "1" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Lava y seca la espinaca",
        "Coloca en un tazón grande",
        "Agrega tomates cherry cortados por la mitad",
        "Añade cebolla roja en rodajas finas",
        "Distribuye salmón ahumado en trozos",
        "Agrega aguacate en rodajas",
        "Prepara vinagreta con aceite, limón, sal y pimienta",
        "Vierte sobre la ensalada",
        "Mezcla suavemente y sirve"
      ],
      nutrition: {
        calories: 420,
        protein: "28g",
        carbs: "15g",
        fat: "30g",
        fiber: "6g"
      },
      benefits: ["Omega-3 EPA/DHA", "Vitamina K", "Antioxidantes", "Proteína completa"]
    },
    {
      name: "Batido de Cacao y Arándanos",
      servings: 1,
      prepTime: "5 min",
      cookTime: "0 min",
      ingredients: [
        { item: "Cacao puro en polvo", amount: "2 cucharadas" },
        { item: "Arándanos", amount: "1 taza" },
        { item: "Plátano", amount: "1" },
        { item: "Leche de almendra", amount: "1 taza" },
        { item: "Miel", amount: "1 cucharadita" },
        { item: "Semillas de linaza", amount: "1 cucharada" }
      ],
      instructions: [
        "Coloca cacao en polvo en la licuadora",
        "Agrega arándanos frescos o congelados",
        "Añade plátano cortado",
        "Vierte leche de almendra",
        "Agrega semillas de linaza",
        "Licúa hasta obtener consistencia suave",
        "Endulza con miel si es necesario",
        "Sirve inmediatamente"
      ],
      nutrition: {
        calories: 280,
        protein: "8g",
        carbs: "48g",
        fat: "8g",
        fiber: "8g"
      },
      benefits: ["Polifenoles antioxidantes", "Antocianinas", "Omega-3", "Energía natural"]
    },
    {
      name: "Verduras Asadas con Cúrcuma",
      servings: 4,
      prepTime: "15 min",
      cookTime: "25 min",
      ingredients: [
        { item: "Brócoli", amount: "1 cabeza" },
        { item: "Coliflor", amount: "1/2 cabeza" },
        { item: "Zanahorias", amount: "2 medianas" },
        { item: "Cúrcuma", amount: "1 cucharadita" },
        { item: "Ajo", amount: "3 dientes" },
        { item: "Aceite de oliva", amount: "3 cucharadas" },
        { item: "Sal y pimienta", amount: "al gusto" }
      ],
      instructions: [
        "Precalienta horno a 200°C",
        "Corta verduras en trozos medianos",
        "Mezcla en un tazón con aceite de oliva",
        "Agrega cúrcuma, ajo picado, sal y pimienta",
        "Distribuye en bandeja de horno",
        "Asa por 20-25 minutos hasta que estén tiernas",
        "Revuelve a mitad del tiempo de cocción",
        "Sirve caliente como acompañamiento"
      ],
      nutrition: {
        calories: 150,
        protein: "5g",
        carbs: "18g",
        fat: "7g",
        fiber: "4g"
      },
      benefits: ["Cúrcuma antiinflamatoria", "Vitaminas A y C", "Fibra", "Bajo en calorías"]
    }
  ];

  const modules = [
    {
      id: 1,
      title: "Fundamentos de Nutrición Menopáusica",
      description: "Entiende cómo cambian tus necesidades nutricionales",
      content: `
        <h4 class="font-bold mb-3">Cambios Metabólicos en la Menopausia</h4>
        <p class="mb-3">Durante la menopausia, tu cuerpo experimenta cambios hormonales que afectan cómo procesa los nutrientes:</p>
        <ul class="list-disc ml-5 mb-3 space-y-1">
          <li>Metabolismo más lento (hasta 5% por año)</li>
          <li>Mayor necesidad de calcio y vitamina D</li>
          <li>Aumento de necesidades de proteína</li>
          <li>Mayor sensibilidad a la insulina</li>
        </ul>
        
        <h4 class="font-bold mb-3 mt-4">Macronutrientes Esenciales</h4>
        <p class="mb-2"><strong>Proteína:</strong> Aumenta a 1.2-1.6g por kg de peso corporal para mantener masa muscular</p>
        <p class="mb-2"><strong>Grasas saludables:</strong> 25-35% de calorías totales, enfocadas en Omega-3</p>
        <p class="mb-2"><strong>Carbohidratos:</strong> Elige complejos con bajo índice glucémico</p>
        
        <h4 class="font-bold mb-3 mt-4">Micronutrientes Críticos</h4>
        <ul class="list-disc ml-5 space-y-1">
          <li><strong>Calcio:</strong> 1200mg diarios para salud ósea</li>
          <li><strong>Vitamina D:</strong> 800-1000 IU diarios</li>
          <li><strong>Hierro:</strong> Aumenta si tienes menstruaciones irregulares</li>
          <li><strong>Magnesio:</strong> 320mg diarios para sueño y relajación</li>
          <li><strong>Vitamina B12:</strong> Importante para energía y cognición</li>
        </ul>
        
        <h4 class="font-bold mb-3 mt-4">Fitoestrógenos Naturales</h4>
        <p>Los fitoestrógenos son compuestos vegetales que imitan el estrógeno:</p>
        <ul class="list-disc ml-5 space-y-1">
          <li>Soja y derivados (tofu, tempeh)</li>
          <li>Linaza y semillas de chía</li>
          <li>Legumbres (lentejas, garbanzos)</li>
          <li>Cerveza (con moderación)</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "Alimentos Antiinflamatorios",
      description: "Descubre qué comer para reducir inflamación",
      content: `
        <h4 class="font-bold mb-3">Por qué la Inflamación es Importante</h4>
        <p class="mb-3">La inflamación crónica acelera el envejecimiento y empeora síntomas de menopausia. Los alimentos antiinflamatorios son tu mejor defensa.</p>
        
        <h4 class="font-bold mb-3 mt-4">Estrategia Antiinflamatoria</h4>
        <ul class="list-disc ml-5 space-y-2">
          <li><strong>Aumenta:</strong> Omega-3, antioxidantes, fibra, polifenoles</li>
          <li><strong>Reduce:</strong> Azúcares refinados, grasas trans, alimentos ultraprocesados</li>
          <li><strong>Evita:</strong> Aceites vegetales refinados, carnes procesadas, bebidas azucaradas</li>
        </ul>
        
        <h4 class="font-bold mb-3 mt-4">Patrones de Alimentación Recomendados</h4>
        <p class="mb-2"><strong>Dieta Mediterránea:</strong> Considerada una de las más antiinflamatorias</p>
        <p class="mb-2"><strong>Dieta DASH:</strong> Enfocada en reducir presión arterial e inflamación</p>
        <p class="mb-2"><strong>Dieta Anti-Inflamatoria:</strong> Específicamente diseñada para reducir inflamación sistémica</p>
      `
    },
    {
      id: 3,
      title: "Menú Semanal Balanceado",
      description: "Plan de comidas para toda la semana",
      content: `
        <h4 class="font-bold mb-3">Lunes</h4>
        <p><strong>Desayuno:</strong> Batido verde antioxidante</p>
        <p><strong>Almuerzo:</strong> Salmón al horno con verduras asadas</p>
        <p><strong>Cena:</strong> Sopa de brócoli y jengibre</p>
        
        <h4 class="font-bold mb-3 mt-3">Martes</h4>
        <p><strong>Desayuno:</strong> Avena con arándanos y nueces</p>
        <p><strong>Almuerzo:</strong> Ensalada de quinua con verduras</p>
        <p><strong>Cena:</strong> Pechuga de pollo a la parrilla con espárragos</p>
        
        <h4 class="font-bold mb-3 mt-3">Miércoles</h4>
        <p><strong>Desayuno:</strong> Té dorado antiinflamatorio con tostada integral</p>
        <p><strong>Almuerzo:</strong> Ensalada de espinaca con salmón</p>
        <p><strong>Cena:</strong> Verduras asadas con cúrcuma</p>
        
        <h4 class="font-bold mb-3 mt-3">Jueves a Domingo</h4>
        <p>Alterna entre las recetas proporcionadas, asegurando variedad y balance nutricional.</p>
      `
    }
  ];

  const downloadModule = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      const content = `${module.title}\n\n${module.content.replace(/<[^>]*>/g, '')}\n\nAlimentos Antiinflamatorios incluidos en este módulo:\n${antiInflammatoryFoods.map(f => `- ${f.name}: ${f.benefits.join(", ")}`).join("\n")}`;
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
      element.setAttribute("download", `modulo-${moduleId}.txt`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Módulo descargado");
    }
  };

  const downloadRecipe = (recipeName: string) => {
    const recipe = recipes.find(r => r.name === recipeName);
    if (recipe) {
      const content = `${recipe.name}\n\nPorciones: ${recipe.servings}\nTiempo de preparación: ${recipe.prepTime}\nTiempo de cocción: ${recipe.cookTime}\n\nIngredientes:\n${recipe.ingredients.map(i => `- ${i.item}: ${i.amount}`).join("\n")}\n\nInstrucciones:\n${recipe.instructions.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}\n\nInformación Nutricional (por porción):\nCalorías: ${recipe.nutrition.calories}\nProteína: ${recipe.nutrition.protein}\nCarbohidratos: ${recipe.nutrition.carbs}\nGrasas: ${recipe.nutrition.fat}\nFibra: ${recipe.nutrition.fiber}\n\nBeneficios:\n${recipe.benefits.map(b => `- ${b}`).join("\n")}`;
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
      element.setAttribute("download", `receta-${recipeName}.txt`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Receta descargada");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-8 h-8 text-orange-600" />
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

        {/* Valor Inicial */}
        <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">¿Por qué la Nutrición es Crucial en la Menopausia?</h3>
              <p className="text-gray-700 leading-relaxed">
                La nutrición es tu herramienta más poderosa para manejar síntomas de menopausia. Alimentos específicos pueden reducir sofocos, mejorar sueño, fortalecer huesos y mantener tu peso.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">Reduce síntomas naturalmente con alimentos antiinflamatorios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">Fortalece huesos con calcio y vitamina D</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span className="text-gray-700">Mantén peso saludable con metabolismo optimizado</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-gray-200">
          <Button
            variant={activeTab === "fundamentos" ? "default" : "ghost"}
            className={activeTab === "fundamentos" ? "bg-orange-600 hover:bg-orange-700" : ""}
            onClick={() => setActiveTab("fundamentos")}
          >
            Fundamentos
          </Button>
          <Button
            variant={activeTab === "alimentos" ? "default" : "ghost"}
            className={activeTab === "alimentos" ? "bg-orange-600 hover:bg-orange-700" : ""}
            onClick={() => setActiveTab("alimentos")}
          >
            Alimentos Antiinflamatorios
          </Button>
          <Button
            variant={activeTab === "recetas" ? "default" : "ghost"}
            className={activeTab === "recetas" ? "bg-orange-600 hover:bg-orange-700" : ""}
            onClick={() => setActiveTab("recetas")}
          >
            Recetas
          </Button>
        </div>

        {/* Fundamentos Tab */}
        {activeTab === "fundamentos" && (
          <div className="space-y-6">
            {modules.map((module) => (
              <Card key={module.id} className="border-orange-200">
                <CardHeader
                  className="cursor-pointer hover:bg-orange-50"
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-orange-700">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    {expandedModule === module.id ? (
                      <ChevronUp className="w-5 h-5 text-orange-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </CardHeader>
                {expandedModule === module.id && (
                  <CardContent className="space-y-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: module.content }}
                      className="prose prose-sm max-w-none text-gray-700"
                    />
                    <Button
                      onClick={() => downloadModule(module.id)}
                      className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Módulo
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Alimentos Antiinflamatorios Tab */}
        {activeTab === "alimentos" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {antiInflammatoryFoods.map((food) => (
                <Card key={food.name} className="border-orange-200 cursor-pointer hover:shadow-lg transition"
                  onClick={() => setExpandedFood(expandedFood === food.name ? null : food.name)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-orange-700 text-lg">{food.name}</CardTitle>
                        <CardDescription>{food.category}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: food.antiInflammatoryScore }).map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  {expandedFood === food.name && (
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-2">Beneficios:</p>
                        <ul className="space-y-1">
                          {food.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-orange-600">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Cómo Usar:</p>
                        <p className="text-sm text-gray-700">{food.howToUse}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recetas Tab */}
        {activeTab === "recetas" && (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <Card key={recipe.name} className="border-orange-200">
                <CardHeader
                  className="cursor-pointer hover:bg-orange-50"
                  onClick={() => setExpandedRecipe(expandedRecipe === recipe.name ? null : recipe.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-orange-700">{recipe.name}</CardTitle>
                      <CardDescription>
                        {recipe.servings} porciones • {recipe.prepTime} prep • {recipe.cookTime} cocción
                      </CardDescription>
                    </div>
                    {expandedRecipe === recipe.name ? (
                      <ChevronUp className="w-5 h-5 text-orange-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </CardHeader>
                {expandedRecipe === recipe.name && (
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ingredientes:</h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            • {ing.item}: {ing.amount}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instrucciones:</h4>
                      <ol className="space-y-1">
                        {recipe.instructions.map((inst, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            {idx + 1}. {inst}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-orange-50 p-2 rounded">
                        <p className="font-semibold text-gray-900">{recipe.nutrition.calories} cal</p>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <p className="font-semibold text-gray-900">P: {recipe.nutrition.protein}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Beneficios:</p>
                      <ul className="space-y-1">
                        {recipe.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-orange-600">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      onClick={() => downloadRecipe(recipe.name)}
                      className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Receta
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
