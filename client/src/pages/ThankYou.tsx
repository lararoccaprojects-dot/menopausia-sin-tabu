import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Mail, AlertCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg text-gray-900">¡Gracias!</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              ¡Lo hiciste!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Tu compra fue exitosa
            </p>
            <p className="text-gray-500">
              Bienvenida a la comunidad de mujeres que se aman a sí mismas
            </p>
          </div>

          {/* Email Instructions */}
          <Card className="p-8 border-2 border-pink-200 bg-pink-50 mb-8">
            <div className="flex gap-4 mb-6">
              <Mail className="w-8 h-8 text-pink-500 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Revisa tu email
                </h2>
                <p className="text-gray-600">
                  Acabamos de enviar un email con tus credenciales de acceso
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-pink-200">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Busca en:</strong>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Tu bandeja de entrada principal</li>
                <li>✓ Carpeta de Promociones o Actualizaciones</li>
                <li>✓ Carpeta de Spam (a veces llega ahí)</li>
              </ul>
            </div>
          </Card>

          {/* What to Expect */}
          <Card className="p-8 border-2 border-green-200 bg-green-50 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Qué esperar</h3>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Email de bienvenida",
                  desc: "Contiene tu usuario y contraseña temporal"
                },
                {
                  step: "2",
                  title: "Acceso inmediato",
                  desc: "Podrás acceder a todas las herramientas al instante"
                },
                {
                  step: "3",
                  title: "Cambiar tu contraseña",
                  desc: "Te recomendamos cambiarla por una más segura"
                },
                {
                  step: "4",
                  title: "Comenzar tu viaje",
                  desc: "Empieza con la herramienta que más necesites"
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center mb-8">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-lg">
              Abrir mi email - Acceso a $19.99
            </Button>
          </div>

          {/* Spam Warning */}
          <Card className="p-6 border-l-4 border-l-yellow-500 bg-yellow-50">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Importante</h4>
                <p className="text-yellow-800 text-sm">
                  Si no ves el email en los próximos 5 minutos, revisa tu carpeta de spam o promociones. A veces los servidores de email filtran nuestros mensajes. Si aún no lo ves, contacta con soporte.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Menopausia Sin Tabú. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
