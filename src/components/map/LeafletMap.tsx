"use client"

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '@/types';
import { StationCard } from './StationCard';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { MapFilters, FilterState } from './MapFilters';
import { 
  createCustomIcon, 
  tileLayerConfig, 
  mapConfig 
} from '@/lib/mapHelpers';

// Fix para los iconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  stations: Station[];
}

export function LeafletMap({ stations }: LeafletMapProps) {
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = stations.filter(station => {
      const matchesQuality = filters.qualities.has(station.quality);
      const matchesTrend = !station.trend || filters.trends.has(station.trend);
      return matchesQuality && matchesTrend;
    });
    setFilteredStations(filtered);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        minZoom={mapConfig.minZoom}
        maxZoom={mapConfig.maxZoom}
        className="w-full h-full rounded-xl shadow-2xl border-2 border-slate-200"
        zoomControl={false}
      >
        <TileLayer {...tileLayerConfig} />
        
        {filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={createCustomIcon(station.quality)}
          >
            <Popup 
              className="custom-popup"
              closeButton={true}
              maxWidth={350}
            >
              <div 
                dangerouslySetInnerHTML={{
                  __html: renderToStaticMarkup(
                    <StationCard station={station} />
                  )
                }}
              />
            </Popup>
          </Marker>
        ))}

        <MapControls />
      </MapContainer>

      <MapLegend />
      <MapFilters onFilterChange={handleFilterChange} />

      {/* Info Bar Superior */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000]">
        <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-slate-200">
          <p className="text-sm font-medium text-slate-700">
            Mostrando <span className="font-bold text-cyan-600">{filteredStations.length}</span> de {stations.length} fuentes de agua
          </p>
        </div>
      </div>
    </div>
  );
}