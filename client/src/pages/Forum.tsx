import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { MessageCircle, ThumbsUp, Search, Plus, ArrowLeft, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Forum() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);

  const threads = [
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
          author: "Ana López",
          content: "Yo recomiendo mantener la habitación fresca (16-18°C) y usar ropa de algodón. También me ayuda mucho la respiración profunda antes de dormir.",
          likes: 18,
          helpful: true
        },
        {
          id: 2,
          author: "Carmen Ruiz",
          content: "Prueba con té de salvia antes de dormir. A mí me cambió la vida. También evito cafeína después de las 14:00.",
          likes: 12,
          helpful: true
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
      answers: []
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
      answers: []
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
      answers: []
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
      answers: []
    }
  ];

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

  if (selectedThread && selectedThreadData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
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
                <p className="text-gray-600">
                  Pregunta por <strong>{selectedThreadData.author}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">{selectedThreadData.lastReply}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{selectedThreadData.replies} respuestas</p>
                <p className="text-sm text-gray-600">{selectedThreadData.views} vistas</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg">{selectedThreadData.content}</p>
          </Card>

          {/* Answers */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Respuestas ({selectedThreadData.answers.length})</h2>
            {selectedThreadData.answers.length > 0 ? (
              selectedThreadData.answers.map(answer => (
                <Card key={answer.id} className={`p-6 border-2 ${answer.helpful ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-gray-900">{answer.author}</p>
                      {answer.helpful && <p className="text-xs text-green-600 font-semibold">✓ Respuesta Útil</p>}
                    </div>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{answer.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-700">{answer.content}</p>
                </Card>
              ))
            ) : (
              <p className="text-gray-600">Aún no hay respuestas. ¡Sé la primera en responder!</p>
            )}
          </div>

          {/* Reply Form */}
          <Card className="p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Añade tu respuesta</h3>
            <textarea
              placeholder="Comparte tu experiencia o consejo..."
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows={4}
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Publicar Respuesta
            </Button>
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
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Foro Comunitario</h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowNewThread(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nueva Pregunta
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLocation("/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            </div>
          </div>
          <p className="text-gray-600">
            Comunidad de mujeres compartiendo experiencias y consejos sobre menopausia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en el foro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-full transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map(thread => (
            <Card
              key={thread.id}
              className="p-6 border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600">{thread.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pregunta por <strong>{thread.author}</strong>
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {thread.category}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{thread.preview}</p>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {thread.replies} respuestas
                  </div>
                  <div>{thread.views} vistas</div>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {thread.likes}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Pregunta</h2>
            <input
              type="text"
              placeholder="Título de tu pregunta..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
              <option>Síntomas</option>
              <option>Emocional</option>
              <option>Ejercicio</option>
              <option>Nutrición</option>
              <option>Sueño</option>
              <option>Intimidad</option>
            </select>
            <textarea
              placeholder="Describe tu pregunta en detalle..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows={6}
            />
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Publicar Pregunta
              </Button>
              <Button
                onClick={() => setShowNewThread(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
