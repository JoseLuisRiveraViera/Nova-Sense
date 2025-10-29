"use client";

import { useState, useEffect } from 'react';
import { formatRelative } from '@/lib/time';

interface RelativeTimeProps {
  date: Date | string;
  prefix?: string;
  className?: string;
}

/**
 * Componente que muestra tiempo relativo y se actualiza automáticamente cada minuto
 * @param date - Fecha a mostrar (Date o string ISO)
 * @param prefix - Texto antes del tiempo relativo (default: "Última actualización: ")
 * @param className - Clases CSS opcionales
 */
export function RelativeTime({ 
  date, 
  prefix = "Última actualización: ",
  className = ""
}: RelativeTimeProps) {
  const [text, setText] = useState(() => formatRelative(date));

  useEffect(() => {
    // Actualizar inmediatamente si cambia la fecha
    setText(formatRelative(date));

    // Actualizar cada 60 segundos
    const interval = setInterval(() => {
      setText(formatRelative(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className={className}>
      {prefix}{text}
    </span>
  );
}