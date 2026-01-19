import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { MessageCircle, ThumbsUp, Search, Plus, ArrowLeft, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Forum() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newReplyText, setNewReplyText] = useState("");
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "¿Cómo manejar los sofocos nocturnos?",
      author: "María García",
      category: "síntomas",
      replies: 24,
      views: 156,
      likes: 42,
      lastReply: "Hace 2 horas",
      preview: "He estado experimentando sofocos muy intensos por la noche que me despiertan...",
      content: "He estado experimentando sofocos muy intensos por la noche que me despiertan constantemente. Duermo 2-3 horas máximo. ¿Alguien tiene consejos que realmente funcionen?",
      answers: [
        {
          id: 1,
          author: "Ana López (Ginecóloga)",
          content: "Yo recomiendo mantener la habitación fresca (16-18°C) y usar ropa de algodón. También me ayuda mucho la respiración profunda antes de dormir. Evita cafeína y alcohol después de las 14:00.",
          likes: 18,
          helpful: true,
          isExpert: true
        },
        {
          id: 2,
          author: "Carmen Ruiz",
          content: "Prueba con té de salvia antes de dormir. A mí me cambió la vida. También evito cafeína después de las 14:00. Y una botella de agua fría en la mesita de noche.",
          likes: 12,
          helpful: true,
          isExpert: false
        }
      ]
    },
    {
      id: 2,
      title: "Cambios de humor: ¿es normal sentirse así?",
      author: "Rosa Martínez",
      category: "emocional",
      replies: 18,
      views: 132,
      likes: 35,
      lastReply: "Hace 5 horas",
      preview: "Últimamente me siento muy irritable y con cambios de humor constantes...",
      content: "Últimamente me siento muy irritable y con cambios de humor constantes. Un momento estoy bien y al siguiente estoy llorando sin razón aparente. ¿Es normal?",
      answers: [
        {
          id: 1,
          author: "Dra. Psicóloga María",
          content: "Los cambios de humor son completamente normales durante la menopausia. Son causados por las fluctuaciones hormonales. La meditación, el ejercicio y el apoyo social ayudan mucho.",
          likes: 25,
          helpful: true,
          isExpert: true
        }
      ]
    },
    {
      id: 3,
      title: "Ejercicios que realmente funcionan",
      author: "Isabel Fernández",
      category: "ejercicio",
      replies: 31,
      views: 203,
      likes: 58,
      lastReply: "Hace 1 hora",
      preview: "Quería compartir los ejercicios que más me han ayudado con los síntomas...",
      content: "Quería compartir los ejercicios que más me han ayudado con los síntomas. El yoga y pilates han sido transformadores para mí.",
      answers: [
        {
          id: 1,
          author: "Entrenadora Personal",
          content: "Excelente observación. El yoga y pilates son ideales porque fortalecen sin impacto. Recomiendo 30 minutos, 5 días a la semana.",
          likes: 30,
          helpful: true,
          isExpert: true
        }
      ]
    },
    {
      id: 4,
      title: "Alimentación durante la menopausia",
      author: "Sofía Gómez",
      category: "nutrición",
      replies: 22,
      views: 178,
      likes: 41,
      lastReply: "Hace 3 horas",
      preview: "¿Qué alimentos evitar y cuáles priorizar durante esta etapa?",
      content: "¿Qué alimentos evitar y cuáles priorizar durante esta etapa? ¿Hay alimentos que realmente ayuden con los síntomas?",
      answers: [
        {
          id: 1,
          author: "Nutricionista Especializada",
          content: "Prioriza alimentos ricos en calcio, vitamina D y omega-3. Evita cafeína, alcohol y alimentos muy picantes que pueden desencadenar sofocos.",
          likes: 35,
          helpful: true,
          isExpert: true
        }
      ]
    },
    {
      id: 5,
      title: "Problemas de sueño: consejos que funcionan",
      author: "Laura Sánchez",
      category: "sueño",
      replies: 19,
      views: 145,
      likes: 33,
      lastReply: "Hace 4 horas",
      preview: "Compartiendo mis mejores tips para dormir mejor durante la menopausia...",
      content: "Compartiendo mis mejores tips para dormir mejor durante la menopausia. Después de meses de insomnio, finalmente encontré lo que funciona.",
      answers: []
    },
    {
      id: 6,
      title: "Cambios en la intimidad y sexualidad",
      author: "Patricia Gómez",
      category: "intimidad",
      replies: 15,
      views: 98,
      likes: 27,
      lastReply: "Hace 6 horas",
      preview: "¿Alguien más experimenta cambios en su vida sexual durante la menopausia?",
      content: "¿Alguien más experimenta cambios en su vida sexual durante la menopausia? Me gustaría saber cómo otros lo manejan.",
      answers: [
        {
          id: 1,
          author: "Sexóloga Clínica",
          content: "Los cambios en la libido y sequedad vaginal son comunes. Existen soluciones naturales y médicas. La comunicación con tu pareja es fundamental.",
          likes: 20,
          helpful: true,
          isExpert: true
        }
      ]
    }
  ]);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "síntomas", label: "Síntomas" },
    { id: "emocional", label: "Emocional" },
    { id: "ejercicio", label: "Ejercicio" },
    { id: "nutrición", label: "Nutrición" },
    { id: "sueño", label: "Sueño" },
    { id: "intimidad", label: "Intimidad" }
  ];

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedThreadData = threads.find(t => t.id === selectedThread);

  const handleAddReply = () => {
    if (!newReplyText.trim()) {
      toast.error("Por favor escribe una respuesta");
      return;
    }

    if (selectedThreadData) {
      setThreads(threads.map(t => {
        if (t.id === selectedThread) {
          return {
            ...t,
            answers: [
              ...t.answers,
              {
                id: t.answers.length + 1,
                author: user?.name || "Usuario Anónimo",
                content: newReplyText,
                likes: 0,
                helpful: false,
                isExpert: false
              }
            ],
            replies: t.replies + 1
          };
        }
        return t;
      }));
      setNewReplyText("");
      toast.success("¡Respuesta publicada!");
    }
  };

  if (selectedThread && selectedThreadData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
        {/* Valor Inicial */}
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

      {/* Header */}
        <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedThread(null)}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Foro
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedThreadData.title}</h1>
          </div>
        </div>

        {/* Thread Content */}
        <div className="container mx-auto px-4 py-12">
          <Card className="p-6 mb-8 border-2 border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Publicado por <strong>{selectedThreadData.author}</strong></p>
                <p className="text-xs text-gray-500 mt-1">Última respuesta hace 2 horas</p>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {selectedThreadData.replies} respuestas
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {selectedThreadData.likes} likes
                </span>
              </div>
            </div>
            <p className="text-gray-800 text-lg">{selectedThreadData.content}</p>
          </Card>

          {/* Answers */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Respuestas ({selectedThreadData.answers.length})</h2>
            {selectedThreadData.answers.map(answer => (
              <Card key={answer.id} className={`p-6 border-2 ${answer.isExpert ? "border-green-200 bg-green-50" : "border-gray-200"}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      {answer.author}
                      {answer.isExpert && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Experto</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-pink-500 text-pink-600 hover:bg-pink-50"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {answer.likes}
                    </Button>
                    {answer.helpful && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Útil</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">{answer.content}</p>
              </Card>
            ))}
          </div>

          {/* Add Reply Form */}
          <Card className="p-6 border-2 border-pink-200 bg-pink-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Escribe tu respuesta</h3>
            <div className="space-y-4">
              <textarea
                value={newReplyText}
                onChange={(e) => setNewReplyText(e.target.value)}
                placeholder="Comparte tu experiencia o consejo..."
                className="w-full p-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                rows={5}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedThread(null)}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={handleAddReply}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar Respuesta
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Foro Comunitario</h1>
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
          <p className="text-gray-600">
            Comunidad de mujeres compartiendo experiencias y consejos sobre menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and New Thread */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en el foro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nueva Pregunta
            </Button>
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map(thread => (
            <Card
              key={thread.id}
              className="p-6 border-2 border-blue-100 hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600">{thread.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Publicado por <strong>{thread.author}</strong> • {thread.lastReply}
                  </p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
                  {thread.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">{thread.preview}</p>

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {thread.replies} respuestas
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {thread.likes} likes
                  </span>
                  <span className="text-gray-500">{thread.views} vistas</span>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedThread(thread.id);
                  }}
                >
                  Leer Respuestas
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredThreads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron temas con esos criterios</p>
          </div>
        )}
      </div>
    </div>
  );
}
