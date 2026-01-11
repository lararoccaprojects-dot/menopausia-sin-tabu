import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Zap, CheckCircle2 } from "lucide-react";

export default function Downsell() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-lg text-gray-900">Oferta Especial</span>
          </div>
          <a href="/" className="text-gray-600 hover:text-pink-500 transition">← Volver</a>
        </div>
      </nav>

      {/* Empathetic Headline */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿El dinero fue un problema?<br />
            <span className="text-pink-500">Te entiendo perfectamente</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No queremos que el precio sea una barrera para tu bienestar. Por eso te ofrecemos una oportunidad especial.
          </p>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border-3 border-yellow-400 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-yellow-100 px-4 py-2 rounded-full mb-4">
                <span className="text-yellow-800 font-bold">OFERTA ESPECIAL</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                50% de descuento
              </h2>
              <p className="text-gray-600 mb-6">
                Obtén el Pack Premium completo a mitad de precio
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 line-through">$19.99</div>
                <div className="text-4xl font-bold text-pink-500">$9.99</div>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>

            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-6 text-lg rounded-lg w-full font-bold mb-4">
              Aprovechar Oferta Ahora
            </Button>
            <p className="text-center text-sm text-gray-500">
              Esta oferta solo está disponible en esta página
            </p>
          </div>
        </div>
      </section>

      {/* Investment Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Comparación de inversión
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                item: "2 cafés de especialidad",
                price: "$10",
                icon: "☕"
              },
              {
                item: "1 pizza mediana",
                price: "$12",
                icon: "🍕"
              },
              {
                item: "1 cena en restaurante",
                price: "$25",
                icon: "🍽️"
              },
              {
                item: "Pack Premium (HOY)",
                price: "$9.99",
                icon: "✨",
                highlight: true
              }
            ].map((item, i) => (
              <Card key={i} className={`p-6 text-center ${item.highlight ? 'border-2 border-pink-500 bg-pink-50' : 'border-gray-200'}`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-gray-600 mb-2">{item.item}</p>
                <p className={`text-2xl font-bold ${item.highlight ? 'text-pink-500' : 'text-gray-900'}`}>
                  {item.price}
                </p>
                {item.highlight && (
                  <p className="text-xs text-pink-600 mt-2 font-semibold">¡Mejor inversión!</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Los 6 recursos incluidos
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "El Mapa de Bienestar Emocional - Guía completa con ejercicios de mindfulness",
              "El Manual de Intimidad Saludable - Workbook con estrategias prácticas",
              "El Plan de Salud a Largo Plazo - Hoja de ruta personalizada",
              "El Kit de Autoestima Positiva - Plan de acción con afirmaciones",
              "El Taller de Alimentación Consciente - Guía de nutrición adaptada",
              "El Compendio de Terapias Alternativas - Checklist de opciones seguras"
            ].map((resource, i) => (
              <Card key={i} className="p-4 border-green-200 bg-green-50">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-900">{resource}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-pink-50 to-green-50 p-8 rounded-lg border-2 border-pink-200">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Garantía de 7 días</h3>
            <p className="text-gray-600 mb-4">
              Si en 7 días no ves valor en el Pack Premium, devolvemos tu dinero 100%. Sin preguntas, sin complicaciones.
            </p>
            <p className="text-sm text-gray-500 font-semibold">
              Tu bienestar está garantizado
            </p>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="py-12 bg-gradient-to-r from-yellow-50 to-pink-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Oferta limitada
            </h3>
            <p className="text-gray-600 mb-6">
              Esta oferta especial solo está disponible en esta página. Si la cierras, no podrás acceder a este descuento nuevamente.
            </p>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-6 text-lg rounded-lg font-bold">
              Aprovechar Oferta Ahora - $9.99
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Menopausia Sin Tabú. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
