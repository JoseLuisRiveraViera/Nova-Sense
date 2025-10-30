// src/components/chat/ChatInput.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ChatInputProps {
  disabled?: boolean
  onSubmit?: (value: string) => void
}

export default function ChatInput({
  disabled = true,
  onSubmit,
}: ChatInputProps) {
  const inputId = useId()
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (disabled) return
    if (!value.trim()) return
    onSubmit?.(value.trim())
    setValue("")
  }

  return (
    <div className="p-3 md:p-4">
      <div
        role="note"
        className="mb-2.5 rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-xs text-slate-700 backdrop-blur-xl md:text-sm"
      >
        <strong>Por ahora</strong> explora el{" "}
        <span className="font-semibold text-cyan-700">Mapa</span> y las{" "}
        <span className="font-semibold text-cyan-700">Alertas</span>. El chat llegará pronto.
      </div>

      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <form
              className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 p-2 shadow-xl backdrop-blur-2xl md:p-2.5"
              onSubmit={handleSubmit}
              aria-label="Enviar pregunta al asistente"
            >
              <Input
                id={inputId}
                aria-label="Escribe tu pregunta"
                placeholder="Próximamente: asistente con IBM Watson"
                disabled={disabled}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-10 flex-1 border-none bg-transparent text-sm placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 md:h-11 md:text-base"
              />
              <Button
                type="submit"
                aria-label="Enviar"
                disabled={disabled}
                size="default"
                className="h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold shadow-lg transition-all hover:from-cyan-500 hover:to-blue-500 md:h-11 md:text-base"
              >
                Enviar
              </Button>
            </form>
          </TooltipTrigger>
          <TooltipContent side="top" align="end" className="max-w-xs border-white/30 bg-white/90 text-center backdrop-blur-xl">
            <p className="font-medium">Fase 2: pronto con watsonx.ai</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}