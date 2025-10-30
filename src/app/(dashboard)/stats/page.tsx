// app/(dashboard)/stats/page.tsx  (Server Component)
import { Suspense } from "react";
import StatsClient from "./StatsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Cargando estadísticas…</div>}>
      <StatsClient />
    </Suspense>
  );
}
