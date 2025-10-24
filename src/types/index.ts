// types/index.ts - Tipos globales del proyecto

export type WaterQuality = "Buena" | "Moderada" | "Peligrosa";

/**
 * Tendencia de la calidad del agua (agregar a tus tipos existentes)
 */
export type WaterTrend = 'improving' | 'stable' | 'worsening';

export interface Station {
  id: string;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  quality: WaterQuality;
  description: string;
  imageUrl?: string;
  lastReading?: Reading;
  lastUpdated: Date;
  trend: WaterTrend;
}

export interface Reading {
  id: string;
  stationId: string;
  timestamp: Date;
  ph: number;
  turbidity: number; // NTU
  oxygen: number; // mg/L
  temperature: number; // °C
  wqi: number; // Water Quality Index (0-100)
}

export interface Alert {
  id: string;
  stationId: string;
  stationName: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface DashboardStats {
  totalStations: number;
  goodQuality: number;
  moderateQuality: number;
  dangerousQuality: number;
  activeAlerts: number;
}

export interface ChartDataPoint {
  timestamp: string;
  ph: number;
  turbidity: number;
  oxygen: number;
  temperature: number;
}