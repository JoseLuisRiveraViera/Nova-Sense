// src/components/ui/relative-time.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
// asumo que ya tienes estos helpers:
import { formatRelative } from "@/lib/time"; // devuelve "hace X min" etc.

type Props = {
  date: Date | string | number;
  className?: string;
  updateEvery?: number;   // ms (default 60s)
  prefix?: string;        // ← nuevo
  suffix?: string;        // ← opcional
  initialNow?: number;    // ← opcional para hidratar igual que SSR
};

export function RelativeTime({ date, className, updateEvery = 60000 }: Props) {
  const [mounted, setMounted] = useState(false);
  // congelamos "now" al montar y luego lo actualizamos por intervalo
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), updateEvery);
    return () => clearInterval(id);
  }, [updateEvery]);

  const label = useMemo(
    () => formatRelative(new Date(date), new Date(now)),
    [date, now]
  );

  return (
    <span className={className} suppressHydrationWarning>
      {mounted ? label : "\u00A0"}
    </span>
  );
}

export default RelativeTime;
