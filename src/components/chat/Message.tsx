// src/components/chat/Message.tsx
"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface ChatMessage {
  id: string
  role: "system" | "user" | "assistant"
  content: string
  timestamp: string
}

export interface MessageProps {
  message: ChatMessage
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return ""
  }
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"
  const isSystem = message.role === "system"

  return (
    <div
      role="listitem"
      aria-label={
        isUser
          ? "Mensaje del usuario"
          : isAssistant
            ? "Mensaje del asistente"
            : "Mensaje del sistema"
      }
      className={cn(
        "flex items-end gap-2 md:gap-2.5",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="size-8 shrink-0 border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl md:size-9">
          <AvatarFallback className="bg-gradient-to-br from-white/40 to-cyan-100/30 text-[10px] font-semibold text-cyan-700 backdrop-blur-xl md:text-xs">
            {isSystem ? "SYS" : "AI"}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3.5 py-2.5 shadow-xl outline-none transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 md:px-4 md:py-3",
          isUser
            ? "border border-white/30 bg-gradient-to-br from-cyan-500/90 to-blue-600/90 text-white backdrop-blur-xl"
            : "border border-white/30 bg-white/20 text-slate-800 backdrop-blur-2xl"
        )}
        tabIndex={0}
      >
        <p
          className={cn(
            "whitespace-pre-wrap text-sm leading-relaxed md:text-base",
            isSystem && "italic",
            !isUser && "text-slate-700"
          )}
        >
          {message.content}
        </p>
        <time
          className={cn(
            "mt-1.5 block text-[10px] leading-4 md:text-xs",
            isUser ? "text-white/70" : "text-slate-500"
          )}
          dateTime={message.timestamp}
          aria-label={`Hora ${formatTime(message.timestamp)}`}
        >
          {formatTime(message.timestamp)}
        </time>
      </div>

      {isUser && (
        <Avatar className="size-8 shrink-0 border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl md:size-9">
          <AvatarFallback className="bg-slate-800 text-[10px] font-semibold text-white md:text-xs">
            Tú
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}