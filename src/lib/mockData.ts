// src/lib/mockData.ts
import { Station, Reading, Alert, WaterQuality } from "@/types";

const stationsData: Omit<Station, "lastUpdated">[] = [
  {
    id: "1",
    name: "Río San Pedro",
    coordinates: [22.226102510029904, -105.00979212636152],
    quality: "Moderada",
    description: "Agua apta solo para riego.",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    trend: "stable"
  },
  {
    id: "2",
    name: "Río Mololoa",
    coordinates: [21.51585409995925, -104.88884195220137],
    quality: "Peligrosa",
    description: "Agua altamente contaminada, no debe ser usada.",
    imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
    trend: "worsening"
  },
  {
    id: "3",
    name: "Laguna de Mora",
    coordinates: [21.516758, -104.811909],
    quality: "Buena",
    description: "Agua en óptimas condiciones.",
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
    trend: "improving"
  },
  {
    id: "4",
    name: "Cascada el Cora",
    coordinates: [21.414812193928924, -105.12698881963927],
    quality: "Buena",
    description: "Agua cristalina en óptimas condiciones.",
    imageUrl: "https://images.unsplash.com/photo-1508167728150-326ba76d8297?w=800",
    trend: "stable"
  },
  {
    id: "5",
    name: "Río Huicicila",
    coordinates: [21.320345002104013, -105.055278545828],
    quality: "Buena",
    description: "Agua en excelente estado.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    trend: "stable"
  },
  {
    id: "6",
    name: "Presa de Refilion",
    coordinates: [21.31053327955347, -104.89369957722249],
    quality: "Moderada",
    description: "Agua apta para riego.",
    imageUrl: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=800",
    trend: "stable"
  }
];

export function generateMockStations(): Station[] {
  return stationsData.map(station => ({
    ...station,
    lastUpdated: new Date(Date.now() - Math.random() * 3600000)
  }));
}

export function generateMockReadings(stationId: string, count: number = 24): Reading[] {
  const readings: Reading[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now - (count - i) * 3600000);
    
    readings.push({
      id: `${stationId}-${i}`,
      stationId,
      timestamp,
      ph: 6.5 + Math.random() * 2,
      turbidity: Math.random() * 15,
      oxygen: 5 + Math.random() * 5,
      temperature: 18 + Math.random() * 8,
      wqi: 50 + Math.random() * 40
    });
  }
  
  return readings;
}

// src/lib/mockData.ts
export function generateMockAlerts(): Alert[] {
  const stations = generateMockStations();
  const alerts: Alert[] = [];
  
  stations.forEach((station, idx) => {
    if (station.quality === "Peligrosa") {
      alerts.push({
        id: `alert-critical-${idx}`,
        stationId: station.id,
        stationName: station.name,
        type: "critical",
        message: `Nivel crítico de contaminación detectado`,
        timestamp: new Date(Date.now() - Math.random() * 7200000),
        acknowledged: false
      });
    } else if (station.quality === "Moderada") {
      alerts.push({
        id: `alert-warning-${idx}`,
        stationId: station.id,
        stationName: station.name,
        type: "warning",
        message: `Calidad del agua por debajo del nivel óptimo`,
        timestamp: new Date(Date.now() - Math.random() * 7200000),
        acknowledged: false
      });
    } else if (station.quality === "Buena") {
      // NUEVO: Alertas info para estaciones con buena calidad
      alerts.push({
        id: `alert-info-${idx}`,
        stationId: station.id,
        stationName: station.name,
        type: "info",
        message: `Calidad del agua en óptimas condiciones`,
        timestamp: new Date(Date.now() - Math.random() * 7200000),
        acknowledged: false
      });
    }
  });
  
  return alerts;
}

export function getQualityColor(quality: WaterQuality): string {
  switch (quality) {
    case "Buena": return "hsl(142, 76%, 36%)";
    case "Moderada": return "hsl(38, 92%, 50%)";
    case "Peligrosa": return "hsl(0, 84%, 60%)";
  }
}

export function getQualityGradient(quality: WaterQuality): string {
  switch (quality) {
    case "Buena": return "from-green-500 to-emerald-600";
    case "Moderada": return "from-yellow-500 to-orange-500";
    case "Peligrosa": return "from-red-500 to-rose-600";
  }
}