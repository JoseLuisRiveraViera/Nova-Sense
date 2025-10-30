// src/app/(dashboard)/chat/page.tsx

import { Sparkles } from "lucide-react"
import MessageList from "@/components/chat/MessageList"
import ChatInput from "@/components/chat/ChatInput"
import type { ChatMessage } from "@/components/chat/Message"

export const metadata = {
  title: "Consultar IA (próximamente) — NovaSense",
  description: "Interfaz de chat placeholder para Fase 1 (sin backend).",
}

const demoMessages: ChatMessage[] = [
  {
    id: "m-1",
    role: "system",
    content:
      "Bienvenido al piloto ciudadano de NovaSense. Esta vista es un adelanto (sin IA activa).",
    timestamp: "2025-01-30T12:00:00.000Z",
  },
  {
    id: "m-2",
    role: "assistant",
    content:
      "Hola 👋 Muy pronto podré responder sobre calidad del agua con datos abiertos.",
    timestamp: "2025-01-30T12:01:00.000Z",
  },
  {
    id: "m-3",
    role: "user",
    content: "¿Es segura el agua del Río Mololoa hoy?",
    timestamp: "2025-01-30T12:01:30.000Z",
  },
  {
    id: "m-4",
    role: "assistant",
    content: "En Fase 2 te responderé con el apoyo de IBM watsonx.ai.",
    timestamp: "2025-01-30T12:02:00.000Z",
  },
]

export default function ChatPage() {
  return (
    <main className="relative flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-gradient-to-br from-cyan-50/30 via-blue-50/20 to-cyan-50/30">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-300/20 blur-[100px]" />
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2 py-4 md:py-6">
        <div className="flex size-12 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-lg backdrop-blur-xl md:size-14">
          <Sparkles className="h-6 w-6 text-cyan-600 md:h-7 md:w-7" aria-hidden />
        </div>
        <h1
          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl"
          aria-label="Consultar IA, próximamente"
        >
          Pregunta a nuestra IA
        </h1>
        <p className="text-sm text-slate-600 md:text-base">
          Próximamente con <span className="font-semibold text-cyan-600">IBM Watson</span>
        </p>
      </div>

      <section
        aria-label="Conversación de ejemplo"
        className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-t-3xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-2xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-40 -z-10 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-white/5"
        />
        <MessageList items={demoMessages} />
        <div className="shrink-0 border-t border-white/20 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-xl">
          <ChatInput disabled />
        </div>
      </section>
    </main>
  )
}