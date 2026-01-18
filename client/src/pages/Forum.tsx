import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { MessageCircle, ThumbsUp, Search, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Forum() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThread, setSelectedThread] = useState<number | null>(null);

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
      answers: [
        {
          id: 1,
          author: "Ana López",
          content: "Yo recomiendo mantener la habitación fresca y usar ropa de algodón. También me ayuda mucho la respiración profunda.",
          likes: 18,
          helpful: true
        },
        {
          id: 2,
          author: "Carmen Ruiz",
          content: "Prueba con té de salvia antes de dormir. A mí me cambió la vida.",
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
      answers: []
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "síntomas", label: "Síntomas" },
    { id: "emocional", label: "Emocional" },
    { id: "ejercicio", label: "Ejercicio" },
    { id: "nutrición", label: "Nutrición" },
    { id: "sueño", label: "Sueño" }
  ];

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedThreadData = threads.find(t => t.id === selectedThread);

  if (selectedThread && selectedThreadData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
        {/* Header */}
        <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
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
          <Card className="p-6 mb-8 border-2 border-pink-200">
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
            <p className="text-gray-700 text-lg">{selectedThreadData.preview}</p>
          </Card>

          {/* Answers */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Respuestas ({selectedThreadData.answers.length})</h2>
            {selectedThreadData.answers.map(answer => (
              <Card key={answer.id} className={`p-6 border-2 ${answer.helpful ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-gray-900">{answer.author}</p>
                    {answer.helpful && <p className="text-xs text-green-600 font-semibold">✓ Respuesta Útil</p>}
                  </div>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-pink-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{answer.likes}</span>
                  </button>
                </div>
                <p className="text-gray-700">{answer.content}</p>
              </Card>
            ))}
          </div>

          {/* Reply Form */}
          <Card className="p-6 border-2 border-pink-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Añade tu respuesta</h3>
            <textarea
              placeholder="Comparte tu experiencia o consejo..."
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
              rows={4}
            />
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Publicar Respuesta
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-pink-600" />
              <h1 className="text-3xl font-bold text-gray-900">Foro de la Comunidad</h1>
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
            Conecta con otras mujeres, comparte experiencias y resuelve dudas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and New Thread */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en el foro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2">
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
              className="p-6 border-2 border-pink-100 hover:border-pink-400 transition-colors cursor-pointer"
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-pink-600">{thread.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pregunta por <strong>{thread.author}</strong>
                  </p>
                </div>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                  {thread.category}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{thread.preview}</p>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
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
    </div>
  );
}
