import fs from 'fs';
import path from 'path';

const valueTexts = {
  'ResourceGuide.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar la Guía de Recursos</h3>
              <p className="text-gray-700 leading-relaxed">
                La información clara y confiable es tu mejor aliada. Esta guía te proporciona información basada en evidencia, opciones de tratamiento con pros y contras, estrategias prácticas y recursos descargables.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'WellnessExercises.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar Ejercicios de Bienestar</h3>
              <p className="text-gray-700 leading-relaxed">
                El movimiento es medicina. Estos ejercicios están diseñados específicamente para mujeres en menopausia, combinando yoga, pilates, respiración y meditación para aliviar síntomas y fortalecer cuerpo y mente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Forum.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Foro Comunitario</h3>
              <p className="text-gray-700 leading-relaxed">
                No estás sola en esto. El foro conecta a mujeres en tu misma situación con respuestas de expertos (ginecólogas, psicólogas, nutricionistas). Comparte experiencias, haz preguntas y aprende de otras mujeres.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Upsell1EmotionalWellness.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Mapa de Bienestar Emocional</h3>
              <p className="text-gray-700 leading-relaxed">
                La menopausia es tanto emocional como física. Este mapa te guía a través de 8 módulos de inteligencia emocional, regulación del estrés, resiliencia y autocompasión. Incluye 24 ejercicios prácticos y meditaciones guiadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Upsell2IntimacyManual.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
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

      {/* Header */`
  },
  'Upsell3LongTermHealth.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Plan de Salud a Largo Plazo</h3>
              <p className="text-gray-700 leading-relaxed">
                La menopausia es el inicio de una nueva fase. Este plan te ayuda a evaluar tu salud integral y crear una hoja de ruta para los próximos 20-30 años, previniendo enfermedades y viviendo con vitalidad.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Upsell4SelfEsteemKit.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Kit de Autoestima Positiva</h3>
              <p className="text-gray-700 leading-relaxed">
                Tu valor no disminuye con la edad. Este kit incluye 30 afirmaciones diarias y un plan de 8 semanas para aprender a decir "no" sin culpa, establecer límites saludables y recuperar tu poder personal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Upsell5NutritionWorkshop.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Taller de Alimentación Consciente</h3>
              <p className="text-gray-700 leading-relaxed">
                La comida es medicina. Este taller te enseña a nutrir tu cuerpo durante la menopausia con 5 módulos especializados, 15+ recetas deliciosas y un generador de lista de compras personalizado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  },
  'Upsell6AlternativeTherapies.tsx': {
    marker: '      {/* Header */',
    text: `      {/* Valor Inicial */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-white mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Por qué usar el Compendio de Terapias Alternativas</h3>
              <p className="text-gray-700 leading-relaxed">
                Más allá de lo convencional. Este compendio documenta 12 terapias alternativas con guías detalladas de "cómo hacer", información de seguridad y recomendaciones personalizadas según tus síntomas específicos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */`
  }
};

const pagesDir = '/home/ubuntu/menopausia-sin-tabu/client/src/pages';

Object.entries(valueTexts).forEach(([filename, config]) => {
  const filePath = path.join(pagesDir, filename);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if value text already exists
    if (content.includes('Por qué usar')) {
      console.log(`✓ ${filename} ya tiene texto de valor`);
      return;
    }
    
    // Replace marker with new text
    if (content.includes(config.marker)) {
      content = content.replace(config.marker, config.text);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Texto de valor agregado a ${filename}`);
    } else {
      console.log(`✗ No se encontró el marcador en ${filename}`);
    }
  } catch (error) {
    console.error(`Error procesando ${filename}:`, error.message);
  }
});

console.log('\n✓ Proceso completado');
