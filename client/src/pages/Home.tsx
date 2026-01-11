import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutModal } from "@/components/CheckoutModal";
import { 
  Heart, 
  Leaf, 
  Sparkles, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  Shield,
  Zap,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

const CHECKOUT_URL = "https://pay.hotmart.com/XXXXXXXXX"; // Reemplazar con URL real

export default function Home() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-lg text-gray-900">Menopausia Sin Tabú</span>
          </div>
          <div className="flex gap-4">
            <a href="#features" className="text-gray-600 hover:text-pink-500 transition">Características</a>
            <a href="#faq" className="text-gray-600 hover:text-pink-500 transition">Preguntas</a>
            <a href="#guarantee" className="text-gray-600 hover:text-pink-500 transition">Garantía</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
        
        {/* Pre-encabezado */}
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-wider text-pink-600 font-semibold">
            Para mujeres de 35-60 años que comienzan a experimentar síntomas de menopausia
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Entiende tu menopausia<br />
            <span className="text-pink-500">sin tabúes, sin miedos</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Si sabes que algo está cambiando en tu cuerpo pero no entiendes qué es, si te sientes sola en esto, si quieres información clara y apoyo real...
            <span className="font-semibold text-pink-700"> esta guía interactiva te ayudará a lograrlo.</span>
          </p>
        </div>

        {/* Agitación del problema */}
        <Card className="border-2 border-pink-200 bg-white/80 backdrop-blur">
          <CardContent className="py-8 space-y-4">
            <h3 className="text-2xl font-bold text-center text-gray-900">
              ¿Te Suena Familiar?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Cambios hormonales que generan ansiedad y confusión",
                "Falta de información clara sobre síntomas y tratamientos",
                "Sentimientos de aislamiento y tabú alrededor de la menopausia",
                "Dificultades para mantener un estilo de vida saludable",
                "Miedo a los efectos secundarios de los tratamientos hormonales",
                "Confusión sobre la salud reproductiva y el cuidado personal"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-pink-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-gray-800 font-medium pt-4">
              No estás loca. <span className="text-pink-600">Estás en una etapa de cambio que merece comprensión.</span><br />
              Y hay una forma clara de navegarla.
            </p>
          </CardContent>
        </Card>

        {/* Presentación de la solución */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">LA SOLUCIÓN</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            <span className="text-pink-600">Menopausia Sin Tabú</span>
          </h2>
          <p className="text-xl text-gray-600 italic max-w-2xl mx-auto">
            La guía interactiva que te acompaña del miedo a la paz mental
          </p>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            <span className="font-bold">Comprende exactamente qué te está pasando</span>,
            recibe <span className="font-bold">información personalizada y adaptada a ti</span>, y accede a
            <span className="font-bold text-pink-600"> ejercicios prácticos y apoyo emocional</span> en semanas, no meses.
          </p>
        </div>

        {/* Sección: Así es Cómo Funciona */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Así es Cómo Funciona
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">1. Simulador de Síntomas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Identifica y sigue tus síntomas personalizados. Entiende qué es normal y cuándo debes preocuparte.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">2. Guía de Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Información detallada sobre tratamientos disponibles (naturales y sintéticos) con sus pros y contras.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">3. Ejercicios de Bienestar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Actividades físicas y mentales adaptadas para mujeres en esta etapa de cambio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">4. Foro de Preguntas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Interactúa con otras mujeres y expertas en salud. No estás sola en esto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección: Por Qué Funciona Tan Bien */}
        <Card className="border-2 border-pink-600 bg-gradient-to-br from-pink-50 to-green-50">
          <CardContent className="py-10 space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Por Qué "Menopausia Sin Tabú" Funciona Tan Bien
              </h3>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-800 leading-relaxed">
                <p>
                  La razón por la que esta herramienta funciona tan bien es porque <span className="font-bold text-pink-600">aborda el problema desde la raíz: la falta de información y apoyo emocional</span>.
                </p>
                <p>
                  La mayoría de las "soluciones" te dicen <em>"simplemente ve al ginecólogo"</em> o <em>"toma suplementos"</em>. 
                  Pero eso no funciona porque <span className="font-bold">la menopausia es compleja y cada mujer es diferente</span>.
                </p>
                <p className="text-xl font-semibold text-pink-700">
                  Menopausia Sin Tabú te da INFORMACIÓN PERSONALIZADA que se adapta a TI, no al revés.
                </p>
                <p>
                  Es como tener una <span className="font-bold">experta en tu bolsillo</span> que entiende exactamente lo que vives. 
                  Y cada herramienta que usas te empodera más. 
                  En 3-6 semanas, ya no te sientes perdida. Te sientes en control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Intermedio */}
        <div className="text-center space-y-4 py-8">
          <Button 
            size="lg" 
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-lg"
            onClick={() => setCheckoutModalOpen(true)}
          >
            Acceder Ahora
          </Button>
          <p className="text-sm text-gray-500">Garantía de 7 días • Acceso inmediato</p>
        </div>

        {/* Stack de herramientas */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Tu kit completo de herramientas
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">4 Herramientas Principales</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Simulador de Síntomas",
                  "Guía de Recursos",
                  "Ejercicios de Bienestar",
                  "Foro de Preguntas y Respuestas"
                ].map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-900">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-pink-200 pt-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">+ 6 Herramientas Premium (Pack Avanzado)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "El Mapa de Bienestar Emocional",
                  "El Manual de Intimidad Saludable",
                  "El Plan de Salud a Largo Plazo",
                  "El Kit de Autoestima Positiva",
                  "El Taller de Alimentación Consciente",
                  "El Compendio de Terapias Alternativas"
                ].map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <span className="text-gray-900">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Lo que dicen las mujeres
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "María, 48 años",
                text: "Finalmente entiendo lo que me está pasando. Las herramientas son prácticas y reales. Me siento menos sola."
              },
              {
                name: "Laura, 52 años",
                text: "No me sentía sola. El foro me ayudó a conectar con otras mujeres en mi misma situación. Es liberador."
              },
              {
                name: "Ana, 45 años",
                text: "Los ejercicios de bienestar cambiaron mi vida. Me siento mejor que nunca. Recomiendo esto a todas mis amigas."
              }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6 border-pink-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            Preguntas frecuentes
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "¿Es para mujeres en menopausia solamente?",
                a: "No, también es para mujeres en perimenopausia (antes de la menopausia). Si tienes síntomas, esta guía es para ti."
              },
              {
                q: "¿Necesito supervisión médica?",
                a: "Esta guía complementa el cuidado médico, no lo reemplaza. Siempre consulta con tu médico para decisiones importantes."
              },
              {
                q: "¿Cuánto tiempo debo dedicar?",
                a: "Puedes avanzar a tu propio ritmo. Algunos ejercicios toman 10 minutos, otros más. Tú controlas el tiempo."
              },
              {
                q: "¿Qué pasa si no me funciona?",
                a: "Tenemos garantía de 7 días. Si no te funciona, devolvemos tu dinero sin preguntas."
              },
              {
                q: "¿Puedo acceder desde cualquier dispositivo?",
                a: "Sí, la guía funciona en computadora, tablet y móvil. Accede cuando y donde quieras."
              },
              {
                q: "¿Hay actualizaciones?",
                a: "Sí, agregamos nuevas herramientas y contenido regularmente sin costo adicional."
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Garantía */}
        <section id="guarantee" className="bg-gradient-to-r from-pink-50 to-green-50 p-8 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Garantía de 7 días
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Si en los primeros 7 días no ves valor en esta guía, devolvemos tu dinero 100%. Sin preguntas, sin complicaciones.
          </p>
          <div className="inline-block bg-white p-6 rounded-lg border-2 border-pink-500">
            <p className="text-gray-900 font-semibold">Tu inversión está protegida</p>
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-4xl font-bold text-gray-900">
            ¿Listo para entender tu menopausia?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede ahora a todas las herramientas, ejercicios y apoyo que necesitas para vivir esta etapa con confianza.
          </p>
          <Button 
            size="lg" 
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-lg"
            onClick={() => setCheckoutModalOpen(true)}
          >
            Acceder Ahora - Porque estoy lista para entender mi cuerpo
          </Button>
          <p className="text-sm text-gray-500">Acceso inmediato • Garantía de 7 días • Sin compromisos</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Menopausia Sin Tabú
              </h4>
              <p className="text-gray-400 text-sm">Guía interactiva para el bienestar femenino</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Producto</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-pink-500">Características</a></li>
                <li><a href="#faq" className="hover:text-pink-500">FAQ</a></li>
                <li><a href="#guarantee" className="hover:text-pink-500">Garantía</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-pink-500">Términos</a></li>
                <li><a href="#" className="hover:text-pink-500">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <p className="text-sm text-gray-400">info@menopausiasinstabu.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Menopausia Sin Tabú. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal 
        open={checkoutModalOpen}
        onOpenChange={setCheckoutModalOpen}
        checkoutUrl={CHECKOUT_URL}
        source="home"
      />
    </div>
  );
}
