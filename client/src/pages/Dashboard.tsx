import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Heart, BookOpen, Dumbbell, Users, Lock, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Sesión cerrada");
      setLocation("/");
    },
    onError: () => {
      toast.error("Error al cerrar sesión");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>Necesitas estar autenticada para acceder al dashboard</CardDescription>
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

  const tools = [
    {
      id: "symptoms",
      name: "Simulador de Síntomas",
      description: "Registra y monitorea tus síntomas de menopausia",
      icon: Heart,
      href: "/simulador-sintomas",
      color: "bg-pink-100 text-pink-700",
      status: "available",
    },
    {
      id: "guide",
      name: "Guía de Recursos",
      description: "Accede a información completa sobre menopausia",
      icon: BookOpen,
      href: "#",
      color: "bg-blue-100 text-blue-700",
      status: "coming",
    },
    {
      id: "exercises",
      name: "Ejercicios Recomendados",
      description: "Rutinas personalizadas para tu bienestar",
      icon: Dumbbell,
      href: "#",
      color: "bg-green-100 text-green-700",
      status: "coming",
    },
    {
      id: "community",
      name: "Comunidad",
      description: "Conecta con otras mujeres en tu mismo camino",
      icon: Users,
      href: "#",
      color: "bg-purple-100 text-purple-700",
      status: "coming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenida, {user?.name || "Usuaria"}!</h1>
            <p className="text-lg text-gray-600">Tu espacio personalizado para entender y manejar tu menopausia</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4" />
            {logoutMutation.isPending ? "Cerrando..." : "Cerrar Sesión"}
          </Button>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isAvailable = tool.status === "available";

            return (
              <Card
                key={tool.id}
                className={`hover:shadow-lg transition ${isAvailable ? "cursor-pointer" : "opacity-75"}`}
                onClick={() => {
                  if (isAvailable) {
                    setLocation(tool.href);
                  }
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${tool.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {!isAvailable && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                        <Lock className="w-3 h-3 text-gray-600" />
                        <span className="text-xs font-semibold text-gray-600">Próximamente</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="mt-4">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isAvailable ? (
                    <Button className="w-full bg-pink-500 hover:bg-pink-600">Acceder</Button>
                  ) : (
                    <Button className="w-full" disabled variant="outline">
                      Próximamente
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Tu Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-500">50%</div>
              <p className="text-sm text-gray-600 mt-2">Herramientas completadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Síntomas Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">0</div>
              <p className="text-sm text-gray-600 mt-2">Comienza a registrar tus síntomas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Miembro Desde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">Hoy</div>
              <p className="text-sm text-gray-600 mt-2">Bienvenida a la comunidad</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
