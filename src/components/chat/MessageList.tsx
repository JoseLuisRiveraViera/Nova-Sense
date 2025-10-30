// src/components/chat/MessageList.tsx
"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Message, { type ChatMessage } from "./Message"

export interface MessageListProps {
  items: ChatMessage[]
}

export default function MessageList({ items }: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto", block: "end" })
  }, [items])

  return (
    <ScrollArea
      className="min-h-0 flex-1 w-full"
      aria-label="Lista de mensajes"
    >
      <div
        role="list"
        aria-live="polite"
        className="flex min-h-full flex-col gap-2 p-4 md:gap-3 md:p-6"
      >
        <div className="mt-auto space-y-3 md:space-y-4">
          {items.map((m) => (
            <Message key={m.id} message={m} />
          ))}
        </div>
        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
}