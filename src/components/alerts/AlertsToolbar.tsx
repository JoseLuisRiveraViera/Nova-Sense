// src/components/alerts/AlertsToolbar.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, LayoutGrid, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

type AlertType = "all" | "critical" | "warning" | "info";
type ViewMode = "cards" | "table";

interface AlertsToolbarProps {
  type: AlertType;
  onTypeChange: (type: AlertType) => void;
  showUnseenOnly: boolean;
  onToggleUnseen: (checked: boolean) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export function AlertsToolbar({
  type,
  onTypeChange,
  showUnseenOnly,
  onToggleUnseen,
  viewMode,
  onViewModeChange,
  search,
  onSearchChange,
}: AlertsToolbarProps) {
  return (
    <div className="space-y-4">
      {/* Tabs por tipo */}
      <Tabs value={type} onValueChange={(value) => onTypeChange(value as AlertType)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="critical" className="text-red-700">
            🔴 Críticas
          </TabsTrigger>
          <TabsTrigger value="warning" className="text-yellow-700">
            🟡 Precaución
          </TabsTrigger>
          <TabsTrigger value="info" className="text-cyan-700">
            🔵 Info
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Búsqueda y controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Búsqueda */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Buscar por estación o mensaje..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Controles: Toggle no vistas + Vista */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Toggle no vistas */}
          <div className="flex items-center gap-2">
            <Switch
              id="unseen-only"
              checked={showUnseenOnly}
              onCheckedChange={onToggleUnseen}
            />
            <Label htmlFor="unseen-only" className="text-sm cursor-pointer">
              Solo no vistas
            </Label>
          </div>

          {/* Switch Cards/Tabla */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1">
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("cards")}
              className="h-8 px-3"
              title="Vista de cards"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Vista de cards</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("table")}
              className="h-8 px-3"
              title="Vista de tabla"
            >
              <Table className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Vista de tabla</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}