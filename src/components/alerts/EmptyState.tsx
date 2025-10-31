// src/components/alerts/EmptyState.tsx
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No hay alertas",
  description = "No se encontraron alertas con los filtros aplicados.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-slate-100 p-6 mb-4">
        <AlertCircle className="h-12 w-12 text-slate-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 text-center max-w-md">{description}</p>
    </div>
  );
}