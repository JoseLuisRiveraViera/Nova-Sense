    // src/types/index.ts

    export type WaterQuality = "Buena" | "Moderada" | "Peligrosa";

    export interface Station {
    id: string;
    name: string;
    coordinates: [number, number]; // [lat, lng]
    quality: WaterQuality;
    description: string;
    imageUrl: string;
    lastUpdated: Date;
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